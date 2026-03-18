import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '@/hooks/useApp'

const PAGE_LABELS = {
  dashboard:   'Início',
  faturas:     'Faturas',
  contratos:   'Contratos',
  notas:       'Notas Fiscais',
  consumo:     'Consumo',
  relatorios:  'Relatórios',
  atendimento: 'Atendimento',
  perfil:      'Meu Perfil',
}

export default function PortalTopbar() {
  const { user, setSide, showToast } = useApp()
  const navigate = useNavigate()
  const location = useLocation()

  // Derive current page from URL
  const pathSegments = location.pathname.split('/')
  const page = pathSegments[2] || 'dashboard'

  return (
    <div className="p-topbar">
      {/* Burger — mobile only (CSS hides on desktop) */}
      <button
        className="p-burger"
        onClick={() => setSide((s) => !s)}
        aria-label="Abrir menu"
      >
        <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
          <path d="M1 1h18M1 8h18M1 15h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      {/* Page title */}
      <div className="p-topbar-title">
        {PAGE_LABELS[page] || page}
      </div>

      {/* Right actions */}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Notifications */}
        <button
          onClick={() => showToast('Nenhuma nova notificação.')}
          className="p-topbar-btn"
          aria-label="Notificações"
        >
          🔔
          <div style={{
            position: 'absolute', top: -3, right: -3,
            width: 14, height: 14, borderRadius: '50%',
            background: '#FF3B30', color: '#fff',
            fontSize: 8, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid #fff',
          }}>
            2
          </div>
        </button>

        {/* User button */}
        {user && (
          <button
            onClick={() => navigate('/portal/perfil')}
            className="p-topbar-user-btn"
          >
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: user.avatarGradient,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 800, color: '#fff',
            }}>
              {user.initials}
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--l1)' }}>
              {user.name}
            </div>
          </button>
        )}
      </div>
    </div>
  )
}
