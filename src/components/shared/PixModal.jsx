import React, { useState, useMemo } from 'react'
import { useApp } from '@/hooks/useApp'
import { fmtBRL } from '@/data/mockData'
import { Check, Copy, Lock } from 'lucide-react'

// ⚠️  ATENÇÃO: As funções abaixo geram dados DEMO/MOCK para fins de demonstração.
// Em produção, os códigos PIX e boleto devem ser obtidos de uma API de pagamento
// (ex.: Mercado Pago, PagSeguro, Stripe, etc.) que retorna códigos válidos e
// verificáveis pelo sistema bancário.

/**
 * Generates a demo PIX code based on the price value.
 * This is NOT a valid PIX code — it is for UI demonstration only.
 * @param {number} price - The payment amount in BRL
 * @returns {string} A mock PIX code string
 */
function generatePixCode(price) {
  const priceStr = price.toFixed(2)
  const paddedPrice = priceStr.padStart(10, '0')
  const pseudoId = Array.from(priceStr)
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
    .toString(16)
    .padStart(8, '0')

  return (
    '00020126580014BR.GOV.BCB.PIX' +
    `0136demo0000-${pseudoId.slice(0, 4)}-${pseudoId.slice(4, 8)}-mock-demomockdata00` +
    '5204000053039865' +
    `40${paddedPrice.length.toString().padStart(2, '0')}${paddedPrice}` +
    '5802BR' +
    '5916ARROBA BANDA LAR' +
    '6009CAMPOS RJ' +
    '62070503***' +
    `6304${pseudoId.slice(0, 4).toUpperCase()}`
  )
}

/**
 * Generates a demo barcode string based on the price value.
 * This is NOT a valid bank slip barcode — it is for UI demonstration only.
 * @param {number} price - The payment amount in BRL
 * @returns {string} A mock barcode string
 */
function generateBarcode(price) {
  const cents = Math.round(price * 100)
    .toString()
    .padStart(10, '0')
  const seed = Array.from(cents).reduce((a, c) => a * 3 + parseInt(c, 10), 7)

  const block1 = `34191.${String(seed % 100000).padStart(5, '0')}`
  const block2 = `${String((seed * 7) % 100000).padStart(5, '0')}.${String((seed * 13) % 100000).padStart(5, '0')}`
  const block3 = `${String((seed * 17) % 100000).padStart(5, '0')}.${String((seed * 23) % 100000).padStart(5, '0')}`
  const checkDigit = (seed % 9) + 1
  const amount = `0000${cents}`

  return `${block1} ${block2} ${block3} ${checkDigit} ${amount}`
}

