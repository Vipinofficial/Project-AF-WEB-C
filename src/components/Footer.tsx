import React from 'react';

interface FooterProps {
  t: any;
}

export const Footer: React.FC<FooterProps> = ({ t }) => {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-color)',
      padding: '24px',
      textAlign: 'center',
      fontSize: '13px',
      color: 'var(--text-muted)',
      backgroundColor: '#FAF5EC',
    }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <p style={{ margin: 0 }}>{t.footerNote || 'ARLI — local fashion marketplace'}</p>
      </div>
    </footer>
  );
};
