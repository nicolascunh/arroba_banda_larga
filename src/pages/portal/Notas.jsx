import React from 'react'
import { useApp } from '@/hooks/useApp'
import { getMockNotas, fmtBRL } from '@/data/mockData'
import StatusBadge from '@/components/portal/StatusBadge'
import { Download } from 'lucide-react'

const COL = '1.2fr 1fr 110px 110px 100px 100px'

export default function Notas() {
  const { user, showToast } = useApp()
  const notas = getMockNotas(user.plan.price)

  return (
    <div className="fade-in">
      <div className="p-page-header">
        <div>
          <div className="p-page-title">Notas Fiscais</div>
          <div className="p-page-sub">Notas emitidas para seu CPF</div>
        </div>
      </div>

      <div className="p-table">
        <div className="p-table-head" style={{ gridTemplateColumns: COL }}>
          {['Número', 'Referência', 'Valor', 'Emissão', 'Status', 'Ações'].map((h) => (
            <div key={h}>{h}</div>
          ))}
        </div>
        {notas.map((n, i) => (
          <div key={n.id} className="p-table-row" style={{ gridTemplateColumns: COL }}>
            <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--p-l3)' }}>{n.id}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--p-l1)' }}>{n.ref}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--p-l1)' }}>{fmtBRL(n.value)}</div>
            <div style={{ fontSize: 12, color: 'var(--p-l3)' }}>{n.issued}</div>
            <div><StatusBadge status={n.status} /></div>
            <div>
              <button
                style={{ fontFamily: 'var(--font)', fontSize: 11, fontWeight: 700, background: 'var(--bg)', color: 'var(--blue)', border: '1px solid var(--sep)', borderRadius: 7, padding: '6px 10px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                onClick={() => showToast('Download iniciado!')}
              >
                <Download size={12} /> PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
