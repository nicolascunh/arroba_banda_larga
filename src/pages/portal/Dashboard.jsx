import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '@/hooks/useApp'
import { getMockFaturas, fmtBRL } from '@/data/mockData'
import PixModal from '@/components/shared/PixModal'

// ─── Speed Gauge ─────────────────────────────
function SpeedGauge({ maxSpeed }) {
  const [val, setVal] = useState(0)
  const raf = useRef(null)

  const run = useCallback(() => {
    cancelAnimationFrame(raf.current)
    const target = Math.round(maxSpeed * (0.93 + Math.random() * 0.05))
    const start = performance.now()
    const dur = 1800
    const step = (ts) => {
      const p = Math.min((ts - start) / dur, 1)
      const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2
      setVal(Math.round(e * target))
      if (p < 1) raf.current = requestAnimationFrame(step)
    }
    raf.current = requestAnimationFrame(step)
  }, [maxSpeed])

  useEffect(() => { run(); return () => cancelAnimationFrame(raf.current) }, [run])

  const r = 38, circ = 2 * Math.PI * r, arc = circ * 0.75
  const offset = arc - (val / maxSpeed) * 0.97 * arc

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 0 6px' }}>
      <div style={{ position: 'relative', width: 100, height: 100, marginBottom: 10 }}>
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(60,60,67,.1)" strokeWidth="10"
            strokeDasharray={`${arc} ${circ - arc}`} strokeLinecap="round" transform="rotate(135 50 50)" />
          <circle cx="50" cy="50" r={r} fill="none" stroke="var(--blue)" strokeWidth="10" strokeLinecap="round"
            strokeDasharray={`${arc - offset} ${circ - (arc - offset)}`}
            transform="rotate(135 50 50)" style={{ transition: 'stroke-dasharray .1s' }} />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontFamily: 'var(--font-d)', fontSize: 20, fontWeight: 800, color: 'var(--p-l1)', letterSpacing: '-.03em', lineHeight: 1 }}>{val}</div>
          <div style={{ fontSize: 8, color: 'var(--p-l3)', fontWeight: 600 }}>Mbps</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6, width: '100%' }}>
        {[['↓ Down', val, 'var(--blue)'], ['↑ Up', Math.round(val * 0.99), '#5856D6'], ['Latência', '6ms', 'var(--orange)']].map(([l, v, c]) => (
          <div key={l} style={{ background: 'var(--bg)', borderRadius: 8, padding: '7px 6px', textAlign: 'center' }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: c, letterSpacing: '-.02em' }}>{v}</div>
            <div style={{ fontSize: 8, color: 'var(--p-l4)', fontWeight: 500, marginTop: 1 }}>{l}</div>
          </div>
        ))}
      </div>
      <button onClick={run} className="p-retest-btn">
        ↺ Testar novamente
      </button>
    </div>
  )
}

