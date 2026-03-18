import React, { useState } from 'react'
import { useApp } from '@/hooks/useApp'
import { getMockFaturas, fmtBRL } from '@/data/mockData'
import StatusBadge from '@/components/portal/StatusBadge'
import PixModal from '@/components/shared/PixModal'

const COL = '1fr 120px 120px 120px 150px'

export default function Faturas() {
  const { user, showToast } = useApp()
  const [pixOpen, setPix] = useState(false)
  const faturas = getMockFaturas(user.plan.price)

  return (
    <div className="fade-in">
      <div className="p-page-header">
        <div>
          <div className="p-page-title">Faturas</div>
          <div className="p-page-sub">Histórico de pagamentos e faturas em aberto</div>
        </div>
        <button className="btn-primary" onClick={() => setPix(true)}>
          💳 Pagar fatura em aberto
        </button>
      </div>

      <div className="p-table">
        <div className="p-table-head" style={{ gridTemplateColumns: COL }}>
          {['Referência', 'Valor', 'Vencimento', 'Status', 'Ações'].map((h) => (
            <div key={h}>{h}</div>
          ))}
        </div>
        {faturas.map((f, i) => (
          <div key={f.id} className="p-table-row" style={{ gridTemplateColumns: COL }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--p-l1)' }}>{f.ref}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--p-l1)' }}>{fmtBRL(f.value)}</div>
            <div style={{ fontSize: 12.5, color: f.status === 'open' ? 'var(--orange)' : 'var(--p-l3)' }}>{f.due}</div>
            <div><StatusBadge status={f.status} /></div>
            <div style={{ display: 'flex', gap: 6 }}>
              {f.status === 'open' ? (
                <button className="btn-primary" style={{ fontSize: 11, padding: '6px 14px', boxShadow: 'none' }} onClick={() => setPix(true)}>
                  Pagar
                </button>
              ) : (
                <button style={{ fontFamily: 'var(--font)', fontSize: 11, fontWeight: 700, background: 'var(--bg)', color: 'var(--blue)', border: '1px solid var(--sep)', borderRadius: 7, padding: '6px 12px', cursor: 'pointer' }}
                  onClick={() => showToast('Download iniciado!')}>
                  ⬇ PDF
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {pixOpen && <PixModal price={user.plan.price} onClose={() => setPix(false)} />}
    </div>
  )
}
