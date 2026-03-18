# Arroba Banda Larga

Site institucional + Portal do Cliente em React + Vite.

## Estrutura do projeto

```
src/
├── context/
│   └── AppContext.jsx        # Estado global (view, page, user, toast)
├── data/
│   └── mockData.js           # Mock de usuários, faturas, tickets etc.
├── hooks/
│   └── useApp.js             # Hook para consumir o AppContext
├── styles/
│   ├── global.css            # Tokens, reset, utilitários globais
│   ├── site.css              # Estilos exclusivos do site
│   └── portal.css            # Estilos exclusivos do portal (light theme)
├── components/
│   ├── shared/
│   │   ├── Logo.jsx          # SVG da marca Arroba
│   │   ├── Toast.jsx         # Notificação flutuante
│   │   └── PixModal.jsx      # Modal PIX / Boleto / Cartão
│   ├── site/
│   │   ├── SiteNav.jsx       # Navbar do site (dark→light scroll)
│   │   ├── Hero.jsx          # Seção hero
│   │   ├── Plans.jsx         # Cards de planos
│   │   ├── Features.jsx      # Diferenciais
│   │   ├── SpeedBanner.jsx   # Banner velocidade + gauge
│   │   ├── HowItWorks.jsx    # Como funciona (4 passos)
│   │   ├── Testimonials.jsx  # Depoimentos
│   │   ├── Coverage.jsx      # Cobertura + widget de CEP
│   │   ├── Promo.jsx         # Promoção indique um amigo
│   │   ├── AppSection.jsx    # Seção do app mobile
│   │   ├── Contact.jsx       # Formulário de contato
│   │   ├── FAQ.jsx           # Perguntas frequentes
│   │   └── SiteFooter.jsx    # Rodapé
│   └── portal/
│       ├── PortalSidebar.jsx # Sidebar sempre visível no desktop
│       ├── PortalTopbar.jsx  # Barra superior do portal
│       └── StatusBadge.jsx   # Badge de status (pago, aberto…)
├── pages/
│   ├── site/
│   │   └── SitePage.jsx      # Página do site (compõe todas as seções)
│   └── portal/
│       ├── Login.jsx         # Tela de login
│       ├── Dashboard.jsx     # Dashboard principal
│       ├── Faturas.jsx       # Faturas e pagamentos
│       ├── Contratos.jsx     # Contratos e termos
│       ├── Notas.jsx         # Notas fiscais
│       ├── Consumo.jsx       # Gráfico de consumo de dados
│       ├── Atendimento.jsx   # Chamados de suporte
│       ├── Relatorios.jsx    # Relatórios
│       └── Perfil.jsx        # Perfil e configurações
├── App.jsx                   # Roteador principal (site | login | portal)
└── main.jsx                  # Entry point
```

## Como rodar

```bash
npm install
npm run dev
```

Acesse: http://localhost:3000

## Build para produção

```bash
npm run build
npm run preview
```

## Dados de demonstração

O portal aceita **qualquer CPF/e-mail e senha**. Para testar com usuários diferentes, use os chips de acesso rápido na tela de login:

| Usuário   | Plano    | Preço       |
|-----------|----------|-------------|
| Nicolas   | 800 Mega | R$ 99,70/mês |
| Ana Luíza | 1 Giga   | R$ 119,70/mês |
| Ricardo   | 600 Mega | R$ 89,70/mês |

## Customização

- **Tokens visuais:** `src/styles/global.css` → variáveis CSS `:root`
- **Cores do portal:** `src/styles/portal.css` → variáveis `.portal-root`
- **Dados dos planos:** `src/data/mockData.js` → `MOCK_USERS`
- **Links externos:** `src/components/site/SiteNav.jsx` → `SITE_LINKS`
