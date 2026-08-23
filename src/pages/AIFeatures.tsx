import React from 'react';
import type { CustomerDictionary } from '@arli/i18n';

interface AIFeaturesProps {
  t: CustomerDictionary;
  onBrowse: () => void;
}

/**
 * Hub for AI-powered features, reached from its own nav slot (previously a
 * duplicate of the Chat tab — both had id 'chat', so tapping either landed on
 * the same screen despite being labelled "AI Stylist" and "Chat"). Chat itself
 * moved to being reached contextually from a listing's own page, where it
 * actually has a shop to talk to.
 *
 * Web has no camera-based try-on today (that only exists in the mobile app),
 * so this says so rather than offering a button that goes nowhere.
 */
export const AIFeatures: React.FC<AIFeaturesProps> = ({ t, onBrowse }) => {
  return (
    <section style={{ maxWidth: '640px', margin: '0 auto', padding: '24px 16px 100px' }} className="animate-fade-up">
      <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(26px, 7vw, 36px)', fontWeight: 400, margin: '0 0 6px' }}>
        ✨ {t.aiFeaturesTitle}
      </h1>
      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '0 0 24px' }}>
        {t.aiFeaturesIntro}
      </p>

      <div style={{
        display: 'flex', gap: '16px', backgroundColor: 'var(--color-card-bg)',
        border: '1px solid var(--border-color)', borderRadius: '16px', padding: '20px',
      }}>
        <div style={{
          width: '52px', height: '52px', flexShrink: 0, borderRadius: '14px',
          backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '24px',
        }}>
          📸
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 6px', color: 'var(--text-primary)' }}>
            {t.tryOn}
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '0 0 6px', lineHeight: 1.5 }}>
            {t.aiTryOnCardDesc}
          </p>
          <p style={{ fontSize: '12.5px', color: 'var(--color-accent)', fontWeight: 600, margin: '0 0 10px' }}>
            {t.aiTryOnWebNote}
          </p>
          <button
            onClick={onBrowse}
            style={{
              background: 'none', border: 'none', padding: 0, cursor: 'pointer',
              fontSize: '13px', fontWeight: 700, color: 'var(--color-primary)', minHeight: '32px',
            }}
          >
            {t.browseProducts}
          </button>
        </div>
      </div>

      <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', textAlign: 'center', marginTop: '20px' }}>
        {t.aiMoreComingSoon}
      </p>
    </section>
  );
};
