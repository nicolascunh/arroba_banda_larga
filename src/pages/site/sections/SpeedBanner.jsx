import React, { useState } from 'react'

export default function SpeedBanner() {
  const [val, setVal] = useState(0)
  const [running, setRunning] = useState(false)

  const run = () => {
    if (running) return
    setRunning(true)
    const target = 700 + Math.round(Math.random() * 200)
    const start = performance.now(), dur = 2000
    const step = (ts) => {
      const p = Math.min((ts - start) / dur, 1)
      const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2
      setVal(Math.round(e * target))
      if (p < 1) requestAnimationFrame(step)
      else setRunning(false)
    }
    requestAnimationFrame(step)
  }

  const r = 75, circ = 2 * Math.PI * r, arc = circ * 0.75
  const offset = arc - (val / 920) * 0.97 * arc

  return (
    <section style={{ background: 'linear-gradient(135deg,var(--blue-dkr),var(--blue) 55%,#1E63D6)', padding: '80px 24px', position: 'relative', overflow: 'hidden' }} aria-label="Teste de velocidade">
      <div aria-hidden="true" style={{ position: 'absolute', right: '-4%', top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--font-d)', fontSize: 500, fontWeight: 800, color: 'rgba(255,255,255,.018)', lineHeight: 1, pointerEvents: 'none' }}>@</div>
      <div className="site-container" style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 64, position: 'relative', zIndex: 1 }}>
        <div>
          <div className="site-kicker amber">Teste de velocidade</div>
          <h2 style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 800, color: '#fff', letterSpacing: '-.025em', lineHeight: 1.2, marginBottom: 14 }}>
            Sua internet está na velocidade que merece?
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,.7)', lineHeight: 1.65, maxWidth: 420 }}>
            Teste aqui e compare com o plano contratado. Na Arroba, você recebe exatamente o que paga.
          </p>
          <button onClick={run} className="speed-test-btn">
            ⚡ {running ? 'Medindo...' : 'Iniciar teste simulado'}
          </button>
        </div>
        <div style={{ width: 210, height: 210, position: 'relative', flexShrink: 0, cursor: 'pointer' }} onClick={run} role="button" aria-label="Iniciar teste de velocidade" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && run()}>
          <svg width="210" height="210" viewBox="0 0 210 210" aria-hidden="true">
            <circle cx="105" cy="105" r={r} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="12" strokeDasharray={`${arc} ${circ - arc}`} strokeLinecap="round" transform="rotate(-218 105 105)" />
            <circle cx="105" cy="105" r={r} fill="none" stroke="var(--amber)" strokeWidth="12" strokeLinecap="round" strokeDasharray={`${arc - offset} ${circ - (arc - offset)}`} transform="rotate(-218 105 105)" style={{ transition: 'stroke-dasharray .1s' }} />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontFamily: 'var(--font-d)', fontSize: 46, fontWeight: 800, color: '#fff', letterSpacing: '-.04em', lineHeight: 1 }}>{val || '—'}</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,.55)', fontWeight: 600, marginTop: 2 }}>Mbps</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,.35)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', marginTop: 6 }}>{val > 0 ? '✓ OK' : 'toque para testar'}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
