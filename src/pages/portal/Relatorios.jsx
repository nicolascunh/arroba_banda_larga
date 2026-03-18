import React from 'react'
import { useApp } from '@/hooks/useApp'
import { getMockRelatorios } from '@/data/mockData'

const TYPE_ICONS  = { consumo: '📊', pagamento: '💳', anual: '📅' }

export default function Relatorios() {
  const { showToast } = useApp()
  const relatorios = getMockRelatorios()

  return (
    <div className="fade-in">
      <div className="p-page-header">
        <div>
          <div className="p-page-title">Relatórios</div>
          <div className="p-page-sub">Relatórios de consumo e pagamentos disponíveis para download</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 14 }}>
        {relatorios.map((r) => (
          <div key={r.id} className="portal-card p-report-card">
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--blue-lt)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 14 }}>
              {TYPE_ICONS[r.type]}
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--p-l1)', letterSpacing: '-.01em', marginBottom: 5 }}>{r.title}</div>
            <div style={{ fontSize: 12, color: 'var(--p-l3)', marginBottom: 16 }}>Período: {r.period} · {r.size}</div>
            <button className="btn-secondary" style={{ fontSize: 12, width: '100%', justifyContent: 'center' }}
              onClick={() => showToast('Download iniciado!')}>
              ⬇ Baixar PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