// ─── Week bars chart ─────────────────────────
function WeekBars() {
  const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
  const dl   = [34, 18, 45, 28, 52, 15, 38]
  const ul   = [8, 4, 12, 7, 14, 3, 10]
  const mx   = Math.max(...dl, ...ul)
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 68, marginBottom: 6 }}>
        {days.map((_, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
            <div style={{ width: '100%', background: 'var(--blue)', opacity: 0.85, borderRadius: '2px 2px 0 0', height: Math.round(dl[i] / mx * 64) }} />
            <div style={{ width: '55%', background: '#5856D6', opacity: 0.7, borderRadius: '2px 2px 0 0', height: Math.round(ul[i] / mx * 64) }} />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 4 }}>
        {days.map((d) => <div key={d} style={{ flex: 1, fontSize: 8, color: 'var(--p-l4)', textAlign: 'center' }}>{d}</div>)}
      </div>
      <div style={{ display: 'flex', gap: 14, marginTop: 10 }}>
        {[['var(--blue)', 'Download'], ['#5856D6', 'Upload']].map(([c, l]) => (
          <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--p-l3)' }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: c }} />{l}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Dashboard ───────────────────────────────
export default function Dashboard() {
  const { user } = useApp()
  const navigate = useNavigate()
  const [pixOpen, setPix] = useState(false)
  const faturas = getMockFaturas(user.plan.price)

  const now = new Date()
  const hrs = now.getHours()
  const greeting = hrs < 12 ? 'Bom dia' : hrs < 18 ? 'Boa tarde' : 'Boa noite'
  const DAYS = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
  const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

  return (
    <div className="fade-in">
      {/* Greeting */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 800, color: 'var(--p-l1)', letterSpacing: '-.03em', marginBottom: 4 }}>
          {greeting}, {user.name} 👋
        </h1>
        <p style={{ fontSize: 13.5, color: 'var(--p-l3)' }}>
          {DAYS[now.getDay()]}, {now.getDate()} de {MONTHS[now.getMonth()]} · Tudo certo com sua conexão
        </p>
      </div>

      {/* Plan + Fatura */}
      <div className="g2" style={{ marginBottom: 14 }}>
        {/* Plan hero card */}
        <div style={{ background: 'linear-gradient(138deg,#123680,var(--blue) 55%,#1E63D6)', borderRadius: 'var(--r-lg)', padding: 24, position: 'relative', overflow: 'hidden', boxShadow: 'var(--blue-glow)' }}>
          <div style={{ position: 'absolute', right: -12, top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--font-d)', fontSize: 180, fontWeight: 800, color: 'rgba(255,255,255,.05)', lineHeight: 1, pointerEvents: 'none' }}>@</div>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em', color: 'rgba(255,255,255,.55)', marginBottom: 5 }}>Plano Ativo</div>
          <div style={{ fontFamily: 'var(--font-d)', fontSize: 30, fontWeight: 800, color: '#fff', letterSpacing: '-.04em', lineHeight: 1, marginBottom: 3 }}>{user.plan.name}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,.65)', marginBottom: 14 }}>Fibra óptica simétrica · {user.plan.wifi}</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(52,199,89,.2)', border: '1px solid rgba(52,199,89,.3)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 20 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#34C759', animation: 'pulse 2.5s ease infinite' }} />
            Ativo
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginTop: 18 }}>
            {[{ l: 'Download', v: `${user.plan.dl} Mbps` }, { l: 'Upload', v: `${user.plan.ul} Mbps` }, { l: 'Mensalidade', v: fmtBRL(user.plan.price) }].map((m) => (
              <div key={m.l}>
                <div style={{ fontSize: 9.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', color: 'rgba(255,255,255,.45)', marginBottom: 3 }}>{m.l}</div>
                <div style={{ fontFamily: 'var(--font-d)', fontSize: 16, fontWeight: 800, color: '#fff', letterSpacing: '-.03em' }}>{m.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Fatura card */}
        <div className="portal-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ fontFamily: 'var(--font-d)', fontSize: 15, fontWeight: 700, color: 'var(--p-l1)', letterSpacing: '-.015em' }}>Fatura Atual</div>
            <span className="badge badge-warn">Em aberto</span>
          </div>
          <div style={{ fontFamily: 'var(--font-d)', fontSize: 34, fontWeight: 800, color: 'var(--orange)', letterSpacing: '-.04em', lineHeight: 1, marginBottom: 3 }}>{fmtBRL(user.plan.price)}</div>
          <div style={{ fontSize: 11.5, color: 'var(--p-l3)', marginBottom: 'auto', paddingBottom: 16 }}>Referência: Março/2025 · Venc. 15/03</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button className="btn-primary" style={{ justifyContent: 'center', width: '100%', fontSize: 14, padding: 12 }} onClick={() => setPix(true)}>
              💳 Pagar agora
            </button>
            <button className="btn-secondary" style={{ justifyContent: 'center', width: '100%', fontSize: 13 }} onClick={() => navigate('/portal/faturas')}>
              Ver histórico de faturas →
            </button>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="g4" style={{ marginBottom: 14 }}>
        {[
          { ico: '📅', lbl: 'Tempo de serviço', v: `${user.months} meses`, sub: `Desde ${user.since}` },
          { ico: '✅', lbl: 'Uptime médio',       v: '99,8%',               sub: 'Últimos 30 dias', c: '#1A7F37' },
          { ico: '🎧', lbl: 'Chamados abertos',   v: '1',                   sub: 'Em andamento',    c: '#B25000' },
          { ico: '💳', lbl: 'Pendências',          v: 'Nenhuma',             sub: 'Tudo em dia',     c: '#1A7F37' },
        ].map((s) => (
          <div key={s.lbl} className="portal-card" style={{ padding: 18 }}>
            <div style={{ fontSize: 22, marginBottom: 10 }}>{s.ico}</div>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--p-l4)', marginBottom: 5 }}>{s.lbl}</div>
            <div style={{ fontFamily: 'var(--font-d)', fontSize: 20, fontWeight: 800, color: s.c || 'var(--p-l1)', letterSpacing: '-.03em', lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontSize: 11, color: 'var(--p-l3)', marginTop: 3 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="g2" style={{ marginBottom: 14 }}>
        <div className="portal-card">
          <div style={{ fontFamily: 'var(--font-d)', fontSize: 14, fontWeight: 700, color: 'var(--p-l1)', marginBottom: 3 }}>Consumo Semanal</div>
          <div style={{ fontSize: 12, color: 'var(--p-l3)', marginBottom: 14 }}>Últimos 7 dias · GB</div>
          <WeekBars />
        </div>
        <div className="portal-card">
          <div style={{ fontFamily: 'var(--font-d)', fontSize: 14, fontWeight: 700, color: 'var(--p-l1)', marginBottom: 3 }}>Velocidade em Tempo Real</div>
          <div style={{ fontSize: 12, color: 'var(--p-l3)', marginBottom: 8 }}>Último teste: hoje às 09:12</div>
          <SpeedGauge maxSpeed={user.plan.dl} />
        </div>
      </div>

      {/* Activity */}
      <div className="portal-card">
        <div style={{ fontFamily: 'var(--font-d)', fontSize: 14, fontWeight: 700, color: 'var(--p-l1)', marginBottom: 16 }}>Atividade Recente</div>
        {[
          { ico: '✅', bg: 'rgba(52,199,89,.1)',  title: 'Fatura Fevereiro paga',      sub: 'Via PIX',                v: fmtBRL(user.plan.price), vc: '#1A7F37', date: '15/02/2025' },
          { ico: '🎧', bg: 'rgba(27,79,168,.1)',  title: 'Chamado #4521 resolvido',    sub: 'Lentidão · 2h resolução', v: 'Resolvido',             vc: '#1A7F37', date: '10/02/2025' },
          { ico: '✅', bg: 'rgba(52,199,89,.1)',  title: 'Fatura Janeiro paga',        sub: 'Via boleto',              v: fmtBRL(user.plan.price), vc: '#1A7F37', date: '15/01/2025' },
          { ico: '📡', bg: 'rgba(245,162,0,.1)', title: 'Manutenção preventiva',      sub: 'Firmware atualizado',     v: 'Concluído',             vc: '#B25000', date: '03/01/2025' },
        ].map((a, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < 3 ? '0.5px solid var(--p-sep)' : 'none' }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: a.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>{a.ico}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--p-l1)' }}>{a.title}</div>
              <div style={{ fontSize: 11, color: 'var(--p-l3)', marginTop: 1 }}>{a.sub}</div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: a.vc }}>{a.v}</div>
              <div style={{ fontSize: 10.5, color: 'var(--p-l4)', marginTop: 1 }}>{a.date}</div>
            </div>
          </div>
        ))}
      </div>

      {pixOpen && <PixModal price={user.plan.price} onClose={() => setPix(false)} />}
    </div>
  )
}
