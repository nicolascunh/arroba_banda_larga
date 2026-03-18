import React from 'react'

const ITEMS = [
  { ico: '📡', title: '100% Fibra Óptica FTTH',    desc: 'A fibra vai direto até sua casa. Sem coaxial, sem par metálico, sem perda de sinal.', bg: 'rgba(27,79,168,.1)' },
  { ico: '⚡', title: 'Velocidade Simétrica Real', desc: 'Download = upload, garantido em contrato. Sem redução, sem enrolação, sem asterisco.', bg: 'rgba(52,199,89,.1)' },
  { ico: '🏆', title: 'Setor de Qualidade',        desc: 'O setor de qualidade mais eficaz da região. Cuida de você antes, durante e após a instalação.', bg: 'rgba(245,162,0,.12)' },
  { ico: '🛡️',title: 'Estabilidade Premium',      desc: 'Alta tecnologia e infraestrutura de ponta. Monitoramento 24h para sua tranquilidade.', bg: 'rgba(255,59,48,.08)' },
  { ico: '🎮', title: 'Conexão Turbo Wi-Fi',       desc: 'Wi-Fi 5 e Wi-Fi 6 Premium inclusos. Ultravelocidade para games, streaming e toda a família.', bg: 'rgba(88,86,214,.1)' },
  { ico: '🤝', title: 'Suporte Humanizado',        desc: 'Segunda a segunda das 08h às 00h. Via WhatsApp, telefone e app. Pessoas reais resolvendo rápido.', bg: 'rgba(0,0,0,.05)' },
]

export default function Features() {
  return (
    <section className="site-section" id="diferenciais" style={{ background: 'var(--bg)' }}>
      <div className="site-container">
        <div style={{ marginBottom: 48 }}>
          <div className="site-kicker">Por que escolher a Arroba?</div>
          <h2 className="site-h2">16 anos conectando você<br />à melhor experiência</h2>
        </div>
        <div className="g3">
          {ITEMS.map((it) => (
            <article key={it.title} className="feature-card">
              <div style={{ width: 46, height: 46, borderRadius: 13, background: it.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 16 }}>{it.ico}</div>
              <h3 style={{ fontFamily: 'var(--font-d)', fontSize: 16, fontWeight: 700, color: 'var(--l1)', letterSpacing: '-.015em', marginBottom: 7 }}>{it.title}</h3>
              <p style={{ fontSize: 13.5, color: 'var(--l3)', lineHeight: 1.7 }}>{it.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
