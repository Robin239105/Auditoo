function cleanJsonString(str) {
  let cleaned = str.trim();
  
  // Extract JSON block if wrapped in markdown or other text
  const startIdx = cleaned.indexOf('{');
  const endIdx = cleaned.lastIndexOf('}');
  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    cleaned = cleaned.substring(startIdx, endIdx + 1);
  }

  // Replace raw control characters (like literal newlines, tabs, carriage returns) 
  // inside double quotes with their escaped counterparts
  let insideString = false;
  let result = "";
  for (let i = 0; i < cleaned.length; i++) {
    const char = cleaned[i];
    if (char === '"' && (i === 0 || cleaned[i - 1] !== '\\')) {
      insideString = !insideString;
      result += char;
    } else if (insideString) {
      if (char === '\n') {
        result += '\\n';
      } else if (char === '\r') {
        result += '\\r';
      } else if (char === '\t') {
        result += '\\t';
      } else {
        result += char;
      }
    } else {
      result += char;
    }
  }
  return result;
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

  // List of models to try in order of priority (handles fallbacks)
  const candidateModels = [];
  if (model) {
    candidateModels.push(model);
  } else {
    candidateModels.push('gemini-3.5-flash');
    candidateModels.push('gemini-2.5-flash');
    candidateModels.push('gemma-4-26b-a4b-it');
    candidateModels.push('gemma-4-31b-it');
  }
  
  const prompt = `You are an expert web analyst and senior UI/UX designer.
Analyze the website URL: "${cleanUrl}".

First, determine the likely category, industry, or purpose of the website by evaluating the subdomain, domain name, and path of "${cleanUrl}" (e.g., e-commerce store, personal portfolio, corporate brochure, SaaS application portal, blog, news media, local business/restaurant, login page, dashboard web app, landing page, educational portal, community forum).
Tailor all scores, problems, and redesign suggestions specifically to this website type, subdomain context, and purpose. 

Ensure the following:
1. Vary the scores (design, seo, speed, conversion, mobile, overall) realistically so they do not look identical to previous runs or other websites. Introduce custom variations based on the complexity of the domain name and subdomain category. Also vary all Lighthouse category scores dynamically.
2. For each problem array (designProblems, seoProblems, speedProblems, conversionProblems, mobileIssues, missingCTAs) and the quickWins array, you MUST generate EXACTLY 3 items.
3. For redesignSections, you MUST generate EXACTLY 2 section items.
4. Keep every single item description very short, concise, and direct (under 12 words per item). This is crucial to avoid API latency and output truncation.
5. The problems list must contain specific, contextual issues matching the category. For example:
   - For subdomains like "app.*" or "dashboard.*" or login pages: focus on user flow friction, loading efficiency, form validation, and onboarding clarity.
   - For subdomains like "shop.*" or e-commerce: focus on checkout cart placement, product details layout, filtering, and conversion metrics.
   - For blogs/news: focus on readability, typography, social sharing, and searchability.
   - For portfolios: focus on project showcase quality, contact ease, and resume download visibility.
6. Provide specific Google Lighthouse scores and metrics for the domain (e.g., Performance, Accessibility, Best Practices, and SEO), along with EXACTLY 3 extremely actionable checklist recommendations per category specifying exactly what needs to be done.
7. Write a unique, custom 1-2 sentence overallSummary (maximum 35 words) that specifically references the domain and subdomain name, its industry, and the key issues identified.
8. Do not use generic filler text or identical lists of issues across different websites.

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
  "overallSummary": string,
  "lighthouse": {
    "performance": {
      "score": number, // 0-100
      "metrics": {
        "fcp": string, // e.g., "1.1s"
        "lcp": string, // e.g., "2.4s"
        "cls": string, // e.g., "0.08"
        "tbt": string, // e.g., "120ms"
        "speedIndex": string // e.g., "1.8s"
      },
      "items": [
        {
          "title": string, // e.g. "Eliminate render-blocking resources"
          "impact": "High" | "Medium" | "Low",
          "description": string, // under 12 words description of the issue
          "action": string // what exactly needs to be done to fix it, under 15 words
        }
      ]
    },
    "accessibility": {
      "score": number,
      "items": [
        {
          "title": string,
          "impact": "High" | "Medium" | "Low",
          "description": string,
          "action": string
        }
      ]
    },
    "bestPractices": {
      "score": number,
      "items": [
        {
          "title": string,
          "impact": "High" | "Medium" | "Low",
          "description": string,
          "action": string
        }
      ]
    },
    "seo": {
      "score": number,
      "items": [
        {
          "title": string,
          "impact": "High" | "Medium" | "Low",
          "description": string,
          "action": string
        }
      ]
    }
  }
}

If you don't have specific data for this URL, use reasonable estimates based on typical websites in this industry. Always return plausible, specific, actionable issues - never generic filler.
Return ONLY the JSON. Nothing before it. Nothing after it.`;

  const responseSchema = {
    type: 'object',
    properties: {
      scores: {
        type: 'object',
        properties: {
          design: { type: 'integer' },
          seo: { type: 'integer' },
          speed: { type: 'integer' },
          conversion: { type: 'integer' },
          mobile: { type: 'integer' },
          overall: { type: 'integer' }
        },
        required: ['design', 'seo', 'speed', 'conversion', 'mobile', 'overall']
      },
      designProblems: {
        type: 'array',
        items: { type: 'string' }
      },
      seoProblems: {
        type: 'array',
        items: { type: 'string' }
      },
      speedProblems: {
        type: 'array',
        items: { type: 'string' }
      },
      conversionProblems: {
        type: 'array',
        items: { type: 'string' }
      },
      missingCTAs: {
        type: 'array',
        items: { type: 'string' }
      },
      mobileIssues: {
        type: 'array',
        items: { type: 'string' }
      },
      redesignSections: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            section: { type: 'string' },
            priority: { type: 'string', enum: ['High', 'Medium', 'Low'] },
            reason: { type: 'string' },
            suggestion: { type: 'string' }
          },
          required: ['section', 'priority', 'reason', 'suggestion']
        }
      },
      quickWins: {
        type: 'array',
        items: { type: 'string' }
      },
      overallSummary: { type: 'string' },
      lighthouse: {
        type: 'object',
        properties: {
          performance: {
            type: 'object',
            properties: {
              score: { type: 'integer' },
              metrics: {
                type: 'object',
                properties: {
                  fcp: { type: 'string' },
                  lcp: { type: 'string' },
                  cls: { type: 'string' },
                  tbt: { type: 'string' },
                  speedIndex: { type: 'string' }
                },
                required: ['fcp', 'lcp', 'cls', 'tbt', 'speedIndex']
              },
              items: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    title: { type: 'string' },
                    impact: { type: 'string', enum: ['High', 'Medium', 'Low'] },
                    description: { type: 'string' },
                    action: { type: 'string' }
                  },
                  required: ['title', 'impact', 'description', 'action']
                }
              }
            },
            required: ['score', 'metrics', 'items']
          },
          accessibility: {
            type: 'object',
            properties: {
              score: { type: 'integer' },
              items: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    title: { type: 'string' },
                    impact: { type: 'string', enum: ['High', 'Medium', 'Low'] },
                    description: { type: 'string' },
                    action: { type: 'string' }
                  },
                  required: ['title', 'impact', 'description', 'action']
                }
              }
            },
            required: ['score', 'items']
          },
          bestPractices: {
            type: 'object',
            properties: {
              score: { type: 'integer' },
              items: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    title: { type: 'string' },
                    impact: { type: 'string', enum: ['High', 'Medium', 'Low'] },
                    description: { type: 'string' },
                    action: { type: 'string' }
                  },
                  required: ['title', 'impact', 'description', 'action']
                }
              }
            },
            required: ['score', 'items']
          },
          seo: {
            type: 'object',
            properties: {
              score: { type: 'integer' },
              items: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    title: { type: 'string' },
                    impact: { type: 'string', enum: ['High', 'Medium', 'Low'] },
                    description: { type: 'string' },
                    action: { type: 'string' }
                  },
                  required: ['title', 'impact', 'description', 'action']
                }
              }
            },
            required: ['score', 'items']
          }
        },
        required: ['performance', 'accessibility', 'bestPractices', 'seo']
      }
    },
    required: [
      'scores',
      'designProblems',
      'seoProblems',
      'speedProblems',
      'conversionProblems',
      'missingCTAs',
      'mobileIssues',
      'redesignSections',
      'quickWins',
      'overallSummary',
      'lighthouse'
    ]
  };

  let lastError = null;
  let parsedData = null;

  for (const currentModel of candidateModels) {
    try {
      console.log(`Attempting audit with model: ${currentModel}`);
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${currentModel}:generateContent?key=${apiKey}`, {
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
            responseSchema: responseSchema,
            temperature: 0.7,
            maxOutputTokens: 2048
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const message = errorData.error?.message || `API error (Status ${response.status})`;
        console.warn(`Model ${currentModel} failed (Status ${response.status}): ${message}`);
        lastError = new Error(message);
        continue;
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!rawText) {
        console.warn(`Model ${currentModel} returned an empty response.`);
        lastError = new Error('Empty response from model.');
        continue;
      }

      let cleanedString = "";
      try {
        cleanedString = cleanJsonString(rawText);
        parsedData = JSON.parse(cleanedString);
        console.log(`Successfully completed audit using model: ${currentModel}`);
        break; // Successfully got and parsed data, exit loop!
      } catch (parseError) {
        console.error(`Failed to parse JSON response from model: ${currentModel}`);
        console.error("Raw response:", rawText);
        lastError = parseError;
        continue;
      }
    } catch (err) {
      console.error(`Unexpected error with model ${currentModel}:`, err.message);
      lastError = err;
      continue;
    }
  }

  if (parsedData) {
    return res.status(200).json(parsedData);
  } else {
    const errorMsg = lastError ? lastError.message : 'All models in the fallback chain failed.';
    return res.status(500).json({ error: `Server error: ${errorMsg}` });
  }
}