function QRCode() {
  return (
    <svg viewBox="0 0 130 130" width="120" height="120" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="40" height="40" fill="none" stroke="#000" strokeWidth="5" rx="2" />
      <rect x="20" y="20" width="20" height="20" fill="#000" rx="1" />
      <rect x="80" y="10" width="40" height="40" fill="none" stroke="#000" strokeWidth="5" rx="2" />
      <rect x="90" y="20" width="20" height="20" fill="#000" rx="1" />
      <rect x="10" y="80" width="40" height="40" fill="none" stroke="#000" strokeWidth="5" rx="2" />
      <rect x="20" y="90" width="20" height="20" fill="#000" rx="1" />
      <rect x="55" y="10" width="20" height="5" fill="#000" rx="1" />
      <rect x="55" y="20" width="10" height="5" fill="#000" rx="1" />
      <rect x="70" y="20" width="5"  height="10" fill="#000" rx="1" />
      <rect x="60" y="50" width="15" height="5" fill="#000" rx="1" />
      <rect x="55" y="60" width="20" height="5" fill="#000" rx="1" />
      <rect x="55" y="70" width="5"  height="15" fill="#000" rx="1" />
      <rect x="70" y="65" width="10" height="5" fill="#000" rx="1" />
      <rect x="80" y="55" width="5"  height="15" fill="#000" rx="1" />
      <rect x="90" y="60" width="30" height="5" fill="#000" rx="1" />
      <rect x="80" y="90" width="20" height="5" fill="#000" rx="1" />
      <rect x="95" y="95" width="25" height="5" fill="#000" rx="1" />
      <rect x="80" y="100" width="10" height="10" fill="#000" rx="1" />
      <rect x="110" y="100" width="10" height="20" fill="#000" rx="1" />
      <circle cx="65" cy="65" r="12" fill="white" />
      <circle cx="65" cy="65" r="10" fill="white" stroke="#1B4FA8" strokeWidth="2" />
      <circle cx="65" cy="65" r="5.5" fill="#F5A200" />
      <path d="M65 59.5 A5.5 5.5 0 1 1 70.5 65 L70.5 67.5 A2.8 2.8 0 0 1 65 67.5 L65 65"
        fill="none" stroke="#1B4FA8" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

const TABS = ['pix', 'boleto', 'cartao']
const TAB_LABELS = { pix: 'PIX', boleto: 'Boleto', cartao: 'Cartao' }

export default function PixModal({ price, onClose }) {
  const { showToast } = useApp()
  const [tab,    setTab]    = useState('pix')
  const [copied, setCopied] = useState(false)
  const [card,   setCard]   = useState({ number: '', expiry: '', cvv: '' })

  const pixCode = useMemo(() => generatePixCode(price), [price])
  const barcode = useMemo(() => generateBarcode(price), [price])

  const copy = (code) => {
    navigator.clipboard.writeText(code).catch(() => {})
    setCopied(true)
    showToast('Codigo copiado para a area de transferencia! ✅')
    setTimeout(() => setCopied(false), 3000)
  }

  const fmtCardNum = (v) =>
    v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 390 }} role="dialog" aria-modal="true" aria-label="Pagamento">
        <button className="modal-close" onClick={onClose}>✕</button>

        {/* Amount */}
        <div style={{ fontFamily: 'var(--font-d)', fontSize: 32, fontWeight: 800, color: 'var(--l1)', textAlign: 'center', letterSpacing: '-0.04em' }}>
          {fmtBRL(price)}
        </div>
        <div style={{ fontSize: 12, color: 'var(--l3)', textAlign: 'center', marginBottom: 22 }}>
          Fatura Marco 2025 · Venc. 15/03/2025
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, background: 'var(--bg)', borderRadius: 10, padding: 3, marginBottom: 18 }}>
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setCopied(false) }}
              style={{
                flex: 1, fontFamily: 'var(--font)', fontSize: 12, fontWeight: 700,
                color: tab === t ? 'var(--blue)' : 'var(--l3)',
                background: tab === t ? '#fff' : 'none',
                border: 'none', borderRadius: 8, padding: '8px',
                cursor: 'pointer', transition: 'all .15s',
                boxShadow: tab === t ? '0 1px 3px rgba(0,0,0,.1)' : 'none',
              }}
            >
              {TAB_LABELS[t]}
            </button>
          ))}
        </div>

        {/* PIX */}
        {tab === 'pix' && (
          <>
            <div style={{ width: 150, height: 150, background: '#fff', borderRadius: 12, border: '0.5px solid var(--sep)', margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <QRCode />
            </div>
            <div style={{ background: 'var(--bg)', borderRadius: 10, padding: '10px 12px', fontSize: 9.5, color: 'var(--l2)', wordBreak: 'break-all', fontFamily: 'monospace', lineHeight: 1.6, maxHeight: 66, overflowY: 'auto', marginBottom: 10 }}>
              {pixCode}
            </div>
            <button
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', background: copied ? '#34C759' : undefined, boxShadow: copied ? '0 5px 18px rgba(52,199,89,.35)' : undefined }}
              onClick={() => copy(pixCode)}
            >
              {copied ? <><Check size={15} /> Copiado!</> : <><Copy size={15} /> Copiar codigo PIX</>}
            </button>
          </>
        )}

        {/* Boleto */}
        {tab === 'boleto' && (
          <>
            <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--l3)', marginBottom: 12 }}>Codigo de barras para pagamento</div>
            <div style={{ background: 'var(--bg)', borderRadius: 10, padding: '12px 14px', fontSize: 12, color: 'var(--l1)', fontFamily: 'monospace', textAlign: 'center', letterSpacing: '.02em', marginBottom: 10 }}>
              {barcode}
            </div>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => copy(barcode)}>
              <Copy size={15} /> Copiar codigo de barras
            </button>
          </>
        )}

        {/* Cartao */}
        {tab === 'cartao' && (
          <>
            <div className="form-field">
              <label className="form-label">Numero do cartao</label>
              <input className="form-input" type="text" placeholder="0000 0000 0000 0000"
                maxLength={19} value={card.number}
                onChange={(e) => setCard((c) => ({ ...c, number: fmtCardNum(e.target.value) }))} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
              <div className="form-field" style={{ marginBottom: 0 }}>
                <label className="form-label">Validade</label>
                <input className="form-input" type="text" placeholder="MM/AA" maxLength={5}
                  value={card.expiry}
                  onChange={(e) => setCard((c) => ({ ...c, expiry: e.target.value }))} />
              </div>
              <div className="form-field" style={{ marginBottom: 0 }}>
                <label className="form-label">CVV</label>
                <input className="form-input" type="text" placeholder="000" maxLength={3}
                  value={card.cvv}
                  onChange={(e) => setCard((c) => ({ ...c, cvv: e.target.value }))} />
              </div>
            </div>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => { showToast('Pagamento aprovado! ✅'); onClose() }}>
              <Lock size={15} /> Pagar {fmtBRL(price)}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
