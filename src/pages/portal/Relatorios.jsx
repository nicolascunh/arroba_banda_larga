import React from 'react'
import { useApp } from '@/hooks/useApp'
import { getMockRelatorios } from '@/data/mockData'
import { BarChart3, CreditCard, Calendar, Download } from 'lucide-react'

const TYPE_ICONS  = { consumo: BarChart3, pagamento: CreditCard, anual: Calendar }

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
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--blue-lt)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
              {React.createElement(TYPE_ICONS[r.type], { size: 22, color: 'var(--blue)' })}
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--p-l1)', letterSpacing: '-.01em', marginBottom: 5 }}>{r.title}</div>
            <div style={{ fontSize: 12, color: 'var(--p-l3)', marginBottom: 16 }}>Período: {r.period} · {r.size}</div>
            <button className="btn-secondary" style={{ fontSize: 12, width: '100%', justifyContent: 'center', display: 'inline-flex', alignItems: 'center', gap: 4 }}
              onClick={() => showToast('Download iniciado!')}>
              <Download size={13} /> Baixar PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
