import React, { useState, useRef, useCallback } from 'react'
import { Zap, Check, ArrowDown, ArrowUp, Timer, RotateCcw, Gauge } from 'lucide-react'

const PHASES = [
  { key: 'connecting', label: 'Conectando...', duration: 600 },
  { key: 'download',   label: 'Download', duration: 2200 },
  { key: 'upload',     label: 'Upload', duration: 1600 },
  { key: 'ping',       label: 'Latencia', duration: 600 },
]

function animateValue(from, to, duration, onUpdate, onDone) {
  const start = performance.now()
  const step = (ts) => {
    const p = Math.min((ts - start) / duration, 1)
    const ease = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2
    onUpdate(from + (to - from) * ease)
    if (p < 1) requestAnimationFrame(step)
    else if (onDone) onDone()
  }
  requestAnimationFrame(step)
}

function ResultCard({ icon: Icon, label, value, unit, color, delay }) {
  return (
    <div className="speed-result-card" style={{ animationDelay: `${delay}s` }}>
      <div className="speed-result-icon" style={{ background: `${color}14`, color }}>
        <Icon size={16} />
      </div>
      <div>
        <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,.45)', textTransform: 'uppercase', letterSpacing: '.04em' }}>{label}</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-.03em', fontFamily: 'var(--font-d)' }}>{value}</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,.45)' }}>{unit}</span>
        </div>
      </div>
    </div>
  )
}

