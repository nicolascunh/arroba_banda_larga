import React from 'react'
import SiteNav from '@/components/site/SiteNav'
import Hero from './sections/Hero'
import Plans from './sections/Plans'
import Features from './sections/Features'
import SpeedBanner from './sections/SpeedBanner'
import HowItWorks from './sections/HowItWorks'
import Testimonials from './sections/Testimonials'
import Coverage from './sections/Coverage'
import Promo from './sections/Promo'
import AppSection from './sections/AppSection'
import Contact from './sections/Contact'
import FAQ from './sections/FAQ'
import SiteFooter from './sections/SiteFooter'
import WAFab from './sections/WAFab'

export default function SitePage() {
  return (
    <div style={{ background: 'var(--surface)' }}>
      <SiteNav />
      <main>
        <Hero />
        <Plans />
        <Features />
        <SpeedBanner />
        <HowItWorks />
        <Testimonials />
        <Coverage />
        <Promo />
        <AppSection />
        <Contact />
        <FAQ />
      </main>
      <SiteFooter />
      <WAFab />
    </div>
  )
}
