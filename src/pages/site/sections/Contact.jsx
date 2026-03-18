import React, { useState } from 'react'
import { useApp } from '@/hooks/useApp'

const CHANNELS = [
  { ico: '📞', label: '0800 Gratuito',  val: '0800 020 2440',                                        href: 'tel:08000202440',                                      bg: 'rgba(27,79,168,.1)'   },
  { ico: '💬', label: 'WhatsApp',        val: 'Atendimento 7 dias',                                  href: 'https://api.whatsapp.com/send/?phone=5508000202440',   bg: 'rgba(37,211,102,.1)'  },
  { ico: '✉️', label: 'E-mail',         val: 'contato@arrobabandalarga.com.br',                     href: 'mailto:contato@arrobabandalarga.com.br',                bg: 'rgba(245,162,0,.1)'   },
  { ico: '📍', label: 'Endereço',        val: 'Av. Tancredo Neves, 104 — Campos dos Goytacazes/RJ', href: null,                                                    bg: 'rgba(88,86,214,.1)'   },
  { ico: '🕐', label: 'Horário',         val: 'Seg–Dom · 08h às 00h',                               href: null,                                                    bg: 'rgba(60,60,67,.07)'   },
]

export default function Contact() {
  const { showToast } = useApp()
  const [form, setForm]     = useState({ name: '', tel: '', email: '', cep: '', plano: '', obs: '' })
  const [sent, setSent]     = useState(false)
  const [sending, setSend]  = useState(false)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.name || !form.tel || !form.cep) { showToast('⚠️ Preencha Nome, Telefone e CEP.'); return }
    setSend(true)
    setTimeout(() => { setSend(false); setSent(true) }, 1400)
  }

  return (
    <section className="site-section" id="contato" style={{ background: 'var(--bg)' }}>
      <div className="site-container">
        <div style={{ marginBottom: 48 }}>
          <div className="site-kicker">Fale com a gente</div>
          <h2 className="site-h2">Pronto para ter internet<br />de verdade?</h2>
          <p className="site-sub">Nossa equipe atende de segunda a segunda. Ligue, mande WhatsApp ou preencha o formulário.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 52, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {CHANNELS.map((ch) => (
              <a key={ch.label} href={ch.href || undefined} target={ch.href?.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="contact-channel">
                <div style={{ width: 42, height: 42, borderRadius: 12, background: ch.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{ch.ico}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--l3)' }}>{ch.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--l1)', marginTop: 1, letterSpacing: '-.01em' }}>{ch.val}</div>
                </div>
              </a>
            ))}
          </div>

          <form onSubmit={submit} style={{ background: 'var(--surface)', borderRadius: 'var(--r-lg)', padding: 32, boxShadow: 'var(--sh-md)' }}>
            {!sent ? (
              <>
                <div style={{ fontFamily: 'var(--font-d)', fontSize: 19, fontWeight: 800, color: 'var(--l1)', letterSpacing: '-.02em', marginBottom: 24 }}>Solicitar contratação gratuita</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  {[{ lbl: 'Nome completo *', k: 'name', type: 'text', ph: 'Seu nome', full: false }, { lbl: 'Telefone *', k: 'tel', type: 'tel', ph: '(22) 99999-9999', full: false }, { lbl: 'E-mail', k: 'email', type: 'email', ph: 'seu@email.com', full: true }, { lbl: 'CEP *', k: 'cep', type: 'text', ph: '00000-000', full: false }].map((f) => (
                    <div key={f.k} className="form-field" style={{ gridColumn: f.full ? 'span 2' : 'span 1', marginBottom: 0 }}>
                      <label className="form-label">{f.lbl}</label>
                      <input className="form-input" type={f.type} placeholder={f.ph} value={form[f.k]} onChange={set(f.k)} />
                    </div>
                  ))}
                  <div className="form-field" style={{ marginBottom: 0 }}>
                    <label className="form-label">Plano desejado</label>
                    <select className="form-input" value={form.plano} onChange={set('plano')}>
                      <option value="">Selecionar plano</option>
                      <option>600 Mega — R$ 89,70/mês</option>
                      <option>800 Mega — R$ 99,70/mês</option>
                      <option>1 Giga — R$ 119,70/mês</option>
                      <option>Plano empresarial</option>
                    </select>
                  </div>
                  <div className="form-field" style={{ gridColumn: 'span 2', marginBottom: 0 }}>
                    <label className="form-label">Observações</label>
                    <textarea className="form-input" placeholder="Endereço completo, melhor horário..." rows={3} value={form.obs} onChange={set('obs')} style={{ resize: 'vertical' }} />
                  </div>
                </div>
                <button type="submit" disabled={sending} className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 15, padding: 15, marginTop: 6 }}>
                  {sending ? 'Enviando...' : 'Solicitar instalação gratuita →'}
                </button>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '32px 16px' }} role="status">
                <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
                <div style={{ fontFamily: 'var(--font-d)', fontSize: 20, fontWeight: 800, color: 'var(--l1)', marginBottom: 8 }}>Solicitação recebida!</div>
                <p style={{ fontSize: 14, color: 'var(--l3)' }}>Nossa equipe entrará em contato em até 2 horas úteis.</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
