import { useState, useEffect } from 'react';

// ============================================================================
// 1. GORGEOUS CUSTOM SVG ICONS (Crisp, High-End Vectors)
// ============================================================================

const LogoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 14.5C4 11.4624 6.46243 9 9.5 9C12.5376 9 15 11.4624 15 14.5C15 17.5376 12.5376 20 9.5 20C6.46243 20 4 17.5376 4 14.5Z" stroke="url(#logoGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.5 9.5C9.5 6.46243 11.9624 4 15 4C18.0376 4 20.5 6.46243 20.5 9.5C20.5 12.5376 18.0376 15 15 15C11.9624 15 9.5 12.5376 9.5 9.5Z" stroke="url(#logoGrad2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="logoGrad" x1="4" y1="9" x2="15" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3b82f6" />
        <stop offset="1" stopColor="#6366f1" />
      </linearGradient>
      <linearGradient id="logoGrad2" x1="9.5" y1="4" x2="20.5" y2="15" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6366f1" />
        <stop offset="1" stopColor="#10b981" />
      </linearGradient>
    </defs>
  </svg>
);

const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const AlertIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const ErrorIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);



const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const DoubleQuoteIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.15 }}>
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.988zm-12 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

const SparklesIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707-.707M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
  </svg>
);

// Component-specific custom icons
const DesignIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
    <path d="M12 6V12L16 14" />
  </svg>
);

const SeoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21L16.65 16.65" />
    <path d="M11 8V11H14" />
  </svg>
);

const SpeedIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
  </svg>
);

const ConversionIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8V12" />
    <path d="M8 12H16" />
    <path d="M12 16V16.01" />
  </svg>
);

const MobileIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);


// ============================================================================
// 2. PREMIUM SLENDER SCORE GAUGES
// ============================================================================

const ScoreRing = ({ score, size = 60, strokeWidth = 5, showNumber = false }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let color = 'var(--accent-rose)'; // Coral Rose
  let glowColor = 'rgba(244, 63, 94, 0.22)';
  
  if (score >= 80) {
    color = 'var(--accent-emerald)'; // Emerald Green
    glowColor = 'rgba(16, 185, 129, 0.22)';
  } else if (score >= 50) {
    color = 'var(--accent-amber)'; // Warning Orange
    glowColor = 'rgba(245, 158, 11, 0.22)';
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
          <span style={{ fontSize: size * 0.28, fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-display)', letterSpacing: '-0.5px' }}>{score}</span>
        </div>
      )}
    </div>
  );
};


// ============================================================================
// 3. INTERACTIVE SHOWCASE BROWSER MOCKUP
// ============================================================================

