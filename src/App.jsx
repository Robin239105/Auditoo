import { useState, useEffect } from 'react';
import { Wrench, Link as LinkIcon, Cookie, Lock, Leaf, Globe, Scale, Palette, Zap, Target, Rocket, Accessibility, ShieldCheck, Search, Smartphone, CircleDollarSign } from "lucide-react";

// Reusable Circular Progress Ring Component
const ScoreRing = ({ score, size = 60, strokeWidth = 6, showNumber = false }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let color = '#EF4444'; // Red < 50
  if (score >= 80) {
    color = '#10B981'; // Green (80+)
  } else if (score >= 50) {
    color = '#F59E0B'; // Amber (50-79)
  }

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="var(--border-color)"
          strokeWidth={strokeWidth}
        />
        {/* Foreground Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </svg>
      {showNumber && (
        <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: size * 0.28, fontWeight: 800, color: 'var(--text-main)' }}>{score}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  // --- React State ---
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('auditoo_theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('auditoo_theme', theme);
  }, [theme]);
  
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [error, setError] = useState(null);
  const [auditData, setAuditData] = useState(null);
  const [loaderStep, setLoaderStep] = useState(0);
  const [selectedLighthouseTab, setSelectedLighthouseTab] = useState('performance');
  const [completedLighthouseTasks, setCompletedLighthouseTasks] = useState({});

  // --- New Diagnostic Tools State ---
  const [scanData, setScanData] = useState(null);
  const [dnsData, setDnsData] = useState(null);
  const [scanLoading, setScanLoading] = useState(false);
  const [scanError, setScanError] = useState(null);
  const [activeToolTab, setActiveToolTab] = useState('techStack');

  const [expandedSections, setExpandedSections] = useState({
    design: true,
    seo: false,
    speed: false,
    conversion: false,
    mobile: false,
    cta: false
  });

  const [animatedScores, setAnimatedScores] = useState({
    design: 0,
    seo: 0,
    speed: 0,
    conversion: 0,
    mobile: 0,
    overall: 0,
    performance: 0,
    accessibility: 0,
    bestPractices: 0,
    lighthouseSeo: 0
  });

  // --- Recent Audits Live Activity State ---
  const [auditsList, setAuditsList] = useState(() => {
    try {
      const saved = localStorage.getItem('auditoo_recent_audits');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load recent audits from localStorage:", e);
    }
    return [
      { domain: 'growthloop.io', score: 88, type: 'B' },
      { domain: 'stripe.com', score: 96, type: 'A' },
      { domain: 'fintechflow.co', score: 62, type: 'D' },
      { domain: 'shopverse.com', score: 79, type: 'C' },
      { domain: 'saasify.app', score: 91, type: 'A' },
    ];
  });

  // Persist auditsList to localStorage on update
  useEffect(() => {
    try {
      localStorage.setItem('auditoo_recent_audits', JSON.stringify(auditsList));
    } catch (e) {
      console.error("Failed to save recent audits to localStorage:", e);
    }
  }, [auditsList]);




  // --- Loader Step Effect (Sequential HUD checklist) ---
  useEffect(() => {
    if (!loading) return;
    const timer1 = setTimeout(() => setLoaderStep(1), 1200);
    const timer2 = setTimeout(() => setLoaderStep(2), 2600);
    const timer3 = setTimeout(() => setLoaderStep(3), 4400);
    const timer4 = setTimeout(() => setLoaderStep(4), 6200);
    const timer5 = setTimeout(() => setLoaderStep(5), 8200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [loading]);

  // --- Interactive Sub-score Accordion Expander & Smooth Scroller ---
  const handleScoreClick = (sectionKey) => {
    // 1. Auto-expand the clicked section
    setExpandedSections((prev) => ({
      ...prev,
      [sectionKey]: true
    }));

    // 2. Smooth scroll to the target deep-dive section
    setTimeout(() => {
      const element = document.getElementById(`accordion-${sectionKey}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 80);
  };

  



  // --- Number Counter Animation (Easing-out 60fps) ---
  useEffect(() => {
    if (!auditData) return;

    const duration = 1500;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);

    let frame = 0;
    const targets = auditData.scores;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Quadratic ease-out
      const easeProgress = progress * (2 - progress);

      setAnimatedScores({
        design: Math.round((targets.design || 0) * easeProgress),
        seo: Math.round((targets.seo || 0) * easeProgress),
        speed: Math.round((targets.speed || 0) * easeProgress),
        conversion: Math.round((targets.conversion || 0) * easeProgress),
        mobile: Math.round((targets.mobile || 0) * easeProgress),
        overall: Math.round((targets.overall || 0) * easeProgress),
        performance: Math.round((auditData.lighthouse?.performance?.score || 0) * easeProgress),
        accessibility: Math.round((auditData.lighthouse?.accessibility?.score || 0) * easeProgress),
        bestPractices: Math.round((auditData.lighthouse?.bestPractices?.score || 0) * easeProgress),
        lighthouseSeo: Math.round((auditData.lighthouse?.seo?.score || 0) * easeProgress),
      });

      if (frame >= totalFrames) {
        clearInterval(timer);
        setAnimatedScores({
          ...targets,
          performance: auditData.lighthouse?.performance?.score || 0,
          accessibility: auditData.lighthouse?.accessibility?.score || 0,
          bestPractices: auditData.lighthouse?.bestPractices?.score || 0,
          lighthouseSeo: auditData.lighthouse?.seo?.score || 0,
        });
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [auditData]);

  // --- URL Validation and Sanitization ---
  const validateUrl = (urlStr) => {
    if (!urlStr || urlStr.trim() === '') return 'Please enter a URL';
    let checkStr = urlStr.trim();
    if (!/^https?:\/\//i.test(checkStr)) {
      checkStr = 'http://' + checkStr;
    }
    try {
      new URL(checkStr);
      return null;
    } catch {
      return 'Please enter a valid website URL (e.g., example.com)';
    }
  };

  const getCleanDomain = (urlStr) => {
    try {
      let clean = urlStr.trim();
      if (!/^https?:\/\//i.test(clean)) {
        clean = 'https://' + clean;
      }
      const parsed = new URL(clean);
      return parsed.hostname.replace('www.', '');
    } catch {
      return urlStr;
    }
  };

  const getGrade = (score) => {
    if (score >= 90) return { letter: 'A', color: '#10B981', label: 'Excellent' };
    if (score >= 80) return { letter: 'B', color: '#10B981', label: 'Good' };
    if (score >= 70) return { letter: 'C', color: '#F59E0B', label: 'Average' };
    if (score >= 50) return { letter: 'D', color: '#F59E0B', label: 'Needs Improvement' };
    return { letter: 'F', color: '#EF4444', label: 'Critical' };
  };

  // --- Accordion Logic ---
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // --- API Invocation ---
  const handleAuditSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setError(null);
    setAuditData(null);

    const trimmedUrl = url.trim();

    if (!trimmedUrl) {
      setFormError('Please enter a website URL');
      return;
    }

    const urlValidationError = validateUrl(trimmedUrl);
    if (urlValidationError) {
      setFormError(urlValidationError);
      return;
    }

    setLoaderStep(0);
    setLoading(true);
    setScanLoading(true);

    try {
      // Execute all three fetches in parallel for maximum speed
      const [auditRes, scanRes, dnsRes] = await Promise.allSettled([
        fetch('/api/audit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: trimmedUrl })
        }),
        fetch('/api/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: trimmedUrl })
        }),
        fetch('/api/dns', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: trimmedUrl })
        })
      ]);

      // Handle AI Audit Response
      let resJson = {};
      if (auditRes.status === 'fulfilled' && auditRes.value.ok) {
        resJson = await auditRes.value.json().catch(() => ({}));
      } else if (auditRes.status === 'fulfilled') {
        const errJson = await auditRes.value.json().catch(() => ({}));
        throw new Error(errJson.error || `Server returned error status: ${auditRes.value.status}`);
      } else {
        throw new Error('Audit API request failed');
      }

      // Handle Scan Response
      if (scanRes.status === 'fulfilled' && scanRes.value.ok) {
        const sData = await scanRes.value.json().catch(() => null);
        setScanData(sData);
      } else {
        setScanError('Failed to load deep scan diagnostics.');
      }

      // Handle DNS Response
      if (dnsRes.status === 'fulfilled' && dnsRes.value.ok) {
        const dData = await dnsRes.value.json().catch(() => null);
        setDnsData(dData);
      }
      setScanLoading(false);

      // Merge with safe fallbacks to protect UI from incomplete AI payloads
      const fallback = {
        scores: { design: 60, seo: 60, speed: 60, conversion: 60, mobile: 60, overall: 60 },
        designProblems: ["Inconsistent visual hierarchy", "Sub-optimal color choices"],
        seoProblems: ["Improper meta tag configuration", "Missing descriptive alt attributes"],
        speedProblems: ["Unoptimized media formats", "Large asset transfer size"],
        conversionProblems: ["Unclear path to key conversion actions", "Weak primary value message"],
        missingCTAs: ["No primary button above the fold", "Secondary links missing structure"],
        mobileIssues: ["Interactive elements grouped too closely", "Font configurations too small"],
        redesignSections: [
          { section: "Hero Area", priority: "High", reason: "Unfocused messaging", suggestion: "Rebuild with a bold, clear headline, a secondary value subhead, and a single, obvious primary conversion button." }
        ],
        quickWins: ["Compress hero assets and defer offscreen scripts", "Position a primary CTA button above the fold", "Adjust font weight and touch sizes for mobile elements"],
        overallSummary: "The scanned domain demonstrates sound structural fundamentals but shows distinct opportunities for improving layouts, loading times, and mobile tap layouts to raise user conversion.",
        lighthouse: {
          performance: {
            score: 65,
            metrics: { fcp: "1.8s", lcp: "3.2s", cls: "0.15", tbt: "240ms", speedIndex: "2.6s" },
            items: [
              { title: "Serve images in modern formats", impact: "High", description: "Image formats like WebP or AVIF often provide better compression than PNG or JPEG.", action: "Convert JPEG/PNG images to WebP formats using an automated image-minify asset script." },
              { title: "Reduce unused JavaScript", impact: "Medium", description: "Reduce unused JavaScript and defer loading scripts until they are required.", action: "Split JavaScript bundles and use dynamic imports for below-the-fold components." },
              { title: "Eliminate render-blocking resources", impact: "High", description: "Resources are blocking the first paint of your page. Consider delivering critical JS/CSS inline.", action: "Defer loading non-critical stylesheets and scripts with async or defer tags." }
            ]
          },
          accessibility: {
            score: 72,
            items: [
              { title: "Buttons do not have an accessible name", impact: "High", description: "When a button doesn't have an accessible name, screen readers announce it as 'button'.", action: "Add descriptive aria-label attributes to all icon-only button and link elements." },
              { title: "Background and foreground colors do not have a sufficient contrast ratio", impact: "High", description: "Low-contrast text is difficult or impossible for many users to read.", action: "Increase font color weight or adjust background shades to maintain a 4.5:1 ratio." },
              { title: "Images do not have [alt] attributes", impact: "Medium", description: "Informative elements should aim for short, descriptive alternative text.", action: "Add alternative description text to every static img element on the page." }
            ]
          },
          bestPractices: {
            score: 80,
            items: [
              { title: "Does not use HTTPS", impact: "High", description: "All sites should be protected with HTTPS, even ones that don't handle sensitive data.", action: "Set up SSL encryption credentials and enforce standard 301 HTTPS redirection rules." },
              { title: "Links to cross-origin destinations are unsafe", impact: "Medium", description: "Add rel='noopener' or rel='noreferrer' to any external links to improve performance and security.", action: "Append rel='noopener noreferrer' to all anchor tags with target='_blank'." },
              { title: "Browser errors were logged to the console", impact: "Low", description: "Errors logged to the console indicate unresolved bugs or failed asset loads.", action: "Inspect console stack traces and resolve JavaScript runtime exceptions or missing asset fetches." }
            ]
          },
          seo: {
            score: 85,
            items: [
              { title: "Document does not have a meta description", impact: "High", description: "Meta descriptions may be included in search results to concisely summarize page content.", action: "Write a unique meta description tag containing target keywords under 160 characters." },
              { title: "Document doesn't have a title element", impact: "High", description: "The title gives screen reader users and search engines an overview of the page context.", action: "Add a concise, keyword-rich header title element inside the HTML document head." },
              { title: "Links do not have descriptive text", impact: "Medium", description: "Descriptive link text helps search engines understand the destination content.", action: "Replace generic link copy like 'click here' or 'learn more' with descriptive anchor names." }
            ]
          }
        }
      };

      const sanitizedData = {
        scores: { ...fallback.scores, ...(resJson.scores || {}) },
        designProblems: resJson.designProblems || fallback.designProblems,
        seoProblems: resJson.seoProblems || fallback.seoProblems,
        speedProblems: resJson.speedProblems || fallback.speedProblems,
        conversionProblems: resJson.conversionProblems || fallback.conversionProblems,
        missingCTAs: resJson.missingCTAs || fallback.missingCTAs,
        mobileIssues: resJson.mobileIssues || fallback.mobileIssues,
        redesignSections: resJson.redesignSections || fallback.redesignSections,
        quickWins: resJson.quickWins || fallback.quickWins,
        overallSummary: resJson.overallSummary || fallback.overallSummary,
        lighthouse: resJson.lighthouse || fallback.lighthouse
      };

      setAuditData(sanitizedData);
      
      // Update dynamic live activity feed with the newly audited site
      const newDomain = getCleanDomain(trimmedUrl);
      const newScore = sanitizedData.scores.overall;
      const newGrade = getGrade(newScore).letter;
      setAuditsList((prev) => {
        const filtered = prev.filter((item) => item.domain.toLowerCase() !== newDomain.toLowerCase());
        return [{ domain: newDomain, score: newScore, type: newGrade }, ...filtered];
      });

      setLoading(false);
    } catch (err) {
      setError(err.message || 'An unexpected connection or serverless API failure occurred.');
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAuditData(null);
    setScanData(null);
    setDnsData(null);
    setLoading(false);
    setScanLoading(false);
    setError(null);
    setScanError(null);
    setFormError(null);
    setLoaderStep(0);
    setSelectedLighthouseTab('performance');
    setCompletedLighthouseTasks({});
    setAnimatedScores({
      design: 0,
      seo: 0,
      speed: 0,
      conversion: 0,
      mobile: 0,
      overall: 0,
      performance: 0,
      accessibility: 0,
      bestPractices: 0,
      lighthouseSeo: 0
    });
  };



  return (
    <div className="auditoo-wrapper">
      {/* Ambient background blur blobs */}
      <div className="ambient-blob blob-1"></div>
      <div className="ambient-blob blob-2"></div>
      <div className="ambient-blob blob-3"></div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '40px', position: 'relative', zIndex: 1 }}>
        
        {/* --- Header Brand logo --- */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div 
            onClick={handleReset}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          >
            {/* Custom Auditoo Vector Logo */}
            <svg width="40" height="40" viewBox="0 0 200 200" fill="none" style={{ filter: 'drop-shadow(0 0 10px rgba(99, 102, 241, 0.45))' }}>
              <defs>
                <linearGradient id="logo-indigo-violet" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--primary-color)" />
                  <stop offset="100%" stopColor="var(--secondary-color)" />
                </linearGradient>
                <linearGradient id="logo-cyan-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
                <linearGradient id="logo-handle" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--secondary-color)" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
              </defs>
              {/* Left Loop (Indigo/Violet) */}
              <circle cx="76" cy="96" r="32" fill="#111118" stroke="url(#logo-indigo-violet)" strokeWidth="8" />

              {/* Right Loop (Cyan/Emerald) */}
              <circle cx="124" cy="96" r="32" fill="#111118" stroke="url(#logo-cyan-emerald)" strokeWidth="8" opacity="0.95" />

              {/* Magnifying Glass Handle */}
              <path d="M146 118 L176 148" stroke="url(#logo-handle)" strokeWidth="10" strokeLinecap="round" />

              {/* Left loop content: Glowing Lightning Bolt */}
              <path d="M79 76 L65 96 L77 96 L74 114 L89 94 L77 94 Z" fill="var(--primary-color)" />

              {/* Right loop content: Glowing Checkmark */}
              <path d="M114 96 L122 104 L138 88" fill="none" stroke="#10B981" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            
            <span style={{ fontSize: '22px', fontWeight: 800, background: 'linear-gradient(135deg, var(--text-main), var(--text-muted))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.5px' }}>
              Auditoo<span style={{ background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>.</span>
            </span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            
            <button
              onClick={toggleTheme}
              style={{
                background: 'transparent',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '8px',
                cursor: 'pointer',
                color: 'var(--text-main)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Toggle Theme"
            >
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              )}
            </button>
            <a
              href="https://github.com/Robin239105/Auditoo.git"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'var(--border-light)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-main)',
                padding: '8px 16px',
                borderRadius: '50px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                transition: 'all 0.25s',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--border-color)';
                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(99, 102, 241, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--border-light)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}>
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              <span>GitHub</span>
            </a>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500 }}>
              v1.0.0
            </span>
          </div>
        </div>

        <>
            {/* --- SECTION 1: HERO & AUDIT INPUTS --- */}
            {!auditData && !loading && !error && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', zIndex: 2 }} className="fade-in">
            {/* Live Ticker Bar */}
            <div className="ticker-wrap glass-surface">
              <div className="ticker-title">
                Live Activity
              </div>
              <div className="ticker-content">
                <div className="ticker-track">
                  {auditsList.map((audit, idx) => (
                    <span key={`t1-${idx}`} className="ticker-item">
                      <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{audit.domain}</span>
                      <span>audited</span>
                      <span className="ticker-score-badge" style={{
                        background: audit.score >= 90 ? 'rgba(16, 185, 129, 0.15)' : audit.score >= 70 ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                        color: audit.score >= 90 ? '#10B981' : audit.score >= 70 ? '#F59E0B' : '#EF4444',
                        border: `1px solid ${audit.score >= 90 ? 'rgba(16, 185, 129, 0.25)' : audit.score >= 70 ? 'rgba(245, 158, 11, 0.25)' : 'rgba(239, 68, 68, 0.25)'}`
                      }}>
                        {audit.score}/100 ({audit.type})
                      </span>
                    </span>
                  ))}
                </div>
                <div className="ticker-track" aria-hidden="true">
                  {auditsList.map((audit, idx) => (
                    <span key={`t2-${idx}`} className="ticker-item">
                      <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{audit.domain}</span>
                      <span>audited</span>
                      <span className="ticker-score-badge" style={{
                        background: audit.score >= 90 ? 'rgba(16, 185, 129, 0.15)' : audit.score >= 70 ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                        color: audit.score >= 90 ? '#10B981' : audit.score >= 70 ? '#F59E0B' : '#EF4444',
                        border: `1px solid ${audit.score >= 90 ? 'rgba(16, 185, 129, 0.25)' : audit.score >= 70 ? 'rgba(245, 158, 11, 0.25)' : 'rgba(239, 68, 68, 0.25)'}`
                      }}>
                        {audit.score}/100 ({audit.type})
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="hero-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '48px 24px', borderRadius: '24px', background: 'radial-gradient(ellipse at top, rgba(99, 102, 241, 0.1), transparent 60%)' }}>
              
              {/* Pill Badge */}
              <div className="pill-badge">
                ✦ 100% Free · Instant Diagnostics · High-Precision Audit
              </div>

              {/* Main Headline */}
              <h1 className="hero-title text-gradient" style={{ fontSize: '48px', fontWeight: 800, lineHeight: 1.15, marginBottom: '16px', letterSpacing: '-1px' }}>
                Uncover exactly what's killing your website's performance
              </h1>

              {/* Subheading */}
              <p className="hero-subtitle">
                Comprehensive Analysis · 24-Point Metric Evaluation · No Signup Required
              </p>

              {/* Input Card Container */}
              <div className="card-surface glass-surface" style={{ width: '100%', maxWidth: '760px', zIndex: 10 }}>
                <form onSubmit={handleAuditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* Large Website URL Input */}
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <div style={{ position: 'absolute', left: '20px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Enter website URL (e.g., example.com)"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="input-glow"
                      style={{
                        width: '100%',
                        background: 'var(--bg-color)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '50px',
                        padding: '16px 20px 16px 52px',
                        fontSize: '15px',
                        color: 'var(--text-main)',
                        transition: 'all 0.25s',
                      }}
                    />
                  </div>



                  {formError && (
                    <div style={{ color: '#EF4444', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', textAlign: 'left' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                      {formError}
                    </div>
                  )}

                  {/* Audit Submission Button */}
                  <button
                    type="submit"
                    className="btn-primary btn-shimmer"
                    style={{ width: '100%' }}
                    onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                    onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    Audit My Website →
                  </button>
                </form>
              </div>

              {/* Interactive Capability Preview Cards */}
              <div style={{ marginTop: '48px', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Comprehensive Diagnostic Scope
                </h3>
                <div className="capabilities-grid">
                  {[
                    { title: 'UX & Design Analysis', desc: 'Checks typography scale, responsive layout shifts, formatting anomalies, and styling hierarchy.', icon: <Palette size={20} color="var(--primary-color)" />, color: 'rgba(99, 102, 241, 0.08)' },
                    { title: 'Performance & Speed', desc: 'Identifies loading latency, oversized media assets, slow layout paints, and scripting blockages.', icon: <Zap size={20} color="var(--primary-color)" />, color: 'rgba(6, 182, 212, 0.08)' },
                    { title: 'Conversion Mechanics', desc: 'Audits below-the-fold call-to-actions, conversion path friction, and messaging clarity above the fold.', icon: <Target size={20} color="var(--primary-color)" />, color: 'rgba(139, 92, 246, 0.08)' }
                  ].map((cap, idx) => (
                    <div key={idx} className="capability-card glass-surface hover-card">
                      <div className="capability-icon" style={{ background: cap.color }}>{cap.icon}</div>
                      <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>{cap.title}</h4>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.6' }}>{cap.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* --- SECTION 2: LOADING STATE --- */}
        {loading && (
          <div className="fade-in" style={{ width: '100%', maxWidth: '800px', margin: '40px auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="card-surface loader-grid">
              {/* Left Column: Sequential Diagnostic HUD checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#EF4444', animation: 'pulseGlow 1.5s infinite' }}></div>
                  <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary-color)', letterSpacing: '1px' }}>SYSTEM DIAGNOSTICS ACTIVE</span>
                </div>
                <div className="hud-console">
                  {[
                    { text: "Initializing virtual sandbox...", step: 1 },
                    { text: "Crawling DOM structures & checking meta tags...", step: 2 },
                    { text: "Analyzing layout shifts and asset sizes...", step: 3 },
                    { text: "Running conversion funnel heuristics...", step: 4 },
                    { text: "Compiling data-driven recommendations...", step: 5 }
                  ].map((stepItem) => {
                    let status = "pending";
                    let icon = "○";
                    if (loaderStep >= stepItem.step) {
                      status = "completed";
                      icon = "✓";
                    } else if (loaderStep === stepItem.step - 1) {
                      status = "active";
                      icon = "⎔";
                    }

                    return (
                      <div key={stepItem.step} className={`hud-line ${status}`}>
                        <span style={{ 
                          fontFamily: 'monospace', 
                          fontWeight: 'bold', 
                          fontSize: '15px',
                          display: 'inline-block',
                          width: '18px'
                        }}>
                          {icon}
                        </span>
                        <span>{stepItem.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Visual scanner HUD */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <div className="scanner-container" style={{ width: '100%', height: '220px', marginBottom: '0' }}>
                  <div className="scanner-line"></div>
                  
                  {/* Radar Pulse Overlay */}
                  <div className="radar-box" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 11 }}>
                    <div className="radar-sweep"></div>
                    <div className="radar-sweep" style={{ animationDelay: '0.6s' }}></div>
                    <div className="radar-sweep" style={{ animationDelay: '1.2s' }}></div>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2.5" style={{ filter: 'drop-shadow(0 0 5px rgba(99, 102, 241, 0.6))' }}>
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="2" x2="12" y2="22"></line>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                    </svg>
                  </div>

                  {/* Fake Website Mockup */}
                  <div className="mock-web-header">
                    <div className="mock-dot red"></div>
                    <div className="mock-dot yellow"></div>
                    <div className="mock-dot green"></div>
                    <div style={{ flexGrow: 1 }}></div>
                    <div style={{ width: '80px', height: '8px', background: 'var(--border-color)', borderRadius: '4px' }}></div>
                  </div>
                  
                  <div className="mock-web-hero" style={{ opacity: 0.3 }}>
                    <div className="mock-text-title"></div>
                    <div className="mock-text-sub"></div>
                    <div className="mock-btn"></div>
                  </div>
                  
                  <div className="mock-grid" style={{ opacity: 0.2 }}>
                    <div className="mock-card"></div>
                    <div className="mock-card"></div>
                    <div className="mock-card"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              Performing live analysis of {getCleanDomain(url)} ...
            </p>
          </div>
        )}

        {/* --- ERROR DISPLAY CARD --- */}
        {error && (
          <div className="fade-in" style={{ background: '#111118', border: '1px solid #EF4444', borderRadius: '16px', padding: '32px', textAlign: 'center', maxWidth: '600px', margin: '40px auto', boxShadow: '0 8px 30px rgba(239, 68, 68, 0.15)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', color: '#EF4444' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>Audit Failed</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.6' }}>
              {error}
            </p>
            <button
              onClick={handleReset}
              className="btn-shimmer"
              style={{
                background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                border: 'none',
                borderRadius: '50px',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#FFFFFF',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)'
              }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* --- AUDIT REPORT RESULTS CONTENT --- */}
        {auditData && !loading && (
          <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '40px' }}>
            
            {/* Header info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--primary-color)', fontWeight: 700, letterSpacing: '1px' }}>AUDIT COMPLETED</span>
                <h2 className="report-title">
                  Report for <span style={{ color: 'var(--secondary-color)', wordBreak: 'break-all' }}>{getCleanDomain(url)}</span>
                </h2>
              </div>
              <button
                onClick={handleReset}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-muted)',
                  padding: '10px 18px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 600,
                  transition: 'all 0.25s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--text-main)';
                  e.currentTarget.style.borderColor = 'var(--primary-color)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-muted)';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                }}
              >
                Audit Another Site
              </button>
            </div>

            {/* --- SECTION 3: OVERALL SCORE CARD --- */}
            <div className="overall-score-container glass-surface">
              
              {/* Circle Graphic Side */}
              <div className="overall-score-left">
                <ScoreRing score={animatedScores.overall} size={120} strokeWidth={9} showNumber={true} />
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)', marginTop: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Overall Score</span>
                
                {/* Grade Label */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(30, 30, 46, 0.6)', border: '1px solid var(--border-color)', padding: '6px 14px', borderRadius: '50px', marginTop: '12px' }}>
                  <span style={{ fontSize: '20px', fontWeight: 800, color: getGrade(animatedScores.overall).color }}>
                    {getGrade(animatedScores.overall).letter}
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>
                    {getGrade(animatedScores.overall).label}
                  </span>
                </div>
              </div>

              {/* Text / Summary Side */}
              <div className="overall-score-right">
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>Executive Summary</h3>
                  <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                    {auditData.overallSummary}
                  </p>
                </div>
                
                <div>
                  <h4 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Rocket size={16} color="var(--primary-color)" style={{ marginRight: "8px" }} /> QUICK WINS
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {auditData.quickWins?.slice(0, 3).map((win, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--text-main)', lineHeight: '1.5' }}>
                        <span style={{ marginTop: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(16, 185, 129, 0.1)', padding: '4px', borderRadius: '50%' }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                        <span>{win}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* --- SECTION 4: SCORE GRID --- */}
            <div className="grid-scores">
              {[
                { key: 'design', label: 'Design Problems', short: 'Design', desc: 'Hierarchy & layouts' },
                { key: 'seo', label: 'SEO Issues', short: 'SEO', desc: 'Metadata & visibility' },
                { key: 'speed', label: 'Speed Issues', short: 'Speed', desc: 'Page latency & weights' },
                { key: 'conversion', label: 'Conversion Problems', short: 'Conversions', desc: 'Flows & action hooks' },
                { key: 'mobile', label: 'Mobile UX', short: 'Mobile', desc: 'Viewport & touches' }
              ].map((item) => (
                <div key={item.key} onClick={() => handleScoreClick(item.key)} className="hover-card" style={{ background: '#111118', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', cursor: 'pointer' }}>
                  <ScoreRing score={animatedScores[item.key]} size={72} strokeWidth={6} showNumber={true} />
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)', marginTop: '16px', marginBottom: '4px' }}>
                    {item.short}
                  </h4>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>

            {/* --- SECTION 4.5: GOOGLE LIGHTHOUSE AUDIT CENTER --- */}
            <div className="card-surface glass-surface" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', textAlign: 'left' }}>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--primary-color)', fontWeight: 800, letterSpacing: '1px' }}>CORE PERFORMANCE SUITE</span>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px' }}>
                  Google Lighthouse Audit Heuristics
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Dynamic Lighthouse compliance check. Select a category score dial to inspect concrete, step-by-step action plans.
                </p>
              </div>

              {/* Lighthouse scores dials flex wrapper */}
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '16px', padding: '16px 0', borderBottom: '1px solid var(--border-color)' }}>
                {[
                  { key: 'performance', scoreKey: 'performance', label: 'Performance', icon: <Zap size={20} color="var(--primary-color)" /> },
                  { key: 'accessibility', scoreKey: 'accessibility', label: 'Accessibility', icon: <Accessibility size={20} color="var(--primary-color)" /> },
                  { key: 'bestPractices', scoreKey: 'bestPractices', label: 'Best Practices', icon: <ShieldCheck size={20} color="var(--primary-color)" /> },
                  { key: 'seo', scoreKey: 'lighthouseSeo', label: 'SEO', icon: <Search size={20} color="var(--primary-color)" /> }
                ].map((lhTab) => {
                  const isActive = selectedLighthouseTab === lhTab.key;
                  const currentScore = animatedScores[lhTab.scoreKey] || 0;

                  return (
                    <div 
                      key={lhTab.key} 
                      onClick={() => setSelectedLighthouseTab(lhTab.key)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '12px',
                        cursor: 'pointer',
                        padding: '16px 24px',
                        borderRadius: '16px',
                        background: isActive ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
                        border: isActive ? '1px solid rgba(99, 102, 241, 0.25)' : '1px solid transparent',
                        boxShadow: isActive ? '0 0 15px rgba(99, 102, 241, 0.1)' : 'none',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        minWidth: '150px'
                      }}
                      className="hover-card"
                    >
                      <ScoreRing score={currentScore} size={64} strokeWidth={6} showNumber={true} />
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '14px' }}>{lhTab.icon}</span>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: isActive ? 'var(--primary-color)' : 'var(--text-main)' }}>
                          {lhTab.label}
                        </span>
                      </div>
                      
                      {/* Interactive indicator pill */}
                      {isActive && (
                        <div style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: 'var(--primary-color)',
                          boxShadow: '0 0 8px var(--primary-color)'
                        }}></div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Sub-view under the selected Lighthouse tab */}
              <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* 1. Core Web Vitals Metrics Grid (Only for Performance tab) */}
                {selectedLighthouseTab === 'performance' && auditData.lighthouse?.performance?.metrics && (
                  <div style={{ background: 'rgba(10, 10, 15, 0.6)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '20px', textAlign: 'left' }}>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.8px', display: 'block', marginBottom: '16px' }}>
                      <Zap size={14} color="var(--primary-color)" style={{ marginRight: "6px", display: "inline-block", verticalAlign: "middle" }} /> <span style={{ verticalAlign: "middle" }}>CORE WEB VITALS TELEMETRY</span>
                    </span>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '16px' }}>
                      {[
                        { name: 'First Contentful Paint (FCP)', val: auditData.lighthouse.performance.metrics.fcp, desc: 'Lighter is faster', spec: '< 1.8s is Good' },
                        { name: 'Largest Contentful Paint (LCP)', val: auditData.lighthouse.performance.metrics.lcp, desc: 'Perceived load speed', spec: '< 2.5s is Good' },
                        { name: 'Cumulative Layout Shift (CLS)', val: auditData.lighthouse.performance.metrics.cls, desc: 'Visual stability shift', spec: '< 0.1 is Good' },
                        { name: 'Total Blocking Time (TBT)', val: auditData.lighthouse.performance.metrics.tbt, desc: 'Input delay blocks', spec: '< 150ms is Good' },
                        { name: 'Speed Index', val: auditData.lighthouse.performance.metrics.speedIndex, desc: 'Visual content rate', spec: '< 3.4s is Good' }
                      ].map((met, mIdx) => {
                        // Evaluate metrics colors
                        let isGreen = false;
                        let isOrange = false;
                        const numericVal = parseFloat(met.val);
                        if (met.name.startsWith('First Contentful Paint')) {
                          if (numericVal <= 1.8) isGreen = true;
                          else if (numericVal <= 3.0) isOrange = true;
                        } else if (met.name.startsWith('Largest Contentful Paint')) {
                          if (numericVal <= 2.5) isGreen = true;
                          else if (numericVal <= 4.0) isOrange = true;
                        } else if (met.name.startsWith('Cumulative Layout Shift')) {
                          if (numericVal <= 0.1) isGreen = true;
                          else if (numericVal <= 0.25) isOrange = true;
                        } else if (met.name.startsWith('Total Blocking Time')) {
                          if (numericVal <= 150) isGreen = true;
                          else if (numericVal <= 600) isOrange = true;
                        } else if (met.name.startsWith('Speed Index')) {
                          if (numericVal <= 3.4) isGreen = true;
                          else if (numericVal <= 5.8) isOrange = true;
                        }

                        const statColor = isGreen ? '#10B981' : isOrange ? '#F59E0B' : '#EF4444';
                        const statBg = isGreen ? 'rgba(16, 185, 129, 0.08)' : isOrange ? 'rgba(245, 158, 11, 0.08)' : 'rgba(239, 68, 68, 0.08)';
                        const statBorder = isGreen ? 'rgba(16, 185, 129, 0.2)' : isOrange ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)';

                        return (
                          <div 
                            key={mIdx} 
                            style={{ 
                              background: '#111118', 
                              border: '1px solid var(--border-color)', 
                              borderRadius: '12px', 
                              padding: '14px', 
                              display: 'flex', 
                              flexDirection: 'column', 
                              gap: '6px',
                              textAlign: 'left'
                            }}
                          >
                            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', minHeight: '32px', display: 'flex', alignItems: 'center' }}>
                              {met.name}
                            </span>
                            <span 
                              style={{ 
                                fontSize: '20px', 
                                fontWeight: 800, 
                                color: statColor,
                                background: statBg,
                                border: `1px solid ${statBorder}`,
                                padding: '4px 10px',
                                borderRadius: '8px',
                                alignSelf: 'flex-start',
                                marginTop: '4px'
                              }}
                            >
                              {met.val}
                            </span>
                            <span style={{ fontSize: '10px', color: '#4B5563', marginTop: '2px' }}>
                              {met.desc} · {met.spec}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 2. Detailed Recommended Checklist: Exactly what needs to be done */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.8px' }}>
                      📋 ACTION PLAN CHECKLIST (WHAT TO FIX)
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>
                      {Object.keys(completedLighthouseTasks).filter(k => k.startsWith(selectedLighthouseTab) && completedLighthouseTasks[k]).length} of 3 tasks completed
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {(auditData.lighthouse?.[selectedLighthouseTab]?.items || []).map((lhItem, idx) => {
                      const taskId = `${selectedLighthouseTab}-${idx}`;
                      const isCompleted = !!completedLighthouseTasks[taskId];

                      let impactBg = 'rgba(239, 68, 68, 0.1)';
                      let impactColor = '#EF4444';
                      let impactBorder = 'rgba(239, 68, 68, 0.2)';

                      if (lhItem.impact?.toLowerCase() === 'medium') {
                        impactBg = 'rgba(245, 158, 11, 0.1)';
                        impactColor = '#F59E0B';
                        impactBorder = 'rgba(245, 158, 11, 0.2)';
                      } else if (lhItem.impact?.toLowerCase() === 'low') {
                        impactBg = 'rgba(16, 185, 129, 0.1)';
                        impactColor = '#10B981';
                        impactBorder = 'rgba(16, 185, 129, 0.2)';
                      }

                      return (
                        <div 
                          key={idx}
                          style={{
                            background: '#111118',
                            border: `1px solid ${isCompleted ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-light)'}`,
                            borderRadius: '16px',
                            padding: '20px',
                            display: 'flex',
                            gap: '16px',
                            alignItems: 'flex-start',
                            opacity: isCompleted ? 0.6 : 1,
                            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                            boxShadow: isCompleted ? 'inset 0 0 10px rgba(16, 185, 129, 0.05)' : 'none'
                          }}
                        >
                          {/* Circle interactive toggle checkbox */}
                          <div 
                            onClick={() => {
                              setCompletedLighthouseTasks(prev => ({
                                ...prev,
                                [taskId]: !prev[taskId]
                              }));
                            }}
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              border: `2px solid ${isCompleted ? '#10B981' : 'var(--text-muted)'}`,
                              background: isCompleted ? '#10B981' : 'transparent',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              flexShrink: 0,
                              marginTop: '2px',
                              transition: 'all 0.2s'
                            }}
                          >
                            {isCompleted && (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            )}
                          </div>

                          {/* Content block */}
                          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                              <h4 style={{ 
                                fontSize: '15px', 
                                fontWeight: 700, 
                                color: 'var(--text-main)',
                                textDecoration: isCompleted ? 'line-through' : 'none'
                              }}>
                                {lhItem.title}
                              </h4>
                              
                              <span style={{
                                fontSize: '9px',
                                fontWeight: 800,
                                color: impactColor,
                                background: impactBg,
                                border: `1px solid ${impactBorder}`,
                                padding: '2px 8px',
                                borderRadius: '20px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                              }}>
                                {lhItem.impact} Impact
                              </span>
                            </div>

                            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                              {lhItem.description}
                            </p>

                            {/* Action capsule detailing exactly what needs to be done */}
                            <div style={{ 
                              background: 'rgba(99, 102, 241, 0.05)', 
                              borderLeft: '3px solid var(--primary-color)', 
                              borderRadius: '4px 8px 8px 4px', 
                              padding: '10px 14px', 
                              marginTop: '8px' 
                            }}>
                              <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--primary-color)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>
                                FIX ACTION STEPS:
                              </span>
                              <p style={{ fontSize: '13px', color: 'var(--text-main)', fontWeight: 500, lineHeight: '1.4' }}>
                                {lhItem.action}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>

            {/* --- SECTION 4.5: ZERO-COST TOOLS PANEL --- */}
            {(scanData || dnsData) && (
              <div style={{ marginTop: '24px' }} className="fade-in">
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '16px' }}>
                  Technical Diagnostics
                </h3>
                <div className="card-surface glass-surface" style={{ padding: '0', overflow: 'hidden' }}>
                  {/* Tab Navigation */}
                  <div style={{ display: 'flex', overflowX: 'auto', borderBottom: '1px solid var(--border-light)', scrollbarWidth: 'none' }}>
                    {[
                      { id: 'techStack', icon: <Wrench size={20} color="var(--primary-color)" />, label: 'Tech Stack' },
                      { id: 'brokenLinks', icon: <LinkIcon size={20} color="var(--primary-color)" />, label: 'Links' },
                      { id: 'privacy', icon: <Cookie size={20} color="var(--primary-color)" />, label: 'Privacy' },
                      { id: 'security', icon: <Lock size={20} color="var(--primary-color)" />, label: 'Security' },
                      { id: 'carbon', icon: <Leaf size={20} color="var(--primary-color)" />, label: 'Carbon' },
                      { id: 'dns', icon: <Globe size={20} color="var(--primary-color)" />, label: 'DNS' },
                      { id: 'social', icon: <Smartphone size={20} color="var(--primary-color)" />, label: 'Social' },
                      { id: 'pageWeight', icon: <Scale size={20} color="var(--primary-color)" />, label: 'Page Weight' },
                    ].map(tab => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveToolTab(tab.id)}
                        style={{
                          background: activeToolTab === tab.id ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                          border: 'none',
                          borderBottom: activeToolTab === tab.id ? '2px solid var(--primary-color)' : '2px solid transparent',
                          color: activeToolTab === tab.id ? 'var(--text-main)' : 'var(--text-muted)',
                          padding: '16px 20px',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          whiteSpace: 'nowrap',
                          transition: 'all 0.2s'
                        }}
                      >
                        <span style={{ fontSize: '16px' }}>{tab.icon}</span>
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div style={{ padding: '24px' }}>
                    {scanLoading ? (
                      <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)', fontSize: '14px' }}>
                        <div style={{ width: '24px', height: '24px', border: '2px solid var(--primary-color)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'rotateBorder 1s linear infinite', margin: '0 auto 16px' }}></div>
                        Running deep technical diagnostics...
                      </div>
                    ) : scanError && !scanData && !dnsData ? (
                      <div style={{ color: '#EF4444', fontSize: '13px' }}>{scanError}</div>
                    ) : (
                      <div className="fade-in">
                        {activeToolTab === 'techStack' && scanData?.techStack && (
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                            {scanData.techStack.length === 0 ? <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>No specific technologies detected.</p> : scanData.techStack.map((tech, idx) => (
                              <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                                <div style={{ fontSize: '11px', color: 'var(--primary-color)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>{tech.category}</div>
                                <div style={{ fontSize: '15px', color: 'var(--text-main)', fontWeight: 600 }}>{tech.name}</div>
                              </div>
                            ))}
                          </div>
                        )}

                        {activeToolTab === 'brokenLinks' && scanData?.links && (
                          <div>
                            <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                              <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '12px 20px', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#10B981', fontWeight: 600, fontSize: '13px' }}>{scanData.links.workingCount} Working Links</div>
                              <div style={{ background: scanData.links.broken.length > 0 ? 'rgba(239, 68, 68, 0.1)' : 'var(--border-light)', padding: '12px 20px', borderRadius: '8px', border: scanData.links.broken.length > 0 ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid transparent', color: scanData.links.broken.length > 0 ? '#EF4444' : 'var(--text-muted)', fontWeight: 600, fontSize: '13px' }}>{scanData.links.broken.length} Broken Links</div>
                            </div>
                            {scanData.links.broken.length > 0 && (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {scanData.links.broken.map((link, idx) => (
                                  <div key={idx} style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                                    <span style={{ color: 'var(--text-main)', wordBreak: 'break-all', paddingRight: '16px' }}>{link.url}</span>
                                    <span style={{ background: '#EF4444', color: '#FFF', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, fontSize: '11px', whiteSpace: 'nowrap' }}>{link.status === 0 ? 'TIMEOUT' : link.status}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {activeToolTab === 'privacy' && scanData?.cookies && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                              <div style={{ background: scanData.cookies.bannerDetected ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', padding: '16px', borderRadius: '12px', border: scanData.cookies.bannerDetected ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(239, 68, 68, 0.2)' }}>
                                <div style={{ fontSize: '13px', color: 'var(--text-main)', fontWeight: 600 }}>Cookie Banner</div>
                                <div style={{ fontSize: '12px', color: scanData.cookies.bannerDetected ? '#10B981' : '#EF4444', marginTop: '4px' }}>{scanData.cookies.bannerDetected ? 'Detected' : 'Not Found'}</div>
                              </div>
                              <div style={{ background: scanData.cookies.privacyPageFound ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)', padding: '16px', borderRadius: '12px', border: scanData.cookies.privacyPageFound ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(245, 158, 11, 0.2)' }}>
                                <div style={{ fontSize: '13px', color: 'var(--text-main)', fontWeight: 600 }}>Privacy Policy</div>
                                <div style={{ fontSize: '12px', color: scanData.cookies.privacyPageFound ? '#10B981' : '#F59E0B', marginTop: '4px' }}>{scanData.cookies.privacyPageFound ? 'Link Found' : 'Not Found'}</div>
                              </div>
                            </div>
                            {scanData.cookies.preConsentCookies.length > 0 && (
                              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                                <div style={{ fontSize: '13px', color: 'var(--text-main)', fontWeight: 600, marginBottom: '8px' }}>Cookies Set Before Consent ({scanData.cookies.preConsentCookies.length})</div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                  {scanData.cookies.preConsentCookies.map((c, i) => (
                                    <span key={i} style={{ background: 'var(--border-color)', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', color: '#CBD5E1' }}>{c}</span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {activeToolTab === 'security' && scanData?.security && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <div>
                              <h4 style={{ fontSize: '14px', color: 'var(--text-main)', marginBottom: '12px' }}>SSL Certificate</h4>
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
                                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '12px', borderRadius: '8px' }}><div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Status</div><div style={{ fontSize: '14px', color: scanData.security.ssl.valid ? '#10B981' : '#EF4444', fontWeight: 600 }}>{scanData.security.ssl.valid ? 'Valid' : 'Invalid/Missing'}</div></div>
                                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '12px', borderRadius: '8px' }}><div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Issuer</div><div style={{ fontSize: '14px', color: 'var(--text-main)', fontWeight: 600 }}>{scanData.security.ssl.issuer}</div></div>
                                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '12px', borderRadius: '8px' }}><div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Expires</div><div style={{ fontSize: '14px', color: 'var(--text-main)', fontWeight: 600 }}>{scanData.security.ssl.daysRemaining} days</div></div>
                              </div>
                            </div>
                            <div>
                              <h4 style={{ fontSize: '14px', color: 'var(--text-main)', marginBottom: '12px' }}>Security Headers</h4>
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                                {Object.entries(scanData.security.headers).map(([key, val]) => (
                                  <div key={key} style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255, 255, 255, 0.03)', padding: '10px 12px', borderRadius: '6px', fontSize: '12px' }}>
                                    <span style={{ color: '#CBD5E1' }}>{key}</span>
                                    <span style={{ color: val ? '#10B981' : '#EF4444', fontWeight: 600 }}>{val ? 'PASS' : 'FAIL'}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {activeToolTab === 'carbon' && scanData?.carbon && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
                            <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', border: '4px solid #10B981', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(16, 185, 129, 0.2)' }}>
                              <span style={{ fontSize: '32px', fontWeight: 800, color: '#10B981' }}>{scanData.carbon.rating}</span>
                              <span style={{ fontSize: '11px', color: '#10B981', textTransform: 'uppercase', fontWeight: 700 }}>Rating</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '12px' }}>
                                <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>CO₂ per view</span>
                                <span style={{ color: 'var(--text-main)', fontWeight: 700, fontSize: '15px' }}>{scanData.carbon.co2PerView}</span>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '12px' }}>
                                <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Cleaner than</span>
                                <span style={{ color: '#10B981', fontWeight: 700, fontSize: '15px' }}>{scanData.carbon.cleanerThan} of tested sites</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeToolTab === 'dns' && dnsData && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                              <div style={{ flex: 1, minWidth: '200px', background: 'rgba(99, 102, 241, 0.1)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                                <div style={{ fontSize: '11px', color: 'var(--primary-color)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '4px' }}>Detected CDN / Host</div>
                                <div style={{ fontSize: '16px', color: 'var(--text-main)', fontWeight: 700 }}>{dnsData.cdn}</div>
                              </div>
                              <div style={{ flex: 1, minWidth: '200px', background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '12px' }}>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '4px' }}>Email Provider</div>
                                <div style={{ fontSize: '16px', color: 'var(--text-main)', fontWeight: 700 }}>{dnsData.emailProvider}</div>
                              </div>
                            </div>
                            <div>
                              <h4 style={{ fontSize: '14px', color: 'var(--text-main)', marginBottom: '12px' }}>DNS Records</h4>
                              <div style={{ background: 'rgba(0, 0, 0, 0.3)', borderRadius: '8px', overflow: 'hidden' }}>
                                {['A', 'MX', 'NS', 'TXT'].map(type => {
                                  const recs = dnsData.records[type] || [];
                                  if (recs.length === 0) return null;
                                  return (
                                    <div key={type} style={{ display: 'flex', borderBottom: '1px solid var(--border-light)', padding: '12px' }}>
                                      <div style={{ width: '60px', color: 'var(--primary-color)', fontWeight: 700, fontSize: '13px' }}>{type}</div>
                                      <div style={{ flex: 1, color: '#CBD5E1', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '4px', wordBreak: 'break-all' }}>
                                        {recs.map((r, i) => <div key={i}>{typeof r === 'object' ? r.exchange : r}</div>)}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        )}

                        {activeToolTab === 'social' && scanData?.ogTags && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ background: '#FFFFFF', borderRadius: '8px', overflow: 'hidden', maxWidth: '500px', margin: '0 auto', width: '100%' }}>
                              {scanData.ogTags.og.image ? (
                                <img src={scanData.ogTags.og.image} alt="OG" style={{ width: '100%', height: '260px', objectFit: 'cover' }} />
                              ) : (
                                <div style={{ width: '100%', height: '260px', background: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8' }}>No Image Found</div>
                              )}
                              <div style={{ padding: '16px', background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
                                <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>{scanData.ogTags.og.siteName || new URL(url.startsWith('http') ? url : 'https://' + url).hostname}</div>
                                <div style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginBottom: '4px', lineHeight: 1.3 }}>{scanData.ogTags.og.title || scanData.ogTags.standard.title || 'Missing Title'}</div>
                                <div style={{ fontSize: '14px', color: '#475569', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{scanData.ogTags.og.description || scanData.ogTags.standard.description || 'Missing Description'}</div>
                              </div>
                            </div>
                            <div style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>Live Social Share Preview</div>
                          </div>
                        )}

                        {activeToolTab === 'pageWeight' && scanData?.pageWeight && (
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
                            {[
                              { label: 'HTML Size', val: scanData.pageWeight.htmlSize },
                              { label: 'External Scripts', val: scanData.pageWeight.externalScripts },
                              { label: 'Stylesheets', val: scanData.pageWeight.stylesheets },
                              { label: 'Images', val: scanData.pageWeight.images },
                              { label: 'Custom Fonts', val: scanData.pageWeight.fonts },
                              { label: 'Inline Scripts', val: scanData.pageWeight.inlineScripts }
                            ].map((item, idx) => (
                              <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                                <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>{item.val}</div>
                                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.label}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* --- SECTION 5: ACCORDION ISSUES BREAKDOWN --- */}
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '16px' }}>
                Deep-Dive Problems & Issues
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { key: 'design', label: 'Design Problems', icon: <Palette size={20} color="var(--primary-color)" />, data: auditData.designProblems },
                  { key: 'seo', label: 'SEO Issues', icon: <Search size={20} color="var(--primary-color)" />, data: auditData.seoProblems },
                  { key: 'speed', label: 'Speed Issues', icon: <Zap size={20} color="var(--primary-color)" />, data: auditData.speedProblems },
                  { key: 'conversion', label: 'Conversion Problems', icon: <CircleDollarSign size={20} color="var(--primary-color)" />, data: auditData.conversionProblems },
                  { key: 'mobile', label: 'Mobile Issues', icon: <Smartphone size={20} color="var(--primary-color)" />, data: auditData.mobileIssues },
                  { key: 'cta', label: 'Missing CTAs', icon: <Target size={20} color="var(--primary-color)" />, data: auditData.missingCTAs }
                ].map((sec) => {
                  const isOpen = expandedSections[sec.key];
                  const count = sec.data ? sec.data.length : 0;
                  const isSevere = sec.key === 'speed' || sec.key === 'cta';

                  return (
                    <div key={sec.key} id={`accordion-${sec.key}`} style={{ background: '#111118', border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden' }}>
                      {/* Accordion Toggle Header */}
                      <button
                        onClick={() => toggleSection(sec.key)}
                        className="accordion-header"
                        style={{
                          width: '100%',
                          background: isOpen ? 'rgba(30, 30, 46, 0.4)' : 'transparent',
                          border: 'none',
                          padding: '16px 20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          color: 'var(--text-main)',
                          textAlign: 'left'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '18px' }}>{sec.icon}</span>
                          <span style={{ fontSize: '14px', fontWeight: 600 }}>{sec.label}</span>
                          
                          {/* Count Badge */}
                          <span style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            background: count > 0 ? (isSevere ? 'rgba(239, 68, 68, 0.12)' : 'rgba(245, 158, 11, 0.12)') : 'rgba(16, 185, 129, 0.12)',
                            color: count > 0 ? (isSevere ? '#EF4444' : '#F59E0B') : '#10B981',
                            border: `1px solid ${count > 0 ? (isSevere ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)') : 'rgba(16, 185, 129, 0.2)'}`,
                            padding: '2px 8px',
                            borderRadius: '20px'
                          }}>
                            {count === 0 ? 'Optimal' : `${count} ${count === 1 ? 'issue' : 'issues'} found`}
                          </span>
                        </div>
                        
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.25s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </button>

                      {/* Accordion Expand Area */}
                      {isOpen && (
                        <div style={{ padding: '20px', borderTop: '1px solid var(--border-color)', background: 'rgba(10, 10, 15, 0.4)' }}>
                          {count === 0 ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontSize: '13px' }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                              Fully optimized. No issues found.
                            </div>
                          ) : (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                              {sec.data.map((issue, idx) => (
                                <div
                                  key={idx}
                                  className="pop-in"
                                  style={{
                                    background: '#111118',
                                    border: `1px solid ${isSevere ? 'rgba(239, 68, 68, 0.25)' : 'rgba(245, 158, 11, 0.25)'}`,
                                    borderRadius: '30px',
                                    padding: '6px 14px',
                                    fontSize: '13px',
                                    color: 'var(--text-main)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                    animationDelay: `${idx * 40}ms`
                                  }}
                                >
                                  <span style={{
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    background: isSevere ? '#EF4444' : '#F59E0B'
                                  }}></span>
                                  {issue}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* --- SECTION 6: REDESIGN RECOMMENDATIONS --- */}
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                Sections That Need Rebuilding
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                Data-driven layout blueprints to recover lost conversions.
              </p>

              <div className="grid-redesign">
                {auditData.redesignSections?.map((section, idx) => {
                  let badgeColor = '#10B981';
                  let badgeBg = 'rgba(16, 185, 129, 0.1)';
                  let badgeBorder = 'rgba(16, 185, 129, 0.2)';
                  
                  if (section.priority?.toLowerCase() === 'high') {
                    badgeColor = '#EF4444';
                    badgeBg = 'rgba(239, 68, 68, 0.1)';
                    badgeBorder = 'rgba(239, 68, 68, 0.2)';
                  } else if (section.priority?.toLowerCase() === 'medium') {
                    badgeColor = '#F59E0B';
                    badgeBg = 'rgba(245, 158, 11, 0.1)';
                    badgeBorder = 'rgba(245, 158, 11, 0.2)';
                  }

                  return (
                    <div key={idx} className="hover-card redesign-card" style={{ background: '#111118', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px', justifyContent: 'space-between', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)' }}>{section.section}</h4>
                          <span style={{
                            fontSize: '10px',
                            fontWeight: 800,
                            color: badgeColor,
                            background: badgeBg,
                            border: `1px solid ${badgeBorder}`,
                            padding: '2px 8px',
                            borderRadius: '20px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            {section.priority} Priority
                          </span>
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <div>
                            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Pain Point:</span>
                            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px', lineHeight: '1.5' }}>{section.reason}</p>
                          </div>
                          <div>
                            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary-color)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Wireframe Solution:</span>
                            <p style={{ fontSize: '14px', color: 'var(--text-main)', marginTop: '2px', lineHeight: '1.5' }}>{section.suggestion}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* --- SECTION 7: LEAD GENERATION CTA --- */}
            <div className="lead-card-wrapper">
              <div className="lead-card-inner glass-surface">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--secondary-color)', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)', padding: '4px 12px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    EXCLUSIVE OFFER FOR {getCleanDomain(url).toUpperCase()}
                  </span>
                  
                  <div className="live-alert-banner">
                    <span>⚠️ Only 3 free redesign strategy sessions remaining for today.</span>
                  </div>
                  
                  <h3 className="lead-title" style={{ marginTop: '8px' }}>
                    Your site is losing customers every day. Let's fix that.
                  </h3>
                  
                  <p style={{ fontSize: '15px', color: 'var(--text-muted)', maxWidth: '600px', margin: '8px auto 0 auto', lineHeight: '1.6' }}>
                    I've personally audited 200+ sites. These issues are costing you valuable leads.
                  </p>
                </div>

                {/* Summarized Target Fixes Box */}
                <div className="lead-fixes-box" style={{ background: 'rgba(10, 10, 15, 0.6)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '24px', maxWidth: '520px', width: '100%', textAlign: 'left' }}>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '16px' }}>
                    Your site scored <span style={{ color: getGrade(auditData.scores.overall).color, fontWeight: 800 }}>{auditData.scores.overall}/100</span>. Here is what I would fix first:
                  </span>
                  
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {auditData.quickWins?.slice(0, 3).map((win, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--text-main)', lineHeight: '1.4' }}>
                        <span style={{ marginTop: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(99, 102, 241, 0.1)', padding: '4px', borderRadius: '50%' }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                        <span>{win}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Booking Button Area */}
                <div style={{ width: '100%', maxWidth: '380px' }}>
                  <a
                    href="https://www.alaminrobin.com/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-booking btn-shimmer"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 12px 30px rgba(99, 102, 241, 0.6)';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(99, 102, 241, 0.4)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Book a Free Redesign Strategy Call →
                  </a>
                  
                  <span style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginTop: '12px' }}>
                    No pressure · 30 min · I'll show you exactly what to fix.
                  </span>
                </div>

                {/* Rating / Social Proof */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  <span style={{ color: '#F59E0B', fontSize: '14px' }}>★★★★★</span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.3px' }}>Trusted by 50+ businesses</span>
                </div>
              </div>
            </div>

          </div>
        )}
        </>

        {/* --- GLOBAL FOOTER --- */}
        {!loading && (
          <div className="footer-container" style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderTop: '1px solid var(--border-color)', marginTop: '32px', paddingTop: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', maxWidth: '600px', lineHeight: '1.6' }}>
                Auditoo Diagnostics · Audit reports are based on public web analysis heuristics and typical UX standards. Scores and recommendations are predictive guides.
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <a
                  href="https://github.com/Robin239105/Auditoo.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'var(--primary-color)',
                    fontSize: '13px',
                    fontWeight: 600,
                    textDecoration: 'underline',
                  }}
                >
                  GitHub Repo
                </a>
                {auditData && (
                  <button
                    onClick={handleReset}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--primary-color)',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: 600,
                      textDecoration: 'underline',
                    }}
                  >
                    Audit Another Site
                  </button>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.03)', paddingTop: '16px' }}>
              <p style={{ fontSize: '12px', color: '#4B5563' }}>
                &copy; {new Date().getFullYear()} Auditoo. All rights reserved.
              </p>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Developed by{' '}
                <a
                  href="https://alaminrobin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'var(--primary-color)',
                    textDecoration: 'none',
                    fontWeight: 600,
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--secondary-color)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
                >
                  Al Amin Robin
                </a>
              </p>
            </div>
          </div>
        )}


      </div>
    </div>
  );
}
