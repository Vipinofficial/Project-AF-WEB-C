import React from 'react';

interface MobileBottomNavProps {
  currentScreen: string;
  cartCount: number;
  loggedIn: boolean;
  onNavigate: (screen: string) => void;
  t: any;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentScreen,
  loggedIn,
  onNavigate,
}) => {
  const tabs = [
    {
      id: 'home',
      label: 'Home',
      icon: (active: boolean) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'var(--color-primary)' : 'none'} stroke={active ? 'var(--color-primary)' : 'var(--text-muted)'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1V9.5z" />
        </svg>
      ),
    },
    {
      id: 'explore',
      label: 'Explore',
      icon: (active: boolean) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? 'var(--color-primary)' : 'var(--text-muted)'} strokeWidth={active ? '2.2' : '1.8'} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
    },
    {
      // AI Stylist tab (replaces Cart)
      id: 'chat',
      label: 'AI Stylist',
      icon: (active: boolean) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? 'var(--color-gold)' : 'var(--text-muted)'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Sparkle / AI star icon */}
          <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
        </svg>
      ),
    },
    {
      id: 'chat',
      label: 'Chat',
      // using a different id mapping for the chat section visually — same route
      icon: (active: boolean) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'var(--color-primary)' : 'none'} stroke={active ? 'var(--color-primary)' : 'var(--text-muted)'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      id: loggedIn ? 'home' : 'login',
      label: loggedIn ? 'Account' : 'Login',
      icon: (active: boolean) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'var(--color-primary)' : 'none'} stroke={active ? 'var(--color-primary)' : 'var(--text-muted)'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
  ];

  // Define unique keys separately to avoid duplicate 'chat' key issue
  const tabKeys = ['home', 'explore', 'ai', 'chat', 'account'];

  return (
    <nav className="mobile-floating-nav" aria-label="Mobile Navigation">
      {tabs.map((tab, index) => {
        const isActive = currentScreen === tab.id;
        const isAI = index === 2; // AI Stylist is index 2
        return (
          <button
            key={tabKeys[index]}
            onClick={() => onNavigate(tab.id)}
            className={`mobile-floating-btn ${isActive ? 'active' : ''}`}
            aria-label={tab.label}
            style={isAI ? {
              background: isActive
                ? 'linear-gradient(135deg, #1A2542, #C2492F)'
                : 'linear-gradient(135deg, rgba(26,37,66,0.07), rgba(194,73,47,0.07))',
              border: `1.5px solid ${isActive ? 'transparent' : 'rgba(212,175,55,0.35)'}`,
              borderRadius: '14px',
              padding: '5px 10px',
            } : undefined}
          >
            <div className="mobile-icon-box">
              {isAI ? (
                // AI sparkle icon with gradient color when active
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <defs>
                    <linearGradient id="ai-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={isActive ? '#FAF6F0' : '#D4AF37'} />
                      <stop offset="100%" stopColor={isActive ? '#FAF6F0' : '#C2492F'} />
                    </linearGradient>
                  </defs>
                  {/* Sparkle star */}
                  <path
                    d="M12 3l1.8 5.5H20l-4.7 3.4 1.8 5.5L12 14l-5.1 3.4 1.8-5.5L4 8.5h6.2L12 3z"
                    stroke="url(#ai-grad)"
                    strokeWidth="1.6"
                    fill={isActive ? 'url(#ai-grad)' : 'none'}
                  />
                  {/* Small sparkles */}
                  <line x1="20" y1="4" x2="20" y2="7" stroke="url(#ai-grad)" strokeWidth="1.4" />
                  <line x1="18.5" y1="5.5" x2="21.5" y2="5.5" stroke="url(#ai-grad)" strokeWidth="1.4" />
                  <line x1="4" y1="17" x2="4" y2="19" stroke="url(#ai-grad)" strokeWidth="1.4" />
                  <line x1="3" y1="18" x2="5" y2="18" stroke="url(#ai-grad)" strokeWidth="1.4" />
                </svg>
              ) : (
                tab.icon(isActive)
              )}
            </div>
            <span
              className="mobile-tab-label"
              style={isAI ? {
                color: isActive ? '#FAF6F0' : 'var(--color-gold)',
                fontWeight: 800,
                fontSize: '8.5px',
                letterSpacing: '0.4px',
              } : undefined}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