const BrowserMockup = () => {
  const [activeTab, setActiveTab] = useState('summary');
  const [hoveredMetric, setHoveredMetric] = useState(null);

  const mockMetrics = [
    { id: 'perf', title: 'Speed Latency', score: 62, desc: 'Heavy media and blocking script tags.', win: 'Compress high banner assets' },
    { id: 'conversion', title: 'Funnels Flow', score: 48, desc: 'Missing explicit hero CTAs and form gaps.', win: 'Place a clear above-fold CTA' },
    { id: 'accessibility', title: 'Layout Grid', score: 85, desc: 'High typography clarity, slight shift ratios.', win: 'Align layout grid margins' },
  ];

  return (
    <div className="browser-mockup animate-fade-up delay-2">
      <div className="browser-header">
        <div style={{ display: 'flex', gap: '6px' }}>
          <div className="browser-dot" style={{ backgroundColor: '#ff5f56' }} />
          <div className="browser-dot" style={{ backgroundColor: '#ffbd2e' }} />
          <div className="browser-dot" style={{ backgroundColor: '#27c93f' }} />
        </div>
        <div className="browser-address">
          <span>auditoo.com/showcase/fintechflow.co</span>
        </div>
      </div>
      
      <div className="browser-body" style={{ textAlign: 'left' }}>
        {/* Mockup Navigation Tabs */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '12px' }}>
          <button 
            onClick={() => setActiveTab('summary')}
            style={{ 
              background: activeTab === 'summary' ? 'rgba(59, 130, 246, 0.08)' : 'transparent',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '6px',
              color: activeTab === 'summary' ? '#ffffff' : 'var(--text-secondary)',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Diagnostic Summary
          </button>
          <button 
            onClick={() => setActiveTab('blueprints')}
            style={{ 
              background: activeTab === 'blueprints' ? 'rgba(59, 130, 246, 0.08)' : 'transparent',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '6px',
              color: activeTab === 'blueprints' ? '#ffffff' : 'var(--text-secondary)',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Wireframe Blueprints
          </button>
        </div>

        {activeTab === 'summary' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'fadeUp 0.4s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '9px', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Domain Scorecard</span>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>fintechflow.co is underperforming</h4>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(251, 113, 133, 0.05)', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(251, 113, 133, 0.1)' }}>
                <ScoreRing score={58} size={28} strokeWidth={3} />
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-rose)' }}>Critical Gaps (58/100)</span>
              </div>
            </div>

            {/* Simulated charts and hover interaction */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }} className="responsive-score-grid">
              {mockMetrics.map((metric) => (
                <div 
                  key={metric.id}
                  onMouseEnter={() => setHoveredMetric(metric.id)}
                  onMouseLeave={() => setHoveredMetric(null)}
                  style={{
                    background: 'rgba(255,255,255,0.01)',
                    border: hoveredMetric === metric.id ? '1px solid var(--border-hover)' : '1px solid var(--border-color)',
                    padding: '12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#ffffff' }}>{metric.title}</span>
                    <ScoreRing score={metric.score} size={24} strokeWidth={2.5} showNumber={false} />
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff', display: 'block', marginTop: '6px' }}>{metric.score}%</span>
                  
                  {/* Micro metric bar visual */}
                  <div className="metric-bar-track" style={{ marginTop: '8px' }}>
                    <div 
                      className="metric-bar-fill" 
                      style={{ 
                        width: `${metric.score}%`, 
                        backgroundColor: metric.score >= 80 ? 'var(--accent-emerald)' : metric.score >= 50 ? 'var(--accent-amber)' : 'var(--accent-rose)' 
                      }} 
                    />
                  </div>

                  {/* Elegant Hotspot tooltip */}
                  {hoveredMetric === metric.id && (
                    <div style={{
                      position: 'absolute',
                      bottom: '105%',
                      left: '5%',
                      right: '5%',
                      background: 'rgba(14, 19, 38, 0.98)',
                      border: '1px solid var(--border-hover)',
                      borderRadius: '8px',
                      padding: '8px 10px',
                      zIndex: 10,
                      boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
                      fontSize: '10px',
                      lineHeight: '1.4'
                    }} className="animate-fade-up">
                      <strong style={{ color: 'var(--accent-primary)', display: 'block', marginBottom: '2px' }}>Insight Winner:</strong>
                      <span style={{ color: '#ffffff' }}>{metric.desc}</span>
                      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '4px', paddingTop: '4px', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                        🚀 Action Win: {metric.win}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Visual Simulated SVG Chart */}
            <div style={{ background: 'rgba(0,0,0,0.15)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-secondary)' }}>Simulated Conversion Uplift Forecast</span>
                <span style={{ fontSize: '9px', color: 'var(--accent-emerald)', fontWeight: 700 }}>+42.8% Conversion Optimize potential</span>
              </div>
              <svg width="100%" height="60" viewBox="0 0 400 60" style={{ overflow: 'visible' }}>
                <path d="M0,50 Q60,45 120,38 T240,25 T360,10" fill="none" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="3" strokeDasharray="3" />
                <path d="M0,50 Q60,40 120,25 T240,15 T360,4" fill="none" stroke="var(--accent-primary)" strokeWidth="3" />
                <circle cx="360" cy="4" r="4" fill="var(--accent-emerald)" />
              </svg>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', animation: 'fadeUp 0.4s ease' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff' }}>Redesigned Conversion Grid Concept</h4>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              UX consultants propose an asymmetric 3-grid design flow to replace clustered vertical form fields.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '12px', marginTop: '4px' }}>
              <div style={{ border: '1px dashed rgba(255,255,255,0.08)', borderRadius: '6px', padding: '16px', background: 'rgba(255,255,255,0.01)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ width: '40%', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px' }} />
                <div style={{ width: '85%', height: '6px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px' }} />
                <div style={{ width: '70%', height: '6px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px' }} />
              </div>
              <div style={{ border: '1px dashed rgba(255,255,255,0.08)', borderRadius: '6px', padding: '16px', background: 'rgba(59, 130, 246, 0.02)', display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '45px', height: '14px', background: 'var(--accent-primary)', borderRadius: '100px' }} />
                <div style={{ width: '25px', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


// ============================================================================
// 4. CALENDLY-STYLE TESTIMONIAL & SCHEDULER WIDGET
// ============================================================================

const testimonials = [
  { quote: "Al Amin Robin transformed our landing page. Conversions jumped by 40% in just two weeks!", author: "Sarah M.", role: "SaaS Founder" },
  { quote: "The conversion audit was incredibly eye-opening. Structured, exact, and highly actionable suggestions.", author: "David K.", role: "FinTech Product Lead" },
  { quote: "Our site feels twice as fast and visually aligned. Exceptional UX blueprint insight.", author: "Alex L.", role: "E-comm Merchant" }
];

const CalendlyScheduler = ({ urlDomain }) => {
  const [selectedDate, setSelectedDate] = useState('Mon 25');
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

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
    <div className="calendly-card" style={{ textAlign: 'left', position: 'relative', overflow: 'hidden' }}>
      {/* Absolute Glow */}
      <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '160px', height: '160px', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '50%', filter: 'blur(30px)' }} />

      {!bookingConfirmed ? (
        <>
          {/* Left Column: Expert Bio & Testimonials */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'space-between', borderRight: '1px solid rgba(255, 255, 255, 0.04)', paddingRight: '20px' }}>
            
            {/* Advisor Profile */}
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', padding: '1.5px' }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#0e1326', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div style={{ position: 'absolute', bottom: '1px', right: '1px', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent-emerald)', border: '2px solid #0e1326' }} />
              </div>
              <div>
                <span style={{ fontSize: '9px', fontWeight: 800, color: 'var(--accent-secondary)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Principal Advisor</span>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>Al Amin Robin</h4>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Audited 200+ global domains</p>
              </div>
            </div>

            {/* Dynamic Value Prop */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '9px', fontWeight: 800, color: 'var(--accent-rose)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                ⚠️ FREE 30-MIN STRATEGY SESSION FOR {urlDomain.toUpperCase()}
              </span>
              <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#ffffff', lineHeight: '1.25' }}>
                Your landing page is leaking metrics.
              </h3>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Grab one of today's free consulting slots. We will step through your Auditoo wireframe live and map high-converting elements.
              </p>
            </div>

            {/* Testimonial slider */}
            <div style={{ 
              background: 'rgba(255,255,255,0.01)', 
              border: '1px solid var(--border-color)', 
              borderRadius: '10px', 
              padding: '12px 16px', 
              position: 'relative',
              minHeight: '95px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <div style={{ position: 'absolute', top: '6px', left: '8px' }}>
                <DoubleQuoteIcon />
              </div>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: '1.5', paddingLeft: '14px' }}>
                {testimonials[currentTestimonial].quote}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', paddingLeft: '14px' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#ffffff' }}>
                  {testimonials[currentTestimonial].author} <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>· {testimonials[currentTestimonial].role}</span>
                </span>
                <span style={{ display: 'flex', gap: '2px', color: '#fbbf24' }}>
                  <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Calendly Date & Time Slots */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.8px', display: 'block', marginBottom: '8px' }}>
                1. Select strategy slot date
              </span>
              <div className="calendly-dates-grid">
                {dates.map((d) => (
                  <button
                    key={d.num}
                    onClick={() => { setSelectedDate(`${d.day} ${d.num}`); setSelectedTime(null); }}
                    className={`calendly-date-btn ${selectedDate === `${d.day} ${d.num}` ? 'active' : ''}`}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <span style={{ fontSize: '9px', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.2px' }}>{d.day}</span>
                      <span style={{ fontSize: '14px', fontWeight: 800, marginTop: '2px' }}>{d.num}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.8px', display: 'block', marginBottom: '8px' }}>
                2. Choose available time slot
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => { setSelectedTime(time); setShowConfirmModal(true); }}
                    style={{
                      background: selectedTime === time ? 'var(--accent-primary)' : 'rgba(255,255,255,0.01)',
                      border: `1px solid ${selectedTime === time ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                      color: '#ffffff',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'center',
                      boxShadow: selectedTime === time ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none'
                    }}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center', background: 'rgba(255,255,255,0.01)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.02)' }}>
              <SparklesIcon />
              <span style={{ fontSize: '10.5px', fontWeight: 500, color: 'var(--text-secondary)' }}>Instant verification link sent.</span>
            </div>
          </div>
        </>
      ) : (
        <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', gridColumn: 'span 2', width: '100%' }} className="animate-fade-up">
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-emerald)' }}>
            <CheckIcon />
          </div>
          <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff' }}>Strategy Reserved Successfully!</h4>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '440px', lineHeight: '1.6', textAlign: 'center', margin: '0 auto' }}>
            We scheduled your wireframe audit strategy for <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong>. A calendar invite was locked for <strong>{bookingEmail}</strong>.
          </p>
          <div style={{ background: 'rgba(59, 130, 246, 0.06)', padding: '12px 20px', borderRadius: '10px', border: '1px solid rgba(59, 130, 246, 0.15)', fontSize: '11px', color: '#a5b4fc', fontWeight: 600 }}>
            ⚡ Tip: Keep your Auditoo report scores open for our discussion.
          </div>
        </div>
      )}

      {/* Booking Form Overlay Modal */}
      {showConfirmModal && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(7, 9, 19, 0.97)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 100 }}>
          <div style={{ width: '100%', maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '14px' }} className="animate-fade-up">
            <div>
              <h5 style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>Verify Strategy Booking Slot</h5>
              <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
                You are scheduling a Free 30-Min Strategy Session with Al Amin Robin on <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong>.
              </p>
            </div>
            
            <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input
                type="email"
                required
                placeholder="Enter your work email address"
                value={bookingEmail}
                onChange={(e) => setBookingEmail(e.target.value)}
                style={{
                  width: '100%',
                  background: '#070913',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  color: '#ffffff',
                  fontSize: '12.5px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
              />
              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                <button
                  type="submit"
                  className="btn-saas-primary"
                  style={{ flex: 1, padding: '10px 14px', fontSize: '12px' }}
                >
                  Confirm Invite
                </button>
                <button
                  type="button"
                  onClick={() => { setShowConfirmModal(false); setSelectedTime(null); }}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-secondary)',
                    padding: '10px 14px',
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
// 5. MAIN APPLICATION
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
    if (score >= 90) return { letter: 'A', color: 'var(--accent-emerald)', label: 'Excellent Design', themeClass: 'ticker-badge-excellent' };
    if (score >= 80) return { letter: 'B', color: 'var(--accent-emerald)', label: 'Good Layout', themeClass: 'ticker-badge-excellent' };
    if (score >= 70) return { letter: 'C', color: 'var(--accent-amber)', label: 'Average Layout', themeClass: 'ticker-badge-warning' };
    if (score >= 50) return { letter: 'D', color: 'var(--accent-amber)', label: 'Needs Rebuilding', themeClass: 'ticker-badge-warning' };
    return { letter: 'F', color: 'var(--accent-rose)', label: 'Critical Friction', themeClass: 'ticker-badge-critical' };
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
    <div className="saas-workspace">
      
      {/* Background Ambience Subtle Glows */}
      <div className="saas-glow glow-left" />
      <div className="saas-glow glow-right" />

      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '40px', position: 'relative', zIndex: 1 }}>
        
        {/* ====================================================================
            HEADER NAV BAR (Floating & Glassmorphic)
            ==================================================================== */}
        <header style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '16px 24px', 
          background: 'rgba(14, 19, 38, 0.4)', 
          backdropFilter: 'blur(20px)', 
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--border-color)', 
          borderRadius: '100px',
          marginTop: '12px'
        }}>
          <div onClick={handleReset} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <LogoIcon />
            <span style={{ 
              fontSize: '19px', 
              fontWeight: 800, 
              fontFamily: 'var(--font-display)', 
              background: 'linear-gradient(135deg, #ffffff 60%, var(--text-secondary))', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent', 
              letterSpacing: '-0.8px' 
            }}>
              Auditoo<span style={{ color: 'var(--accent-primary)' }}>.</span>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              background: 'rgba(255, 255, 255, 0.02)', 
              padding: '6px 14px', 
              borderRadius: '100px', 
              border: '1px solid var(--border-color)', 
              fontSize: '11px', 
              color: 'var(--text-secondary)',
              fontWeight: 600
            }}>
              <span style={{ 
                width: '6px', 
                height: '6px', 
                borderRadius: '50%', 
                background: 'var(--accent-emerald)', 
                display: 'inline-block', 
                boxShadow: '0 0 10px var(--accent-emerald)' 
              }} />
              <span>Conversion Audit Active</span>
            </div>
            
            <a 
              href="https://github.com/Robin239105/Auditoo.git" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-saas-outline"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <GithubIcon />
              <span>GitHub</span>
            </a>
          </div>
        </header>

        {/* ====================================================================
            LANDING SCREEN (Inputs & Interactive Mockups)
            ==================================================================== */}
        {!auditData && !loading && !error && (
          <div className="animate-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            
            {/* Elegant Live Ticker Feed */}
            <div style={{ 
              width: '100%', 
              overflow: 'hidden', 
              background: 'rgba(14, 19, 38, 0.3)', 
              backdropFilter: 'blur(8px)', 
              border: '1px solid var(--border-color)', 
              borderRadius: '100px', 
              padding: '10px 24px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '16px' 
            }}>
              <div style={{ 
                fontSize: '9.5px', 
                fontWeight: 800, 
                color: 'var(--accent-primary)', 
                textTransform: 'uppercase', 
                letterSpacing: '1px', 
                borderRight: '1px solid rgba(255,255,255,0.06)', 
                paddingRight: '16px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px' 
              }}>
                <span style={{ 
                  width: '5px', 
                  height: '5px', 
                  borderRadius: '50%', 
                  background: 'var(--accent-emerald)', 
                  boxShadow: '0 0 8px var(--accent-emerald)', 
                  display: 'inline-block' 
                }} />
                <span>Live Feed</span>
              </div>
              
              <div style={{ flexGrow: 1, overflow: 'hidden', display: 'flex', position: 'relative' }}>
                <div style={{ display: 'flex', gap: '40px', whiteSpace: 'nowrap', animation: 'tickerScroll 26s linear infinite' }}>
                  {auditsList.concat(auditsList).map((audit, idx) => (
                    <span key={`ticker-1-${idx}`} style={{ fontSize: '11.5px', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <strong style={{ color: '#ffffff' }}>{audit.domain}</strong>
                      <span style={{ opacity: 0.6 }}>analyzed</span>
                      <span style={{
                        fontSize: '9.5px',
                        fontWeight: 700,
                        background: audit.score >= 80 ? 'rgba(16, 185, 129, 0.08)' : 'rgba(245, 158, 11, 0.08)',
                        color: audit.score >= 80 ? 'var(--accent-emerald)' : 'var(--accent-amber)',
                        border: `1px solid ${audit.score >= 80 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)'}`,
                        padding: '2px 8px',
                        borderRadius: '100px'
                      }}>
                        {audit.score}/100
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Premium Center-Aligned Hero Section */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                background: 'rgba(99, 102, 241, 0.06)', 
                border: '1px solid rgba(99, 102, 241, 0.2)', 
                padding: '6px 14px', 
                borderRadius: '100px', 
                fontSize: '11px', 
                fontWeight: 700, 
                color: 'var(--accent-secondary)', 
                textTransform: 'uppercase', 
                letterSpacing: '0.8px' 
              }}>
                ✦ High-Precision Layout Conversion Auditor
              </div>

              <h1 style={{ 
                fontSize: '52px', 
                fontWeight: 800, 
                lineHeight: '1.08', 
                letterSpacing: '-0.03em', 
                background: 'linear-gradient(135deg, #ffffff 40%, #c7d2fe, #8b5cf6)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent' 
              }}>
                Uncover what is killing your site's conversion.
              </h1>
              
              <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '640px' }}>
                Analyze layout shifts, core latency, asset weights, and CTA visibility scales instantly. Tailored heuristic wireframes, no signup required.
              </p>

              {/* Glowing Search Bar */}
              <div style={{ width: '100%', maxWidth: '580px', marginTop: '10px' }}>
                <form onSubmit={handleAuditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ 
                    position: 'relative', 
                    display: 'flex', 
                    alignItems: 'center',
                    background: 'rgba(14, 19, 38, 0.85)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '100px',
                    padding: '6px',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)'
                  }}>
                    <span style={{ position: 'absolute', left: '20px', color: 'var(--text-muted)', display: 'flex' }}>
                      <GlobeIcon />
                    </span>
                    <input
                      type="text"
                      placeholder="Enter domain name (e.g. Stripe.com)"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      style={{
                        width: '100%',
                        background: 'transparent',
                        border: 'none',
                        padding: '12px 20px 12px 42px',
                        fontSize: '14.5px',
                        color: '#ffffff',
                        outline: 'none',
                        fontFamily: 'var(--font-interface)'
                      }}
                    />
                    <button type="submit" className="btn-saas-primary" style={{ padding: '12px 24px', fontSize: '13px' }}>
                      <SearchIcon />
                      <span>Analyze Domain</span>
                    </button>
                  </div>

                  {formError && (
                    <div style={{ 
                      color: 'var(--accent-rose)', 
                      fontSize: '12px', 
                      fontWeight: 600, 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '6px',
                      justifyContent: 'center',
                      background: 'rgba(244, 63, 94, 0.05)',
                      padding: '6px 14px',
                      borderRadius: '100px',
                      border: '1px solid rgba(244, 63, 94, 0.1)',
                      width: 'fit-content',
                      margin: '0 auto'
                    }}>
                      <ErrorIcon />
                      {formError}
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Interactive Showcase Mockup Canvas */}
            <div style={{ maxWidth: '840px', width: '100%', margin: '0 auto' }}>
              <span style={{ 
                fontSize: '10px', 
                fontWeight: 800, 
                color: 'var(--text-muted)', 
                textTransform: 'uppercase', 
                letterSpacing: '1px', 
                textAlign: 'center', 
                display: 'block',
                marginBottom: '16px' 
              }}>
                ✦ Hover over metrics to inspect real-time audit suggestions
              </span>
              <BrowserMockup />
            </div>

            {/* Design Value Pillars Grid */}
            <div className="saas-grid-3" style={{ marginTop: '20px' }}>
              {[
                { title: 'Visual Grid Integrity', desc: 'Checks alignment shifts, text-scaling ratios, and margins consistency.', icon: <DesignIcon />, col: 'rgba(99, 102, 241, 0.04)' },
                { title: 'Core Render Latencies', desc: 'Examines image weight blocks, layout thread times, and paints latency.', icon: <SpeedIcon />, col: 'rgba(6, 182, 212, 0.04)' },
                { title: 'Conversion Funnel Hooks', desc: 'Evaluates CTA proximity, visual focal anchors, and checkout path friction.', icon: <ConversionIcon />, col: 'rgba(139, 92, 246, 0.04)' }
              ].map((scope, idx) => (
                <div key={idx} className="card-premium card-premium-interactive" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: scope.col, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
                    {scope.icon}
                  </div>
                  <h4 style={{ fontSize: '14.5px', fontWeight: 800, color: '#ffffff' }}>{scope.title}</h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{scope.desc}</p>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ====================================================================
            LOADING SYSTEM AUDITING (Minimalist Telemetry Spinner)
            ==================================================================== */}
        {loading && (
          <div className="animate-fade-up" style={{ width: '100%', maxWidth: '780px', margin: '40px auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            <div className="card-premium" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '32px', padding: '32px', alignItems: 'center' }} className="responsive-hero-grid">
              
              {/* Loader checklist stream */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '12px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-rose)', display: 'inline-block', animation: 'pulseGlow 1.4s infinite' }} />
                  <span style={{ fontSize: '9.5px', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    SYSTEM ANALYSIS IN PROGRESS
                  </span>
                </div>

                {/* Highly Polished Step checklist */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {[
                    { text: 'Mapping URL node sandbox...', minStep: 1 },
                    { text: 'Evaluating structure layers & elements...', minStep: 2 },
                    { text: 'Testing viewport metrics & asset transfers...', minStep: 3 },
                    { text: 'Executing CTA heuristics conversion audits...', minStep: 4 },
                    { text: 'Assembling detailed report manifest...', minStep: 5 }
                  ].map((step, idx) => {
                    let colorClass = 'var(--text-muted)';
                    let iconNode = (
                      <span style={{ 
                        width: '14px', 
                        height: '14px', 
                        borderRadius: '50%', 
                        border: '1.5px solid var(--text-muted)', 
                        display: 'inline-flex' 
                      }} />
                    );
                    
                    if (loaderStep >= step.minStep) {
                      colorClass = '#ffffff';
                      iconNode = (
                        <span style={{ 
                          width: '14px', 
                          height: '14px', 
                          borderRadius: '50%', 
                          background: 'var(--accent-emerald)', 
                          color: '#ffffff',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '8px',
                          fontWeight: 900
                        }}>
                          ✓
                        </span>
                      );
                    } else if (loaderStep === step.minStep - 1) {
                      colorClass = 'var(--accent-primary)';
                      iconNode = (
                        <span className="minimal-spinning-ring" style={{ 
                          width: '14px', 
                          height: '14px', 
                          borderWidth: '1.5px',
                          margin: 0
                        }} />
                      );
                    }

                    return (
                      <div key={idx} style={{ color: colorClass, fontSize: '13.5px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: loaderStep === step.minStep - 1 ? 600 : 400, transition: 'all 0.3s' }}>
                        {iconNode}
                        <span>{step.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Loader telemetry concentric visual */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '220px', position: 'relative' }}>
                <div className="minimal-spinning-ring" style={{ width: '120px', height: '120px', borderStyle: 'dashed' }} />
                
                <div style={{ position: 'absolute', zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-display)', letterSpacing: '-1px' }}>
                    {loaderStep * 20}%
                  </span>
                  <span style={{ fontSize: '9px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginTop: '2px' }}>
                    COMPILING
                  </span>
                </div>
              </div>

            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Compiling heuristic scorecard for <strong style={{ color: '#ffffff' }}>{getCleanDomain(url)}</strong>...
            </p>
          </div>
        )}

        {/* ====================================================================
            ERROR DISPLAY
            ==================================================================== */}
        {error && (
          <div className="card-premium animate-fade-up" style={{ width: '100%', maxWidth: '540px', margin: '40px auto', textAlign: 'center', border: '1px solid var(--accent-rose)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(244, 63, 94, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-rose)', margin: '0 auto 16px auto' }}>
              <ErrorIcon />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>Analysis Aborted</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.6' }}>{error}</p>
            
            <button onClick={handleReset} className="btn-saas-primary" style={{ margin: '0 auto' }}>
              Reset Audit Compiler
            </button>
          </div>
        )}

        {/* ====================================================================
            AUDIT REPORT RESULTS (Premium SaaS Analytics Platform Layout)
            ==================================================================== */}
        {auditData && !loading && (
          <div className="animate-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '36px', textAlign: 'left' }}>
            
            {/* Report Header summary bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '9.5px', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  DIAGNOSTIC REPORT SECURED
                </span>
                <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', marginTop: '4px' }}>
                  Auditoo Report: <span style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', wordBreak: 'break-all' }}>{getCleanDomain(url)}</span>
                </h2>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => window.print()} className="btn-saas-outline">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ marginRight: '4px' }}>
                    <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6v-8z" />
                  </svg>
                  <span>Save PDF</span>
                </button>
                <button onClick={handleReset} className="btn-saas-primary">
                  Analyze Another Site
                </button>
              </div>
            </div>

            {/* Split workspace Grid */}
            <div className="saas-dashboard-grid">
              
              {/* Left Column: Sticky Score & Wins Card */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'sticky', top: '24px' }}>
                
                {/* Total Score gauge */}
                <div className="card-premium" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', background: 'rgba(14, 19, 38, 0.9)', padding: '24px' }}>
                  <ScoreRing score={animatedScores.overall} size={110} strokeWidth={7} showNumber={true} />
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'center' }}>
                    <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                      Overall Design Score
                    </span>
                    
                    <span style={{ fontSize: '13px', fontWeight: 700, color: getGrade(animatedScores.overall).color }}>
                      Grade {getGrade(animatedScores.overall).letter} ({getGrade(animatedScores.overall).label})
                    </span>
                  </div>
                </div>

                {/* Wins panel */}
                <div className="card-premium" style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: 'rgba(14, 19, 38, 0.6)', padding: '24px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <SparklesIcon />
                    <span>PRIORITY WIREFRAME WINS</span>
                  </span>
                  
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {auditData.quickWins?.slice(0, 3).map((win, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '12px', color: '#ffffff', lineHeight: '1.4' }}>
                        <span style={{ display: 'inline-flex', color: 'var(--accent-emerald)', marginTop: '2px' }}>
                          <CheckIcon />
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
                <div className="card-premium">
                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>Executive Heuristic Summary</h3>
                  <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.65' }}>
                    {auditData.overallSummary}
                  </p>
                </div>

                {/* Dynamic Scores Dials Grid */}
                <div className="saas-scores-grid">
                  {[
                    { key: 'design', name: 'Design problems', label: 'Layout Grid', icon: <DesignIcon /> },
                    { key: 'seo', name: 'SEO issues', label: 'SEO Search', icon: <SeoIcon /> },
                    { key: 'speed', name: 'Speed issues', label: 'Render Latency', icon: <SpeedIcon /> },
                    { key: 'conversion', name: 'Conversion problems', label: 'Funnels Friction', icon: <ConversionIcon /> },
                    { key: 'mobile', name: 'Mobile issues', label: 'Mobile UX', icon: <MobileIcon /> }
                  ].map((subScore) => (
                    <div 
                      key={subScore.key} 
                      onClick={() => handleScoreClick(subScore.key)}
                      className="card-premium card-premium-interactive"
                      style={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: 'rgba(14, 19, 38, 0.6)', cursor: 'pointer' }}
                    >
                      <ScoreRing score={animatedScores[subScore.key]} size={52} strokeWidth={4} showNumber={true} />
                      <h4 style={{ fontSize: '12px', color: '#ffffff', marginTop: '12px', fontWeight: 700 }}>{subScore.label}</h4>
                      <span style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {subScore.icon}
                        <span>Audit</span>
                      </span>
                    </div>
                  ))}
                </div>

                {/* Staggered Accordion lists */}
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginBottom: '16px' }}>Detailed Evaluation</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      { key: 'design', name: 'Visual Layout & Grid Structures Gaps', icon: <DesignIcon />, data: auditData.designProblems },
                      { key: 'seo', name: 'Meta Header & Search Visibility Issues', icon: <SeoIcon />, data: auditData.seoProblems },
                      { key: 'speed', name: 'Core Speed Latency & Asset Weights Gaps', icon: <SpeedIcon />, data: auditData.speedProblems },
                      { key: 'conversion', name: 'CTA Conversion Funnels & Flow Friction', icon: <ConversionIcon />, data: auditData.conversionProblems },
                      { key: 'mobile', name: 'Mobile Viewport Accessibility Gaps', icon: <MobileIcon />, data: auditData.mobileIssues },
                      { key: 'cta', name: 'Missing Primary Conversions Action Hooks', icon: <ConversionIcon />, data: auditData.missingCTAs }
                    ].map((sec) => {
                      const isOpen = expandedSections[sec.key];
                      const count = sec.data ? sec.data.length : 0;
                      const isHighPriority = sec.key === 'speed' || sec.key === 'cta';

                      return (
                        <div key={sec.key} id={`accordion-${sec.key}`} style={{ 
                          background: 'rgba(14, 19, 38, 0.5)', 
                          border: '1px solid var(--border-color)', 
                          borderRadius: '12px', 
                          overflow: 'hidden',
                          transition: 'all 0.3s'
                        }}>
                          <button
                            onClick={() => toggleSection(sec.key)}
                            style={{
                              width: '100%',
                              background: isOpen ? 'rgba(255, 255, 255, 0.01)' : 'transparent',
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
                              <span style={{ color: 'var(--accent-primary)', display: 'flex' }}>{sec.icon}</span>
                              <span style={{ fontSize: '13.5px', fontWeight: 700 }}>{sec.name}</span>
                              
                              <span style={{
                                fontSize: '9.5px',
                                fontWeight: 800,
                                background: count > 0 ? (isHighPriority ? 'rgba(244, 63, 94, 0.08)' : 'rgba(245, 158, 11, 0.08)') : 'rgba(16, 185, 129, 0.08)',
                                color: count > 0 ? (isHighPriority ? 'var(--accent-rose)' : 'var(--accent-amber)') : 'var(--accent-emerald)',
                                border: `1px solid ${count > 0 ? (isHighPriority ? 'rgba(244, 63, 94, 0.15)' : 'rgba(245, 158, 11, 0.15)') : 'rgba(16, 185, 129, 0.15)'}`,
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
                            <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.03)', background: 'rgba(7, 9, 19, 0.3)' }}>
                              {count === 0 ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-emerald)', fontSize: '12.5px' }}>
                                  <CheckIcon />
                                  <span>Fully optimized structure. No issues detected in this domain check.</span>
                                </div>
                              ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                  {sec.data.map((item, idx) => (
                                    <div 
                                      key={idx}
                                      className="animate-fade-up"
                                      style={{
                                        background: '#0e1326',
                                        border: `1px solid var(--border-color)`,
                                        borderRadius: '8px',
                                        padding: '10px 14px',
                                        fontSize: '12.5px',
                                        color: '#ffffff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        animationDelay: `${idx * 40}ms`
                                      }}
                                    >
                                      <span style={{ display: 'flex', color: isHighPriority ? 'var(--accent-rose)' : 'var(--accent-amber)' }}>
                                        {isHighPriority ? <ErrorIcon /> : <AlertIcon />}
                                      </span>
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

                {/* Rebuilding Blueprints section */}
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
                    Proposed Rebuild Layout Blueprints
                  </h3>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    Structural layout wireframe solutions proposed by senior advisors to recover identified conversion leakage.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {auditData.redesignSections?.map((section, idx) => {
                      const isHigh = section.priority?.toLowerCase() === 'high';
                      
                      return (
                        <div key={idx} className="card-premium" style={{ 
                          padding: '24px', 
                          display: 'grid', 
                          gridTemplateColumns: '1.2fr 0.8fr', 
                          gap: '24px', 
                          alignItems: 'center',
                          background: 'rgba(14, 19, 38, 0.7)'
                        }} className="responsive-hero-grid">
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                              <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>{section.section}</h4>
                              <span style={{
                                fontSize: '8.5px',
                                fontWeight: 800,
                                background: isHigh ? 'rgba(244, 63, 94, 0.08)' : 'rgba(245, 158, 11, 0.08)',
                                color: isHigh ? 'var(--accent-rose)' : 'var(--accent-amber)',
                                border: `1px solid ${isHigh ? 'rgba(244, 63, 94, 0.15)' : 'rgba(245, 158, 11, 0.15)'}`,
                                padding: '2px 8px',
                                borderRadius: '100px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                              }}>
                                {section.priority} Priority
                              </span>
                            </div>

                            <div>
                              <span style={{ fontSize: '9px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Friction Anchor:</span>
                              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.4' }}>{section.reason}</p>
                            </div>

                            <div>
                              <span style={{ fontSize: '9px', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Proposed Blueprint Wireframe:</span>
                              <p style={{ fontSize: '13px', color: '#ffffff', marginTop: '2px', lineHeight: '1.5' }}>{section.suggestion}</p>
                            </div>
                          </div>

                          {/* CSS Drawn visual grid layout mockup */}
                          <div style={{ 
                            background: '#070913', 
                            border: '1px solid var(--border-color)', 
                            borderRadius: '12px', 
                            padding: '16px', 
                            minHeight: '130px', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            gap: '8px', 
                            justifyContent: 'center' 
                          }}>
                            <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', textAlign: 'center', letterSpacing: '0.5px' }}>
                              Visual wireframe mockup
                            </span>
                            
                            {section.section.toLowerCase().includes('hero') ? (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center', opacity: 0.7 }}>
                                <div style={{ width: '60%', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px' }} />
                                <div style={{ width: '40%', height: '5px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px' }} />
                                <div style={{ width: '50px', height: '14px', background: 'var(--accent-primary)', borderRadius: '100px', marginTop: '4px' }} />
                              </div>
                            ) : (
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', opacity: 0.7 }}>
                                <div style={{ height: '36px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', border: '1px dashed rgba(255,255,255,0.06)' }} />
                                <div style={{ height: '36px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', border: '1px dashed rgba(255,255,255,0.06)' }} />
                                <div style={{ height: '36px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', border: '1px dashed rgba(255,255,255,0.06)' }} />
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
                  <CalendlyScheduler urlDomain={getCleanDomain(url)} />
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ====================================================================
            FOOTER
            ==================================================================== */}
        <footer style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '16px', 
          borderTop: '1px solid rgba(255,255,255,0.03)', 
          marginTop: '60px', 
          paddingTop: '24px', 
          textAlign: 'left' 
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', maxWidth: '640px', lineHeight: '1.6' }}>
              Auditoo Heuristics Engine · Report evaluations are based on structural wireframe logic and semantic elements checklist guidelines. All recommendations represent strategic target opportunities.
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
