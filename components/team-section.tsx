import { Crown, Users, School } from 'lucide-react'
import { Reveal } from './reveal'
import { SectionHeading, GlassCard } from './section-parts'

const members = [
  { role: 'Leader', name: 'Avadh Prajapati', icon: Crown },
  { role: 'Co-Leader', name: 'Ridham Varma', icon: Users },
]

export function TeamSection() {
  return (
    <section id="team" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Team"
        title="The minds behind the model"
      />

      <div className="mx-auto mt-14 grid max-w-3xl gap-5 sm:grid-cols-2">
        {members.map((m, i) => (
          <Reveal key={m.name} delay={0.06 * i}>
            <GlassCard className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                <m.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-xs font-medium uppercase tracking-wider text-primary">
                  {m.role}
                </div>
                <div className="mt-1 text-lg font-semibold text-foreground">{m.name}</div>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mx-auto mt-6 flex max-w-3xl items-center justify-center gap-3 rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-5 text-center backdrop-blur-xl">
          <School className="h-5 w-5 shrink-0 text-primary" />
          <p className="text-pretty text-sm font-medium text-foreground/90">
            PM SHRI Jawahar Navodaya Vidyalaya, Mehsana
          </p>
        </div>
      </Reveal>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 py-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_120%_at_50%_120%,oklch(0.28_0.08_262)_0%,transparent_60%)]" />
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-balance bg-gradient-to-b from-white to-sky-300/70 bg-clip-text text-2xl font-semibold tracking-tight text-transparent sm:text-3xl">
          &ldquo;Mathematics is the language of innovation.&rdquo;
        </p>
        <p className="mt-6 text-xs text-muted-foreground">
          Reuleaux Tetrahedron · RBVP 2026–27 · Recreational Mathematical Modelling
        </p>
      </div>
    </footer>
  )
}
