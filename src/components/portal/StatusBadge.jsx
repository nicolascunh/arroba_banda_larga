import React from 'react'

const STATUS_MAP = {
  paid:     { label: 'Pago',       cls: 'badge-ok'     },
  open:     { label: 'Em aberto',  cls: 'badge-warn'   },
  overdue:  { label: 'Vencida',    cls: 'badge-danger' },
  active:   { label: 'Ativo',      cls: 'badge-ok'     },
  resolved: { label: 'Resolvido',  cls: 'badge-ok'     },
  issued:   { label: 'Emitida',    cls: 'badge-blue'   },
}

export default function StatusBadge({ status }) {
  const m = STATUS_MAP[status] || { label: status, cls: 'badge-blue' }
  return <span className={`badge ${m.cls}`}>{m.label}</span>
}
