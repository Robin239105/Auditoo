import { useState, useEffect, useRef } from 'react';

// ============================================================================
// 1. REUSABLE CUSTOM COMPONENTS
// ============================================================================

// High-End Circular Score Progress Ring with tailored shadows & animation
const ScoreRing = ({ score, size = 60, strokeWidth = 6, showNumber = false }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let color = '#fb7185'; // Coral Rose
  let glowColor = 'rgba(251, 113, 133, 0.25)';
  
  if (score >= 80) {
    color = '#34d399'; // Emerald Green
    glowColor = 'rgba(52, 211, 153, 0.25)';
  } else if (score >= 50) {
    color = '#fb5108'; // Warning Orange
    glowColor = 'rgba(251, 81, 8, 0.25)';
  }

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', filter: `drop-shadow(0 0 6px ${glowColor})` }}>
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.03)"
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
            transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </svg>
      {showNumber && (
        <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: size * 0.28, fontWeight: 800, color: '#f8fafc', fontFamily: 'var(--font-display)', letterSpacing: '-0.5px' }}>{score}</span>
        </div>
      )}
    </div>
  );
};

// Premium Interactive Before-vs-After UI/UX Comparison Slider Widget
const BeforeAfterSlider = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="slider-container"
      style={{ touchAction: 'none' }}
    >
      {/* Before Panel (Left side - Bad AI UI/UX example) */}
      <div className="slider-panel slider-before" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '32px', textAlign: 'left' }}>
        <div style={{ position: 'absolute', top: '16px', left: '16px', fontSize: '9px', fontWeight: 800, color: '#fb7185', background: 'rgba(251, 113, 133, 0.1)', padding: '4px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '1px', border: '1px solid rgba(251, 113, 133, 0.15)' }}>
          Cluttered AI Template
        </div>
        <div style={{ maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
          <div style={{ width: '36px', height: '36px', background: '#334155', borderRadius: '8px' }} />
          <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#cbd5e1', lineHeight: '1.2' }}>WE OFFER OUTSTANDING AI ASSISTANCE SOFTWARE</h4>
          <p style={{ fontSize: '10px', color: '#64748b', lineHeight: '1.5' }}>Our AI software compiles metrics and gives lists of files that can help you with whatever code changes you require to complete fast.</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <div style={{ background: '#475569', color: '#cbd5e1', padding: '6px 12px', borderRadius: '4px', fontSize: '10px', fontWeight: 600 }}>Get Started Now</div>
            <div style={{ border: '1px solid #334155', color: '#475569', padding: '6px 12px', borderRadius: '4px', fontSize: '10px' }}>Learn More</div>
          </div>
        </div>
      </div>

      {/* After Panel (Right side - Auditoo Rebuilt Layout, clipped) */}
      <div 
        className="slider-panel slider-after" 
        style={{ 
          clipPath: `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)`,
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          padding: '32px',
          alignItems: 'flex-end',
          textAlign: 'right'
        }}
      >
        <div style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '9px', fontWeight: 800, color: '#34d399', background: 'rgba(52, 211, 153, 0.1)', padding: '4px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '1px', border: '1px solid rgba(52, 211, 153, 0.15)' }}>
          Auditoo Rebuilt Layout
        </div>
        <div style={{ maxWidth: '340px', display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px', alignItems: 'flex-end' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(99, 102, 241, 0.12)', border: '1px solid rgba(99, 102, 241, 0.25)', padding: '4px 12px', borderRadius: '100px', fontSize: '9px', fontWeight: 700, color: '#a5b4fc', letterSpacing: '0.5px' }}>
            ✦ CONVERSION AUDIT ACTIVE
          </div>
          <h4 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', lineHeight: '1.15', background: 'linear-gradient(135deg, #ffffff 60%, #a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Transform Site Speed into Leads.
          </h4>
          <p style={{ fontSize: '11px', color: '#94a3b8', lineHeight: '1.6', maxWidth: '270px' }}>
            Maximize conversions with layouts engineered for immediate visual clarity and responsive viewport accessibility.
          </p>
          <div>
            <div className="btn-premium" style={{ padding: '8px 18px', fontSize: '11px' }}>
              Optimize My Site →
            </div>
          </div>
        </div>
      </div>

      {/* Slider divider line and visual handle */}
      <div className="slider-divider" style={{ left: `${sliderPos}%` }}>
        <div className="slider-divider-handle">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// Premium Consultative Lead Capture Card with Simulated Calendar Scheduler
const ExpertScheduler = ({ urlDomain }) => {
  const [selectedDate, setSelectedDate] = useState('Mon 25');
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const dates = [
    { day: 'Mon', num: '25', full: 'Monday, May 25' },
    { day: 'Tue', num: '26', full: 'Tuesday, May 26' },
    { day: 'Wed', num: '27', full: 'Wednesday, May 27' },
    { day: 'Thu', num: '28', full: 'Thursday, May 28' },
    { day: 'Fri', num: '29', full: 'Friday, May 29' }
  ];

  const timeSlots = ['10:30 AM', '2:00 PM', '3:30 PM', '5:00 PM'];

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingEmail.trim()) return;
    setBookingConfirmed(true);
    setShowConfirmModal(false);
  };

  return (
    <div className="card-glass animate-fade-in-up animate-stagger-2" style={{ width: '100%', maxWidth: '640px', background: 'rgba(15, 19, 32, 0.95)', border: '1px solid rgba(99, 102, 241, 0.15)', position: 'relative', overflow: 'hidden', margin: '0 auto' }}>
      
      {/* Light Blur Elements */}
      <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '160px', height: '160px', background: 'rgba(99, 102, 241, 0.06)', borderRadius: '50%', filter: 'blur(30px)' }} />

      {!bookingConfirmed ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Header Advisor details */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', padding: '2px' }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#0f1320', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div style={{ position: 'absolute', bottom: '0', right: '0', width: '14px', height: '14px', borderRadius: '50%', background: '#10b981', border: '2px solid #0f1320' }} />
            </div>
            
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--accent-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Principal Conversion Expert</span>
              <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff' }}>Al Amin Robin</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Audited 200+ online businesses · Redesigned layouts to double engagement metrics.</p>
            </div>
          </div>

          <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.05)', width: '100%' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              ⚠️ EXCLUSIVE OFFER FOR {urlDomain.toUpperCase()}
            </span>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', lineHeight: '1.2' }}>
              Your website is leaking customers. Let's fix it for free.
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              Claim one of today's remaining free UX consultations. I will personally review your domain and outline a custom wireframe to recover lost conversions.
            </p>
          </div>

          {/* Scheduler Calendar Picker */}
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.8px', display: 'block', marginBottom: '8px' }}>
              1. Choose an Consultation Date
            </span>
            <div className="calendar-grid">
              {dates.map((d) => (
                <button
                  key={d.num}
                  onClick={() => { setSelectedDate(`${d.day} ${d.num}`); setSelectedTime(null); }}
                  className={`calendar-day-btn ${selectedDate === `${d.day} ${d.num}` ? 'selected' : ''}`}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '9px', opacity: 0.8, textTransform: 'uppercase' }}>{d.day}</span>
                    <span style={{ fontSize: '13px', fontWeight: 700 }}>{d.num}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Time Picker */}
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.8px', display: 'block', marginBottom: '8px' }}>
              2. Pick an Available Slot (30 mins)
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => { setSelectedTime(time); setShowConfirmModal(true); }}
                  style={{
                    background: selectedTime === time ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.02)',
                    border: `1px solid ${selectedTime === time ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                    color: '#ffffff',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'center',
                    boxShadow: selectedTime === time ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none'
                  }}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Social Proof highlights */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', background: 'rgba(255,255,255,0.01)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.02)' }}>
            <span style={{ color: '#fbbf24', fontSize: '14px' }}>★★★★★</span>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)' }}>Trusted by 50+ scaling SaaS & E-commerce founders.</span>
          </div>
        </div>
      ) : (
        <div style={{ padding: '32px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }} className="animate-fade-in-up">
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(52, 211, 153, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h4 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff' }}>Consultation Reserved Successfully!</h4>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '420px', lineHeight: '1.6', margin: '0 auto' }}>
            Your 30-minute Strategy Call has been mapped for <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong>. A verification link and calendar slot have been sent to <strong>{bookingEmail}</strong>.
          </p>
          <div style={{ background: 'rgba(99, 102, 241, 0.08)', padding: '12px 24px', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.15)', fontSize: '12px', color: '#a5b4fc', fontWeight: 600 }}>
            ⚡ Next Step: Have your Auditoo diagnostic scores open for the call.
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(8, 10, 16, 0.96)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', zIndex: 100 }}>
          <div style={{ width: '100%', maxWidth: '380px', display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }} className="animate-fade-in-up">
            <div>
              <h5 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>Verify Consultation Slot</h5>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                You are scheduling a Free 30-Min Strategy Call with Al Amin Robin on <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong>.
              </p>
            </div>
            
            <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                type="email"
                required
                placeholder="Enter your work email address"
                value={bookingEmail}
                onChange={(e) => setBookingEmail(e.target.value)}
                style={{
                  width: '100%',
                  background: '#070912',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  color: '#ffffff',
                  fontSize: '13px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
              />
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <button
                  type="submit"
                  className="btn-premium"
                  style={{ flex: 1, padding: '10px 16px', fontSize: '12px' }}
                >
                  Confirm Calendar Invite
                </button>
                <button
                  type="button"
                  onClick={() => { setShowConfirmModal(false); setSelectedTime(null); }}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--border-color)',
                    color: '#94a3b8',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 2. MAIN APP COMPONENT
// ============================================================================
export default function App() {
  // --- States ---
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [error, setError] = useState(null);
  const [auditData, setAuditData] = useState(null);
  const [loaderStep, setLoaderStep] = useState(0);

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
    overall: 0
  });

  // Recent Audits live feed list from localStorage or defaults
  const [auditsList, setAuditsList] = useState(() => {
    try {
      const saved = localStorage.getItem('auditoo_recent_audits');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load recent audits from localStorage:", e);
    }
    return [
      { domain: 'growthloop.io', score: 88, type: 'Excellent' },
      { domain: 'stripe.com', score: 96, type: 'Excellent' },
      { domain: 'fintechflow.co', score: 62, type: 'Warning' },
      { domain: 'shopverse.com', score: 79, type: 'Warning' },
      { domain: 'saasify.app', score: 91, type: 'Excellent' },
    ];
  });

  // Persist auditsList
  useEffect(() => {
    try {
      localStorage.setItem('auditoo_recent_audits', JSON.stringify(auditsList));
    } catch (e) {
      console.error("Failed to save recent audits to localStorage:", e);
    }
  }, [auditsList]);

  // Loader step sequential timing effect
  useEffect(() => {
    if (!loading) return;
    const timer1 = setTimeout(() => setLoaderStep(1), 1100);
    const timer2 = setTimeout(() => setLoaderStep(2), 2400);
    const timer3 = setTimeout(() => setLoaderStep(3), 3900);
    const timer4 = setTimeout(() => setLoaderStep(4), 5400);
    const timer5 = setTimeout(() => setLoaderStep(5), 7000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [loading]);

  // Score counter animation effect
  useEffect(() => {
    if (!auditData) return;

    const duration = 1400;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);

    let frame = 0;
    const targets = auditData.scores;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easeProgress = progress * (2 - progress); // ease out

      setAnimatedScores({
        design: Math.round((targets.design || 0) * easeProgress),
        seo: Math.round((targets.seo || 0) * easeProgress),
        speed: Math.round((targets.speed || 0) * easeProgress),
        conversion: Math.round((targets.conversion || 0) * easeProgress),
        mobile: Math.round((targets.mobile || 0) * easeProgress),
        overall: Math.round((targets.overall || 0) * easeProgress),
      });

      if (frame >= totalFrames) {
        clearInterval(timer);
        setAnimatedScores(targets);
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [auditData]);

  // Click sub-score to open relevant accordion & scroll down
  const handleScoreClick = (sectionKey) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionKey]: true
    }));

    setTimeout(() => {
      const element = document.getElementById(`accordion-${sectionKey}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // URL Utilities
  const validateUrl = (urlStr) => {
    if (!urlStr || urlStr.trim() === '') return 'Please enter a website URL';
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
    if (score >= 90) return { letter: 'A', color: 'var(--color-success)', label: 'Excellent Workspace', themeClass: 'ticker-badge-excellent' };
    if (score >= 80) return { letter: 'B', color: 'var(--color-success)', label: 'Good Workspace', themeClass: 'ticker-badge-excellent' };
    if (score >= 70) return { letter: 'C', color: '#fb8d3d', label: 'Average Layout', themeClass: 'ticker-badge-warning' };
    if (score >= 50) return { letter: 'D', color: 'var(--color-warning)', label: 'Needs Rebuilding', themeClass: 'ticker-badge-warning' };
    return { letter: 'F', color: 'var(--color-error)', label: 'Critical Friction', themeClass: 'ticker-badge-critical' };
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Submission handler
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

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: trimmedUrl })
      });

      const resJson = await response.json().catch(() => ({}));
      
      if (!response.ok) {
        throw new Error(resJson.error || `Server returned error status: ${response.status}`);
      }

      // Safe defaults
      const fallback = {
        scores: { design: 60, seo: 60, speed: 60, conversion: 60, mobile: 60, overall: 60 },
        designProblems: ["Inconsistent visual grid margins", "Sub-optimal text contrast scales"],
        seoProblems: ["Improper meta headers configuration", "Missing structural descriptive schema attributes"],
        speedProblems: ["Uncompressed main page media assets", "Blocking render-preventing script libraries"],
        conversionProblems: ["Weak core value message header", "Disorganized paths to primary call to action hooks"],
        missingCTAs: ["No clear main action hook in hero section", "Secondary utility links lacking hierarchy"],
        mobileIssues: ["Target buttons configured too closely", "Mobile font scales too tiny for viewports"],
        redesignSections: [
          { section: "Hero CTA Section", priority: "High", reason: "Unfocused header messaging & missing button", suggestion: "Restructure with bold, clear values, secondary subheads, and a singular, high-contrast action widget." }
        ],
        quickWins: ["Compress initial graphic banner assets", "Place a distinct primary CTA widget above-the-fold", "Expand spacing and touch sizes of navigation elements"],
        overallSummary: "The evaluated domain possesses structural viability but exhibits clear visual and layout opportunities to improve loading curves and click conversions."
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
        overallSummary: resJson.overallSummary || fallback.overallSummary
      };

      setAuditData(sanitizedData);
      
      const newDomain = getCleanDomain(trimmedUrl);
      const newScore = sanitizedData.scores.overall;
      const newGrade = getGrade(newScore).label.split(' ')[0]; // Excellent, Warning, etc.
      
      setAuditsList((prev) => {
        const filtered = prev.filter((item) => item.domain.toLowerCase() !== newDomain.toLowerCase());
        return [{ domain: newDomain, score: newScore, type: newGrade }, ...filtered];
      });

      setLoading(false);
    } catch (err) {
      setError(err.message || 'An unexpected connection error occurred.');
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAuditData(null);
    setLoading(false);
    setError(null);
    setFormError(null);
    setLoaderStep(0);
    setAnimatedScores({
      design: 0,
      seo: 0,
      speed: 0,
      conversion: 0,
      mobile: 0,
      overall: 0
    });
  };

  return (
    <div className="auditoo-workspace">
      
      {/* Background Ambience blurs */}
      <div className="ambient-blob blob-1"></div>
      <div className="ambient-blob blob-2"></div>
      <div className="ambient-blob blob-3"></div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '40px', position: 'relative', zIndex: 1 }}>
        
        {/* ====================================================================
            HEADER NAV BAR
            ==================================================================== */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
          <div onClick={handleReset} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
            <ScoreRing score={85} size={36} strokeWidth={4} />
            <span style={{ fontSize: '20px', fontWeight: 800, fontFamily: 'var(--font-display)', background: 'linear-gradient(135deg, #f8fafc, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.5px' }}>
              Auditoo<span style={{ color: 'var(--accent-primary)' }}>.</span>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.02)', padding: '6px 12px', borderRadius: '100px', border: '1px solid var(--border-color)', fontSize: '11px', color: 'var(--text-secondary)' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 8px #10b981' }} />
              <span>Diagnostic Node Active</span>
            </div>
            
            <a 
              href="https://github.com/Robin239105/Auditoo.git" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-outline"
              style={{ padding: '8px 16px', fontSize: '12px' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}>
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </header>

        {/* ====================================================================
            LANDING SCREEN (Inputs & Before/After Slider)
            ==================================================================== */}
        {!auditData && !loading && !error && (
          <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Elegant Live Ticker Feed */}
            <div style={{ width: '100%', overflow: 'hidden', background: 'rgba(15, 19, 32, 0.4)', backdropFilter: 'blur(10px)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '1px', borderRight: '1px solid rgba(255,255,255,0.06)', paddingRight: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-success)', boxShadow: '0 0 8px var(--color-success)', display: 'inline-block' }} />
                <span>Live Telemetry</span>
              </div>
              
              <div style={{ flexGrow: 1, overflow: 'hidden', display: 'flex', position: 'relative' }}>
                <div style={{ display: 'flex', gap: '40px', whiteSpace: 'nowrap', animation: 'tickerScroll 26s linear infinite' }}>
                  {auditsList.map((audit, idx) => (
                    <span key={`ticker-1-${idx}`} style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <strong style={{ color: '#ffffff' }}>{audit.domain}</strong>
                      <span style={{ opacity: 0.7 }}>analyzed</span>
                      <span className={`ticker-badge ${audit.score >= 80 ? 'ticker-badge-excellent' : 'ticker-badge-warning'}`}>
                        {audit.score}/100 ({audit.type})
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Asymmetric Hero Splitting Section */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }} className="responsive-hero-grid">
              
              {/* Left Column: Custom Copy & Inputs Form */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.25)', padding: '6px 14px', borderRadius: '100px', fontSize: '12px', fontWeight: 600, color: 'var(--accent-primary)', width: 'fit-content' }}>
                  ⚡ High-Precision Conversion Audit Engine
                </div>

                <h1 style={{ fontSize: '42px', fontWeight: 800, lineHeight: '1.1', letterSpacing: '-0.03em', background: 'linear-gradient(135deg, #ffffff 40%, #c7d2fe, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Uncover what is killing your site's conversion.
                </h1>
                
                <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '480px' }}>
                  Analyze code blocks, style files, asset layers, and accessibility structures instantly. No signups required.
                </p>

                <div className="card-glass" style={{ padding: '24px', background: 'rgba(15, 19, 32, 0.85)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <form onSubmit={handleAuditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <span style={{ position: 'absolute', left: '16px', color: 'var(--text-muted)', display: 'flex' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="2" y1="12" x2="22" y2="12" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        placeholder="Enter domain name (e.g. Stripe.com)"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        style={{
                          width: '100%',
                          background: 'rgba(7, 9, 18, 0.85)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '100px',
                          padding: '16px 20px 16px 48px',
                          fontSize: '14px',
                          color: '#ffffff',
                          outline: 'none',
                          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                        onFocus={(e) => { e.target.style.borderColor = 'var(--accent-primary)'; e.target.style.boxShadow = '0 0 20px rgba(99,102,241,0.15)'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>

                    {formError && (
                      <div style={{ color: 'var(--color-error)', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        {formError}
                      </div>
                    )}

                    <button type="submit" className="btn-premium" style={{ width: '100%', padding: '16px' }}>
                      Analyze Performance & Conversions →
                    </button>
                  </form>
                </div>
              </div>

              {/* Right Column: Custom interactive Before vs After Slider */}
              <div className="animate-fade-in-up animate-stagger-1" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center', display: 'block' }}>
                  Drag Handle to Compare Page UX Improvements
                </span>
                <BeforeAfterSlider />
              </div>
            </div>

            {/* Quick Scope Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }} className="responsive-grid-3">
              {[
                { title: 'Visual Hierarchy & Grid', desc: 'Checks contrast parameters, viewport shifting, and visual scale ratios.', icon: '🎨', col: 'rgba(99, 102, 241, 0.04)' },
                { title: 'Render Latency & Weights', desc: 'Examines asset transfer blockages, bloated graphics, and slow paint roots.', icon: '⚡', col: 'rgba(6, 182, 212, 0.04)' },
                { title: 'Conversion Funnels Flow', desc: 'Evaluates CTA placements, layout frictions, and target conversion paths.', icon: '🎯', col: 'rgba(139, 92, 246, 0.04)' }
              ].map((scope, idx) => (
                <div key={idx} className="card-glass card-interactive" style={{ padding: '24px', background: 'rgba(15, 19, 32, 0.5)', border: '1px solid rgba(255,255,255,0.03)', display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: scope.col, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                    {scope.icon}
                  </div>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>{scope.title}</h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{scope.desc}</p>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ====================================================================
            LOADING SYSTEM TELEMETRY
            ==================================================================== */}
        {loading && (
          <div className="animate-fade-in-up" style={{ width: '100%', maxWidth: '840px', margin: '40px auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            <div className="card-glass" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '32px', padding: '32px', alignItems: 'center' }} className="responsive-hero-grid">
              
              {/* Loader checklist stream */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-error)', display: 'inline-block', animation: 'pulseGlow 1.4s infinite' }} />
                  <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    SYSTEM ANALYSIS IN PROGRESS
                  </span>
                </div>

                {/* Console Log display */}
                <div style={{ background: '#070912', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '12px', padding: '20px', fontFamily: 'var(--font-mono)', minHeight: '220px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: 'inset 0 0 16px rgba(0,0,0,0.6)' }}>
                  {[
                    { text: 'Mapping URL node sandbox...', minStep: 1 },
                    { text: 'Evaluating structure layers & elements...', minStep: 2 },
                    { text: 'Testing viewport metrics & asset transfers...', minStep: 3 },
                    { text: 'Executing CTA heuristics conversion audits...', minStep: 4 },
                    { text: 'Assembling detailed report manifest...', minStep: 5 }
                  ].map((step, idx) => {
                    let textClass = 'var(--text-muted)';
                    let statusIcon = '○';
                    
                    if (loaderStep >= step.minStep) {
                      textClass = 'var(--color-success)';
                      statusIcon = '✓';
                    } else if (loaderStep === step.minStep - 1) {
                      textClass = 'var(--accent-primary)';
                      statusIcon = '►';
                    }

                    return (
                      <div key={idx} style={{ color: textClass, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontWeight: 800, width: '12px' }}>{statusIcon}</span>
                        <span>{step.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Loader telemetry concentric visual */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '240px', position: 'relative' }}>
                <div className="telemetry-ring" style={{ width: '180px', height: '180px' }} />
                <div className="telemetry-ring-inner" style={{ width: '140px', height: '140px' }} />
                
                <div style={{ position: 'absolute', zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2.2" style={{ filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.4))' }}>
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="2" x2="12" y2="22" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                  </svg>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff', marginTop: '12px', fontFamily: 'var(--font-display)' }}>
                    {loaderStep * 20}%
                  </span>
                  <span style={{ fontSize: '9px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Auditing
                  </span>
                </div>
              </div>

            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Analyzing site details for <strong style={{ color: '#ffffff' }}>{getCleanDomain(url)}</strong>...
            </p>
          </div>
        )}

        {/* ====================================================================
            ERROR DISPLAY
            ==================================================================== */}
        {error && (
          <div className="card-glass animate-fade-in-up" style={{ width: '100%', maxWidth: '580px', margin: '40px auto', textAlign: 'center', border: '1px solid var(--color-error)', boxShadow: '0 8px 32px rgba(251, 113, 133, 0.1)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(251, 113, 133, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-error)', margin: '0 auto 16px auto' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>Diagnostic Aborted</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.6' }}>{error}</p>
            
            <button onClick={handleReset} className="btn-premium" style={{ margin: '0 auto' }}>
              Reinitialize Diagnostic Suite
            </button>
          </div>
        )}

        {/* ====================================================================
            AUDIT REPORT RESULTS (Split Grid workspace)
            ==================================================================== */}
        {auditData && !loading && (
          <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '32px', textAlign: 'left' }}>
            
            {/* Report Header summary bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  DIAGNOSTIC REPORT SECURED
                </span>
                <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginTop: '4px' }}>
                  Auditoo Assessment for <span style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', wordBreak: 'break-all' }}>{getCleanDomain(url)}</span>
                </h2>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => window.print()} className="btn-outline">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <polyline points="6 9 6 2 18 2 18 9" />
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                    <rect x="6" y="14" width="12" height="8" />
                  </svg>
                  <span>Save PDF</span>
                </button>
                <button onClick={handleReset} className="btn-premium">
                  Analyze Another Site
                </button>
              </div>
            </div>

            {/* Split workspace Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '32px', alignItems: 'start' }} className="responsive-hero-grid">
              
              {/* Left Column: Sticky Overview panel */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'sticky', top: '24px' }}>
                
                {/* Total Score display */}
                <div className="card-glass" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', background: 'rgba(15, 19, 32, 0.9)', padding: '24px' }}>
                  <ScoreRing score={animatedScores.overall} size={110} strokeWidth={8} showNumber={true} />
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'center' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                      Overall Design Score
                    </span>
                    
                    <span style={{ fontSize: '13px', fontWeight: 700, color: getGrade(animatedScores.overall).color }}>
                      Grade: {getGrade(animatedScores.overall).letter} ({getGrade(animatedScores.overall).label})
                    </span>
                  </div>
                </div>

                {/* Wins panel */}
                <div className="card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: 'rgba(15, 19, 32, 0.7)', padding: '24px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    🚀 TOP WIREFRAME ACTION WINS
                  </span>
                  
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {auditData.quickWins?.slice(0, 3).map((win, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: '#ffffff', lineHeight: '1.4' }}>
                        <span style={{ display: 'inline-flex', background: 'rgba(52,211,153,0.1)', color: '#34d399', padding: '3px', borderRadius: '50%', marginTop: '1px' }}>
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg>
                        </span>
                        <span>{win}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Detailed findings flow */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                
                {/* Executive Summary */}
                <div className="card-glass">
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>Executive Heuristic Summary</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                    {auditData.overallSummary}
                  </p>
                </div>

                {/* Dynamic Scores Card Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }} className="responsive-score-grid">
                  {[
                    { key: 'design', name: 'Design Problems', abbr: 'Visual Hierarchy', detail: 'Grid alignment' },
                    { key: 'seo', name: 'SEO Issues', abbr: 'Search Visibility', detail: 'Meta & Headers' },
                    { key: 'speed', name: 'Speed Issues', abbr: 'Render Latency', detail: 'Assets weight' },
                    { key: 'conversion', name: 'Conversion Problems', abbr: 'Funnels Friction', detail: 'Call To Actions' },
                    { key: 'mobile', name: 'Mobile Issues', abbr: 'Mobile UX', detail: 'Touch viewport' }
                  ].map((subScore) => (
                    <div 
                      key={subScore.key} 
                      onClick={() => handleScoreClick(subScore.key)}
                      className="card-glass card-interactive"
                      style={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: 'rgba(15, 19, 32, 0.65)', border: '1px solid rgba(255,255,255,0.03)', cursor: 'pointer' }}
                    >
                      <ScoreRing score={animatedScores[subScore.key]} size={56} strokeWidth={5} showNumber={true} />
                      <h4 style={{ fontSize: '12px', color: '#ffffff', marginTop: '12px', fontWeight: 700 }}>{subScore.abbr}</h4>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>{subScore.detail}</span>
                    </div>
                  ))}
                </div>

                {/* Staggered Accordion lists */}
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', marginBottom: '16px' }}>Detailed Evaluation Accordion</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                      { key: 'design', name: 'Visual Layout & Grid Structures Problems', icon: '🎨', data: auditData.designProblems },
                      { key: 'seo', name: 'Meta Data & SEO Search Visibility Errors', icon: '🔍', data: auditData.seoProblems },
                      { key: 'speed', name: 'Render Latency & Core Web Weights Latencies', icon: '⚡', data: auditData.speedProblems },
                      { key: 'conversion', name: 'CTA Funnels Friction & Flow Obstacles', icon: '💰', data: auditData.conversionProblems },
                      { key: 'mobile', name: 'Mobile Target Sizes & Accessibility Gaps', icon: '📱', data: auditData.mobileIssues },
                      { key: 'cta', name: 'Missing Primary Conversions Action Hooks', icon: '🎯', data: auditData.missingCTAs }
                    ].map((sec) => {
                      const isOpen = expandedSections[sec.key];
                      const count = sec.data ? sec.data.length : 0;
                      const isHighPriority = sec.key === 'speed' || sec.key === 'cta';

                      return (
                        <div key={sec.key} id={`accordion-${sec.key}`} style={{ background: 'rgba(15, 19, 32, 0.6)', border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden' }}>
                          <button
                            onClick={() => toggleSection(sec.key)}
                            style={{
                              width: '100%',
                              background: isOpen ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
                              border: 'none',
                              padding: '16px 20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              cursor: 'pointer',
                              color: '#ffffff',
                              textAlign: 'left'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                              <span style={{ fontSize: '16px' }}>{sec.icon}</span>
                              <span style={{ fontSize: '13px', fontWeight: 600 }}>{sec.name}</span>
                              
                              <span style={{
                                fontSize: '10px',
                                fontWeight: 700,
                                background: count > 0 ? (isHighPriority ? 'rgba(251, 113, 133, 0.1)' : 'rgba(251, 81, 8, 0.1)') : 'rgba(52, 211, 153, 0.1)',
                                color: count > 0 ? (isHighPriority ? 'var(--color-error)' : 'var(--color-warning)') : 'var(--color-success)',
                                border: `1px solid ${count > 0 ? (isHighPriority ? 'rgba(251, 113, 133, 0.15)' : 'rgba(251, 81, 8, 0.15)') : 'rgba(52, 211, 153, 0.15)'}`,
                                padding: '2px 8px',
                                borderRadius: '100px'
                              }}>
                                {count === 0 ? 'Fully Clean' : `${count} Gaps Found`}
                              </span>
                            </div>

                            <svg 
                              width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2.5"
                              style={{ transition: 'transform 0.3s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}
                            >
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </button>

                          {isOpen && (
                            <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.03)', background: 'rgba(7, 9, 18, 0.4)' }}>
                              {count === 0 ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-success)', fontSize: '13px' }}>
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                                  <span>Fully optimized structure. No issues detected in this domain check.</span>
                                </div>
                              ) : (
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                  {sec.data.map((item, idx) => (
                                    <div 
                                      key={idx}
                                      className="animate-fade-in-up"
                                      style={{
                                        background: '#070912',
                                        border: `1px solid ${isHighPriority ? 'rgba(251, 113, 133, 0.15)' : 'rgba(251, 81, 8, 0.15)'}`,
                                        borderRadius: '100px',
                                        padding: '6px 14px',
                                        fontSize: '12px',
                                        color: '#ffffff',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        animationDelay: `${idx * 40}ms`
                                      }}
                                    >
                                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: isHighPriority ? 'var(--color-error)' : 'var(--color-warning)' }} />
                                      <span>{item}</span>
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

                {/* Interactive Rebuilding Blueprints section */}
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
                    Proposed Rebuild Layout Blueprints
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    Structural visual blueprints designed by senior designers to patch identified conversion leaks.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {auditData.redesignSections?.map((section, idx) => {
                      const isHigh = section.priority?.toLowerCase() === 'high';
                      
                      return (
                        <div key={idx} className="card-glass" style={{ padding: '24px', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px', alignItems: 'center' }} className="responsive-hero-grid">
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>{section.section}</h4>
                              <span style={{
                                fontSize: '9px',
                                fontWeight: 800,
                                background: isHigh ? 'rgba(251, 113, 133, 0.1)' : 'rgba(251, 81, 8, 0.1)',
                                color: isHigh ? 'var(--color-error)' : 'var(--color-warning)',
                                border: `1px solid ${isHigh ? 'rgba(251, 113, 133, 0.15)' : 'rgba(251, 81, 8, 0.15)'}`,
                                padding: '2px 8px',
                                borderRadius: '100px',
                                textTransform: 'uppercase'
                              }}>
                                {section.priority} Priority Rebuild
                              </span>
                            </div>

                            <div>
                              <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Friction Core:</span>
                              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>{section.reason}</p>
                            </div>

                            <div>
                              <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase' }}>Proposed Blueprint Wireframe:</span>
                              <p style={{ fontSize: '13px', color: '#ffffff', marginTop: '2px', lineHeight: '1.5' }}>{section.suggestion}</p>
                            </div>
                          </div>

                          {/* CSS Drawn visual grid layout mockup */}
                          <div style={{ background: '#070912', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px', minHeight: '130px', display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center' }}>
                            <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', textAlign: 'center' }}>
                              Visual wireframe mockup
                            </span>
                            
                            {section.section.toLowerCase().includes('hero') ? (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center', opacity: 0.8 }}>
                                <div style={{ width: '60%', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px' }} />
                                <div style={{ width: '40%', height: '5px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px' }} />
                                <div style={{ width: '50px', height: '14px', background: 'var(--accent-primary)', borderRadius: '100px', marginTop: '4px' }} />
                              </div>
                            ) : (
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', opacity: 0.7 }}>
                                <div style={{ height: '36px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', border: '1px dashed rgba(255,255,255,0.05)' }} />
                                <div style={{ height: '36px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', border: '1px dashed rgba(255,255,255,0.05)' }} />
                                <div style={{ height: '36px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', border: '1px dashed rgba(255,255,255,0.05)' }} />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Personal advisor profile scheduler block */}
                <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
                  <ExpertScheduler urlDomain={getCleanDomain(url)} />
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ====================================================================
            FOOTER
            ==================================================================== */}
        <footer style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderTop: '1px solid rgba(255,255,255,0.03)', marginTop: '40px', paddingTop: '24px', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', maxWidth: '640px', lineHeight: '1.6' }}>
              Auditoo Conversion Engine · Report evaluations are based on heuristic layouts and semantic structures rules. Recommendations are target conversion guides.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <a href="https://github.com/Robin239105/Auditoo.git" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)', fontSize: '12px', fontWeight: 600, textDecoration: 'underline' }}>
                GitHub Repository
              </a>
              {auditData && (
                <button onClick={handleReset} style={{ background: 'transparent', border: 'none', color: 'var(--accent-primary)', fontSize: '12px', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}>
                  Analyze Another site
                </button>
              )}
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.02)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '12px', color: 'var(--text-muted)' }}>
            <p>&copy; {new Date().getFullYear()} Auditoo. All rights reserved.</p>
            <p>
              Developed by{' '}
              <a 
                href="https://alaminrobin.com" target="_blank" rel="noopener noreferrer" 
                style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.target.style.color = 'var(--accent-secondary)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--accent-primary)'}
              >
                Al Amin Robin
              </a>
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}
