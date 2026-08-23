import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQSection: React.FC = () => {
  const faqs: FAQItem[] = [
    {
      question: 'What is ARLI BRAND and how does it work?',
      answer: 'ARLI BRAND is a hyper-local fashion marketplace in India that connects customers directly with local fashion vendors, boutique fabric stores, and custom tailors in their pincode area. You can browse nearby shops, chat with artisans, share your body measurements, and order custom ethnic or modern garments.',
    },
    {
      question: 'How do doorstep tailoring measurements work on ARLI?',
      answer: 'When placing a tailoring or custom outfit order, you can save your body measurements in your ARLI profile once or request a local tailor partner to visit your home for precise measurements. Saved measurements are securely stored for future instant re-orders.',
    },
    {
      question: 'Can I buy boutique fabrics and get them stitched by a local tailor on ARLI?',
      answer: 'Yes! ARLI allows seamless pairing of boutique fabrics (such as Chanderi, Banarasi silk, cotton, embroidered net) from local fabric merchants directly with verified local tailors for bespoke stitching in one unified order.',
    },
    {
      question: 'Which Indian cities and pincodes does ARLI BRAND support?',
      answer: 'ARLI BRAND supports local vendors, boutiques, and tailors across major hubs including Jaipur, Surat, Ahmedabad, Delhi-NCR, Mumbai, Bengaluru, Lucknow, Kolkata, and tier-2 fashion clusters by pincode search.',
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // Construct FAQPage JSON-LD
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section
      aria-label="Frequently Asked Questions"
      style={{
        borderTop: '1px solid var(--border-color)',
        backgroundColor: '#FAF7F0',
        padding: '56px 24px',
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--color-primary)',
            }}
          >
            AEO Answer Engine Knowledge Hub
          </span>
          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: '36px',
              fontWeight: 400,
              margin: '8px 0 0',
            }}
          >
            Frequently Asked Questions
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                }}
              >
                <button
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  id={`faq-btn-${idx}`}
                  style={{
                    width: '100%',
                    padding: '18px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '15px',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                  }}
                >
                  <span>{faq.question}</span>
                  <span style={{ fontSize: '18px', color: 'var(--color-accent)', marginLeft: '12px' }}>
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div
                    id={`faq-answer-${idx}`}
                    role="region"
                    aria-labelledby={`faq-btn-${idx}`}
                    style={{
                      padding: '0 20px 20px',
                      fontSize: '14px',
                      lineHeight: 1.6,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
