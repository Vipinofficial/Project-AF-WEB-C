import React from 'react';
import type { Listing } from '@arli/contracts';

interface ListingCardProps {
  item: Listing;
  lang: 'en' | 'hi';
  t: any;
  onClick: () => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({ item, lang, t, onClick }) => {
  const name = item.name[lang];
  const shop = item.shop[lang];

  const weaveStyle = {
    backgroundColor: item.base,
    backgroundImage: `repeating-linear-gradient(45deg, ${item.base} 0px, ${item.base} 9px, ${item.acc} 9px, ${item.acc} 11px)`,
  };

  return (
    <div
      onClick={onClick}
      className="hover-scale"
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 2px 10px rgba(26, 37, 66, 0.04)',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {/* Product image / weave swatch */}
      <div className="listing-card-img" style={{ ...weaveStyle }}>
        {item.img && (
          <img
            src={item.img}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        )}
        {item.sponsored && (
          <span style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            backgroundColor: 'var(--color-gold)',
            color: '#1A2542',
            fontSize: '9px',
            fontWeight: 800,
            padding: '3px 9px',
            borderRadius: '999px',
            letterSpacing: '0.6px',
            textTransform: 'uppercase',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
          }}>
            {t.sponsored}
          </span>
        )}
        <span style={{
          position: 'absolute',
          bottom: '8px',
          right: '8px',
          backgroundColor: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(6px)',
          fontSize: '10px',
          fontWeight: 700,
          color: 'var(--color-primary)',
          padding: '3px 8px',
          borderRadius: '999px',
          border: '1px solid rgba(228,219,200,0.7)',
        }}>
          {t[`cat${item.cat.charAt(0).toUpperCase() + item.cat.slice(1)}`] || item.cat}
        </span>
      </div>

      {/* Card body */}
      <div style={{ padding: '12px 14px 14px', display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
        <span style={{
          fontSize: '14px',
          fontWeight: 700,
          color: 'var(--text-primary)',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          lineHeight: 1.25,
        }}>
          {name}
        </span>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginTop: '1px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {shop} · {item.pincode}
        </span>

        {item.measurable && (
          <span style={{ fontSize: '10.5px', color: 'var(--color-success)', fontWeight: 700, marginTop: '2px' }}>
            📏 Bespoke fitting
          </span>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #F4ECE1' }}>
          <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-primary)' }}>
            ₹{item.price}
            <span style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-muted)' }}>
              {item.cat === 'fabric' ? `/${t.qtyMeters || 'm'}` : `/${t.qtyPieces || 'pc'}`}
            </span>
          </span>
          <span style={{ fontSize: '12px', color: '#B8860B', fontWeight: 700 }}>
            ★ {item.rating}
          </span>
        </div>
      </div>
    </div>
  );
};
