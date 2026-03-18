import React, { useState } from 'react'
import { fmtCEP } from '@/data/mockData'

const FB_STYLES = {
  loading: { background: 'rgba(27,79,168,.08)',  color: 'var(--blue)'  },
  ok:      { background: 'rgba(52,199,89,.1)',   color: '#1A7F37'      },
  no:      { background: 'rgba(255,59,48,.08)',  color: '#C0392B'      },
  err:     { background: 'rgba(255,59,48,.08)',  color: '#C0392B'      },
}

export default function CEPWidget() {
  const [cep, setCep]     = useState('')
  const [status, setStatus] = useState(null)

  const check = () => {
    if (cep.replace(/\D/g, '').length < 8) { setStatus('err'); return }
    setStatus('loading')
    setTimeout(() => setStatus(Math.random() > 0.2 ? 'ok' : 'no'), 1500)
  }

  return (
    <div style={{ background: '#fff', borderRadius: 'var(--r-lg)', padding: '22px 24px', maxWidth: 490, margin: '0 auto', boxShadow: 'var(--sh-lg)' }}>
      <p style={{ fontSize: 12.5, color: 'var(--l3)', fontWeight: 500, marginBottom: 12 }}>
        Verifique a disponibilidade no seu endereço
      </p>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          className="cep-input"
          placeholder="00000-000 · Informe seu CEP"
          value={cep}
          onChange={(e) => setCep(fmtCEP(e.target.value))}
          maxLength={9}
          inputMode="numeric"
          aria-label="CEP"
          onKeyDown={(e) => e.key === 'Enter' && check()}
        />
        <button className="btn-primary" onClick={check} style={{ flexShrink: 0 }}>
          Verificar
        </button>
      </div>
      {status && (
        <div role="status" style={{ marginTop: 10, fontSize: 13, fontWeight: 600, padding: '10px 14px', borderRadius: 'var(--r-sm)', display: 'flex', alignItems: 'center', gap: 8, ...FB_STYLES[status] }}>
          {status === 'loading' && <span style={{ animation: 'spin .8s linear infinite', display: 'inline-block' }}>↻</span>}
          {status === 'loading' && 'Verificando disponibilidade...'}
          {status === 'ok'      && <>✅ Disponível! <a href="#planos" style={{ fontWeight: 800, textDecoration: 'underline', color: 'inherit' }} onClick={() => setStatus(null)}>Ver planos →</a></>}
          {(status === 'no' || status === 'err') && <>😔 Ainda não chegamos nesse CEP. <a href="#contato" style={{ fontWeight: 800, textDecoration: 'underline', color: 'inherit' }}>Avise-me →</a></>}
        </div>
      )}
    </div>
  )
}
