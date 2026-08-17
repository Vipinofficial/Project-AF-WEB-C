import React from 'react';
import type { CartItem } from '@arli/contracts';
import { type CartTotals, lineTotal } from '@arli/core';
import type { CustomerDictionary } from '@arli/i18n';

interface CartProps {
  cartItems: CartItem[];
  /** Computed once in App and shared with Checkout, so the two cannot diverge. */
  totals: CartTotals;
  onRemoveItem: (id: string) => void;
  t: CustomerDictionary;
  onProceed: () => void;
  promo: string;
  promoApplied: boolean;
  promoMsg: string;
  promoOk: boolean;
  onPromoChange: (val: string) => void;
  onApplyPromo: () => void;
  onStartShopping: () => void;
}

export const Cart: React.FC<CartProps> = ({
  cartItems,
  totals,
  onRemoveItem,
  t,
  onProceed,
  promo,
  promoApplied,
  promoMsg,
  promoOk,
  onPromoChange,
  onApplyPromo,
  onStartShopping,
}) => {
  const hasCart = cartItems.length > 0;
  const { subtotal, discount: discountAmt, total, points: earnPoints } = totals;

  return (
    <>
      <section style={{ maxWidth: '680px', margin: '0 auto', padding: '24px 16px 16px' }} className="animate-fade-up">
        <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px, 7vw, 40px)', fontWeight: 400, margin: '0 0 20px' }}>
          {t.cartTitle}
        </h1>

        {hasCart ? (
          <div>
            {/* Cart items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              {cartItems.map((ci) => (
                <div
                  key={ci.id}
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid var(--border-color)',
                    borderRadius: '16px',
                    padding: '14px',
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center',
                  }}
                >
                  {/* Swatch thumbnail */}
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '10px',
                    backgroundColor: ci.swatch,
                    backgroundImage: `repeating-linear-gradient(45deg, ${ci.swatch} 0px, ${ci.swatch} 9px, rgba(255,255,255,0.12) 9px, rgba(255,255,255,0.12) 11px)`,
                    flexShrink: 0,
                  }} />

                  {/* Details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {ci.name}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>
                      {ci.shop} · ₹{ci.price}{ci.unit} × {ci.qty}
                    </span>
                    {ci.hasMeas && (
                      <span style={{ fontSize: '11px', color: 'var(--color-primary)', fontWeight: 600, display: 'block', marginTop: '2px' }}>
                        📏 {t.measAttached}
                      </span>
                    )}
                    {ci.hasDesign && (
                      <span style={{ fontSize: '11px', color: '#A5732A', fontWeight: 600, display: 'block', marginTop: '2px' }}>
                        📎 {t.designAttached || 'Design attached'}
                      </span>
                    )}
                  </div>

                  {/* Price + remove */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', flexShrink: 0 }}>
                    <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--color-primary)' }}>₹{lineTotal(ci)}</span>
                    <button
                      onClick={() => onRemoveItem(ci.id)}
                      style={{
                        background: 'none', border: 'none',
                        color: 'var(--color-accent)', fontSize: '12px', fontWeight: 700,
                        cursor: 'pointer', padding: '4px',
                        minHeight: '32px',
                      }}
                    >
                      {t.remove}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo + summary */}
            <div style={{ backgroundColor: '#fff', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '18px' }}>
              {/* Promo code */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <input
                  value={promo}
                  onChange={(e) => onPromoChange(e.target.value)}
                  placeholder={t.promoPh}
                  style={{
                    flex: 1, border: '1.5px solid var(--border-color)', borderRadius: '10px',
                    padding: '10px 12px', fontSize: '14px', outline: 'none',
                    textTransform: 'uppercase', minWidth: 0, minHeight: '44px',
                  }}
                />
                <button
                  onClick={onApplyPromo}
                  style={{
                    backgroundColor: 'var(--text-primary)', color: '#FAF6F0',
                    border: 'none', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                    padding: '0 18px', borderRadius: '10px', minHeight: '44px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {t.apply}
                </button>
              </div>

              {promoApplied && (
                <p style={{ fontSize: '13px', fontWeight: 600, color: promoOk ? 'var(--color-success)' : 'var(--color-accent)', margin: '-6px 0 14px' }}>
                  {promoMsg}
                </p>
              )}

              {/* Price breakdown */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--text-secondary)', padding: '5px 0' }}>
                <span>{t.subtotal}</span><span>₹{subtotal}</span>
              </div>
              {promoApplied && promoOk && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--color-success)', fontWeight: 600, padding: '5px 0' }}>
                  <span>{t.discount} (ARLI10)</span><span>−₹{discountAmt}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 800, padding: '10px 0 2px', borderTop: '1px solid var(--border-color)', marginTop: '8px' }}>
                <span>{t.total}</span>
                <span style={{ color: 'var(--color-primary)' }}>₹{total}</span>
              </div>
              <p style={{ fontSize: '12px', color: '#A5732A', fontWeight: 600, margin: '4px 0 0' }}>
                ★ {t.youllEarn} {earnPoints} {t.loyaltyPts}
              </p>

              {/* Desktop CTA (hidden on mobile — sticky bar takes over) */}
              <button
                onClick={onProceed}
                className="desktop-cart-cta"
                style={{
                  width: '100%', backgroundColor: 'var(--color-accent)', color: '#fff',
                  border: 'none', fontSize: '15px', fontWeight: 700, cursor: 'pointer',
                  padding: '14px', borderRadius: '12px', marginTop: '16px',
                  minHeight: '50px',
                }}
              >
                {t.checkoutProceed}
              </button>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛍️</div>
            <p style={{ fontSize: '16px', color: 'var(--text-muted)', margin: '0 0 18px' }}>{t.cartEmpty}</p>
            <button
              onClick={onStartShopping}
              style={{
                backgroundColor: 'var(--color-primary)', color: '#FAF6F0',
                border: 'none', fontSize: '14px', fontWeight: 700, cursor: 'pointer',
                padding: '12px 26px', borderRadius: '999px', minHeight: '48px',
              }}
            >
              {t.startShopping}
            </button>
          </div>
        )}
      </section>

      {/* Sticky bottom CTA for mobile (only when cart has items) */}
      {hasCart && (
        <div className="sticky-mobile-cta">
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>{t.total}</span>
            <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-primary)' }}>₹{total}</span>
          </div>
          <button
            onClick={onProceed}
            style={{
              backgroundColor: 'var(--color-accent)', color: '#fff',
              border: 'none', fontSize: '15px', fontWeight: 700, cursor: 'pointer',
              padding: '14px 28px', borderRadius: '12px', minHeight: '50px',
              flex: 2,
            }}
          >
            {t.checkoutProceed} →
          </button>
        </div>
      )}
    </>
  );
};
