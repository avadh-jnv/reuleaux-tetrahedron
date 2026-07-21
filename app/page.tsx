import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { AboutSection } from '@/components/about-section'
import { MathSection } from '@/components/math-section'
import { FormulaSection } from '@/components/formula-section'
import { ApplicationsSection } from '@/components/applications-section'
import { FutureSection } from '@/components/future-section'
import { TeamSection, SiteFooter } from '@/components/team-section'

export default function Page() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <SiteNav />
      <Hero />
      <AboutSection />
      <MathSection />
      <FormulaSection />
      <ApplicationsSection />
      <FutureSection />
      <TeamSection />
      <SiteFooter />
    </main>
  )
}
