import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '@/hooks/useApp'
import Logo from '@/components/shared/Logo'

const NAV_ITEMS = [
  { id: 'dashboard',   icon: '🏠', label: 'Início',        badge: null },
  { id: 'faturas',     icon: '💳', label: 'Faturas',       badge: 1    },
  { id: 'contratos',   icon: '📋', label: 'Contratos',     badge: null },
  { id: 'notas',       icon: '🧾', label: 'Notas Fiscais', badge: null },
  { id: 'consumo',     icon: '📊', label: 'Consumo',       badge: null },
  { id: 'relatorios',  icon: '📈', label: 'Relatórios',    badge: null },
  { id: 'atendimento', icon: '🎧', label: 'Atendimento',   badge: 1    },
]

const ACCOUNT_ITEMS = [
  { id: 'perfil', icon: '👤', label: 'Meu Perfil', badge: null },
]

function NavItem({ item, active, onClick }) {
  return (
    <button
      className={`p-nav-item${active ? ' active' : ''}`}
      onClick={() => onClick(item.id)}
    >
      <span className="p-nav-ico">{item.icon}</span>
      {item.label}
      {item.badge && <span className="p-nav-badge">{item.badge}</span>}
    </button>
  )
}

export default function PortalSidebar() {
  const { user, sideOpen, setSide, doLogout } = useApp()
  const navigate = useNavigate()
  const location = useLocation()

  // Derive active page from current URL path
  const pathSegments = location.pathname.split('/')
  const activePage = pathSegments[2] || 'dashboard'

  const handleNav = (id) => {
    navigate(`/portal/${id}`)
    setSide(false)
  }

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`p-sidebar-backdrop${sideOpen ? ' open' : ''}`}
        onClick={() => setSide(false)}
      />

      <aside className={`p-sidebar${sideOpen ? ' open' : ''}`}>
        {/* Logo → back to site */}
        <div className="p-sidebar-logo">
          <button
            onClick={() => { navigate('/'); setSide(false) }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'block' }}
            title="Voltar ao site"
          >
            <Logo height={34} textColor="#1B4FA8" />
          </button>
        </div>

        {/* User info */}
        {user && (
          <div className="p-sidebar-user">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div
                className="p-sidebar-user-av"
                style={{ background: user.avatarGradient }}
              >
                {user.initials}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--p-l1)', letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user.name}
                </div>
                <div style={{ fontSize: 11, color: 'var(--p-l3)' }}>
                  Plano {user.plan.name}
                </div>
              </div>
            </div>
            {/* Active status pill */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(52,199,89,.09)', border: '1px solid rgba(52,199,89,.2)', borderRadius: 20, padding: '4px 10px' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34C759', animation: 'pulse 2.5s ease infinite' }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#1A7F37' }}>Conexão ativa</span>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 12 }}>
          <div className="p-nav-section">Menu principal</div>
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              active={activePage === item.id}
              onClick={handleNav}
            />
          ))}

          <div className="p-nav-section" style={{ marginTop: 8 }}>Minha conta</div>
          {ACCOUNT_ITEMS.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              active={activePage === item.id}
              onClick={handleNav}
            />
          ))}
        </div>

        {/* Logout */}
        <div className="p-sidebar-bottom">
          <button className="p-logout-btn" onClick={doLogout}>
            <span style={{ fontSize: 16 }}>↩</span>
            Sair da conta
          </button>
        </div>
      </aside>
    </>
  )
}
