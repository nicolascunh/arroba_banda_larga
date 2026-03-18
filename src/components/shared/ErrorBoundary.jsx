import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary]', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            padding: 32,
          }}
        >
          <div
            style={{
              background: 'var(--surface, #fff)',
              borderRadius: 'var(--r-lg)',
              padding: '48px 36px',
              maxWidth: 420,
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 6px 24px rgba(0,0,0,.09), 0 1px 4px rgba(0,0,0,.05)',
              border: '0.5px solid var(--sep)',
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'rgba(255,59,48,.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: 28,
              }}
            >
              ⚠
            </div>

            {/* Heading */}
            <h2
              style={{
                fontFamily: 'var(--font-d)',
                fontSize: 22,
                fontWeight: 800,
                color: 'var(--l1)',
                letterSpacing: '-0.03em',
                marginBottom: 8,
              }}
            >
              Algo deu errado
            </h2>

            {/* Description */}
            <p
              style={{
                fontFamily: 'var(--font)',
                fontSize: 14,
                color: 'var(--l3)',
                lineHeight: 1.6,
                marginBottom: 24,
              }}
            >
              Ocorreu um erro inesperado. Tente novamente ou entre em contato
              com o suporte se o problema persistir.
            </p>

            {/* Error details (development aid) */}
            {this.state.error && (
              <div
                style={{
                  background: 'var(--bg, #F2F2F7)',
                  borderRadius: 'var(--r-sm)',
                  padding: '10px 14px',
                  marginBottom: 24,
                  fontSize: 12,
                  fontFamily: 'monospace',
                  color: 'var(--red, #FF3B30)',
                  wordBreak: 'break-word',
                  textAlign: 'left',
                  lineHeight: 1.5,
                  maxHeight: 100,
                  overflowY: 'auto',
                }}
              >
                {this.state.error.toString()}
              </div>
            )}

            {/* Retry button */}
            <button className="btn-primary" onClick={this.handleReset}>
              Tentar novamente
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
