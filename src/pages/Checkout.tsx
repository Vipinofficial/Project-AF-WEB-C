import React, { useState } from 'react';
import type { CartItem } from '../types';

interface CheckoutProps {
  cartItems: CartItem[];
  t: any;
  onClearCart: () => void;
  onToast: (msg: string) => void;
  onNavigate: (screen: string) => void;
  onAddPoints: (pts: number) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({
  cartItems,
  t,
  onClearCart,
  onToast,
  onNavigate,
  onAddPoints,
}) => {
  const [screen, setScreen] = useState<'checkout' | 'success'>('checkout');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [orderId, setOrderId] = useState('');
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [loading, setLoading] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.total, 0);
  const total = subtotal;

  const handlePlaceOrder = () => {
    if (!name.trim() || !address.trim() || !pincode.trim()) {
      onToast(t.enterDetails || 'Please fill in all address details');
      return;
    }
    setLoading(true);

    const generatedId = `ARL-${Math.floor(1000 + Math.random() * 9000)}`;
    const pts = Math.round(total / 100);

    const payload = {
      cust: { en: name, hi: name },
      item: { en: cartItems.map(c => `${c.name} (x${c.qty})`).join(', '), hi: cartItems.map(c => `${c.name} (x${c.qty})`).join(', ') },
      qty: cartItems.reduce((sum, c) => sum + c.qty, 0),
      amt: total,
      meas: cartItems.some(c => c.hasMeas),
      status: 0,
    };

    fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(() => {
        setOrderId(generatedId);
        setEarnedPoints(pts);
        onAddPoints(pts);
        setScreen('success');
        onClearCart();
        onToast(t.orderPlaced || 'Order placed successfully!');
      })
      .catch(() => onToast('Error sending order. Please try again.'))
      .finally(() => setLoading(false));
  };

  const statusSteps = [
    { mark: '1', label: t.stPlaced    || 'Placed',      done: true  },
    { mark: '2', label: t.stAccepted  || 'Accepted',    done: false },
    { mark: '3', label: t.stProgress  || 'In progress', done: false },
    { mark: '4', label: t.stReady     || 'Ready',       done: false },
    { mark: '5', label: t.stDelivered || 'Delivered',   done: false },
  ];

