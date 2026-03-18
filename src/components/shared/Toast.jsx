import React from 'react'

export default function Toast({ message }) {
  if (!message) return null

  const type = message.includes('!') && !message.includes('erro') ? 'toast-success' : 'toast-info'

  return (
    <div className={`toast-bar ${type}`} role="status" aria-live="polite">
      {message}
    </div>
  )
}
