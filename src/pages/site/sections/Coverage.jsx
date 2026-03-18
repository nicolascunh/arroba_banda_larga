import React, { useState, useCallback, useEffect, useRef } from 'react'
import { MapPin, Wifi, CheckCircle, XCircle } from 'lucide-react'
import CEPWidget from './CEPWidget'

/* ── Animated dark-themed coverage map ─────────────────── */
function CoverageMap({ status, cep }) {
  const isIdle    = !status || status === 'err'
  const isLoading = status === 'loading'
  const isOk      = status === 'ok'
  const isNo      = status === 'no'
  const canvasRef = useRef(null)
  const rafRef    = useRef(null)
  const particlesRef = useRef([])

  // Particle animation on the canvas
  useEffect(() => {
    const cvs = canvasRef.current
    if (!cvs) return
    const ctx = cvs.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    const w = cvs.offsetWidth
    const h = cvs.offsetHeight
    cvs.width  = w * dpr
    cvs.height = h * dpr
    ctx.scale(dpr, dpr)

    // Create fibre particles
    if (isLoading || isOk) {
      const count = isOk ? 40 : 25
      if (particlesRef.current.length < count) {
        for (let i = particlesRef.current.length; i < count; i++) {
          particlesRef.current.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 1.2,
            vy: (Math.random() - 0.5) * 1.2,
            size: Math.random() * 2 + 1,
            alpha: Math.random() * 0.5 + 0.2,
          })
        }
      }
    } else {
      particlesRef.current = []
    }

    let running = true
    const animate = () => {
      if (!running) return
      ctx.clearRect(0, 0, w, h)

      const color = isOk ? '52,199,89' : isNo ? '255,59,48' : '27,79,168'

      particlesRef.current.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color},${p.alpha})`
        ctx.fill()
      })

      // Draw connection lines between nearby particles
      const pts = particlesRef.current
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 80) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(${color},${0.12 * (1 - dist / 80)})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => { running = false; cancelAnimationFrame(rafRef.current) }
  }, [isLoading, isOk, isNo])

  // Street layout for the SVG city
  const streets = {
    h: [88, 175, 265, 340],
    v: [95, 180, 275, 350],
  }

  const fiberPaths = [
    `M0,${streets.h[0]} L400,${streets.h[0]}`,
    `M0,${streets.h[1]} L400,${streets.h[1]}`,
    `M0,${streets.h[2]} L330,${streets.h[2]}`,
    `M${streets.v[0]},0 L${streets.v[0]},400`,
    `M${streets.v[1]},0 L${streets.v[1]},400`,
    `M${streets.v[2]},30 L${streets.v[2]},380`,
  ]

  const intersections = []
  streets.h.forEach(y => streets.v.forEach(x => intersections.push({ x, y })))

  return (
    <div className={`covmap${isLoading ? ' covmap-loading' : ''}${isOk ? ' covmap-ok' : ''}${isNo ? ' covmap-no' : ''}`} aria-hidden="true">
      {/* Dark gradient background */}
      <div className="covmap-bg" />

      {/* SVG city grid */}
      <svg className="covmap-svg" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
        {/* City blocks */}
        {[
          [15,15,70,63], [100,15,70,63], [195,15,70,63], [290,15,50,63],
          [15,100,70,65], [100,100,70,65], [195,100,70,65], [290,100,70,65],
          [15,190,70,65], [100,190,70,65], [195,190,70,65], [290,190,50,65],
          [15,278,70,52], [100,278,70,52], [195,278,70,52], [290,278,70,52],
          [15,352,70,40], [100,352,70,40], [195,352,70,40],
        ].map(([x,y,w,h], i) => (
          <rect key={`b${i}`} x={x} y={y} width={w} height={h} rx="3"
            fill={isOk ? 'rgba(52,199,89,.06)' : isNo ? 'rgba(255,59,48,.04)' : 'rgba(27,79,168,.06)'}
            stroke={isOk ? 'rgba(52,199,89,.08)' : isNo ? 'rgba(255,59,48,.05)' : 'rgba(255,255,255,.04)'}
            strokeWidth=".5"
            style={{ transition: 'fill .6s, stroke .6s' }}
          />
        ))}

        {/* Street lines */}
        {streets.h.map((y, i) => (
          <line key={`sh${i}`} x1="0" y1={y} x2="400" y2={y}
            stroke="rgba(255,255,255,.06)" strokeWidth="8" />
        ))}
        {streets.v.map((x, i) => (
          <line key={`sv${i}`} x1={x} y1="0" x2={x} y2="400"
            stroke="rgba(255,255,255,.06)" strokeWidth="8" />
        ))}

        {/* Fibre optic base lines */}
        {fiberPaths.map((d, i) => (
          <path key={`fb${i}`} d={d} stroke={
            isOk ? 'rgba(52,199,89,.3)' : isNo ? 'rgba(255,59,48,.12)' : 'rgba(27,79,168,.15)'
          } strokeWidth="2" fill="none" strokeLinecap="round" style={{ transition: 'stroke .6s' }} />
        ))}

        {/* Animated fibre flow */}
        {(isLoading || isOk) && fiberPaths.map((d, i) => (
          <path key={`ff${i}`} d={d}
            stroke={isOk ? 'rgba(52,199,89,.7)' : 'rgba(91,155,255,.6)'}
            strokeWidth="2" fill="none" strokeLinecap="round"
            strokeDasharray="8 24"
            className="covmap-fiber-flow"
            style={{ animationDuration: `${1 + i * 0.15}s` }}
          />
        ))}

        {/* Glow on fibre lines when OK */}
        {isOk && fiberPaths.map((d, i) => (
          <path key={`fg${i}`} d={d}
            stroke="rgba(52,199,89,.2)" strokeWidth="6" fill="none" strokeLinecap="round"
            style={{ filter: 'blur(3px)' }}
          />
        ))}

        {/* Intersection nodes */}
        {intersections.map((n, i) => (
          <g key={`n${i}`}>
            <circle cx={n.x} cy={n.y} r={isOk ? 4 : 3}
              fill={isOk ? 'rgba(52,199,89,.5)' : isNo ? 'rgba(255,59,48,.2)' : 'rgba(27,79,168,.2)'}
              style={{ transition: 'fill .6s, r .3s' }}
            />
            {isOk && (
              <circle cx={n.x} cy={n.y} r="8"
                fill="rgba(52,199,89,.1)" style={{ animation: 'fadeIn .4s ease both', animationDelay: `${i * 0.03}s` }}
              />
            )}
          </g>
        ))}

        {/* Loading: scanning circles */}
        {isLoading && (
          <>
            <circle cx="200" cy="200" r="0" fill="none" stroke="rgba(91,155,255,.3)" strokeWidth="1.5" className="covmap-scan-circle covmap-scan-1" />
            <circle cx="200" cy="200" r="0" fill="none" stroke="rgba(91,155,255,.2)" strokeWidth="1" className="covmap-scan-circle covmap-scan-2" />
            <circle cx="200" cy="200" r="0" fill="none" stroke="rgba(91,155,255,.15)" strokeWidth="1" className="covmap-scan-circle covmap-scan-3" />
          </>
        )}
      </svg>

      {/* Particle canvas overlay */}
      <canvas ref={canvasRef} className="covmap-canvas" />

      {/* Radar sweep */}
      {isLoading && <div className="covmap-radar" />}

      {/* Center pin */}
      <div className={`covmap-pin${isLoading ? ' covmap-pin-searching' : ''}`}>
        {/* Glow under pin */}
        <div className={`covmap-pin-glow${isOk ? ' ok' : isNo ? ' no' : ''}`} />
        <MapPin size={38} strokeWidth={2}
          color={isOk ? '#34C759' : isNo ? '#FF3B30' : '#5B9BFF'}
          fill={isOk ? 'rgba(52,199,89,.2)' : isNo ? 'rgba(255,59,48,.15)' : 'rgba(91,155,255,.15)'}
          style={{ filter: `drop-shadow(0 3px 10px ${isOk ? 'rgba(52,199,89,.4)' : isNo ? 'rgba(255,59,48,.3)' : 'rgba(91,155,255,.4)'})`, position: 'relative', zIndex: 2 }}
        />
        {/* Pin shadow */}
        <div className="covmap-pin-shadow" />
      </div>

      {/* CEP label floating on map */}
      {cep && cep.length >= 9 && !isIdle && (
        <div className="covmap-cep-label">
          <MapPin size={11} />
          {cep}
        </div>
      )}

      {/* Wifi dots when OK */}
      {isOk && [
        { x: '18%', y: '20%', d: 0 }, { x: '72%', y: '15%', d: .12 },
        { x: '25%', y: '52%', d: .24 }, { x: '70%', y: '48%', d: .08 },
        { x: '15%', y: '75%', d: .2 }, { x: '55%', y: '72%', d: .16 },
        { x: '78%', y: '70%', d: .28 }, { x: '42%', y: '30%', d: .04 },
      ].map((dot, i) => (
        <div key={i} className="covmap-wifi" style={{ left: dot.x, top: dot.y, animationDelay: `${dot.d}s` }}>
          <Wifi size={12} />
        </div>
      ))}

      {/* Bottom status */}
      {isLoading && (
        <div className="covmap-status covmap-status-loading">
          <div className="covmap-spinner" />
          Localizando CEP...
        </div>
      )}
      {isOk && (
        <div className="covmap-status covmap-status-ok">
          <CheckCircle size={12} /> Fibra disponivel
        </div>
      )}
      {isNo && (
        <div className="covmap-status covmap-status-no">
          <XCircle size={12} /> Sem cobertura
        </div>
      )}

      {/* Idle state label */}
      {isIdle && (
        <div className="covmap-idle-label">
          <MapPin size={13} />
          Informe seu CEP para verificar
        </div>
      )}
    </div>
  )
}

export default function Coverage() {
  const [mapStatus, setMapStatus] = useState(null)
  const [mapCep, setMapCep] = useState('')

  const handleStatusChange = useCallback((status, cep) => {
    setMapStatus(status)
    if (cep) setMapCep(cep)
  }, [])

  return (
    <section id="cobertura" style={{ background: 'var(--surface)', padding: '84px 24px' }}>
      <div className="site-container coverage-grid">
        <CoverageMap status={mapStatus} cep={mapCep} />
        <div>
          <div className="site-kicker">Area de cobertura</div>
          <h2 className="site-h2">Fibra em Campos<br />e regiao</h2>
          <p className="site-sub" style={{ marginBottom: 28 }}>
            Atendemos Campos dos Goytacazes e municipios da regiao. Verifique se sua rua ja tem cobertura — rapido e gratuito.
          </p>
          <CEPWidget onStatusChange={handleStatusChange} />
        </div>
      </div>
    </section>
  )
}
