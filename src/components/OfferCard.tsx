import React from 'react';

interface OfferCardProps {
  mark: string;
  title: string;
  sub: string;
}

export const OfferCard: React.FC<OfferCardProps> = ({ mark, title, sub }) => {
  return (
    <div style={{
      backgroundColor: 'rgba(250, 245, 236, 0.06)',
      border: '1px dashed rgba(233, 162, 59, 0.45)',
      borderRadius: '12px',
      padding: '13px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    }}>
      <span style={{
        fontFamily: "'Instrument Serif', serif",
        fontSize: '22px',
        color: 'var(--color-warning)',
        flex: 'none',
        lineHeight: 1,
      }}>
        {mark}
      </span>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#FAF5EC', lineHeight: 1.3 }}>{title}</div>
        <div style={{ fontSize: '11.5px', color: '#B8C0D6', marginTop: '1px' }}>{sub}</div>
      </div>
    </div>
  );
};
