import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '@/components/shared/Logo'

const NAV_LINKS = [
  { href: '#planos',       label: 'Planos'       },
  { href: '#diferenciais', label: 'Diferenciais' },
  { href: '#cobertura',    label: 'Cobertura'    },
  { href: '#app',          label: 'App'          },
  { href: '#contato',      label: 'Contato'      },
  { href: '#faq',          label: 'FAQ'          },
]

export default function SiteNav() {
  const navigate = useNavigate()
  const [scrolled,  setScrolled]  = useState(false)
  const [light,     setLight]     = useState(false)
  const [active,    setActive]    = useState('')
  const [drawerOpen,setDrawer]    = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 10)
      const hero = document.getElementById('hero')
      if (hero) setLight(y > hero.offsetHeight - 120)

      const ids = NAV_LINKS.map((l) => l.href.slice(1))
      let cur = ''
      ids.forEach((id) => {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 160) cur = id
      })
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navBg = light
    ? scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.82)'
    : scrolled ? 'rgba(13,17,26,0.95)'    : 'rgba(13,17,26,0.82)'

  const bdr = light
    ? '0.5px solid rgba(60,60,67,.18)'
    : '1px solid rgba(255,255,255,.06)'

  const linkColor = (id) => {
    const isActive = id === active
    return light
      ? isActive ? 'var(--blue)' : 'var(--l2)'
      : isActive ? '#fff'        : 'rgba(255,255,255,.72)'
  }

  const ghostStyle = light
    ? { color: 'var(--blue)', background: 'var(--blue-lt)', border: 'none' }
    : { color: 'rgba(255,255,255,.85)', background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.15)' }

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        height: 'var(--nav-h)',
        background: navBg,
        backdropFilter: 'saturate(180%) blur(24px)',
        borderBottom: bdr,
        transition: 'background .3s, border-color .3s, box-shadow .3s',
        boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,.08)' : 'none',
      }}>
        <div className="site-container" style={{ height: '100%', display: 'flex', alignItems: 'center', gap: 0 }}>
          {/* Logo */}
          <a href="#" style={{ flexShrink: 0, marginRight: 'auto' }}>
            <Logo height={40} textColor={light ? '#1B4FA8' : '#fff'} />
          </a>

          {/* Desktop links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 2, marginRight: 18 }}
            className="site-nav-links">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  fontSize: 13.5, fontWeight: 600, letterSpacing: '-0.01em',
                  color: linkColor(l.href.slice(1)),
                  padding: '7px 13px', borderRadius: 'var(--r-sm)',
                  transition: 'background .15s, color .15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = light ? 'var(--blue-lt)' : 'rgba(255,255,255,.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <button
              onClick={() => navigate('/login')}
              style={{
                ...ghostStyle,
                fontFamily: 'var(--font)', fontSize: 13, fontWeight: 700,
                borderRadius: 'var(--r-sm)', padding: '9px 16px',
                cursor: 'pointer', letterSpacing: '-0.01em', transition: 'background .15s',
              }}
            >
              Área do Cliente
            </button>
            <a href="#contato" className="btn-primary" style={{ fontSize: 13, padding: '9px 18px' }}>
              Contratar
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M1.5 9.5l8-8M9.5 9.5V1.5h-8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            {/* Burger */}
            <button
              onClick={() => setDrawer((d) => !d)}
              style={{
                display: 'none', background: 'none', border: 'none',
                padding: 8, cursor: 'pointer',
                color: light ? 'var(--l1)' : '#fff',
                borderRadius: 'var(--r-sm)',
              }}
              className="site-burger"
              aria-label="Menu"
            >
              <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
                <path d="M1 1h20M1 9h20M1 17h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {drawerOpen && (
          <nav style={{
            display: 'flex', flexDirection: 'column',
            background: light ? 'rgba(255,255,255,.97)' : 'rgba(13,17,26,.97)',
            backdropFilter: 'blur(20px)',
            borderTop: light ? '0.5px solid var(--sep)' : '1px solid rgba(255,255,255,.07)',
            padding: '12px 16px 20px', gap: 4,
          }}>
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setDrawer(false)}
                style={{
                  fontSize: 15, fontWeight: 600, padding: '11px 14px',
                  borderRadius: 'var(--r-sm)',
                  color: light ? 'var(--l2)' : 'rgba(255,255,255,.8)',
                }}
              >
                {l.label}
              </a>
            ))}
            <div style={{ height: '0.5px', background: light ? 'var(--sep)' : 'rgba(255,255,255,.08)', margin: '8px 0' }} />
            <button
              onClick={() => { setDrawer(false); navigate('/login') }}
              style={{
                fontFamily: 'var(--font)', fontSize: 14, fontWeight: 700,
                color: light ? 'var(--blue)' : 'rgba(255,255,255,.8)',
                background: 'none',
                border: `1px solid ${light ? 'rgba(27,79,168,.2)' : 'rgba(255,255,255,.12)'}`,
                borderRadius: 'var(--r-sm)', padding: 12, cursor: 'pointer',
              }}
            >
              Área do Cliente
            </button>
            <a href="#contato" className="btn-primary" onClick={() => setDrawer(false)}
              style={{ textAlign: 'center', justifyContent: 'center', padding: '13px', fontSize: 15, marginTop: 4 }}>
              Contratar agora
            </a>
          </nav>
        )}
      </header>

      <style>{`
        @media(max-width:960px){
          .site-nav-links { display:none !important; }
          .site-burger { display:block !important; }
        }
      `}</style>
    </>
  )
}
