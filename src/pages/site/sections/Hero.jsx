import React from 'react'
import { MessageCircle } from 'lucide-react'

const PLANS_PREVIEW = [
  { speed: '1',   unit: 'Giga', dl: 920, ul: 920, wifi: 'Wi-Fi 6', price: 'R$119,70', top: true  },
  { speed: '800', unit: 'Mega', dl: 800, ul: 800, wifi: 'Wi-Fi 5', price: 'R$99,70',  top: false },
  { speed: '600', unit: 'Mega', dl: 600, ul: 600, wifi: 'Wi-Fi 5', price: 'R$89,70',  top: false },
]

export default function Hero() {
  return (
    <section id="hero" style={{ minHeight: '100vh', background: 'var(--dark)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', paddingTop: 'var(--nav-h)' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(27,79,168,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(27,79,168,.07) 1px,transparent 1px)', backgroundSize: '54px 54px', maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%,black 20%,transparent 90%)' }} />
      <div style={{ position: 'absolute', width: 'min(700px, 100vw)', height: 'min(700px, 100vw)', borderRadius: '50%', background: 'rgba(27,79,168,.16)', top: -200, right: -150, filter: 'blur(100px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 'min(450px, 80vw)', height: 'min(450px, 80vw)', borderRadius: '50%', background: 'rgba(245,162,0,.07)', bottom: -180, left: -100, filter: 'blur(90px)', pointerEvents: 'none' }} />
      <div aria-hidden="true" style={{ position: 'absolute', right: '-4%', top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--font-d)', fontSize: 'clamp(200px, 50vw, 560px)', fontWeight: 800, color: 'rgba(255,255,255,.017)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>@</div>

      <div className="site-container hero-grid">
        <div>
          <h1 className="fade-up-1" style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(36px,5vw,64px)', fontWeight: 800, color: '#fff', letterSpacing: '-.04em', lineHeight: 1.06, marginBottom: 22 }}>
            Fibra óptica pra<br />conectar a<br />geração <span className="hero-at">@</span>
          </h1>
          <p className="fade-up-2" style={{ fontSize: 'clamp(15px,1.5vw,18px)', color: 'rgba(255,255,255,.62)', lineHeight: 1.7, maxWidth: 440, marginBottom: 36 }}>
            Internet 100% FTTH simétrica. Velocidade real, instalação imediata e suporte humano de segunda a segunda das 08h às 00h.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', animation: 'fadeUp .6s .3s ease both' }}>
            <a href="#planos" className="btn-primary" style={{ fontSize: 15, padding: '14px 28px' }}>
              Ver planos a partir de R$89,70
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1.5 9.5l8-8M9.5 9.5V1.5h-8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <a href="https://api.whatsapp.com/send/?phone=5508000202440" target="_blank" rel="noreferrer" className="hero-whatsapp-btn">
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
          <div className="hero-badges" style={{ animation: 'fadeUp .6s .4s ease both' }}>
            {['Instalação Imediata', 'Wi-Fi Premium incluso', 'Sem redução de velocidade', 'Suporte 7 dias por semana'].map((b) => (
              <div key={b} className="hero-badge-pill">
                <span style={{ color: 'var(--amber)', fontWeight: 800, fontSize: 11 }}>✓</span>{b}
              </div>
            ))}
          </div>
        </div>

        <div className="hero-plans-col" style={{ animation: 'fadeUp .7s .2s ease both', position: 'relative' }}>
          <div className="hero-plans-glow" />
          {PLANS_PREVIEW.map((p, i) => (
            <a href="#planos" key={i} className={`hero-plan-card${p.top ? ' hero-plan-featured' : ''}`}>
              <div>
                <div style={{ fontFamily: 'var(--font-d)', fontSize: p.top ? 36 : 28, fontWeight: 800, color: '#fff', letterSpacing: '-.04em', lineHeight: 1 }}>{p.speed}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', fontWeight: 600, textTransform: 'uppercase' }}>{p.unit}</div>
              </div>
              <div style={{ flex: 1, padding: '0 8px' }}>
                <div style={{ fontSize: 11.5, color: p.top ? 'rgba(255,255,255,.8)' : 'rgba(255,255,255,.65)' }}>↓ {p.dl} Mbps · ↑ {p.ul} Mbps</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.4)', marginTop: 2 }}>{p.wifi} Premium</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                {p.top && <div className="hero-plan-badge">★ Mais popular</div>}
                <div style={{ fontFamily: 'var(--font-d)', fontSize: p.top ? 24 : 20, fontWeight: 800, color: '#fff', letterSpacing: '-.03em', lineHeight: 1 }}>{p.price}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,.45)', marginTop: 1 }}>/mês</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--amber)', marginTop: 6 }}>Quero esse →</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
