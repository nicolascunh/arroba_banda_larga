import React from 'react'

const REVIEWS = [
  { body: 'Melhor internet da região! Faz 2 anos que uso e nunca me decepcionei. Quando tive um problema, o técnico veio no mesmo dia.', name: 'Beto Riter',       av: 'B', avBg: 'linear-gradient(135deg,#1B4FA8,#2060D4)' },
  { body: 'Atendimento de qualidade e respeito com o cliente. O mínimo precisa ser bem feito e a Arroba não deixa a desejar!',            name: 'Debora Sarah',    av: 'D', avBg: 'linear-gradient(135deg,#F5A200,#D98F00)' },
  { body: 'Excelente atendimento. Muito simpáticos e prestativos. A velocidade bate exatamente o contratado, sem aquelas quedas.',        name: 'Core. Rodrigo',   av: 'R', avBg: 'linear-gradient(135deg,#5856D6,#4745C8)' },
]

export default function Testimonials() {
  return (
    <section className="site-section" id="depoimentos" style={{ background: 'var(--bg)' }}>
      <div className="site-container">
        <div className="testimonials-header">
          <div>
            <div className="site-kicker">O que dizem os clientes</div>
            <h2 className="site-h2" style={{ marginBottom: 0 }}>+2.000 avaliações<br />no Google</h2>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: 'var(--amber)', fontSize: 22, letterSpacing: -1, marginBottom: 4 }} aria-label="5 estrelas">★★★★★</div>
            <div style={{ fontFamily: 'var(--font-d)', fontSize: 34, fontWeight: 800, color: 'var(--l1)', letterSpacing: '-.04em', lineHeight: 1 }}>4,9</div>
            <div style={{ fontSize: 12, color: 'var(--l3)', fontWeight: 500 }}>2.052 avaliações · Google</div>
          </div>
        </div>
        <div className="g3">
          {REVIEWS.map((r) => (
            <article key={r.name} className="testimonial-card">
              <div style={{ fontSize: 28, color: 'var(--amber)', marginBottom: 12 }} aria-hidden="true">"</div>
              <blockquote style={{ fontSize: 14, color: 'var(--l2)', lineHeight: 1.72, marginBottom: 18, fontStyle: 'italic' }}>{r.body}</blockquote>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: r.avBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: '#fff', flexShrink: 0 }}>{r.av}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--l1)' }}>{r.name}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--l3)' }}>Campos dos Goytacazes</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
