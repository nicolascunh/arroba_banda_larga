import React, { useState } from 'react'
import { useApp } from '@/hooks/useApp'
import { MOCK_TICKETS } from '@/data/mockData'
import StatusBadge from '@/components/portal/StatusBadge'

function NewTicketModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({ cat: '', title: '', desc: '', sched: '' })
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 460 }}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div style={{ fontFamily: 'var(--font-d)', fontSize: 20, fontWeight: 800, color: 'var(--l1)', marginBottom: 5 }}>Novo Chamado</div>
        <div style={{ fontSize: 13, color: 'var(--l3)', marginBottom: 22 }}>Responderemos em até 2 horas</div>

        <div className="form-field">
          <label className="form-label">Categoria *</label>
          <select className="form-input" value={form.cat} onChange={set('cat')}>
            <option value="">Selecione</option>
            {['Sem conexão', 'Velocidade abaixo do contratado', 'Instabilidade / quedas', 'Wi-Fi / Roteador', 'Fatura / Financeiro', 'Outro'].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label className="form-label">Título *</label>
          <input className="form-input" type="text" placeholder="Descreva brevemente o problema" value={form.title} onChange={set('title')} />
        </div>
        <div className="form-field">
          <label className="form-label">Descrição</label>
          <textarea className="form-input" rows={4} placeholder="Quando começou? Afeta todos os dispositivos?..." value={form.desc} onChange={set('desc')} style={{ resize: 'vertical' }} />
        </div>
        <div className="form-field" style={{ marginBottom: 22 }}>
          <label className="form-label">Melhor horário para contato</label>
          <select className="form-input" value={form.sched} onChange={set('sched')}>
            <option>Qualquer horário</option>
            <option>Manhã (08h–12h)</option>
            <option>Tarde (12h–18h)</option>
            <option>Noite (18h–22h)</option>
          </select>
        </div>
        <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 15 }} onClick={onSubmit}>
          📨 Abrir chamado
        </button>
      </div>
    </div>
  )
}

export default function Atendimento() {
  const { showToast } = useApp()
  const [modal,  setModal]  = useState(false)
  const [active, setActive] = useState(null)

  const submitTicket = () => {
    setModal(false)
    showToast('Chamado aberto! Responderemos em até 2 horas. ✅')
  }

  return (
    <div className="fade-in">
      <div className="p-page-header">
        <div>
          <div className="p-page-title">Atendimento</div>
          <div className="p-page-sub">Abra e acompanhe seus chamados de suporte</div>
        </div>
        <button className="btn-primary" onClick={() => setModal(true)}>+ Novo chamado</button>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
        {[
          { dot: 'var(--orange)', label: '1 chamado aberto' },
          { dot: '#34C759',       label: '2 chamados resolvidos' },
          { label: '⏱ Tempo médio: ', highlight: '1h 42min' },
        ].map((s, i) => (
          <div key={i} className="portal-card" style={{ padding: '11px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
            {s.dot && <div style={{ width: 7, height: 7, borderRadius: '50%', background: s.dot }} />}
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--p-l1)' }}>
              {s.label}
              {s.highlight && <span style={{ color: '#1A7F37', fontWeight: 700 }}>{s.highlight}</span>}
            </span>
          </div>
        ))}
      </div>

      {/* Ticket list */}
      {MOCK_TICKETS.map((t) => (
        <div
          key={t.id}
          className="portal-card"
          style={{ marginBottom: 12, cursor: 'pointer', opacity: t.status === 'resolved' ? 0.8 : 1 }}
          onClick={() => setActive(active?.id === t.id ? null : t)}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--p-l4)', letterSpacing: '.03em', marginBottom: 4 }}>
                {t.id} · Aberto em {t.opened}
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--p-l1)', letterSpacing: '-.01em', marginBottom: 4 }}>{t.title}</div>
              <div style={{ fontSize: 12, color: 'var(--p-l3)' }}>
                Categoria: {t.category}{t.resolveTime ? ` · Resolvido em ${t.resolveTime}` : ''}
              </div>
              {/* Progress bar */}
              <div style={{ height: 3, background: 'var(--p-sep)', borderRadius: 2, overflow: 'hidden', marginTop: 12 }}>
                <div style={{ height: '100%', width: `${t.progress}%`, background: t.status === 'resolved' ? '#34C759' : 'var(--orange)', borderRadius: 2, transition: 'width .6s ease' }} />
              </div>
            </div>
            <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 7, alignItems: 'flex-end' }}>
              <StatusBadge status={t.status} />
              {t.rating && <div style={{ fontSize: 12, color: 'var(--amber)' }}>{'⭐'.repeat(t.rating)}</div>}
            </div>
          </div>

          {/* Chat history */}
          {active?.id === t.id && t.messages.length > 0 && (
            <div style={{ marginTop: 16, borderTop: '0.5px solid var(--p-sep)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {t.messages.map((m, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, flexDirection: m.from === 'cliente' ? 'row-reverse' : 'row', alignItems: 'flex-end' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: m.from === 'cliente' ? 'var(--blue)' : 'var(--bg)', border: m.from !== 'cliente' ? '0.5px solid var(--sep)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>
                    {m.from === 'cliente' ? '👤' : '🎧'}
                  </div>
                  <div style={{ maxWidth: '72%', background: m.from === 'cliente' ? 'var(--blue)' : 'var(--bg)', border: m.from !== 'cliente' ? '0.5px solid var(--sep)' : 'none', borderRadius: m.from === 'cliente' ? '14px 14px 4px 14px' : '14px 14px 14px 4px', padding: '10px 14px' }}>
                    <div style={{ fontSize: 13, color: m.from === 'cliente' ? '#fff' : 'var(--p-l1)', lineHeight: 1.5 }}>{m.text}</div>
                    <div style={{ fontSize: 10, color: m.from === 'cliente' ? 'rgba(255,255,255,.6)' : 'var(--p-l4)', marginTop: 4, textAlign: m.from === 'cliente' ? 'right' : 'left' }}>{m.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Quick contact */}
      <div className="portal-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 10 }}>
        {[
          { ico: '📞', label: '0800 020 2440', sub: 'Gratuito', href: 'tel:08000202440' },
          { ico: '💬', label: 'WhatsApp', sub: 'Seg–Dom 08h–00h', href: 'https://api.whatsapp.com/send/?phone=5508000202440' },
        ].map((ch) => (
          <a key={ch.label} href={ch.href} target={ch.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
            className="hover-blue-lt"
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 12, borderRadius: 10, textDecoration: 'none' }}>
            <span style={{ fontSize: 20 }}>{ch.ico}</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--p-l1)' }}>{ch.label}</div>
              <div style={{ fontSize: 11, color: 'var(--p-l3)' }}>{ch.sub}</div>
            </div>
          </a>
        ))}
      </div>

      {modal && <NewTicketModal onClose={() => setModal(false)} onSubmit={submitTicket} />}
    </div>
  )
}
