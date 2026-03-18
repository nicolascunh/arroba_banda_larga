import React, { useState, useRef, useEffect } from 'react'
import { Loader2, CheckCircle, Frown, MapPin, Wifi, Zap, ArrowRight, Bell, Search } from 'lucide-react'
import { fmtCEP } from '@/data/mockData'

const PLANS_PREVIEW = [
  { name: '600 Mega', speed: '600', price: 'R$89,70' },
  { name: '800 Mega', speed: '800', price: 'R$99,70' },
  { name: '1 Giga',   speed: '1000', price: 'R$119,70' },
]

function ScanningAnimation() {
  return (
    <div className="cep-scanning">
      <div className="cep-scanning-bar" />
      <div className="cep-scanning-dots">
        {[0, 1, 2].map((i) => (
          <div key={i} className="cep-scanning-dot" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--blue)', marginTop: 4 }}>
        Verificando disponibilidade...
      </div>
      <div style={{ fontSize: 11, color: 'var(--l4)', marginTop: 2 }}>
        Consultando base de cobertura
      </div>
    </div>
  )
}

function CoverageFound({ cep, onViewPlans }) {
  return (
    <div className="cep-result cep-result-ok">
      <div className="cep-result-header">
        <div className="cep-result-icon cep-result-icon-ok">
          <CheckCircle size={20} />
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#1A7F37', letterSpacing: '-.01em' }}>
            Cobertura disponivel!
          </div>
          <div style={{ fontSize: 12, color: 'var(--l3)' }}>
            CEP {cep} · Fibra optica FTTH
          </div>
        </div>
      </div>

      <div className="cep-signal">
        <div className="cep-signal-item">
          <Wifi size={14} color="var(--blue)" />
          <span>Sinal</span>
          <strong style={{ color: '#1A7F37' }}>Excelente</strong>
        </div>
        <div className="cep-signal-item">
          <Zap size={14} color="var(--amber)" />
          <span>Velocidade max</span>
          <strong>1 Gbps</strong>
        </div>
        <div className="cep-signal-item">
          <MapPin size={14} color="var(--blue)" />
          <span>Tipo</span>
          <strong>FTTH</strong>
        </div>
      </div>

      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--l4)', marginBottom: 8 }}>
        Planos disponiveis na sua regiao
      </div>
      <div className="cep-plans-preview">
        {PLANS_PREVIEW.map((p) => (
          <div key={p.name} className="cep-plan-chip">
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--l1)' }}>{p.name}</div>
              <div style={{ fontSize: 10, color: 'var(--l4)' }}>{p.speed} Mbps</div>
            </div>
            <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--blue)' }}>{p.price}</div>
          </div>
        ))}
      </div>

      <a href="#planos" className="btn-primary cep-view-plans-btn" onClick={onViewPlans}>
        Ver todos os planos <ArrowRight size={14} />
      </a>
    </div>
  )
}

function CoverageNotFound({ cep, onNotify }) {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNotify = () => {
    if (email.includes('@')) {
      setSubscribed(true)
      if (onNotify) onNotify(email)
    }
  }

  return (
    <div className="cep-result cep-result-no">
      <div className="cep-result-header">
        <div className="cep-result-icon cep-result-icon-no">
          <Frown size={20} />
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#C0392B', letterSpacing: '-.01em' }}>
            Ainda nao chegamos ai
          </div>
          <div style={{ fontSize: 12, color: 'var(--l3)' }}>
            CEP {cep} · Sem cobertura no momento
          </div>
        </div>
      </div>

      <div style={{ fontSize: 13, color: 'var(--l3)', lineHeight: 1.6, marginBottom: 14 }}>
        Estamos expandindo nossa rede de fibra optica. Cadastre-se para ser notificado assim que houver disponibilidade na sua regiao.
      </div>

      {!subscribed ? (
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            className="cep-input"
            type="email"
            placeholder="Seu melhor e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleNotify()}
            style={{ fontSize: 13 }}
          />
          <button className="btn-primary" onClick={handleNotify} style={{ flexShrink: 0, fontSize: 13, padding: '10px 18px' }}>
            <Bell size={13} /> Avisar
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: '#1A7F37', background: 'rgba(52,199,89,.08)', borderRadius: 'var(--r-sm)', padding: '10px 14px' }}>
          <CheckCircle size={14} /> Cadastrado! Avisaremos quando chegar.
        </div>
      )}
    </div>
  )
}

export default function CEPWidget({ onStatusChange }) {
  const [cep, setCep] = useState('')
  const [status, setStatus] = useState(null) // null | 'loading' | 'ok' | 'no' | 'err'
  const inputRef = useRef(null)

  useEffect(() => {
    if (onStatusChange) onStatusChange(status, cep)
  }, [status, cep, onStatusChange])

  const check = () => {
    const digits = cep.replace(/\D/g, '')
    if (digits.length < 8) {
      setStatus('err')
      if (inputRef.current) inputRef.current.focus()
      return
    }
    setStatus('loading')
    setTimeout(() => setStatus(Math.random() > 0.2 ? 'ok' : 'no'), 2200)
  }

  const reset = () => {
    setCep('')
    setStatus(null)
    if (inputRef.current) inputRef.current.focus()
  }

  return (
    <div className="cep-widget">
      <div className="cep-widget-header">
        <Search size={15} color="var(--blue)" />
        <span style={{ fontSize: 13, color: 'var(--l3)', fontWeight: 600 }}>
          Verifique a disponibilidade no seu endereco
        </span>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <input
          ref={inputRef}
          className={`cep-input${status === 'err' ? ' cep-input-error' : ''}`}
          placeholder="00000-000"
          value={cep}
          onChange={(e) => { setCep(fmtCEP(e.target.value)); if (status === 'err') setStatus(null) }}
          maxLength={9}
          inputMode="numeric"
          aria-label="CEP"
          onKeyDown={(e) => e.key === 'Enter' && check()}
          disabled={status === 'loading'}
        />
        {(status === 'ok' || status === 'no') ? (
          <button className="btn-secondary" onClick={reset} style={{ flexShrink: 0, fontSize: 13 }}>
            Novo CEP
          </button>
        ) : (
          <button className="btn-primary" onClick={check} disabled={status === 'loading'} style={{ flexShrink: 0 }}>
            {status === 'loading' ? <Loader2 size={15} className="spin-icon" /> : 'Verificar'}
          </button>
        )}
      </div>

      {status === 'err' && (
        <div style={{ fontSize: 12, fontWeight: 600, color: '#C0392B', marginTop: 6, display: 'flex', alignItems: 'center', gap: 4, animation: 'fadeIn .15s ease' }}>
          Informe um CEP valido com 8 digitos
        </div>
      )}

      {status === 'loading' && <ScanningAnimation />}
      {status === 'ok' && <CoverageFound cep={cep} onViewPlans={() => setStatus(null)} />}
      {status === 'no' && <CoverageNotFound cep={cep} />}
    </div>
  )
}
