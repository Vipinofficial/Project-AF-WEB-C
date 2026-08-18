import React from 'react';

interface MobileTopBarProps {
  cartCount: number;
  onNavigate: (screen: string) => void;
}

export const MobileTopBar: React.FC<MobileTopBarProps> = ({ cartCount, onNavigate }) => {
  return (
    <header
      className="mobile-top-bar"
      style={{
        display: 'none', // shown via CSS on mobile
        position: 'sticky',
        top: 0,
        zIndex: 980,
        height: '56px',
        background: 'rgba(250, 246, 240, 0.97)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderBottom: '1px solid var(--border-color)',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
      }}
    >
      {/* Logo */}
      <div
        onClick={() => onNavigate('home')}
        style={{ cursor: 'pointer', userSelect: 'none', display: 'flex', flexDirection: 'column', lineHeight: 1 }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          <span style={{
            fontSize: '20px',
            fontWeight: 700,
            fontFamily: "'Instrument Serif', Georgia, serif",
            color: 'var(--color-primary)',
            letterSpacing: '0.5px',
          }}>
            ARLI
          </span>
          <span style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'var(--color-primary)',
          }}>
            FASHION
          </span>
        </div>
        <span style={{
          fontSize: '7.5px',
          color: 'var(--text-muted)',
          fontStyle: 'italic',
          fontWeight: 500,
          letterSpacing: '0.3px',
          marginTop: '1px',
        }}>
          by fashion vendors
        </span>
      </div>

      {/* Cart button */}
      <button
        onClick={() => onNavigate('cart')}
        style={{
          background: 'none',
          border: '1.5px solid var(--border-color)',
          borderRadius: '999px',
          padding: '7px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer',
          color: 'var(--color-primary)',
          position: 'relative',
          minHeight: '44px',
          backgroundColor: cartCount > 0 ? '#FAF6F0' : 'transparent',
        }}
        aria-label="Cart"
      >
        {/* Cart SVG icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>

        {/* Badge */}
        {cartCount > 0 && (
          <span style={{
            backgroundColor: 'var(--color-accent)',
            color: '#fff',
            fontSize: '10px',
            fontWeight: 800,
            minWidth: '18px',
            height: '18px',
            borderRadius: '9px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 5px',
          }}>
            {cartCount}
          </span>
        )}
      </button>
    </header>
  );
};
