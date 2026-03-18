import React from 'react'
import { useApp } from '@/hooks/useApp'
import { getMockContratos } from '@/data/mockData'
import StatusBadge from '@/components/portal/StatusBadge'

export default function Contratos() {
  const { user } = useApp()
  const contratos = getMockContratos(user)

  return (
    <div className="fade-in">
      <div className="p-page-header">
        <div>
          <div className="p-page-title">Contratos</div>
          <div className="p-page-sub">Contratos de serviço ativos e termos</div>
        </div>
      </div>

      {contratos.map((c) => (
        <div key={c.id} className="portal-card" style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ fontSize: 11.5, color: 'var(--p-l3)', marginBottom: 4, fontFamily: 'monospace' }}>Contrato {c.id}</div>
              <div style={{ fontFamily: 'var(--font-d)', fontSize: 20, fontWeight: 800, color: 'var(--p-l1)', letterSpacing: '-.025em' }}>
                Plano {c.plan}
              </div>
            </div>
            <StatusBadge status={c.status} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 10 }}>
            {[
              { l: 'Tipo',       v: c.type    },
              { l: 'Ativo desde',v: c.since   },
              { l: 'Velocidade', v: c.speed   },
              { l: 'Wi-Fi',      v: c.wifi    },
              { l: 'Endereço',   v: c.address },
            ].map((r) => (
              <div key={r.l} style={{ background: 'var(--bg)', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--p-l4)', marginBottom: 5 }}>{r.l}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--p-l2)' }}>{r.v}</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Terms */}
      <div className="portal-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ fontFamily: 'var(--font-d)', fontSize: 15, fontWeight: 700, color: 'var(--p-l1)' }}>Termos e Condições</div>
          <span className="badge badge-ok">Sem pendências</span>
        </div>
        <p style={{ fontSize: 13.5, color: 'var(--p-l3)', lineHeight: 1.7 }}>
          Olá, você não tem pendências em seus <strong style={{ color: 'var(--p-l1)' }}>TERMOS</strong>. Todos os termos de uso foram aceitos e estão em conformidade.
        </p>
        <button className="btn-secondary" style={{ marginTop: 14, fontSize: 12 }}>
          Ver termos completos →
        </button>
      </div>
    </div>
  )
}
