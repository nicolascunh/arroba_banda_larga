import React from 'react'

const STEPS = [
  { ico: '🔍', title: 'Consulte o CEP',  desc: 'Verifique se sua rua tem cobertura disponível' },
  { ico: '📋', title: 'Escolha o Plano', desc: '600 Mega, 800 Mega ou 1 Giga — conforme seu uso' },
  { ico: '📅', title: 'Agendamento',     desc: 'Escolha o dia e horário ideal para a instalação' },
  { ico: '🚀', title: 'Conectado!',      desc: 'Técnico instala e você já navega em fibra pura' },
]

export default function HowItWorks() {
  return (
    <section className="site-section" id="como-funciona" style={{ background: 'var(--surface)' }}>
      <div className="site-container">
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div className="site-kicker center">Processo simples</div>
          <h2 className="site-h2 center">Da consulta à internet<br />em até 48 horas</h2>
        </div>
        <div className="how-it-works-grid">
          <div className="how-it-works-line" />
          {STEPS.map((s, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 14px' }}>
              <div className="how-it-works-step" style={{ background: i === 0 ? 'var(--blue)' : 'var(--bg)', border: `1.5px solid ${i === 0 ? 'var(--blue)' : 'var(--sep)'}` }}>
                {s.ico}
              </div>
              <h3 style={{ fontFamily: 'var(--font-d)', fontSize: 15, fontWeight: 700, color: 'var(--l1)', marginBottom: 8 }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--l3)', lineHeight: 1.65 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
