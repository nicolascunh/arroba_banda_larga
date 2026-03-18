import React from 'react'
import { Gift, PartyPopper } from 'lucide-react'

export default function Promo() {
  return (
    <section style={{ background: 'linear-gradient(135deg,var(--blue-dkr),var(--blue) 50%,#1E63D6)', padding: '80px 24px', position: 'relative', overflow: 'hidden' }} aria-label="Promoção indique um amigo">
      <div style={{ position: 'absolute', inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='.8' fill='rgba(255,255,255,0.06)'/%3E%3C/svg%3E\")", backgroundRepeat: 'repeat', pointerEvents: 'none' }} />
      <div className="site-container promo-grid">
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(245,162,0,.2)', border: '1px solid rgba(245,162,0,.35)', color: 'var(--amber)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em', padding: '5px 14px', borderRadius: 20, marginBottom: 18 }}><Gift size={14} /> Promoção exclusiva</div>
          <h2 style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 800, color: '#fff', letterSpacing: '-.025em', lineHeight: 1.2, marginBottom: 14 }}>Indique um amigo<br />e ganhe prêmios!</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,.72)', lineHeight: 1.65, maxWidth: 440 }}>Ao indicar um amigo você ganha desconto na próxima mensalidade e ele ganha super desconto na instalação.</p>
          <a href="https://api.whatsapp.com/send/?phone=5508000202440&text=Quero+indicar+um+amigo" target="_blank" rel="noreferrer" className="promo-cta">
            <PartyPopper size={16} /> Indicar agora mesmo
          </a>
        </div>
        <div className="promo-emoji" style={{ animation: 'float 4s ease-in-out infinite' }} aria-hidden="true"><Gift size={80} color="rgba(255,255,255,0.9)" strokeWidth={1.5} /></div>
      </div>
    </section>
  )
}
