import React, { useState } from 'react';
import type { Message } from '../types';

interface ChatProps {
  t: any;
  lang: 'en' | 'hi';
  onToast: (msg: string) => void;
  initialShopName?: string;
}

export const Chat: React.FC<ChatProps> = ({ t, lang, onToast, initialShopName }) => {
  const shopName = initialShopName || (lang === 'hi' ? 'सामान्य दर्जी सहायता' : 'General Tailor Support');
  const [messages, setMessages] = useState<Message[]>([
    {
      align: 'flex-start',
      bg: '#fff',
      fg: 'var(--text-primary)',
      text: lang === 'hi'
        ? `नमस्ते! मैं ${shopName} से हूँ। मैं आपकी आज कैसे मदद कर सकता हूँ?`
        : `Hello! I am from ${shopName}. How can I assist you with tailoring or ordering today?`
    }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      align: 'flex-end',
      bg: 'var(--color-primary)',
      fg: '#FAF5EC',
      text: input
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    // Mock auto-reply simulation
    setTimeout(() => {
      setTyping(false);
      const replyMsg: Message = {
        align: 'flex-start',
        bg: '#fff',
        fg: 'var(--text-primary)',
        text: lang === 'hi'
          ? 'आपका संदेश मिल गया है! हम 10 मिनट में जवाब देंगे।'
          : 'Thank you for reaching out! We have received your query and will reply within 10 minutes.'
      };
      setMessages((prev) => [...prev, replyMsg]);
    }, 1500);
  };

  const handleShareMeas = () => {
    onToast(t.toastMeasShared || 'Measurements shared successfully!');
    const systemMsg: Message = {
      align: 'flex-end',
      bg: '#EDF0F7',
      fg: 'var(--color-primary)',
      text: '📏 Shared saved body measurements: Chest 38", Waist 32", Hip 40", Shoulder 17"'
    };
    setMessages((prev) => [...prev, systemMsg]);
  };

  return (
    <section style={{ maxWidth: '640px', margin: '0 auto', padding: '28px 24px 60px' }} className="animate-fade-up">
      <div style={{ backgroundColor: '#fff', border: '1px solid var(--border-color)', borderRadius: '20px', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '600px' }}>
        
        {/* Chat header */}
        <div style={{ backgroundColor: 'var(--color-primary)', color: '#FAF5EC', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-warning)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>✂️</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '15px', fontWeight: 700 }}>{shopName}</div>
            <div style={{ fontSize: '12px', opacity: 0.75 }}>● {t.online || 'Online'} · {t.repliesFast || 'replies fast'}</div>
          </div>
        </div>

        {/* Message logs */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: 'var(--bg-primary)' }} className="hscroll">
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                alignSelf: m.align,
                maxWidth: '78%',
                backgroundColor: m.bg,
                color: m.fg,
                padding: '10px 14px',
                borderRadius: '14px',
                fontSize: '14px',
                lineHeight: 1.5,
                whiteSpace: 'pre-line',
                border: m.align === 'flex-start' ? '1px solid var(--border-color)' : 'none',
              }}
            >
              {m.text}
            </div>
          ))}
          {typing && (
            <div style={{ alignSelf: 'flex-start', backgroundColor: '#fff', border: '1px solid var(--border-color)', padding: '10px 16px', borderRadius: '14px', fontSize: '14px', color: 'var(--text-muted)' }}>
              {t.typing || 'Typing'}…
            </div>
          )}
        </div>

        {/* Input bar */}
        <div style={{ borderTop: '1px solid var(--border-color)', padding: '10px 14px', backgroundColor: '#fff' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={handleShareMeas}
              style={{ backgroundColor: '#EDF0F7', color: 'var(--color-primary)', border: '1px solid #C6CFE3', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer', padding: '6px 12px', borderRadius: '999px' }}
            >
              📏 {t.shareMeas}
            </button>
            <button
              onClick={() => setInput(lang === 'hi' ? 'सबसे अच्छा दाम क्या है?' : 'What is the best price for this custom kurta?')}
              style={{ backgroundColor: '#F5EFE1', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer', padding: '6px 12px', borderRadius: '999px' }}
            >
              {t.askPrice}
            </button>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t.chatPh || 'Type a message…'}
              style={{ flex: 1, border: '1.5px solid #D8CDB4', borderRadius: '999px', padding: '11px 18px', fontSize: '14px', outline: 'none' }}
            />
            <button
              onClick={handleSend}
              style={{ backgroundColor: 'var(--color-accent)', color: '#fff', border: 'none', fontSize: '14px', fontWeight: 700, cursor: 'pointer', padding: '0 22px', borderRadius: '999px' }}
            >
              ➤
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
