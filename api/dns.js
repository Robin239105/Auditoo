import dns from 'dns';

const resolver = dns.promises;

/**
 * Safely resolve a DNS record type, returning an empty array on failure.
 */
async function safeResolve(hostname, rrtype) {
  try {
    return await resolver.resolve(hostname, rrtype);
  } catch {
    return [];
  }
}

/**
 * Detect CDN / hosting provider from A record IPs and CNAME values.
 */
function detectCDN(aRecords, cnameRecords) {
  const cnameStr = cnameRecords.map((c) => c.toLowerCase()).join(' ');

  // CNAME-based detection (order matters — more specific first)
  const cnameProviders = [
    { pattern: 'cloudflare', name: 'Cloudflare' },
    { pattern: 'vercel-dns', name: 'Vercel' },
    { pattern: 'vercel', name: 'Vercel' },
    { pattern: 'netlify', name: 'Netlify' },
    { pattern: 'cloudfront.net', name: 'AWS CloudFront' },
    { pattern: 'amazonaws.com', name: 'AWS' },
    { pattern: 'googlehosted.com', name: 'Google Cloud' },
    { pattern: 'github.io', name: 'GitHub Pages' },
    { pattern: 'fastly', name: 'Fastly' },
    { pattern: 'digitalocean', name: 'DigitalOcean' },
    { pattern: 'herokuapp.com', name: 'Heroku' },
    { pattern: 'azurewebsites.net', name: 'Azure' },
  ];

  for (const { pattern, name } of cnameProviders) {
    if (cnameStr.includes(pattern)) {
      return name;
    }
  }

  // IP-based detection for Cloudflare (104.16.0.0 – 104.31.255.255)
  for (const ip of aRecords) {
    const parts = ip.split('.');
    if (parts.length === 4) {
      const first = parseInt(parts[0], 10);
      const second = parseInt(parts[1], 10);
      if (first === 104 && second >= 16 && second <= 31) {
        return 'Cloudflare';
      }
    }
  }

  return 'Unknown';
}

/**
 * Detect email provider from MX records.
 */
function detectEmailProvider(mxRecords) {
  if (!mxRecords || mxRecords.length === 0) {
    return 'None';
  }

  const mxStr = mxRecords.map((r) => r.exchange.toLowerCase()).join(' ');

  const emailProviders = [
    { pattern: 'google.com', name: 'Google Workspace' },
    { pattern: 'googlemail.com', name: 'Google Workspace' },
    { pattern: 'protection.outlook.com', name: 'Microsoft 365' },
    { pattern: 'outlook.com', name: 'Microsoft 365' },
    { pattern: 'zoho', name: 'Zoho' },
    { pattern: 'protonmail', name: 'ProtonMail' },
  ];

  for (const { pattern, name } of emailProviders) {
    if (mxStr.includes(pattern)) {
      return name;
    }
  }

  return 'Custom/Self-hosted';
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  // Sanitize and extract hostname
  let hostname;
  try {
    let cleanUrl = url.trim();
    if (!/^https?:\/\//i.test(cleanUrl)) {
      cleanUrl = 'https://' + cleanUrl;
    }
    const parsedUrl = new URL(cleanUrl);
    hostname = parsedUrl.hostname;
  } catch {
    return res.status(400).json({ error: 'Invalid URL format provided.' });
  }

  if (!hostname) {
    return res.status(400).json({ error: 'Could not extract hostname from URL.' });
  }

  try {
    // Resolve all record types in parallel
    const [aRecords, aaaaRecords, mxRecords, nsRecords, txtRecords, cnameRecords] =
      await Promise.all([
        safeResolve(hostname, 'A'),
        safeResolve(hostname, 'AAAA'),
        safeResolve(hostname, 'MX'),
        safeResolve(hostname, 'NS'),
        safeResolve(hostname, 'TXT'),
        safeResolve(hostname, 'CNAME'),
      ]);

    // TXT records come back as arrays of chunks — flatten each entry
    const flatTxt = txtRecords.map((chunks) =>
      Array.isArray(chunks) ? chunks.join('') : chunks
    );

    const cdn = detectCDN(aRecords, cnameRecords);
    const emailProvider = detectEmailProvider(mxRecords);

    return res.status(200).json({
      hostname,
      records: {
        A: aRecords,
        AAAA: aaaaRecords,
        MX: mxRecords,
        NS: nsRecords,
        TXT: flatTxt,
        CNAME: cnameRecords,
      },
      cdn,
      emailProvider,
      nameservers: nsRecords,
    });
  } catch (err) {
    console.error('DNS resolution error:', err.message);
    return res.status(500).json({ error: `DNS lookup failed: ${err.message}` });
  }
}
