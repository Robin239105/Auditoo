import https from 'https';

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

  let cleanUrl = url.trim();
  if (!/^https?:\/\//i.test(cleanUrl)) {
    cleanUrl = 'https://' + cleanUrl;
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(cleanUrl);
  } catch {
    return res.status(400).json({ error: 'Invalid URL format provided.' });
  }

  const targetUrl = parsedUrl.origin + parsedUrl.pathname;

  // ──────────────────────────────────────────────
  // 1. Fetch the page
  // ──────────────────────────────────────────────
  let html = '';
  let responseHeaders = {};
  let transferBytes = 0;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const resp = await fetch(targetUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      redirect: 'follow',
    });
    clearTimeout(timeout);

    // Collect headers
    resp.headers.forEach((value, key) => {
      responseHeaders[key.toLowerCase()] = value;
    });

    html = await resp.text();
    transferBytes = new TextEncoder().encode(html).length;
  } catch (fetchErr) {
    return res.status(502).json({ error: `Could not fetch the website: ${fetchErr.message}` });
  }

  const htmlLower = html.toLowerCase();

  // ──────────────────────────────────────────────
  // 2. Tech Stack Detection
  // ──────────────────────────────────────────────
  const techStack = [];
  const detected = new Set();

  const addTech = (name, category, confidence) => {
    if (!detected.has(name)) {
      detected.add(name);
      techStack.push({ name, category, confidence });
    }
  };

  // Header-based detection
  const server = responseHeaders['server'] || '';
  const poweredBy = responseHeaders['x-powered-by'] || '';

  if (server.toLowerCase().includes('nginx')) addTech('Nginx', 'Server', 'High');
  if (server.toLowerCase().includes('apache')) addTech('Apache', 'Server', 'High');
  if (server.toLowerCase().includes('cloudflare')) addTech('Cloudflare', 'CDN', 'High');
  if (poweredBy.toLowerCase().includes('express')) addTech('Express.js', 'Framework', 'High');
  if (poweredBy.toLowerCase().includes('php')) addTech('PHP', 'Language', 'High');
  if (poweredBy.toLowerCase().includes('asp.net')) addTech('ASP.NET', 'Framework', 'High');
  if (responseHeaders['cf-ray']) addTech('Cloudflare', 'CDN', 'High');
  if (responseHeaders['cf-cache-status']) addTech('Cloudflare', 'CDN', 'High');
  if (responseHeaders['x-vercel-id']) addTech('Vercel', 'Hosting', 'High');
  if (responseHeaders['x-nf-request-id']) addTech('Netlify', 'Hosting', 'High');
  const amzHeaders = Object.keys(responseHeaders).filter(h => h.startsWith('x-amz'));
  if (amzHeaders.length > 0) addTech('AWS', 'Hosting', 'Medium');

  // HTML body patterns
  const bodyPatterns = [
    // CMS
    { patterns: ['wp-content/', 'wp-includes/'], name: 'WordPress', category: 'CMS', confidence: 'High' },
    { patterns: ['cdn.shopify.com', 'shopify.theme'], name: 'Shopify', category: 'CMS', confidence: 'High' },
    { patterns: ['static.parastorage.com', 'wix.com'], name: 'Wix', category: 'CMS', confidence: 'High' },
    { patterns: ['squarespace.com', 'sqsp'], name: 'Squarespace', category: 'CMS', confidence: 'High' },
    { patterns: ['webflow.com'], name: 'Webflow', category: 'CMS', confidence: 'High' },
    { patterns: ['ghost.org'], name: 'Ghost', category: 'CMS', confidence: 'High' },
    { patterns: ['drupal'], name: 'Drupal', category: 'CMS', confidence: 'Medium' },
    { patterns: ['joomla'], name: 'Joomla', category: 'CMS', confidence: 'Medium' },
    // Frameworks
    { patterns: ['/_next/', '__next_data__'], name: 'Next.js', category: 'Framework', confidence: 'High' },
    { patterns: ['__nuxt__', '/_nuxt/'], name: 'Nuxt', category: 'Framework', confidence: 'High' },
    { patterns: ['ng-version', 'angular'], name: 'Angular', category: 'Framework', confidence: 'Medium' },
    { patterns: ['svelte'], name: 'Svelte', category: 'Framework', confidence: 'Medium' },
    { patterns: ['vue.js', 'vue.min.js', '__vue__'], name: 'Vue.js', category: 'Framework', confidence: 'Medium' },
    { patterns: ['reactdom', 'react-dom', '__react'], name: 'React', category: 'Framework', confidence: 'Medium' },
    { patterns: ['laravel'], name: 'Laravel', category: 'Framework', confidence: 'Medium' },
    { patterns: ['csrfmiddlewaretoken'], name: 'Django', category: 'Framework', confidence: 'Low' },
    { patterns: ['turbolinks', 'data-turbo'], name: 'Ruby on Rails', category: 'Framework', confidence: 'Low' },
    // Analytics
    { patterns: ['googletagmanager.com/gtm.js'], name: 'Google Tag Manager', category: 'Analytics', confidence: 'High' },
    { patterns: ['gtag(', 'google-analytics.com', 'googletagmanager.com'], name: 'Google Analytics', category: 'Analytics', confidence: 'High' },
    { patterns: ['fbq(', 'connect.facebook.net'], name: 'Facebook Pixel', category: 'Analytics', confidence: 'High' },
    { patterns: ['hotjar.com'], name: 'Hotjar', category: 'Analytics', confidence: 'High' },
    { patterns: ['plausible.io'], name: 'Plausible', category: 'Analytics', confidence: 'High' },
    { patterns: ['matomo'], name: 'Matomo', category: 'Analytics', confidence: 'Medium' },
    // CSS
    { patterns: ['tailwindcss', 'tailwind.min.css'], name: 'Tailwind CSS', category: 'CSS', confidence: 'Medium' },
    { patterns: ['bootstrap.min.css', 'bootstrap.min.js', 'bootstrap.bundle'], name: 'Bootstrap', category: 'CSS', confidence: 'High' },
    // JS Libraries
    { patterns: ['jquery.min.js', 'jquery-'], name: 'jQuery', category: 'JavaScript Library', confidence: 'High' },
    { patterns: ['font-awesome', 'fontawesome'], name: 'Font Awesome', category: 'CSS', confidence: 'High' },
    // Fonts
    { patterns: ['fonts.googleapis.com'], name: 'Google Fonts', category: 'Font', confidence: 'High' },
    // Payments
    { patterns: ['js.stripe.com'], name: 'Stripe', category: 'Payment', confidence: 'High' },
    // Chat
    { patterns: ['intercom'], name: 'Intercom', category: 'Chat', confidence: 'Medium' },
    { patterns: ['crisp.chat'], name: 'Crisp', category: 'Chat', confidence: 'High' },
    { patterns: ['zendesk'], name: 'Zendesk', category: 'Chat', confidence: 'Medium' },
    // Marketing
    { patterns: ['hubspot'], name: 'HubSpot', category: 'Marketing', confidence: 'Medium' },
    { patterns: ['mailchimp'], name: 'Mailchimp', category: 'Marketing', confidence: 'Medium' },
    // Image CDN
    { patterns: ['cloudinary.com'], name: 'Cloudinary', category: 'Image CDN', confidence: 'High' },
    { patterns: ['imgix.net'], name: 'Imgix', category: 'Image CDN', confidence: 'High' },
    // Error Tracking
    { patterns: ['sentry.io', 'sentry-'], name: 'Sentry', category: 'Error Tracking', confidence: 'High' },
  ];

  for (const { patterns, name, category, confidence } of bodyPatterns) {
    for (const p of patterns) {
      if (htmlLower.includes(p.toLowerCase())) {
        addTech(name, category, confidence);
        break;
      }
    }
  }

  // Meta generator tag
  const genMatch = html.match(/<meta[^>]+name=["']generator["'][^>]+content=["']([^"']+)["']/i);
  if (genMatch) {
    addTech(genMatch[1].trim(), 'CMS', 'High');
  }

  // ──────────────────────────────────────────────
  // 3. Broken Links
  // ──────────────────────────────────────────────
  let links = { broken: [], workingCount: 0, totalChecked: 0 };
  try {
    const hrefRegex = /<a[^>]+href=["']([^"'#]+)["']/gi;
    const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
    const allUrls = new Set();
    let m;

    while ((m = hrefRegex.exec(html)) !== null) {
      try {
        const resolved = new URL(m[1], targetUrl).href;
        if (resolved.startsWith('http')) allUrls.add(resolved);
      } catch { /* skip invalid */ }
    }
    while ((m = imgRegex.exec(html)) !== null) {
      try {
        const resolved = new URL(m[1], targetUrl).href;
        if (resolved.startsWith('http')) allUrls.add(resolved);
      } catch { /* skip invalid */ }
    }

    const urlsToCheck = [...allUrls].slice(0, 30);
    links.totalChecked = urlsToCheck.length;

    const checkResults = await Promise.allSettled(
      urlsToCheck.map(async (u) => {
        const ctrl = new AbortController();
        const t = setTimeout(() => ctrl.abort(), 3000);
        try {
          const r = await fetch(u, {
            method: 'HEAD',
            signal: ctrl.signal,
            redirect: 'follow',
            headers: { 'User-Agent': 'Auditoo-LinkChecker/1.0' },
          });
          clearTimeout(t);
          return { url: u, status: r.status };
        } catch (e) {
          clearTimeout(t);
          return { url: u, status: 0, error: e.message };
        }
      })
    );

    for (const result of checkResults) {
      const val = result.status === 'fulfilled' ? result.value : { url: 'unknown', status: 0 };
      if (val.status >= 400 || val.status === 0) {
        links.broken.push({ url: val.url, status: val.status, type: val.status === 0 ? 'timeout/error' : 'http_error' });
      } else {
        links.workingCount++;
      }
    }
  } catch { /* links section failed gracefully */ }

  // ──────────────────────────────────────────────
  // 4. Cookie & Privacy
  // ──────────────────────────────────────────────
  let cookies = { preConsentCookies: [], bannerDetected: false, privacyPageFound: false };
  try {
    const setCookieHeader = responseHeaders['set-cookie'] || '';
    if (setCookieHeader) {
      const cookieNames = setCookieHeader.split(',')
        .map(c => c.trim().split('=')[0])
        .filter(n => n && !n.includes(' '));
      cookies.preConsentCookies = [...new Set(cookieNames)];
    }

    const bannerPatterns = ['cookieconsent', 'cookie-banner', 'cookie-notice', 'onetrust', 'cookiebot', 'gdpr', 'cookie-policy', 'cc-banner', 'cookie_consent', 'cookie-consent'];
    cookies.bannerDetected = bannerPatterns.some(p => htmlLower.includes(p));

    const privacyLinkRegex = /<a[^>]*href=["'][^"']*privacy[^"']*["'][^>]*>/i;
    const privacyTextRegex = /<a[^>]*>[^<]*privacy\s*(policy)?[^<]*<\/a>/i;
    cookies.privacyPageFound = privacyLinkRegex.test(html) || privacyTextRegex.test(html);
  } catch { /* cookies section failed gracefully */ }

  // ──────────────────────────────────────────────
  // 5. SSL & Security Headers
  // ──────────────────────────────────────────────
  let security = {
    ssl: { valid: false, issuer: 'Unknown', expiry: 'Unknown', daysRemaining: 0 },
    headers: { hsts: false, csp: false, xContentType: false, xFrame: false, referrerPolicy: false, permissionsPolicy: false }
  };
  try {
    // SSL check via https module
    if (parsedUrl.protocol === 'https:' || !parsedUrl.protocol) {
      const sslInfo = await new Promise((resolve) => {
        const sslReq = https.request({
          hostname: parsedUrl.hostname,
          port: 443,
          method: 'HEAD',
          path: parsedUrl.pathname || '/',
          timeout: 5000,
          rejectUnauthorized: false,
        }, (sslRes) => {
          const cert = sslRes.socket.getPeerCertificate();
          if (cert && cert.valid_to) {
            const expiryDate = new Date(cert.valid_to);
            const now = new Date();
            const daysRemaining = Math.max(0, Math.round((expiryDate - now) / (1000 * 60 * 60 * 24)));
            resolve({
              valid: sslRes.socket.authorized !== false,
              issuer: cert.issuer?.O || cert.issuer?.CN || 'Unknown',
              expiry: expiryDate.toISOString().split('T')[0],
              daysRemaining
            });
          } else {
            resolve({ valid: false, issuer: 'Unknown', expiry: 'Unknown', daysRemaining: 0 });
          }
          sslRes.resume();
        });
        sslReq.on('error', () => resolve({ valid: false, issuer: 'Unknown', expiry: 'Unknown', daysRemaining: 0 }));
        sslReq.on('timeout', () => { sslReq.destroy(); resolve({ valid: false, issuer: 'Unknown', expiry: 'Unknown', daysRemaining: 0 }); });
        sslReq.end();
      });
      security.ssl = sslInfo;
    }

    // Security headers
    security.headers.hsts = !!responseHeaders['strict-transport-security'];
    security.headers.csp = !!responseHeaders['content-security-policy'];
    security.headers.xContentType = !!responseHeaders['x-content-type-options'];
    security.headers.xFrame = !!responseHeaders['x-frame-options'];
    security.headers.referrerPolicy = !!responseHeaders['referrer-policy'];
    security.headers.permissionsPolicy = !!responseHeaders['permissions-policy'];
  } catch { /* security section failed gracefully */ }

  // ──────────────────────────────────────────────
  // 6. Carbon Footprint
  // ──────────────────────────────────────────────
  let carbon = { co2PerView: '0.00g', rating: 'A', pageWeight: '0 KB', cleanerThan: '100%' };
  try {
    const bytes = parseInt(responseHeaders['content-length'], 10) || transferBytes;
    const kb = bytes / 1024;
    const mb = kb / 1024;
    const gb = mb / 1024;
    const energy = gb * 0.81;
    const co2 = energy * 442;

    let rating = 'A';
    if (co2 >= 1.0) rating = 'F';
    else if (co2 >= 0.75) rating = 'E';
    else if (co2 >= 0.55) rating = 'D';
    else if (co2 >= 0.35) rating = 'C';
    else if (co2 >= 0.15) rating = 'B';

    const medianBytes = 2.3 * 1024 * 1024;
    const cleanerThan = Math.min(100, Math.max(0, Math.round((1 - bytes / medianBytes) * 100)));

    carbon = {
      co2PerView: co2.toFixed(3) + 'g',
      rating,
      pageWeight: mb >= 1 ? mb.toFixed(2) + ' MB' : kb.toFixed(0) + ' KB',
      cleanerThan: cleanerThan + '%'
    };
  } catch { /* carbon section failed gracefully */ }

  // ──────────────────────────────────────────────
  // 7. Open Graph & Social Tags
  // ──────────────────────────────────────────────
  let ogTags = {
    og: { title: '', description: '', image: '', url: '', type: '', siteName: '' },
    twitter: { card: '', title: '', description: '', image: '' },
    standard: { title: '', description: '', canonical: '', favicon: '' }
  };
  try {
    const metaTag = (nameOrProp, attr = 'content') => {
      const regex = new RegExp(`<meta[^>]+(?:name|property)=["']${nameOrProp}["'][^>]+${attr}=["']([^"']*)["']`, 'i');
      const altRegex = new RegExp(`<meta[^>]+${attr}=["']([^"']*)["'][^>]+(?:name|property)=["']${nameOrProp}["']`, 'i');
      const match = html.match(regex) || html.match(altRegex);
      return match ? match[1] : '';
    };

    ogTags.og.title = metaTag('og:title');
    ogTags.og.description = metaTag('og:description');
    ogTags.og.image = metaTag('og:image');
    ogTags.og.url = metaTag('og:url');
    ogTags.og.type = metaTag('og:type');
    ogTags.og.siteName = metaTag('og:site_name');

    ogTags.twitter.card = metaTag('twitter:card');
    ogTags.twitter.title = metaTag('twitter:title');
    ogTags.twitter.description = metaTag('twitter:description');
    ogTags.twitter.image = metaTag('twitter:image');

    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    ogTags.standard.title = titleMatch ? titleMatch[1].trim() : '';

    ogTags.standard.description = metaTag('description');

    const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i);
    ogTags.standard.canonical = canonicalMatch ? canonicalMatch[1] : '';

    const faviconMatch = html.match(/<link[^>]+rel=["'](?:icon|shortcut icon)["'][^>]+href=["']([^"']*)["']/i);
    ogTags.standard.favicon = faviconMatch ? faviconMatch[1] : '';
  } catch { /* og section failed gracefully */ }

  // ──────────────────────────────────────────────
  // 8. Page Weight Analysis
  // ──────────────────────────────────────────────
  let pageWeight = {
    htmlSize: '0 KB',
    externalScripts: 0,
    stylesheets: 0,
    images: 0,
    fonts: 0,
    inlineScripts: 0,
    inlineStyles: 0
  };
  try {
    const kb = transferBytes / 1024;
    const mb = kb / 1024;
    pageWeight.htmlSize = mb >= 1 ? mb.toFixed(2) + ' MB' : kb.toFixed(0) + ' KB';

    const extScripts = html.match(/<script[^>]+src=["'][^"']+["']/gi);
    pageWeight.externalScripts = extScripts ? extScripts.length : 0;

    const styleLinks = html.match(/<link[^>]+rel=["']stylesheet["']/gi);
    pageWeight.stylesheets = styleLinks ? styleLinks.length : 0;

    const imgs = html.match(/<img[\s>]/gi);
    pageWeight.images = imgs ? imgs.length : 0;

    const fontLinks = html.match(/<link[^>]+(?:fonts\.|font)[^>]*>/gi);
    pageWeight.fonts = fontLinks ? fontLinks.length : 0;

    const inlineScripts = html.match(/<script(?:\s[^>]*)?>(?!\s*$)[^]*?<\/script>/gi);
    const inlineScriptsFiltered = inlineScripts
      ? inlineScripts.filter(s => !/<script[^>]+src=/i.test(s))
      : [];
    pageWeight.inlineScripts = inlineScriptsFiltered.length;

    const inlineStyles = html.match(/<style[\s>][^]*?<\/style>/gi);
    pageWeight.inlineStyles = inlineStyles ? inlineStyles.length : 0;
  } catch { /* page weight section failed gracefully */ }

  // ──────────────────────────────────────────────
  // Return combined results
  // ──────────────────────────────────────────────
  return res.status(200).json({
    techStack,
    links,
    cookies,
    security,
    carbon,
    ogTags,
    pageWeight
  });
}
