import React, { useState } from 'react';

interface LoginProps {
  t: any;
  onLoginSuccess: () => void;
  onToast: (msg: string) => void;
  lang: 'en' | 'hi';
}

export const Login: React.FC<LoginProps> = ({ t, onLoginSuccess, onToast, lang }) => {
  const [screen, setScreen] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const handleSendOtp = () => {
    if (phone.trim().length >= 10) {
      setScreen('otp');
      onToast(lang === 'hi' ? 'OTP भेज दिया गया है' : 'OTP sent successfully');
    } else {
      onToast(lang === 'hi' ? '10 अंकों का नंबर डालें' : 'Enter a 10-digit number');
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length === 4) {
      onLoginSuccess();
      onToast(lang === 'hi' ? 'लॉगिन सफल!' : 'Login successful!');
    } else {
      onToast(lang === 'hi' ? '4 अंक डालें' : 'Enter 4 digits');
    }
  };

  const handleThirdPartyLogin = (provider: 'google' | 'devfrogs') => {
    onLoginSuccess();
    onToast(lang === 'hi' ? `${provider} लॉगिन सफल!` : `${provider} login successful!`);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value.replace(/\D/g, '').slice(0, 10));
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value.replace(/\D/g, '').slice(0, 4));
  };

  return (
    <section style={{ maxWidth: '420px', margin: '0 auto', padding: '56px 24px 72px' }} className="animate-fade-up">
      <div style={{ backgroundColor: '#fff', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span style={{ fontSize: '26px', fontWeight: 700, fontFamily: "'Instrument Serif', Georgia, serif", color: 'var(--color-primary)', letterSpacing: '0.5px', lineHeight: 1 }}>ARLI</span>
            <span style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--color-primary)', lineHeight: 1 }}>FASHION</span>
          </div>
          <span style={{ fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '0.4px', fontWeight: 500, fontStyle: 'italic', marginTop: '2px', lineHeight: 1 }}>by fashion vendors</span>
        </div>
        {screen === 'phone' ? (
          <div>
            <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '32px', fontWeight: 400, margin: '0 0 6px' }}>
              {t.loginTitle}
            </h1>
            <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', margin: '0 0 24px' }}>
              {t.loginSub}
            </p>
            <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {t.phoneLabel}
            </label>
            <div style={{ display: 'flex', gap: '8px', margin: '6px 0 18px' }}>
              <span style={{ border: '1.5px solid var(--border-color)', borderRadius: '10px', padding: '12px 12px', fontSize: '14px', backgroundColor: '#F5EFE1', color: 'var(--text-secondary)', fontWeight: 600 }}>+91</span>
              <input
                value={phone}
                onChange={handlePhoneChange}
                placeholder="98765 43210"
                style={{ flex: 1, border: '1.5px solid var(--border-color)', borderRadius: '10px', padding: '12px 14px', fontSize: '15px', outline: 'none' }}
              />
            </div>
            <button
              onClick={handleSendOtp}
              style={{ width: '100%', backgroundColor: 'var(--color-primary)', color: '#FAF5EC', border: 'none', fontSize: '15px', fontWeight: 700, cursor: 'pointer', padding: '14px', borderRadius: '12px' }}
            >
              {t.sendOtp}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }} />
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{t.or}</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }} />
            </div>

            {/* STACKED GOOGLE AND DEVFROGS LOGINS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => handleThirdPartyLogin('google')}
                style={{ width: '100%', backgroundColor: '#fff', color: 'var(--text-primary)', border: '1.5px solid var(--border-color)', fontSize: '14px', fontWeight: 600, cursor: 'pointer', padding: '13px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
              >
                <span style={{ fontWeight: 800, color: '#4285F4' }}>G</span> {t.googleBtn}
              </button>
              <button
                onClick={() => handleThirdPartyLogin('devfrogs')}
                style={{ width: '100%', backgroundColor: '#fff', color: 'var(--text-primary)', border: '1.5px solid var(--border-color)', fontSize: '14px', fontWeight: 600, cursor: 'pointer', padding: '13px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
              >
                <span style={{ fontSize: '16px' }}>🐸</span> {t.devfrogsBtn || 'Continue with Devfrogs'}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '32px', fontWeight: 400, margin: '0 0 6px' }}>
              {t.otpTitle}
            </h1>
            <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', margin: '0 0 6px' }}>
              {t.otpSub} <b style={{ color: 'var(--text-primary)' }}>+91 {phone}</b>
            </p>
            <p style={{ fontSize: '12px', color: '#A5732A', margin: '0 0 22px' }}>
              {t.otpHint}
            </p>
            <input
              value={otp}
              onChange={handleOtpChange}
              maxLength={4}
              placeholder="• • • •"
              style={{ width: '100%', border: '1.5px solid var(--border-color)', borderRadius: '12px', padding: '16px', fontSize: '28px', letterSpacing: '18px', textAlign: 'center', outline: 'none', fontWeight: 700 }}
            />
            <button
              onClick={handleVerifyOtp}
              style={{ width: '100%', backgroundColor: 'var(--color-accent)', color: '#fff', border: 'none', fontSize: '15px', fontWeight: 700, cursor: 'pointer', padding: '14px', borderRadius: '12px', marginTop: '18px' }}
            >
              {t.verify}
            </button>
            <button
              onClick={() => setScreen('phone')}
              style={{ width: '100%', background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '13px', fontWeight: 600, cursor: 'pointer', padding: '12px', marginTop: '6px' }}
            >
              {t.changeNumber}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
