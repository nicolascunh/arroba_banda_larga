import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '@/hooks/useApp'
import { CreditCard, Headphones, BarChart3, LogOut } from 'lucide-react'

export default function Perfil() {
  const { user, showToast, doLogout } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name:  user.name,
    email: user.email,
    phone: user.phone,
  })
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <div className="fade-in">
      <div className="p-page-header">
        <div>
          <div className="p-page-title">Meu Perfil</div>
          <div className="p-page-sub">Dados pessoais e configurações da conta</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 16, alignItems: 'start' }}>
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Avatar card */}
          <div className="portal-card" style={{ textAlign: 'center', padding: 24 }}>
            <div style={{ width: 68, height: 68, borderRadius: '50%', background: user.avatarGradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 800, color: '#fff', margin: '0 auto 14px', boxShadow: '0 4px 14px rgba(27,79,168,.3)' }}>
              {user.initials}
            </div>
            <div style={{ fontFamily: 'var(--font-d)', fontSize: 17, fontWeight: 800, color: 'var(--p-l1)', letterSpacing: '-.02em' }}>{user.name}</div>
            <div style={{ fontSize: 12, color: 'var(--p-l3)', marginTop: 3 }}>Plano {user.plan.name}</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(52,199,89,.1)', border: '1px solid rgba(52,199,89,.2)', color: '#1A7F37', fontSize: 11, fontWeight: 700, padding: '5px 14px', borderRadius: 20, margin: '12px auto' }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#34C759' }} /> Ativo
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 14 }}>
              {[
                { v: `${user.months}`, l: 'meses' },
                { v: '99,8%',          l: 'uptime',     c: '#1A7F37' },
                { v: 'R$0',            l: 'pendências'  },
                { v: '2',              l: 'chamados'    },
              ].map((s) => (
                <div key={s.l} style={{ background: 'var(--bg)', borderRadius: 10, padding: '10px 8px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-d)', fontSize: 17, fontWeight: 800, color: s.c || 'var(--p-l1)', letterSpacing: '-.03em' }}>{s.v}</div>
                  <div style={{ fontSize: 10, color: 'var(--p-l4)', fontWeight: 500, marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="portal-card" style={{ padding: 18 }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--p-l4)', marginBottom: 12 }}>Acesso rápido</div>
            {[
              { ico: CreditCard, label: 'Ver faturas',    action: () => navigate('/portal/faturas') },
              { ico: Headphones, label: 'Abrir chamado',  action: () => navigate('/portal/atendimento') },
              { ico: BarChart3,  label: 'Ver consumo',    action: () => navigate('/portal/consumo') },
              { ico: LogOut,     label: 'Sair da conta',  action: doLogout, danger: true },
            ].map((a) => (
              <button key={a.label} onClick={a.action}
                className={a.danger ? 'p-quick-action danger' : 'p-quick-action'}>
                <span style={{ display: 'inline-flex', alignItems: 'center' }}>{React.createElement(a.ico, { size: 16 })}</span>{a.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right column — forms */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Dados pessoais */}
          <div className="portal-card">
            <div style={{ fontFamily: 'var(--font-d)', fontSize: 16, fontWeight: 700, color: 'var(--p-l1)', marginBottom: 20 }}>Dados Pessoais</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div className="form-field" style={{ marginBottom: 0 }}>
                <label className="form-label">Nome completo</label>
                <input className="form-input" value={form.name} onChange={set('name')} />
              </div>
              <div className="form-field" style={{ marginBottom: 0 }}>
                <label className="form-label">CPF</label>
                <input className="form-input" value={user.cpf} disabled />
              </div>
              <div className="form-field" style={{ marginBottom: 0 }}>
                <label className="form-label">E-mail</label>
                <input className="form-input" type="email" value={form.email} onChange={set('email')} />
              </div>
              <div className="form-field" style={{ marginBottom: 0 }}>
                <label className="form-label">Telefone</label>
                <input className="form-input" type="tel" value={form.phone} onChange={set('phone')} />
              </div>
              <div className="form-field" style={{ marginBottom: 0, gridColumn: 'span 2' }}>
                <label className="form-label">Endereço de instalação</label>
                <input className="form-input" value={user.address} disabled />
              </div>
            </div>
            <button className="btn-primary" style={{ marginTop: 18 }} onClick={() => showToast('Dados salvos com sucesso! ✅')}>
              Salvar alterações
            </button>
          </div>

          {/* Senha */}
          <div className="portal-card">
            <div style={{ fontFamily: 'var(--font-d)', fontSize: 16, fontWeight: 700, color: 'var(--p-l1)', marginBottom: 20 }}>Alterar Senha</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div className="form-field" style={{ marginBottom: 0 }}>
                <label className="form-label">Senha atual</label>
                <input className="form-input" type="password" placeholder="••••••••" />
              </div>
              <div className="form-field" style={{ marginBottom: 0 }}>
                <label className="form-label">Nova senha</label>
                <input className="form-input" type="password" placeholder="Mínimo 8 caracteres" />
              </div>
            </div>
            <button className="btn-primary" style={{ marginTop: 18 }} onClick={() => showToast('Senha atualizada! ✅')}>
              Atualizar senha
            </button>
          </div>

          {/* Notificações */}
          <div className="portal-card">
            <div style={{ fontFamily: 'var(--font-d)', fontSize: 16, fontWeight: 700, color: 'var(--p-l1)', marginBottom: 20 }}>Preferências de Notificação</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                { l: 'Aviso de fatura',  opts: ['3 dias antes', '5 dias antes', '1 dia antes', 'Desativar'] },
                { l: 'Chamados',         opts: ['Push + E-mail', 'Só Push', 'Desativar'] },
                { l: 'Manutenções',      opts: ['Ativar', 'Desativar'] },
                { l: 'Relatório mensal', opts: ['Ativar', 'Desativar'] },
              ].map((n) => (
                <div key={n.l} className="form-field" style={{ marginBottom: 0 }}>
                  <label className="form-label">{n.l}</label>
                  <select className="form-input">
                    {n.opts.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <button className="btn-primary" style={{ marginTop: 18 }} onClick={() => showToast('Preferências salvas! ✅')}>
              Salvar preferências
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