export default function SpeedBanner() {
  const [display, setDisplay] = useState(0)
  const [phase, setPhase] = useState(null) // null | 'connecting' | 'download' | 'upload' | 'ping' | 'done'
  const [results, setResults] = useState(null)
  const runningRef = useRef(false)

  const r = 75, circ = 2 * Math.PI * r, arc = circ * 0.75

  const getGaugeColor = (val) => {
    if (val < 200) return '#FF3B30'
    if (val < 500) return '#FF9500'
    return 'var(--amber)'
  }

  const run = useCallback(() => {
    if (runningRef.current) return
    runningRef.current = true
    setResults(null)

    const dlTarget = 700 + Math.round(Math.random() * 200)
    const ulTarget = 350 + Math.round(Math.random() * 150)
    const pingTarget = 3 + Math.round(Math.random() * 8)

    // Phase 1: Connecting
    setPhase('connecting')
    setDisplay(0)

    setTimeout(() => {
      // Phase 2: Download
      setPhase('download')
      animateValue(0, dlTarget, 2200, (v) => setDisplay(Math.round(v)), () => {
        // Phase 3: Upload
        setPhase('upload')
        animateValue(dlTarget, ulTarget, 1600, (v) => setDisplay(Math.round(v)), () => {
          // Phase 4: Ping
          setPhase('ping')
          animateValue(ulTarget, pingTarget, 600, (v) => setDisplay(Math.round(v)), () => {
            // Done
            setPhase('done')
            setDisplay(dlTarget)
            setResults({ download: dlTarget, upload: ulTarget, ping: pingTarget })
            runningRef.current = false
          })
        })
      })
    }, 600)
  }, [])

  const reset = () => {
    setPhase(null)
    setDisplay(0)
    setResults(null)
  }

  const isRunning = phase && phase !== 'done'
  const gaugeVal = phase === 'ping' ? 0 : display
  const offset = arc - (Math.min(gaugeVal, 920) / 920) * 0.97 * arc
  const gaugeColor = results ? getGaugeColor(results.download) : 'var(--amber)'

  const phaseLabel = phase === 'connecting' ? 'Conectando...'
    : phase === 'download' ? 'Download'
    : phase === 'upload' ? 'Upload'
    : phase === 'ping' ? 'Latencia'
    : phase === 'done' ? 'Concluido' : null

  return (
    <section style={{ background: 'linear-gradient(135deg,var(--blue-dkr),var(--blue) 55%,#1E63D6)', padding: '80px 24px', position: 'relative', overflow: 'hidden' }} aria-label="Teste de velocidade">
      <div aria-hidden="true" style={{ position: 'absolute', right: '-4%', top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--font-d)', fontSize: 'clamp(180px, 45vw, 500px)', fontWeight: 800, color: 'rgba(255,255,255,.018)', lineHeight: 1, pointerEvents: 'none' }}>@</div>

      <div className="site-container speed-grid">
        <div>
          <div className="site-kicker amber">Teste de velocidade</div>
          <h2 style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 800, color: '#fff', letterSpacing: '-.025em', lineHeight: 1.2, marginBottom: 14 }}>
            Sua internet esta na velocidade que merece?
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,.7)', lineHeight: 1.65, maxWidth: 420, marginBottom: 0 }}>
            Teste aqui e compare com o plano contratado. Na Arroba, voce recebe exatamente o que paga.
          </p>

          {/* Phase indicator */}
          {isRunning && (
            <div className="speed-phases">
              {PHASES.map((ph, i) => {
                const phaseIdx = PHASES.findIndex(p => p.key === phase)
                const isDone = i < phaseIdx
                const isActive = i === phaseIdx
                return (
                  <div key={ph.key} className={`speed-phase-step${isDone ? ' done' : ''}${isActive ? ' active' : ''}`}>
                    <div className="speed-phase-dot">
                      {isDone && <Check size={8} />}
                    </div>
                    <span>{ph.label}</span>
                  </div>
                )
              })}
            </div>
          )}

          {/* Results cards */}
          {results && (
            <div className="speed-results-grid">
              <ResultCard icon={ArrowDown} label="Download" value={results.download} unit="Mbps" color="#34C759" delay={0} />
              <ResultCard icon={ArrowUp} label="Upload" value={results.upload} unit="Mbps" color="#5B9BFF" delay={0.1} />
              <ResultCard icon={Timer} label="Ping" value={results.ping} unit="ms" color="var(--amber)" delay={0.2} />
            </div>
          )}

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 10, marginTop: 28, flexWrap: 'wrap' }}>
            {!phase && (
              <button onClick={run} className="speed-test-btn">
                <Zap size={16} /> Iniciar teste
              </button>
            )}
            {phase === 'done' && (
              <>
                <button onClick={run} className="speed-test-btn">
                  <RotateCcw size={14} /> Testar novamente
                </button>
                <a href="#planos" className="speed-test-btn-outline">
                  Ver planos <Gauge size={14} />
                </a>
              </>
            )}
          </div>
        </div>

        {/* Gauge */}
        <div className={`speed-gauge-wrap${isRunning ? ' speed-gauge-pulse' : ''}`} onClick={!isRunning && !results ? run : undefined} role="button" aria-label="Iniciar teste de velocidade" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && !isRunning && run()}>
          <svg width="100%" height="100%" viewBox="0 0 210 210" aria-hidden="true">
            {/* Track */}
            <circle cx="105" cy="105" r={r} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="12" strokeDasharray={`${arc} ${circ - arc}`} strokeLinecap="round" transform="rotate(-218 105 105)" />
            {/* Active arc */}
            <circle cx="105" cy="105" r={r} fill="none" stroke={gaugeColor} strokeWidth="12" strokeLinecap="round" strokeDasharray={`${arc - offset} ${circ - (arc - offset)}`} transform="rotate(-218 105 105)" style={{ transition: 'stroke-dasharray .1s, stroke .3s' }} />
            {/* Glow */}
            {gaugeVal > 0 && (
              <circle cx="105" cy="105" r={r} fill="none" stroke={gaugeColor} strokeWidth="12" strokeLinecap="round" strokeDasharray={`${arc - offset} ${circ - (arc - offset)}`} transform="rotate(-218 105 105)" style={{ filter: 'blur(6px)', opacity: 0.3, transition: 'stroke-dasharray .1s' }} />
            )}
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(30px,6vw,46px)', fontWeight: 800, color: '#fff', letterSpacing: '-.04em', lineHeight: 1 }}>
              {phase === 'ping' && !results ? display : (gaugeVal || '—')}
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,.55)', fontWeight: 600, marginTop: 2 }}>
              {phase === 'ping' ? 'ms' : 'Mbps'}
            </div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,.35)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
              {phase === 'done' && <><Check size={12} /> {results.download >= 700 ? 'Excelente' : results.download >= 400 ? 'Bom' : 'Abaixo'}</>}
              {isRunning && phaseLabel}
              {!phase && 'toque para testar'}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
