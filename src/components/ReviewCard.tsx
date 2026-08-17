import React from 'react';
import type { Review } from '@arli/contracts';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div style={{
      backgroundColor: '#fff',
      border: '1px solid var(--border-color)',
      borderRadius: '14px',
      padding: '16px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span style={{ fontSize: '13.5px', fontWeight: 700 }}>{review.who}</span>
        <span style={{ fontSize: '12.5px', color: '#A5732A', fontWeight: 700 }}>{review.stars}</span>
      </div>
      <p style={{ fontSize: '13.5px', lineHeight: 1.55, color: 'var(--text-secondary)', margin: 0 }}>
        {review.text}
      </p>
    </div>
  );
};
