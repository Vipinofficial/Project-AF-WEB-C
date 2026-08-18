import React, { useState } from 'react';
import type { CustomerDictionary, Lang } from '@arli/i18n';
import type { Listing } from '@arli/contracts';
import { suggestSearch } from '@arli/core';

interface HeaderProps {
  t: CustomerDictionary;
  /** Active delivery pincode. Empty means "not set yet". */
  pincode: string;
  onPincodeChange: (val: string) => void;
  /** Source for search suggestions — already loaded, so no extra request. */
  listings: readonly Listing[];
  lang: Lang;
  onSelectListing: (id: number) => void;
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
  pincode,
  onPincodeChange,
  listings,
  lang,
  onSelectListing,
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
  // ERR-102: the location control used to navigate to Explore and nothing else.
  // It is now a real picker that sets the delivery pincode the catalogue filters on.
  const [pinOpen, setPinOpen] = useState(false);
  const [pinDraft, setPinDraft] = useState(pincode);
  const pinValid = /^[0-9]{6}$/.test(pinDraft.trim());

  const applyPincode = () => {
    if (!pinValid) return;
    onPincodeChange(pinDraft.trim());
    setPinOpen(false);
  };

  // ERR-103: suggestion dropdown, built from listings already in memory.
  const [sugOpen, setSugOpen] = useState(false);
  const [sugIndex, setSugIndex] = useState(-1);
  const suggestions = sugOpen
    ? suggestSearch(listings, query, lang, t as unknown as Record<string, string>)
    : [];

  const chooseSuggestion = (index: number) => {
    const s = suggestions[index];
    if (!s) return;
    setSugOpen(false);
    setSugIndex(-1);
    if (s.kind === 'listing' && s.listingId !== undefined) {
      onSelectListing(s.listingId);
    } else {
      onQueryChange(s.label);
      onSearch();
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' && suggestions.length) {
      e.preventDefault();
      setSugIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp' && suggestions.length) {
      e.preventDefault();
      setSugIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === 'Escape') {
      setSugOpen(false);
      setSugIndex(-1);
    } else if (e.key === 'Enter') {
      if (sugIndex >= 0) chooseSuggestion(sugIndex);
      else { setSugOpen(false); onSearch(); }
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
        // Without width:100% the container collapses to its content, so the
        // logo and the nav bunched together mid-bar instead of sitting at
        // opposite ends.
        width: '100%',
        maxWidth: '1180px',
        margin: '0 auto',
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Brand mark, not a control — ERR-101. Home is a nav tab instead. */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', userSelect: 'none', lineHeight: 1 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
              <span style={{ fontSize: '24px', fontWeight: 700, fontFamily: "'Instrument Serif', Georgia, serif", color: 'var(--color-primary)', letterSpacing: '0.5px', lineHeight: 1 }}>ARLI</span>
              <span style={{ fontSize: '12.5px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-primary)', lineHeight: 1 }}>FASHION</span>
            </div>
            <span style={{ fontSize: '8.5px', color: 'var(--text-muted)', letterSpacing: '0.4px', fontWeight: 500, fontStyle: 'italic', marginTop: '2px', lineHeight: 1 }}>by fashion vendors</span>
          </div>
          
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => { setPinDraft(pincode); setPinOpen((o) => !o); }}
              aria-expanded={pinOpen}
              aria-haspopup="dialog"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '999px',
                padding: '5px 12px',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--color-primary)',
                cursor: 'pointer',
              }}
            >
              📍 <span style={{ fontWeight: 700 }}>{pincode || '—'}</span> ▾
            </button>

            {pinOpen && (
              <div
                role="dialog"
                aria-label={t.changePincode}
                style={{
                  position: 'absolute', top: 'calc(100% + 8px)', left: 0, zIndex: 200,
                  backgroundColor: 'var(--color-card-bg)', border: '1px solid var(--border-color)',
                  borderRadius: '14px', padding: '14px', width: '240px',
                  boxShadow: '0 12px 32px rgba(26,37,66,0.16)',
                }}
              >
                <label style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  {t.deliverTo}
                </label>
                <input
                  value={pinDraft}
                  onChange={(e) => setPinDraft(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                  onKeyDown={(e) => e.key === 'Enter' && applyPincode()}
                  placeholder={t.pincodePh}
                  inputMode="numeric"
                  autoFocus
                  style={{
                    width: '100%', padding: '9px 12px', fontSize: '14px',
                    border: '1.5px solid var(--border-color)', borderRadius: '10px',
                    outline: 'none', marginBottom: '8px',
                  }}
                />
                {pinDraft && !pinValid && (
                  <p style={{ margin: '0 0 8px', fontSize: '11.5px', color: 'var(--color-accent)', fontWeight: 600 }}>
                    {t.pincodeInvalid}
                  </p>
                )}
                <button
                  onClick={applyPincode}
                  disabled={!pinValid}
                  style={{
                    width: '100%', padding: '10px', fontSize: '13px', fontWeight: 700,
                    borderRadius: '10px', border: 'none', cursor: pinValid ? 'pointer' : 'not-allowed',
                    backgroundColor: pinValid ? 'var(--color-primary)' : 'var(--border-color)',
                    color: pinValid ? 'var(--color-cream)' : 'var(--text-muted)',
                  }}
                >
                  {t.applyPincode}
                </button>
              </div>
            )}
          </div>
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
            position: 'relative',
          }}>
            <input
              value={query}
              onChange={(e) => { onQueryChange(e.target.value); setSugOpen(true); setSugIndex(-1); }}
              onFocus={() => setSugOpen(true)}
              onBlur={() => window.setTimeout(() => setSugOpen(false), 120)}
              onKeyDown={onKeyDown}
              placeholder={t.searchPh}
              role="combobox"
              aria-expanded={suggestions.length > 0}
              aria-autocomplete="list"
              aria-controls="arli-search-suggestions"
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

            {suggestions.length > 0 && (
              <ul
                id="arli-search-suggestions"
                role="listbox"
                style={{
                  position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, zIndex: 200,
                  listStyle: 'none', margin: 0, padding: '6px',
                  backgroundColor: 'var(--color-card-bg)',
                  border: '1px solid var(--border-color)', borderRadius: '14px',
                  boxShadow: '0 12px 32px rgba(26,37,66,0.16)',
                  maxHeight: '320px', overflowY: 'auto',
                }}
              >
                {suggestions.map((sug, i) => (
                  <li key={`${sug.kind}-${sug.label}`} role="option" aria-selected={i === sugIndex}>
                    <button
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => chooseSuggestion(i)}
                      onMouseEnter={() => setSugIndex(i)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
                        background: i === sugIndex ? 'var(--bg-secondary)' : 'none',
                        border: 'none', cursor: 'pointer', textAlign: 'left',
                        padding: '9px 12px', borderRadius: '10px',
                      }}
                    >
                      <span aria-hidden style={{ fontSize: '13px', opacity: 0.7 }}>
                        {sug.kind === 'listing' ? '🔎' : sug.kind === 'shop' ? '🏪' : '🏷️'}
                      </span>
                      <span style={{ minWidth: 0 }}>
                        <span style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {sug.label}
                        </span>
                        {sug.detail && (
                          <span style={{ display: 'block', fontSize: '11.5px', color: 'var(--text-muted)' }}>
                            {sug.detail}
                          </span>
                        )}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => onNavigate('home')}
            style={{ background: 'none', border: 'none', fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer', padding: '8px 12px', borderRadius: '8px' }}
          >
            {t.tabHome}
          </button>
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
            {t.navChat}
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
