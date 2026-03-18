import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '@/hooks/useApp'
import { MOCK_USERS } from '@/data/mockData'
import Logo from '@/components/shared/Logo'
import { ArrowLeft } from 'lucide-react'

const DEMO_USERS = [
  { key: 'nicolas', label: 'Nicolas',   plan: '800 Mega', gradient: 'linear-gradient(135deg,#1B4FA8,#2060D4)' },
  { key: 'ana',     label: 'Ana Luíza', plan: '1 Giga',   gradient: 'linear-gradient(135deg,#F5A200,#D98F00)' },
  { key: 'ricardo', label: 'Ricardo',   plan: '600 Mega', gradient: 'linear-gradient(135deg,#5856D6,#4745C8)' },
]

export default function Login() {
  const { doLogin } = useApp()
  const navigate = useNavigate()
  const [cpf,     setCpf]     = useState('')
  const [pass,    setPass]    = useState('')
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  const login = (key = null) => {
    if (!key) {
      const errs = {}
      if (!cpf.trim()) errs.cpf = true
      if (!pass) errs.pass = true
      if (Object.keys(errs).length) {
        setFieldErrors(errs)
        setError('Preencha CPF/e-mail e senha.')
        return
      }
    }
    setFieldErrors({})
    setError('')
    setLoading(true)
    setTimeout(() => {
      // Aceita qualquer credencial — demonstrativo
      const resolvedKey = key
        || (cpf.toLowerCase().includes('ana')     ? 'ana'
          : cpf.toLowerCase().includes('ric')     ? 'ricardo'
          : 'nicolas')
      doLogin(MOCK_USERS[resolvedKey])
      setLoading(false)
    }, 800)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'radial-gradient(ellipse 120% 80% at 70% 50%, rgba(27,79,168,.18), transparent), #0D111A',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Grid background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(27,79,168,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(27,79,168,.06) 1px,transparent 1px)',
        backgroundSize: '52px 52px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black 20%,transparent 90%)',
      }} />

      {/* Big @ decoration */}
      <div style={{
        position: 'absolute', right: '-4%', top: '50%', transform: 'translateY(-50%)',
        fontFamily: 'var(--font-d)', fontSize: 600, fontWeight: 800,
        color: 'rgba(255,255,255,.016)', lineHeight: 1, letterSpacing: '-.05em',
        pointerEvents: 'none', userSelect: 'none',
      }}>@</div>

      {/* Card */}
      <div className="fade-up" style={{
        background: '#fff',
        border: '0.5px solid rgba(60,60,67,.12)',
        borderRadius: 'var(--r-xl)',
        padding: '44px 40px',
        width: '100%', maxWidth: 420, margin: 16,
        boxShadow: '0 24px 80px rgba(0,0,0,.25)',
        position: 'relative', zIndex: 1,
      }}>
        {/* Back to site */}
        <button
          onClick={() => navigate('/')}
          className="login-back-btn"
        >
          <ArrowLeft size={14} /> Voltar ao site
        </button>

        {/* Logo + heading */}
        <div style={{ textAlign: 'center', marginBottom: 30, marginTop: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <Logo height={46} textColor="#1B4FA8" />
          </div>
          <div style={{ fontFamily: 'var(--font-d)', fontSize: 22, fontWeight: 800, color: 'var(--l1)', letterSpacing: '-0.025em' }}>
            Área do Cliente
          </div>
          <div style={{ fontSize: 13, color: 'var(--l3)', marginTop: 4 }}>
            Use qualquer credencial — portal demonstrativo
          </div>
        </div>

        {/* Fields */}
        <div className="form-field">
          <label className="form-label">CPF ou E-mail</label>
          <input
            className={`form-input${fieldErrors.cpf ? ' error' : ''}`}
            type="text"
            placeholder="000.000.000-00 ou e-mail"
            value={cpf}
            onChange={(e) => { setCpf(e.target.value); setFieldErrors(f => ({...f, cpf: false})) }}
            onKeyDown={(e) => e.key === 'Enter' && login()}
            autoComplete="username"
          />
        </div>
        <div className="form-field">
          <label className="form-label">Senha</label>
          <input
            className={`form-input${fieldErrors.pass ? ' error' : ''}`}
            type="password"
            placeholder="••••••••"
            value={pass}
            onChange={(e) => { setPass(e.target.value); setFieldErrors(f => ({...f, pass: false})) }}
            onKeyDown={(e) => e.key === 'Enter' && login()}
            autoComplete="current-password"
          />
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: 'rgba(255,59,48,.07)', border: '1px solid rgba(255,59,48,.15)',
            borderRadius: 8, padding: '10px 14px',
            fontSize: 13, fontWeight: 600, color: '#C0392B', marginBottom: 14,
          }}>
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center', fontSize: 15, padding: 14 }}
          onClick={() => login()}
          disabled={loading}
        >
          {loading ? 'Verificando...' : 'Entrar na minha conta →'}
        </button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '18px 0 12px', fontSize: 11, color: 'var(--l3)' }}>
          <div style={{ flex: 1, height: '0.5px', background: 'var(--sep)' }} />
          ou acesso rápido demo
          <div style={{ flex: 1, height: '0.5px', background: 'var(--sep)' }} />
        </div>

        {/* Demo chips */}
        <div style={{ display: 'flex', gap: 8 }}>
          {DEMO_USERS.map((d) => (
            <button
              key={d.key}
              onClick={() => login(d.key)}
              className="login-demo-chip"
            >
              <div style={{
                width: 26, height: 26, borderRadius: '50%',
                background: d.gradient,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 800, color: '#fff', flexShrink: 0,
              }}>
                {d.label[0]}
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--l1)' }}>{d.label}</div>
                <div style={{ fontSize: 10, color: 'var(--l3)' }}>{d.plan}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
