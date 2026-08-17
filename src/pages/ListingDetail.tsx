import React, { useState } from 'react';
import type { Listing, Review } from '@arli/contracts';
import { ReviewCard } from '../components/ReviewCard';

interface ListingDetailProps {
  item: Listing | null;
  t: any;
  lang: 'en' | 'hi';
  onBack: () => void;
  onAddToCart: (qty: number, attachMeas: boolean, designImg: File | null) => void;
  onChatWithShop: (shopName: string) => void;
}

export const ListingDetail: React.FC<ListingDetailProps> = ({
  item,
  t,
  lang,
  onBack,
  onAddToCart,
  onChatWithShop,
}) => {
  if (!item) return <div style={{ padding: '40px', textAlign: 'center' }}>No listing selected.</div>;

  const [qty, setQty] = useState(1);
  const [attachMeas, setAttachMeas] = useState(false);
  const [designFile, setDesignFile] = useState<File | null>(null);
  
  // Custom body measurements state
  const [meas, setMeas] = useState({
    chest: '38',
    waist: '32',
    hip: '40',
    shoulder: '17',
    sleeve: '24',
    length: '42'
  });

  const name = item.name[lang];
  const shop = item.shop[lang];
  const desc = item.desc[lang];
  
  // Custom reviews list is modeled locally or empty - we keep a few structured sample reviews for preview
  const reviews: Review[] = [
    { who: 'Sneha K.', stars: '★★★★★', text: lang === 'hi' ? 'बहुत अच्छी फिटिंग और कपड़ा भी शानदार है।' : 'Perfect stitching! Saved measurements made it so easy.' },
    { who: 'Amit V.', stars: '★★★★☆', text: lang === 'hi' ? 'दाम सही है और टेलर ने समय पर डिलीवरी दी।' : 'Very professional service. Deliver on time as promised.' },
  ];

  const qtyPlus = () => setQty((prev) => prev + 1);
  const qtyMinus = () => setQty((prev) => (prev > 1 ? prev - 1 : 1));

  const weaveStyle = {
    backgroundColor: item.base,
    backgroundImage: `repeating-linear-gradient(45deg, ${item.base} 0px, ${item.base} 9px, ${item.acc} 9px, ${item.acc} 11px)`
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDesignFile(e.target.files[0]);
    }
  };

  return (
    <section style={{ maxWidth: '1080px', margin: '0 auto', padding: '28px 24px 72px' }} className="animate-fade-up">
      <button
        onClick={onBack}
        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '13.5px', fontWeight: 600, cursor: 'pointer', padding: 0, marginBottom: '20px' }}
      >
        ← {t.backToExplore}
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
        {/* Left Side: Images */}
        <div style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border-color)', backgroundColor: item.base }}>
          <div style={{ height: '380px', ...weaveStyle, position: 'relative', overflow: 'hidden' }}>
            {item.img && (
              <img src={item.img} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            )}
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, height: '64px', ...weaveStyle, opacity: 0.85, borderRight: '2px solid #FAF5EC', position: 'relative', overflow: 'hidden' }}>
              {item.img && <img src={item.img} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
            </div>
            <div style={{ flex: 1, height: '64px', ...weaveStyle, opacity: 0.65, borderRight: '2px solid #FAF5EC', position: 'relative', overflow: 'hidden' }}>
              {item.img && <img src={item.img} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.9)' }} />}
            </div>
            <div style={{ flex: 1, height: '64px', ...weaveStyle, opacity: 0.45, position: 'relative', overflow: 'hidden' }}>
              {item.img && <img src={item.img} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(0.2)' }} />}
            </div>
          </div>
        </div>

        {/* Right Side: Details & Options */}
        <div>
          {item.sponsored && (
            <span style={{ display: 'inline-block', backgroundColor: 'var(--color-warning)', color: 'var(--text-primary)', fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '999px', marginBottom: '10px' }}>
              {t.sponsored}
            </span>
          )}
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '38px', fontWeight: 400, margin: '0 0 6px', lineHeight: 1.1 }}>
            {name}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', fontSize: '13.5px' }}>
            <span style={{ color: '#A5732A', fontWeight: 700 }}>★ {item.rating}</span>
            <span style={{ color: 'var(--text-muted)' }}>({item.reviews} {t.reviewsWord})</span>
            <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>{shop}</span>
            <span style={{ color: 'var(--text-muted)' }}>· {item.pincode}</span>
          </div>

          <p style={{ fontSize: '14.5px', lineHeight: 1.6, color: 'var(--text-secondary)', margin: '0 0 20px' }}>
            {desc}
          </p>

          <div style={{ fontSize: '30px', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '20px' }}>
            ₹{item.price}
            <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-muted)' }}>
              {item.cat === 'fabric' ? ` / ${t.qtyMeters || 'meter'}` : ` / ${t.qtyPieces || 'pcs'}`}
            </span>
          </div>

          {/* Quantity selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
            <span style={{ fontSize: '13.5px', fontWeight: 600 }}>
              {item.cat === 'fabric' ? t.qtyMeters : t.qtyPieces}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--border-color)', borderRadius: '10px', overflow: 'hidden', backgroundColor: '#fff' }}>
              <button onClick={qtyMinus} style={{ width: '38px', height: '38px', border: 'none', background: 'none', fontSize: '18px', cursor: 'pointer', color: 'var(--color-primary)' }}>−</button>
              <span style={{ width: '44px', textAlign: 'center', fontSize: '15px', fontWeight: 700 }}>{qty}</span>
              <button onClick={qtyPlus} style={{ width: '38px', height: '38px', border: 'none', background: 'none', fontSize: '18px', cursor: 'pointer', color: 'var(--color-primary)' }}>+</button>
            </div>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              {t.subtotal}: <b style={{ color: 'var(--text-primary)' }}>₹{item.price * qty}</b>
            </span>
          </div>

          {/* Optional Measurements checklist */}
          {item.measurable && (
            <div style={{ backgroundColor: '#fff', border: '1.5px solid var(--border-color)', borderRadius: '14px', padding: '16px', marginBottom: '18px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={attachMeas}
                  onChange={(e) => setAttachMeas(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '14px', fontWeight: 700 }}>📏 {t.attachMeas}</span>
              </label>
              <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', margin: '6px 0 0 28px' }}>{t.attachMeasSub}</p>
              
              {attachMeas && (
                <div style={{ margin: '14px 0 0 28px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {Object.entries(meas).map(([field, value]) => (
                    <div key={field} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{field}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <input
                          value={value}
                          onChange={(e) => setMeas({ ...meas, [field]: e.target.value })}
                          style={{ width: '52px', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '6px 8px', fontSize: '13px', outline: 'none' }}
                        />
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>in</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Optional Sketch/Image uploads */}
          {item.measurable && (
            <div style={{ backgroundColor: '#fff', border: '1.5px dashed #C9BC9C', borderRadius: '14px', padding: '16px', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700 }}>📎 {t.uploadDesign || 'Upload Design Reference'}</div>
                  <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '2px' }}>{t.uploadDesignSub || 'Photo of layout reference'}</div>
                </div>
                <label style={{ backgroundColor: 'var(--color-primary)', color: '#FAF5EC', fontSize: '12.5px', fontWeight: 700, cursor: 'pointer', padding: '10px 16px', borderRadius: '10px' }}>
                  <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                  {t.chooseFile || 'Choose File'}
                </label>
              </div>
              {designFile && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '14px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-success)' }}>✓ {t.designAttached || 'File loaded'} ({designFile.name})</span>
                  <button onClick={() => setDesignFile(null)} style={{ background: 'none', border: 'none', color: 'var(--color-accent)', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>
                    {t.removeFile || 'Remove'}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => onAddToCart(qty, attachMeas, designFile)}
              style={{ flex: 1, backgroundColor: 'var(--color-accent)', color: '#fff', border: 'none', fontSize: '15px', fontWeight: 700, cursor: 'pointer', padding: '15px', borderRadius: '12px' }}
            >
              {t.addToCart}
            </button>
            <button
              onClick={() => onChatWithShop(item.shop[lang])}
              style={{ flex: 1, backgroundColor: '#fff', color: 'var(--color-primary)', border: '1.5px solid var(--color-primary)', fontSize: '15px', fontWeight: 700, cursor: 'pointer', padding: '15px', borderRadius: '12px' }}
            >
              💬 {t.chatWithShop}
            </button>
          </div>
          <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '14px' }}>🏪 {t.payAtShop}</p>
        </div>
      </div>

      {/* Reviews block */}
      <div style={{ marginTop: '48px' }}>
        <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '26px', fontWeight: 400, margin: '0 0 16px' }}>{t.reviewsTitle}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {reviews.map((rv, index) => (
            <ReviewCard key={index} review={rv} />
          ))}
        </div>
      </div>
    </section>
  );
};
