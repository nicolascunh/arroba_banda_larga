import React, { useState, useEffect } from 'react'
import { useApp } from '@/hooks/useApp'
import { generateConsumo } from '@/data/mockData'
import { SkeletonCard, Skeleton } from '@/components/shared/Skeleton'

export default function Consumo() {
  const { user } = useApp()
  const [period, setPeriod] = useState(7)
  const [loading, setLoading] = useState(true)
  const data  = generateConsumo(period)
  const totDl = data.reduce((s, d) => s + d.dl, 0)
  const totUl = data.reduce((s, d) => s + d.ul, 0)
  const maxV  = Math.max(...data.map((d) => d.dl), ...data.map((d) => d.ul))

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  if (loading) return (
    <div className="fade-in">
      <div className="p-page-header">
        <div>
          <div className="p-page-title">Consumo</div>
          <div className="p-page-sub">Consumo de dados em tempo real</div>
        </div>
      </div>
      <div className="g3" style={{ marginBottom: 16 }}>
        {[1,2,3].map(i => <SkeletonCard key={i} rows={2} />)}
      </div>
      <Skeleton height={250} radius={22} />
    </div>
  )

  return (
    <div className="fade-in">
      <div className="p-page-header">
        <div>
          <div className="p-page-title">Consumo</div>
          <div className="p-page-sub">Consumo de dados em tempo real</div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="g3" style={{ marginBottom: 16 }}>
        {[
          { l: 'Download total',   v: `${totDl} GB`, sub: `${period} dias`,                     bar: 0.6,  c1: 'var(--blue)',  c2: '#5B9BFF' },
          { l: 'Upload total',     v: `${totUl} GB`, sub: `${period} dias`,                     bar: 0.25, c1: '#5856D6',     c2: '#9B9BFF' },
          { l: 'Velocidade atual', v: `${Math.round(user.plan.dl * 0.95)} Mbps`, sub: `Contratado: ${user.plan.dl} Mbps`, bar: 0.95, c1: 'var(--amber)', c2: '#FFD060' },
        ].map((s) => (
          <div key={s.l} className="portal-card">
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--p-l4)', marginBottom: 7 }}>{s.l}</div>
            <div style={{ fontFamily: 'var(--font-d)', fontSize: 26, fontWeight: 800, color: 'var(--p-l1)', letterSpacing: '-.04em', lineHeight: 1, marginBottom: 5 }}>{s.v}</div>
            <div style={{ fontSize: 11.5, color: 'var(--p-l3)', marginBottom: 9 }}>{s.sub}</div>
            <div style={{ height: 4, background: 'var(--sep)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${s.bar * 100}%`, background: `linear-gradient(90deg,${s.c1},${s.c2})`, borderRadius: 2 }} />
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="portal-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6, flexWrap: 'wrap', gap: 10 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-d)', fontSize: 15, fontWeight: 700, color: 'var(--p-l1)' }}>Consumo Diário</div>
            <div style={{ fontSize: 12, color: 'var(--p-l3)', marginTop: 2 }}>GB por dia</div>
          </div>
          <div style={{ display: 'flex', gap: 3, background: 'var(--bg)', borderRadius: 8, padding: 3 }}>
            {[7, 14, 30].map((n) => (
              <button key={n} onClick={() => setPeriod(n)}
                style={{ fontFamily: 'var(--font)', fontSize: 11, fontWeight: 700, color: period === n ? 'var(--blue)' : 'var(--p-l3)', background: period === n ? '#fff' : 'none', border: 'none', borderRadius: 6, padding: '5px 10px', cursor: 'pointer', transition: 'all .15s', boxShadow: period === n ? '0 1px 3px rgba(0,0,0,.1)' : 'none' }}>
                {n}d
              </button>
            ))}
          </div>
        </div>

        <div style={{ height: 120, display: 'flex', alignItems: 'flex-end', gap: 3, margin: '14px 0 6px' }}>
          {data.map((d, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 1.5 }}>
              <div title={`${d.dl} GB ↓`} style={{ background: 'linear-gradient(180deg,rgba(27,79,168,.8),rgba(27,79,168,.4))', borderRadius: '3px 3px 0 0', height: Math.round(d.dl / maxV * 108), minHeight: 3, cursor: 'pointer', transition: 'opacity .2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '.7')} onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')} />
              <div title={`${d.ul} GB ↑`} style={{ background: 'linear-gradient(180deg,rgba(88,86,214,.7),rgba(88,86,214,.35))', borderRadius: '3px 3px 0 0', height: Math.round(d.ul / maxV * 108), minHeight: 3, cursor: 'pointer', transition: 'opacity .2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '.7')} onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')} />
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 3 }}>
          {data.map((d, i) => <div key={i} style={{ flex: 1, fontSize: 8, color: 'var(--p-l4)', textAlign: 'center' }}>{d.date}</div>)}
        </div>

        <div style={{ display: 'flex', gap: 14, marginTop: 12 }}>
          {[['var(--blue)', 'Download'], ['#5856D6', 'Upload']].map(([c, l]) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--p-l3)' }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: c }} />{l}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