  // ===== SUCCESS SCREEN =====
  if (screen === 'success') {
    return (
      <section style={{ maxWidth: '540px', margin: '0 auto', padding: '40px 16px 80px', textAlign: 'center' }} className="animate-fade-up">
        <div style={{
          width: '72px', height: '72px', borderRadius: '50%',
          backgroundColor: 'var(--color-success)', color: '#fff',
          fontSize: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
        }}>✓</div>
        <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px, 7vw, 38px)', fontWeight: 400, margin: '0 0 8px' }}>
          {t.orderPlaced}
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: '0 0 4px' }}>
          {t.orderId}: <b style={{ color: 'var(--text-primary)' }}>{orderId}</b>
        </p>
        <p style={{ fontSize: '14px', color: '#A5732A', fontWeight: 700, margin: '0 0 24px' }}>
          ★ +{earnedPoints} {t.loyaltyPts}
        </p>

        {/* Order status timeline */}
        <div style={{ backgroundColor: '#fff', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '20px', textAlign: 'left', marginBottom: '22px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 14px' }}>{t.statusTitle}</h3>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0 }}>
            {statusSteps.map((ss, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', position: 'relative' }}>
                {/* Connecting line */}
                {i < statusSteps.length - 1 && (
                  <div style={{
                    position: 'absolute', top: '13px', left: '50%', right: '-50%',
                    height: '2px', backgroundColor: ss.done ? 'var(--color-primary)' : 'var(--border-color)',
                    zIndex: 0,
                  }} />
                )}
                <div style={{
                  width: '26px', height: '26px', borderRadius: '50%', zIndex: 1,
                  backgroundColor: ss.done ? 'var(--color-primary)' : '#fff',
                  color: ss.done ? '#fff' : 'var(--text-muted)',
                  fontSize: '11px', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `2px solid ${ss.done ? 'var(--color-primary)' : 'var(--border-color)'}`,
                }}>
                  {ss.mark}
                </div>
                <span style={{ fontSize: '10px', fontWeight: 600, color: ss.done ? 'var(--text-primary)' : 'var(--text-muted)', textAlign: 'center', lineHeight: 1.2 }}>
                  {ss.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => onNavigate('chat')}
            style={{ backgroundColor: '#fff', color: 'var(--color-primary)', border: '1.5px solid var(--color-primary)', fontSize: '14px', fontWeight: 700, cursor: 'pointer', padding: '12px 20px', borderRadius: '12px', minHeight: '48px' }}
          >
            💬 {t.chatWithShop}
          </button>
          <button
            onClick={() => onNavigate('explore')}
            style={{ backgroundColor: 'var(--color-primary)', color: '#FAF6F0', border: 'none', fontSize: '14px', fontWeight: 700, cursor: 'pointer', padding: '12px 20px', borderRadius: '12px', minHeight: '48px' }}
          >
            {t.continueShopping}
          </button>
        </div>
      </section>
    );
  }

  // ===== CHECKOUT FORM =====
  return (
    <>
      <section style={{ maxWidth: '720px', margin: '0 auto', padding: '24px 16px 16px' }} className="animate-fade-up">
        <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(26px, 7vw, 38px)', fontWeight: 400, margin: '0 0 20px' }}>
          {t.checkoutTitle}
        </h1>

        {/* Single-column layout — works on both mobile and desktop */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

          {/* Delivery address */}
          <div style={{ backgroundColor: '#fff', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '18px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              📍 {t.deliveryAddr}
            </h3>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.fullName}
              style={{ width: '100%', border: '1.5px solid var(--border-color)', borderRadius: '10px', padding: '12px 14px', fontSize: '14px', outline: 'none', marginBottom: '10px', minHeight: '44px' }}
            />
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={t.addressPh}
              rows={2}
              style={{ width: '100%', border: '1.5px solid var(--border-color)', borderRadius: '10px', padding: '12px 14px', fontSize: '14px', outline: 'none', resize: 'none', marginBottom: '10px' }}
            />
            <input
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder={t.pincodePh || 'Pincode'}
              style={{ width: '140px', border: '1.5px solid var(--border-color)', borderRadius: '10px', padding: '12px 14px', fontSize: '14px', outline: 'none', minHeight: '44px' }}
            />
          </div>

          {/* Payment method */}
          <div style={{ backgroundColor: '#fff', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '18px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 14px' }}>💳 {t.payment}</h3>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', border: '1.5px solid var(--color-primary)', borderRadius: '12px', padding: '14px', cursor: 'pointer', backgroundColor: '#EDF0F7' }}>
              <input type="radio" checked readOnly style={{ accentColor: 'var(--color-primary)', width: '18px', height: '18px' }} />
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700 }}>🏪 {t.payAtShopOpt}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{t.payAtShopSub}</div>
              </div>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', border: '1.5px solid var(--border-color)', borderRadius: '12px', padding: '14px', marginTop: '10px', opacity: 0.5 }}>
              <input type="radio" disabled style={{ accentColor: 'var(--color-primary)', width: '18px', height: '18px' }} />
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700 }}>UPI / Razorpay</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{t.comingSoon}</div>
              </div>
            </label>
          </div>

          {/* Order summary */}
          <div style={{ backgroundColor: '#fff', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '18px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 12px' }}>{t.orderSummary}</h3>
            {cartItems.map((ci) => (
              <div key={ci.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', color: 'var(--text-secondary)', padding: '5px 0' }}>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%' }}>{ci.name} × {ci.qty}</span>
                <span style={{ fontWeight: 600, flexShrink: 0 }}>₹{ci.total}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 800, padding: '10px 0 4px', borderTop: '1px solid var(--border-color)', marginTop: '8px' }}>
              <span>{t.total}</span>
              <span style={{ color: 'var(--color-primary)' }}>₹{total}</span>
            </div>
          </div>

          {/* Desktop Place Order button (hidden on mobile — sticky bar handles it) */}
          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="desktop-cart-cta"
            style={{
              width: '100%', backgroundColor: 'var(--color-accent)', color: '#fff',
              border: 'none', fontSize: '16px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
              padding: '16px', borderRadius: '14px', minHeight: '54px',
              opacity: loading ? 0.75 : 1, transition: 'opacity 0.2s',
            }}
          >
            {loading ? '⏳ Placing order…' : `${t.placeOrder} →`}
          </button>
        </div>
      </section>

      {/* Sticky bottom CTA (mobile only) */}
      <div className="sticky-mobile-cta">
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, display: 'block' }}>{t.total}</span>
          <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-primary)' }}>₹{total}</span>
        </div>
        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          style={{
            backgroundColor: 'var(--color-accent)', color: '#fff',
            border: 'none', fontSize: '15px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
            padding: '14px 24px', borderRadius: '12px', minHeight: '50px',
            flex: 2, opacity: loading ? 0.75 : 1,
          }}
        >
          {loading ? '⏳ Placing…' : `${t.placeOrder} →`}
        </button>
      </div>
    </>
  );
};
