import React from 'react'

const PLANS_PREVIEW = [
  { speed: '1',   unit: 'Giga', dl: 920, ul: 920, wifi: 'Wi-Fi 6', price: 'R$119,70', top: true  },
  { speed: '800', unit: 'Mega', dl: 800, ul: 800, wifi: 'Wi-Fi 5', price: 'R$99,70',  top: false },
  { speed: '600', unit: 'Mega', dl: 600, ul: 600, wifi: 'Wi-Fi 5', price: 'R$89,70',  top: false },
]

export default function Hero() {
  return (
    <section id="hero" style={{ minHeight: '100vh', background: 'var(--dark)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', paddingTop: 'var(--nav-h)' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(27,79,168,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(27,79,168,.07) 1px,transparent 1px)', backgroundSize: '54px 54px', maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%,black 20%,transparent 90%)' }} />
      <div style={{ position: 'absolute', width: 700, height: 700, borderRadius: '50%', background: 'rgba(27,79,168,.16)', top: -200, right: -150, filter: 'blur(100px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 450, height: 450, borderRadius: '50%', background: 'rgba(245,162,0,.07)', bottom: -180, left: -100, filter: 'blur(90px)', pointerEvents: 'none' }} />
      <div aria-hidden="true" style={{ position: 'absolute', right: '-4%', top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--font-d)', fontSize: 560, fontWeight: 800, color: 'rgba(255,255,255,.017)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>@</div>

      <div className="site-container hero-grid">
        <div>
          <div className="fade-up-1" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(245,162,0,.12)', border: '1px solid rgba(245,162,0,.25)', color: 'var(--amber)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em', padding: '5px 14px', borderRadius: 20, marginBottom: 28 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--amber)', animation: 'blink 2s ease infinite' }} />
            16 anos conectando Campos dos Goytacazes
          </div>
          <h1 className="fade-up-2" style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(36px,5vw,64px)', fontWeight: 800, color: '#fff', letterSpacing: '-.04em', lineHeight: 1.06, marginBottom: 22 }}>
            Fibra óptica pra<br />conectar a<br />geração <span style={{ color: 'var(--amber)' }}>@</span>
          </h1>
          <p className="fade-up-3" style={{ fontSize: 'clamp(15px,1.5vw,18px)', color: 'rgba(255,255,255,.62)', lineHeight: 1.7, maxWidth: 440, marginBottom: 36 }}>
            Internet 100% FTTH simétrica. Velocidade real, instalação imediata e suporte humano de segunda a segunda das 08h às 00h.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', animation: 'fadeUp .6s .35s ease both' }}>
            <a href="#planos" className="btn-primary" style={{ fontSize: 15, padding: '14px 28px' }}>
              Ver planos a partir de R$89,70
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1.5 9.5l8-8M9.5 9.5V1.5h-8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <a href="https://api.whatsapp.com/send/?phone=5508000202440" target="_blank" rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 700, color: 'rgba(255,255,255,.85)', background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.15)', borderRadius: 'var(--r-sm)', padding: '13px 24px' }}>
              💬 WhatsApp
            </a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 36, flexWrap: 'wrap', animation: 'fadeUp .6s .45s ease both' }}>
            {['Instalação Imediata', 'Wi-Fi Premium incluso', 'Sem redução de velocidade', 'Suporte 7 dias por semana'].map((b) => (
              <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: 'rgba(255,255,255,.5)', fontWeight: 500 }}>
                <span style={{ color: 'var(--amber)', fontWeight: 800 }}>✓</span>{b}
              </div>
            ))}
          </div>
        </div>

        <div className="hero-plans-col" style={{ animation: 'fadeUp .7s .2s ease both' }}>
          {PLANS_PREVIEW.map((p, i) => (
            <a href="#planos" key={i} className="hero-plan-card" style={{
              background: p.top ? 'linear-gradient(135deg,rgba(27,79,168,.25),rgba(27,79,168,.12))' : 'rgba(255,255,255,.05)',
              border: `1px solid ${p.top ? 'rgba(27,79,168,.5)' : 'rgba(255,255,255,.09)'}`,
              borderRadius: 'var(--r-md)', padding: '18px 22px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
              cursor: 'pointer', position: 'relative', overflow: 'hidden',
              transition: 'transform .2s, border-color .2s',
            }}>
              {i === 0 && <div style={{ position: 'absolute', top: 0, right: 20, background: 'var(--amber)', color: '#fff', fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.05em', padding: '4px 10px', borderRadius: '0 0 8px 8px' }}>★ Topo</div>}
              <div>
                <div style={{ fontFamily: 'var(--font-d)', fontSize: 30, fontWeight: 800, color: '#fff', letterSpacing: '-.04em', lineHeight: 1 }}>{p.speed}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', fontWeight: 600, textTransform: 'uppercase' }}>{p.unit}</div>
              </div>
              <div style={{ flex: 1, padding: '0 8px' }}>
                <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,.65)' }}>↓ {p.dl} Mbps · ↑ {p.ul} Mbps</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.4)', marginTop: 2 }}>{p.wifi} Premium</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontFamily: 'var(--font-d)', fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-.03em', lineHeight: 1 }}>{p.price}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,.45)', marginTop: 1 }}>/mês</div>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--amber)', marginTop: 5 }}>Quero esse →</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
