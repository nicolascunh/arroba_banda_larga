import React, { useState } from 'react'

const ITEMS = [
  { q: 'O que é internet FTTH?',             a: 'FTTH (Fiber to the Home) significa fibra óptica direto à sua casa. Muito mais rápida, estável e resistente a interferências do que cabo coaxial ou par metálico.' },
  { q: 'A velocidade é realmente simétrica?', a: 'Sim! Upload = download conforme contratado. Ideal para home office, transmissões ao vivo e serviços em nuvem.' },
  { q: 'Tem limite de consumo (franquia)?',   a: 'Não! Todos os planos são ilimitados. Sem redução de velocidade e sem cobrança extra por consumo.' },
  { q: 'O roteador Wi-Fi está incluso?',      a: 'Sim! Todos incluem roteador Wi-Fi Premium. 600 e 800 Mega recebem Wi-Fi 5, e o 1 Giga recebe Wi-Fi 6 Premium.' },
  { q: 'Quanto tempo leva a instalação?',     a: 'Em endereços com infraestrutura disponível, a instalação pode ser feita no mesmo dia ou em até 48 horas.' },
  { q: 'Como funciona "Indique um amigo"?',   a: 'Ao indicar um amigo, você ganha desconto na próxima mensalidade e o amigo recebe super desconto na instalação. Fale via WhatsApp para participar!' },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section className="site-section" id="faq" style={{ background: 'var(--surface)' }}>
      <div className="site-container">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="site-kicker center">Dúvidas frequentes</div>
          <h2 className="site-h2 center">Perguntas e Respostas</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, maxWidth: 900, margin: '0 auto' }}>
          {ITEMS.map((it, i) => (
            <div key={i} className={`faq-item${open === i ? ' open' : ''}`}>
              <button onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '18px 22px', background: 'none', border: 'none', fontFamily: 'var(--font)', fontSize: 14, fontWeight: 700, color: open === i ? 'var(--blue)' : 'var(--l1)', textAlign: 'left', cursor: 'pointer', letterSpacing: '-.01em', transition: 'color .15s' }}>
                {it.q}
                <span style={{ width: 22, height: 22, borderRadius: '50%', background: open === i ? 'var(--blue-lt)' : 'var(--sep)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'transform .25s, background .15s', transform: open === i ? 'rotate(180deg)' : 'none' }} aria-hidden="true">
                  <svg width="10" height="7" viewBox="0 0 10 7" fill="none"><path d="M1 1l4 4 4-4" stroke={open === i ? 'var(--blue)' : 'var(--l2)'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </button>
              {open === i && (
                <div style={{ fontSize: 13.5, color: 'var(--l3)', lineHeight: 1.7, padding: '0 22px 18px', animation: 'fadeUp .2s ease' }}>
                  {it.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
