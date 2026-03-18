import React from 'react'
import { Outlet } from 'react-router-dom'
import { useApp } from '@/hooks/useApp'
import PortalSidebar from '@/components/portal/PortalSidebar'
import PortalTopbar  from '@/components/portal/PortalTopbar'
import Toast         from '@/components/shared/Toast'

export default function PortalLayout() {
  const { toast } = useApp()

  return (
    <div className="portal-root">
      <a href="#portal-content" className="skip-to-content">Pular para o conteúdo</a>
      <PortalSidebar />

      <div className="p-main">
        <PortalTopbar />
        <div className="p-content" id="portal-content">
          <Outlet />
        </div>
      </div>

      <Toast message={toast} />
    </div>
  )
}
