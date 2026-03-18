// ─────────────────────────────────────────────
// Dados mockados — substitua por chamadas reais
// à API quando integrar ao backend.
// ─────────────────────────────────────────────

export const MOCK_USERS = {
  nicolas: {
    id: 'nicolas',
    name: 'Nicolas',
    initials: 'N',
    avatarGradient: 'linear-gradient(135deg, #1B4FA8, #2060D4)',
    cpf: '123.456.789-00',
    email: 'nicolas@email.com',
    phone: '(22) 99999-9999',
    address: 'Estrada Santa Rosa, 266 — Campos dos Goytacazes/RJ',
    contract: 'ARR-2024-0847',
    since: 'Março/2024',
    months: 14,
    plan: {
      name: '800 Mega',
      dl: 800,
      ul: 800,
      wifi: 'Wi-Fi 5 Premium',
      price: 99.70,
    },
  },
  ana: {
    id: 'ana',
    name: 'Ana Luíza',
    initials: 'A',
    avatarGradient: 'linear-gradient(135deg, #F5A200, #D98F00)',
    cpf: '987.654.321-00',
    email: 'analuiza@email.com',
    phone: '(22) 98888-8888',
    address: 'Rua das Palmeiras, 45 — Campos dos Goytacazes/RJ',
    contract: 'ARR-2023-0421',
    since: 'Janeiro/2023',
    months: 26,
    plan: {
      name: '1 Giga',
      dl: 920,
      ul: 920,
      wifi: 'Wi-Fi 6 Premium',
      price: 119.70,
    },
  },
  ricardo: {
    id: 'ricardo',
    name: 'Ricardo',
    initials: 'R',
    avatarGradient: 'linear-gradient(135deg, #5856D6, #4745C8)',
    cpf: '456.789.123-00',
    email: 'ricardo@email.com',
    phone: '(22) 97777-7777',
    address: 'Av. Pelinca, 1200 — Campos dos Goytacazes/RJ',
    contract: 'ARR-2024-1203',
    since: 'Julho/2024',
    months: 8,
    plan: {
      name: '600 Mega',
      dl: 600,
      ul: 600,
      wifi: 'Wi-Fi 5 Premium',
      price: 89.70,
    },
  },
}

export function getMockFaturas(price) {
  return [
    { id: 'F2025-03', ref: 'Março 2025',      value: price, due: '15/03/2025', status: 'open' },
    { id: 'F2025-02', ref: 'Fevereiro 2025',  value: price, due: '15/02/2025', status: 'paid' },
    { id: 'F2025-01', ref: 'Janeiro 2025',    value: price, due: '15/01/2025', status: 'paid' },
    { id: 'F2024-12', ref: 'Dezembro 2024',   value: price, due: '15/12/2024', status: 'paid' },
    { id: 'F2024-11', ref: 'Novembro 2024',   value: price, due: '15/11/2024', status: 'paid' },
    { id: 'F2024-10', ref: 'Outubro 2024',    value: price, due: '15/10/2024', status: 'paid' },
  ]
}

export function getMockContratos(user) {
  return [
    {
      id: user.contract,
      plan: user.plan.name,
      type: 'Residencial',
      status: 'active',
      since: user.since,
      address: user.address,
      speed: `${user.plan.dl} Mbps simétrico`,
      wifi: user.plan.wifi,
    },
  ]
}

export function getMockNotas(price) {
  return [
    { id: 'NF-2025-00847', ref: 'Fevereiro 2025', value: price, issued: '01/02/2025', status: 'issued' },
    { id: 'NF-2025-00712', ref: 'Janeiro 2025',   value: price, issued: '01/01/2025', status: 'issued' },
    { id: 'NF-2024-00598', ref: 'Dezembro 2024',  value: price, issued: '01/12/2024', status: 'issued' },
    { id: 'NF-2024-00487', ref: 'Novembro 2024',  value: price, issued: '01/11/2024', status: 'issued' },
  ]
}

export function getMockRelatorios() {
  return [
    { id: 'R-2025-03', title: 'Relatório de Consumo — Março 2025',     period: 'mar/2025', type: 'consumo',   size: '124 KB' },
    { id: 'R-2025-02', title: 'Relatório de Consumo — Fevereiro 2025', period: 'fev/2025', type: 'consumo',   size: '118 KB' },
    { id: 'R-2025-01', title: 'Relatório de Pagamentos — Q1 2025',     period: '2025',     type: 'pagamento', size: '89 KB' },
    { id: 'R-2024-12', title: 'Relatório Anual — 2024',                period: '2024',     type: 'anual',     size: '256 KB' },
  ]
}

export const MOCK_TICKETS = [
  {
    id: '#4521',
    title: 'Lentidão na conexão nos horários de pico',
    category: 'Velocidade',
    status: 'open',
    progress: 40,
    opened: '10/02/2025',
    messages: [
      { from: 'cliente', text: 'A internet fica muito lenta entre 20h e 23h.', time: '10/02 14:22' },
      { from: 'suporte', text: 'Registramos seu chamado. Analisaremos o tráfego na sua OLT. Prazo: 24h.', time: '10/02 15:10' },
      { from: 'suporte', text: 'Identificamos congestionamento. Manutenção agendada para amanhã às 14h.', time: '11/02 09:45' },
    ],
  },
  {
    id: '#4310',
    title: 'Sem sinal na ONU após queda de energia',
    category: 'Sem conexão',
    status: 'resolved',
    progress: 100,
    opened: '05/01/2025',
    resolveTime: '2h14min',
    rating: 5,
    messages: [
      { from: 'cliente', text: 'Após queda de energia a ONU não voltou a conectar.', time: '05/01 10:15' },
      { from: 'suporte', text: 'Vou reiniciar remotamente sua ONU agora.', time: '05/01 10:22' },
      { from: 'suporte', text: 'ONU reiniciada! Conexão restabelecida. Tudo ok?', time: '05/01 12:29' },
      { from: 'cliente', text: 'Sim! Voltou tudo certinho, obrigado!', time: '05/01 12:35' },
    ],
  },
  {
    id: '#4178',
    title: 'Roteador Wi-Fi sem sinal em um cômodo',
    category: 'Wi-Fi',
    status: 'resolved',
    progress: 100,
    opened: '22/11/2024',
    resolveTime: '45min',
    rating: 5,
    messages: [],
  },
]

export function generateConsumo(days = 7) {
  const result = []
  const now = new Date()
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    result.push({
      date: `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`,
      dl: 10 + Math.round(Math.random() * 55),
      ul: 2 + Math.round(Math.random() * 18),
    })
  }
  return result
}

// ─── Formatters ───────────────────────────────
export function fmtBRL(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function fmtCEP(value) {
  const v = value.replace(/\D/g, '')
  return v.length > 5 ? `${v.slice(0, 5)}-${v.slice(5, 8)}` : v
}
