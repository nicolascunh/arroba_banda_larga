import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import ErrorBoundary from './components/shared/ErrorBoundary'
import SitePage from './pages/site/SitePage'
import Login from './pages/portal/Login'
import PortalLayout from './pages/portal/PortalLayout'
import Dashboard from './pages/portal/Dashboard'
import Faturas from './pages/portal/Faturas'
import Contratos from './pages/portal/Contratos'
import Notas from './pages/portal/Notas'
import Consumo from './pages/portal/Consumo'
import Relatorios from './pages/portal/Relatorios'
import Atendimento from './pages/portal/Atendimento'
import Perfil from './pages/portal/Perfil'

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <ErrorBoundary>
        <Routes>
          <Route path="/" element={<SitePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/portal" element={<PortalLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="faturas" element={<Faturas />} />
            <Route path="contratos" element={<Contratos />} />
            <Route path="notas" element={<Notas />} />
            <Route path="consumo" element={<Consumo />} />
            <Route path="relatorios" element={<Relatorios />} />
            <Route path="atendimento" element={<Atendimento />} />
            <Route path="perfil" element={<Perfil />} />
          </Route>
        </Routes>
        </ErrorBoundary>
      </AppProvider>
    </BrowserRouter>
  )
}
