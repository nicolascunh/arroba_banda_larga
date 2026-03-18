import React from 'react'
import CEPWidget from './CEPWidget'

export default function Coverage() {
  return (
    <section id="cobertura" style={{ background: 'var(--surface)', padding: '84px 24px' }}>
      <div className="site-container coverage-grid">
        <div style={{ background: 'var(--bg)', borderRadius: 'var(--r-xl)', aspectRatio: '1/1', maxWidth: 420, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', boxShadow: 'var(--sh-sm)' }} aria-hidden="true">
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(27,79,168,.05) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(27,79,168,.05) 40px)' }} />
          {[100, 160, 220].map((s, i) => <div key={i} style={{ position: 'absolute', width: s, height: s, borderRadius: '50%', border: '2px solid rgba(27,79,168,.15)', animation: `ripple ${3 + i * 0.6}s ease-out infinite`, animationDelay: `${i * 0.5}s` }} />)}
          <div style={{ position: 'relative', zIndex: 2, fontSize: 64, animation: 'float 3s ease-in-out infinite' }}>📍</div>
        </div>
        <div>
          <div className="site-kicker">Área de cobertura</div>
          <h2 className="site-h2">Fibra em Campos<br />e região</h2>
          <p className="site-sub" style={{ marginBottom: 28 }}>Atendemos Campos dos Goytacazes e municípios da região. Verifique se sua rua já tem cobertura — rápido e gratuito.</p>
          <CEPWidget />
        </div>
      </div>
    </section>
  )
}
