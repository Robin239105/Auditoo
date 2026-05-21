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

  const { url, model } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  // Sanitizing input URL to prevent prompt injection and extract domain/path only
  let cleanUrl = url.trim();
  if (!/^https?:\/\//i.test(cleanUrl)) {
    cleanUrl = 'https://' + cleanUrl;
  }
  try {
    const parsedUrl = new URL(cleanUrl);
    // Standardize URL and discard extra queries/hashes that could inject text
    cleanUrl = parsedUrl.origin + parsedUrl.pathname;
  } catch {
    return res.status(400).json({ error: 'Invalid URL format provided.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ 
      error: 'Gemini API key is not configured on the server. Please set the GEMINI_API_KEY environment variable on Vercel.' 
    });
  }

  const targetModel = model || 'gemini-2.5-flash';
  
  const prompt = `You are an expert web analyst and senior UI/UX designer.
Analyze the website URL: "${cleanUrl}".
Based on your knowledge of this website or websites of this type, return ONLY a valid JSON object with NO markdown formatting, NO code blocks, and NO explanation text.

Use the following JSON schema:
{
  "scores": {
    "design": number, // 0-100
    "seo": number,
    "speed": number,
    "conversion": number,
    "mobile": number,
    "overall": number
  },
  "designProblems": string[],
  "seoProblems": string[],
  "speedProblems": string[],
  "conversionProblems": string[],
  "missingCTAs": string[],
  "mobileIssues": string[],
  "redesignSections": [
    {
      "section": string,
      "priority": "High" | "Medium" | "Low",
      "reason": string,
      "suggestion": string
    }
  ],
  "quickWins": string[],
  "overallSummary": string // 2-3 sentences honest assessment
}

If you don't have specific data for this URL, use reasonable estimates based on typical websites in this industry. Always return plausible, specific, actionable issues - never generic filler.
Return ONLY the JSON. Nothing before it. Nothing after it.`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.2,
          maxOutputTokens: 2048
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const message = errorData.error?.message || `Gemini API error (Status ${response.status})`;
      return res.status(response.status).json({ error: message });
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!rawText) {
      return res.status(500).json({ error: 'Empty response received from Gemini API.' });
    }

    let parsedData;
    try {
      let jsonString = rawText.trim();
      
      // Look for the first '{' and the last '}' to extract the JSON block cleanly
      const startIdx = jsonString.indexOf('{');
      const endIdx = jsonString.lastIndexOf('}');
      if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
        jsonString = jsonString.substring(startIdx, endIdx + 1);
      } else if (jsonString.startsWith('```')) {
        jsonString = jsonString.replace(/^```json\s*/i, '').replace(/```$/, '').trim();
      }
      
      parsedData = JSON.parse(jsonString);
    } catch {
      return res.status(500).json({ 
        error: 'Failed to parse JSON response from Gemini.', 
        rawResponse: rawText 
      });
    }

    return res.status(200).json(parsedData);
  } catch (error) {
    return res.status(500).json({ error: `Server error: ${error.message}` });
  }
}
