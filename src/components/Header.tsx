import React from 'react';

interface HeaderProps {
  t: any;
  langLabel: string;
  query: string;
  cartCount: number;
  hasCart: boolean;
  loggedIn: boolean;
  points: number;
  onQueryChange: (val: string) => void;
  onSearch: () => void;
  onNavigate: (screen: string) => void;
  onToggleLang: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  t,
  langLabel,
  query,
  cartCount,
  hasCart,
  loggedIn,
  points,
  onQueryChange,
  onSearch,
  onNavigate,
  onToggleLang,
}) => {
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <header className="desktop-header" style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: 'var(--bg-secondary)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid var(--border-color)',
    }}>
      <div style={{
        maxWidth: '1180px',
        margin: '0 auto',
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div onClick={() => onNavigate('home')} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', userSelect: 'none', lineHeight: 1 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
              <span style={{ fontSize: '24px', fontWeight: 700, fontFamily: "'Instrument Serif', Georgia, serif", color: 'var(--color-primary)', letterSpacing: '0.5px', lineHeight: 1 }}>ARLI</span>
              <span style={{ fontSize: '12.5px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-primary)', lineHeight: 1 }}>FASHION</span>
            </div>
            <span style={{ fontSize: '8.5px', color: 'var(--text-muted)', letterSpacing: '0.4px', fontWeight: 500, fontStyle: 'italic', marginTop: '2px', lineHeight: 1 }}>by fashion vendors</span>
          </div>
          
          <button
            onClick={() => onNavigate('explore')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              backgroundColor: '#F4ECE1',
              border: '1px solid var(--border-color)',
              borderRadius: '999px',
              padding: '5px 12px',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--color-primary)',
              cursor: 'pointer',
            }}
          >
            📍 <span style={{ fontWeight: 700 }}>221001</span> (Varanasi) ▾
          </button>
        </div>
        
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '0 16px' }}>
          <div style={{
            display: 'flex',
            gap: '6px',
            backgroundColor: '#fff',
            border: '1.5px solid var(--border-color)',
            borderRadius: '999px',
            padding: '3px 3px 3px 16px',
            alignItems: 'center',
            width: '100%',
            maxWidth: '420px',
          }}>
            <input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={t.searchPh}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '17px',
                fontFamily: "'Instrument Serif', serif",
                fontStyle: 'italic',
                backgroundColor: 'transparent',
                minWidth: 0
              }}
            />
            <button
              onClick={onSearch}
              style={{
                backgroundColor: 'var(--color-primary)',
                color: '#fff',
                border: 'none',
                fontSize: '12.5px',
                fontWeight: 700,
                cursor: 'pointer',
                padding: '8px 16px',
                borderRadius: '999px',
              }}
            >
              {t.searchBtn}
            </button>
          </div>
        </div>

        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => onNavigate('explore')}
            style={{ background: 'none', border: 'none', fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer', padding: '8px 12px', borderRadius: '8px' }}
          >
            {t.navExplore}
          </button>
          <button
            onClick={() => onNavigate('chat')}
            style={{ background: 'none', border: 'none', fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer', padding: '8px 12px', borderRadius: '8px' }}
          >
            {t.navChat || 'Chat'}
          </button>
          <button
            onClick={onToggleLang}
            style={{ backgroundColor: '#fff', border: '1px solid var(--border-color)', fontSize: '13px', fontWeight: 600, color: 'var(--color-primary)', cursor: 'pointer', padding: '7px 12px', borderRadius: '999px' }}
          >
            {langLabel}
          </button>
          <button
            onClick={() => onNavigate('cart')}
            style={{
              position: 'relative',
              background: 'none',
              border: '1px solid var(--border-color)',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              cursor: 'pointer',
              padding: '8px 14px',
              borderRadius: '999px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            🛒 {t.navCart || 'Cart'}
            {hasCart && (
              <span style={{ backgroundColor: 'var(--color-accent)', color: '#fff', fontSize: '11px', fontWeight: 700, minWidth: '18px', height: '18px', borderRadius: '9px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0 5px' }}>
                {cartCount}
              </span>
            )}
          </button>



          {!loggedIn ? (
            <button
              onClick={() => onNavigate('login')}
              style={{ backgroundColor: 'var(--color-primary)', color: '#FAF5EC', border: 'none', fontSize: '14px', fontWeight: 600, cursor: 'pointer', padding: '9px 18px', borderRadius: '999px' }}
            >
              {t.navLogin || 'Login'}
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#EDE4CF', padding: '6px 14px 6px 8px', borderRadius: '999px' }}>
              <span style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: '#FAF5EC', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>P</span>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>{t.hiUser || 'Hi User'}</span>
              <span style={{ fontSize: '12px', color: '#A5732A', fontWeight: 700 }}>★ {points} {t.pts || 'pts'}</span>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
