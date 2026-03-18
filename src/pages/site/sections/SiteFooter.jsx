import React from 'react'
import Logo from '@/components/shared/Logo'

const COLS = [
  { title: 'Planos',  links: [['#planos', '600 Mega — R$89,70/mês'], ['#planos', '800 Mega — R$99,70/mês'], ['#planos', '1 Giga — R$119,70/mês'], ['#contato', 'Plano Empresarial']] },
  { title: 'Empresa', links: [['https://www.arrobabandalarga.com.br/sobre', 'Quem Somos'], ['#diferenciais', 'Vantagens'], ['https://www.arrobabandalarga.com.br/blog/', 'Blog'], ['https://www.reachr.com.br', 'Trabalhe Conosco']] },
  { title: 'Suporte', links: [['https://central.arrobabandalarga.com.br', 'Central do Assinante'], ['https://wa.me/558000202440', '2ª Via de Boleto'], ['tel:08000202440', '0800 020 2440'], ['https://www.arrobabandalarga.com.br/new/politica-de-privacidade-2/', 'Privacidade']] },
]

const SOCIAL = [
  ['📘', 'https://facebook.com/arrobabandalarga', 'Facebook'],
  ['📷', 'https://instagram.com/arrobabandalarga', 'Instagram'],
  ['▶️', 'https://youtube.com/channel/UC-YJjbmFdNjxVUCvX1xyYEg', 'YouTube'],
  ['💼', 'https://br.linkedin.com/company/arroba-banda-larga', 'LinkedIn'],
]

export default function SiteFooter() {
  return (
    <footer style={{ background: '#1C1C1E', padding: '56px 24px 36px' }}>
      <div className="site-container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr repeat(3,1fr)', gap: 44, paddingBottom: 40, borderBottom: '0.5px solid rgba(255,255,255,.08)', marginBottom: 32 }}>
          <div>
            <Logo height={40} />
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.38)', lineHeight: 1.72, marginTop: 16, maxWidth: 260 }}>Internet 100% fibra óptica pra conectar a geração @. 16 anos em Campos dos Goytacazes.</p>
            <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,.22)', marginTop: 12, lineHeight: 1.6 }}>CNPJ: 12.458.616/0001-90<br />Av. Tancredo Neves, 104 — Campos dos Goytacazes/RJ</div>
            <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
              {SOCIAL.map(([ico, href, label]) => (
                <a key={ico} href={href} target="_blank" rel="noreferrer" className="footer-social-link" aria-label={label}>
                  {ico}
                </a>
              ))}
            </div>
          </div>
          {COLS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em', color: 'rgba(255,255,255,.3)', marginBottom: 14 }}>{col.title}</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map(([href, lbl]) => (
                  <li key={lbl}><a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="footer-link">{lbl}</a></li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,.25)' }}>© 2025 Arroba Banda Larga Eireli. Todos os direitos reservados.</span>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['Privacidade', 'https://www.arrobabandalarga.com.br/new/politica-de-privacidade-2/'], ['Termos', '#'], ['ANATEL', '#']].map(([l, h]) => (
              <a key={l} href={h} target={h.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="footer-bottom-link">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
