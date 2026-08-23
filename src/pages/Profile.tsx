import React from 'react';
import type { CustomerDictionary } from '@arli/i18n';

interface ProfileProps {
  t: CustomerDictionary;
  loggedIn: boolean;
  phone: string;
  points: number;
  onLogout: () => void;
  onNavigate: (screen: string) => void;
}

/**
 * Real profile screen — replaces a nav tab that, until now, was labelled
 * "Account" but had nowhere real to go: tapping it just redirected back to
 * Home, because no logout existed and the phone number entered at login was
 * never plumbed up out of the Login screen.
 */
export const Profile: React.FC<ProfileProps> = ({ t, loggedIn, phone, points, onLogout, onNavigate }) => {
  if (!loggedIn) {
    return (
      <section style={{ maxWidth: '480px', margin: '0 auto', padding: '60px 16px', textAlign: 'center' }}>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>{t.notLoggedIn}</p>
        <button
          onClick={() => onNavigate('login')}
          style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '15px', fontWeight: 700, cursor: 'pointer', minHeight: '44px' }}
        >
          {t.goToLogin}
        </button>
      </section>
    );
  }

  const confirmLogout = () => {
    if (window.confirm(t.logoutConfirm)) onLogout();
  };

  return (
    <section style={{ maxWidth: '480px', margin: '0 auto', padding: '24px 16px 100px' }} className="animate-fade-up">
      <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(26px, 7vw, 34px)', fontWeight: 400, margin: '0 0 20px' }}>
        {t.profileTitle}
      </h1>

      <div style={{
        backgroundColor: 'var(--color-card-bg)', border: '1px solid var(--border-color)',
        borderRadius: '16px', padding: '16px', marginBottom: '14px',
      }}>
        <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px' }}>
          {t.loggedInAs}
        </p>
        <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>+91 {phone || '—'}</p>
      </div>

      <div style={{
        backgroundColor: 'var(--color-card-bg)', border: '1px solid var(--border-color)',
        borderRadius: '16px', padding: '16px', marginBottom: '14px',
      }}>
        <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px' }}>
          {t.yourPoints}
        </p>
        <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-warning-text)', margin: 0 }}>★ {points}</p>
      </div>

      <div style={{
        backgroundColor: 'var(--color-card-bg)', border: '1px solid var(--border-color)',
        borderRadius: '16px', overflow: 'hidden', marginBottom: '20px',
      }}>
        <button
          onClick={() => onNavigate('cart')}
          style={{
            display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center',
            padding: '14px 16px', background: 'none', border: 'none', borderBottom: '1px solid var(--border-color)',
            fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer', minHeight: '48px',
          }}
        >
          {t.myCart} <span style={{ color: 'var(--text-muted)' }}>→</span>
        </button>
        <button
          onClick={() => onNavigate('explore')}
          style={{
            display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center',
            padding: '14px 16px', background: 'none', border: 'none',
            fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer', minHeight: '48px',
          }}
        >
          {t.navExplore} <span style={{ color: 'var(--text-muted)' }}>→</span>
        </button>
      </div>

      <button
        onClick={confirmLogout}
        style={{
          width: '100%', border: '1.5px solid var(--color-accent)', borderRadius: '12px',
          background: 'none', color: 'var(--color-accent)', fontSize: '14px', fontWeight: 700,
          padding: '13px', cursor: 'pointer', minHeight: '48px',
        }}
      >
        {t.logoutBtn}
      </button>
    </section>
  );
};
