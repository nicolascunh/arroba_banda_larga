import React from 'react'
import { FileX, Inbox, SearchX, WifiOff, TicketX } from 'lucide-react'

const PRESETS = {
  faturas: {
    icon: FileX,
    title: 'Nenhuma fatura encontrada',
    description: 'Suas faturas aparecerão aqui assim que forem geradas.',
  },
  notas: {
    icon: FileX,
    title: 'Nenhuma nota fiscal',
    description: 'Notas fiscais serão emitidas automaticamente após o pagamento.',
  },
  tickets: {
    icon: Inbox,
    title: 'Nenhum chamado aberto',
    description: 'Tudo certo por aqui! Abra um chamado se precisar de ajuda.',
    actionLabel: 'Abrir chamado',
  },
  relatorios: {
    icon: FileX,
    title: 'Nenhum relatório disponível',
    description: 'Relatórios são gerados mensalmente e estarão disponíveis em breve.',
  },
  search: {
    icon: SearchX,
    title: 'Nenhum resultado',
    description: 'Tente ajustar os filtros ou buscar por outro termo.',
  },
  offline: {
    icon: WifiOff,
    title: 'Sem conexão',
    description: 'Verifique sua conexão com a internet e tente novamente.',
    actionLabel: 'Tentar novamente',
  },
}

export default function EmptyState({ type, title, description, actionLabel, onAction, icon: CustomIcon }) {
  const preset = PRESETS[type] || {}
  const Icon = CustomIcon || preset.icon || Inbox
  const finalTitle = title || preset.title || 'Nada por aqui'
  const finalDesc = description || preset.description || ''
  const finalAction = actionLabel || preset.actionLabel

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
      textAlign: 'center',
    }}>
      <div style={{
        width: 72,
        height: 72,
        borderRadius: 20,
        background: 'var(--blue-lt, rgba(27,79,168,0.09))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
      }}>
        <Icon size={32} color="var(--blue, #1B4FA8)" strokeWidth={1.5} />
      </div>
      <h3 style={{
        fontFamily: 'var(--font-d)',
        fontSize: 18,
        fontWeight: 800,
        color: 'var(--p-l1, var(--l1))',
        letterSpacing: '-0.02em',
        marginBottom: 8,
      }}>
        {finalTitle}
      </h3>
      <p style={{
        fontSize: 14,
        color: 'var(--p-l3, var(--l3))',
        lineHeight: 1.6,
        maxWidth: 320,
        marginBottom: finalAction ? 20 : 0,
      }}>
        {finalDesc}
      </p>
      {finalAction && onAction && (
        <button className="btn-primary" onClick={onAction} style={{ fontSize: 14 }}>
          {finalAction}
        </button>
      )}
    </div>
  )
}
