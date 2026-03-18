import React from 'react'

const PLANS = [
  { speed: '600', unit: 'Mega', tier: 'Família', priceInt: '89', priceDec: ',70', price: 89.70, feat: false, wifi: 'Wi-Fi 5', dl: 600 },
  { speed: '800', unit: 'Mega', tier: 'Premium', priceInt: '99', priceDec: ',70', price: 99.70, feat: true,  wifi: 'Wi-Fi 5', dl: 800 },
  { speed: '1',   unit: 'Giga', tier: 'Ultra',   priceInt: '119',priceDec: ',70', price: 119.70,feat: false, wifi: 'Wi-Fi 6', dl: 920 },
]

export default function Plans() {
  const goWhats = (plan) => window.open(`https://api.whatsapp.com/send?phone=558000202440&text=Ola,vi+no+site+e+quero+o+plano+${encodeURIComponent(plan)}`, '_blank')

  return (
    <section className="site-section" id="planos" style={{ background: 'var(--surface)' }}>
      <div className="site-container">
        <div style={{ marginBottom: 48 }}>
          <div className="site-kicker">Planos de fibra óptica</div>
          <h2 className="site-h2">As melhores opções<br />de planos para você!</h2>
          <p className="site-sub">Todos incluem instalação imediata, Wi-Fi Premium e velocidade simétrica — download = upload.</p>
        </div>
        <div className="plans-grid">
          {PLANS.map((p) => (
            <div key={p.speed} className={`plan-card${p.feat ? ' featured' : ''}`}>
              {p.feat && <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'var(--amber)', color: '#fff', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.07em', padding: '4px 16px', borderRadius: 20, whiteSpace: 'nowrap', boxShadow: '0 3px 12px rgba(245,162,0,.45)' }}>✦ Mais popular</div>}
              <div style={{ fontFamily: 'var(--font-d)', fontSize: 56, fontWeight: 800, letterSpacing: '-.05em', lineHeight: 1, color: p.feat ? 'transparent' : 'var(--blue)', background: p.feat ? 'linear-gradient(135deg,#5B9BFF,#fff)' : undefined, WebkitBackgroundClip: p.feat ? 'text' : undefined, backgroundClip: p.feat ? 'text' : undefined }}>{p.speed}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: p.feat ? 'rgba(255,255,255,.5)' : 'var(--l3)', marginBottom: 4 }}>{p.unit} simétrico</div>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em', color: p.feat ? 'rgba(255,255,255,.35)' : 'var(--l3)', marginBottom: 20 }}>{p.tier}</div>
              <div style={{ height: '0.5px', background: p.feat ? 'rgba(255,255,255,.1)' : 'rgba(60,60,67,.12)', marginBottom: 20 }} />
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 24 }}>
                {['Instalação Imediata', `Roteador ${p.wifi} Premium`, `Download ${p.dl} Mbps`, `Upload ${p.dl} Mbps`, 'Internet ilimitada', 'Sem redução de velocidade'].map((f) => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, color: p.feat ? 'rgba(255,255,255,.85)' : 'var(--l2)' }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', flexShrink: 0, background: p.feat ? 'rgba(255,255,255,.15)' : 'var(--blue-lt)', backgroundImage: p.feat ? "url(\"data:image/svg+xml,%3Csvg width='10' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 4l2.5 2.5L9 1' stroke='%23ffffff' stroke-width='1.7' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")" : "url(\"data:image/svg+xml,%3Csvg width='10' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 4l2.5 2.5L9 1' stroke='%231B4FA8' stroke-width='1.7' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")", backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: '10px' }} />
                    {f}
                  </li>
                ))}
              </ul>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 22 }}>
                <span style={{ fontSize: 17, fontWeight: 700, color: p.feat ? '#fff' : 'var(--l1)' }}>R$</span>
                <span style={{ fontFamily: 'var(--font-d)', fontSize: 44, fontWeight: 800, color: p.feat ? '#fff' : 'var(--l1)', letterSpacing: '-.04em', lineHeight: 1 }}>{p.priceInt}</span>
                <span style={{ fontSize: 22, fontWeight: 700, color: p.feat ? '#fff' : 'var(--l1)' }}>{p.priceDec}</span>
                <span style={{ fontSize: 13, color: p.feat ? 'rgba(255,255,255,.5)' : 'var(--l3)', fontWeight: 500, marginLeft: 2 }}>/mês</span>
              </div>
              <button
                onClick={() => goWhats(`${p.speed} ${p.unit}`)}
                className={p.feat ? 'plan-cta-featured' : 'plan-cta'}
              >
                Eu quero!
              </button>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', fontSize: 12.5, color: 'var(--l3)', marginTop: 22, paddingTop: 22, borderTop: '0.5px solid var(--sep)' }}>
          *Consulte condições. <a href="https://api.whatsapp.com/send/?phone=5508000202440" target="_blank" rel="noreferrer" style={{ color: 'var(--blue)', fontWeight: 700 }}>Dúvidas? Fale conosco →</a>
        </p>
      </div>
    </section>
  )
}
