import React from 'react'

const STORES = [
  { label: 'App Store', sub: 'Disponível na', href: 'https://apps.apple.com/br/app/arroba-internet-banda-larga/id1569041426', ico: '🍎' },
  { label: 'Google Play', sub: 'Disponível no', href: 'https://play.google.com/store/apps/details?id=br.com.arrobanettv.central', ico: '🤖' },
]

const FEATURES = [
  'Pague faturas e 2ª via com 1 toque',
  'Abra chamados e acompanhe em tempo real',
  'Teste de velocidade integrado',
  'Notificações de vencimento e manutenção',
]

export default function AppSection() {
  return (
    <section className="site-section" id="app" style={{ background: 'var(--dark)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 30% 50%,rgba(27,79,168,.15),transparent)', pointerEvents: 'none' }} />
      <div className="site-container" style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 64, position: 'relative', zIndex: 1 }}>
        <div>
          <div className="site-kicker amber">App Arroba</div>
          <h2 style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 800, color: '#fff', letterSpacing: '-.025em', lineHeight: 1.2, marginBottom: 14 }}>Tudo na palma<br />da sua mão</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,.6)', lineHeight: 1.65, maxWidth: 420, marginBottom: 28 }}>Pague faturas, abra chamados, consulte consumo e teste sua velocidade — iOS e Android.</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {STORES.map((a) => (
              <a key={a.label} href={a.href} target="_blank" rel="noreferrer" className="app-store-btn">
                <span style={{ fontSize: 22 }}>{a.ico}</span>
                <div><div style={{ fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,.5)' }}>{a.sub}</div>{a.label}</div>
              </a>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginTop: 28 }}>
            {FEATURES.map((f) => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: 'rgba(255,255,255,.7)' }}>
                <div style={{ width: 20, height: 20, borderRadius: 6, flexShrink: 0, background: 'rgba(27,79,168,.4)', backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='10' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 4l2.5 2.5L9 1' stroke='%235B9BFF' stroke-width='1.7' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")", backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: '10px' }} />
                {f}
              </div>
            ))}
          </div>
        </div>
        {/* Phone mockups */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexShrink: 0 }} aria-hidden="true">
          {[{ mt: 30 }, { mt: 0 }].map((ph, pi) => (
            <div key={pi} style={{ width: 130, background: 'var(--dark3)', borderRadius: 26, padding: 3, border: '1px solid rgba(255,255,255,.12)', boxShadow: '0 20px 60px rgba(0,0,0,.4)', marginTop: ph.mt }}>
              <div style={{ background: 'var(--dark)', borderRadius: 24, overflow: 'hidden' }}>
                <div style={{ background: 'var(--blue)', height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 44, height: 14, background: 'rgba(0,0,0,.4)', borderRadius: 7 }} />
                </div>
                <div style={{ background: '#F2F2F7', padding: 10, display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {pi === 0 ? (
                    <>
                      <div style={{ background: 'linear-gradient(135deg,#1B4FA8,#2060D4)', borderRadius: 12, padding: 12 }}>
                        <div style={{ fontSize: 8, color: 'rgba(255,255,255,.6)', marginBottom: 2 }}>Plano Ativo</div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: '-.02em' }}>800 Mega</div>
                        <div style={{ fontSize: 8, color: 'rgba(255,255,255,.55)', marginTop: 2 }}>● Conexão Ativa</div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
                        {['💳 Pagar', '⚡ Velocidade'].map((b) => <div key={b} style={{ background: '#fff', borderRadius: 9, padding: 8, textAlign: 'center', fontSize: 8, fontWeight: 600, color: '#1B4FA8' }}>{b}</div>)}
                      </div>
                      <div style={{ background: '#fff', borderRadius: 9, padding: 8 }}>
                        <div style={{ fontSize: 8, fontWeight: 700, color: '#000', marginBottom: 3 }}>Próxima fatura</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ fontSize: 8, color: '#8E8E93' }}>15/03</div>
                          <div style={{ fontSize: 13, fontWeight: 800, color: '#FF9500', letterSpacing: '-.02em' }}>R$99,70</div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '6px 0' }}>
                      <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'conic-gradient(#007AFF 0deg 290deg,rgba(60,60,67,.1) 290deg 360deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 6 }}>
                        <div style={{ width: 62, height: 62, borderRadius: '50%', background: '#F2F2F7', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                          <div style={{ fontSize: 16, fontWeight: 800, color: '#007AFF', letterSpacing: '-.03em' }}>763</div>
                          <div style={{ fontSize: 7, color: '#8E8E93' }}>Mbps</div>
                        </div>
                      </div>
                      <div style={{ fontSize: 9, color: '#34C759', fontWeight: 700 }}>✓ Velocidade OK</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
