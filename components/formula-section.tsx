import { Reveal } from './reveal'
import { GlassCard } from './section-parts'

const facts = [
  { label: 'Sphere radius', value: 'r = a', note: 'equal to the tetrahedron edge' },
  { label: 'Faces', value: '4 caps', note: 'sections of spheres' },
  { label: 'Edges', value: '6 arcs', note: 'circular, radius a' },
]

export function FormulaSection() {
  return (
    <section id="formula" className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-8 backdrop-blur-xl sm:p-14">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_120%_at_50%_0%,oklch(0.3_0.09_240)_0%,transparent_55%)]" />

        <div className="text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              The Defining Relationship
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mx-auto mt-8 flex max-w-md items-center justify-center rounded-3xl border border-primary/20 bg-navy-950/40 px-10 py-10">
              <span className="font-mono text-6xl font-semibold tracking-tight text-foreground sm:text-7xl">
                r <span className="text-primary">=</span> a
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mx-auto mt-8 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              The radius of each generating sphere{' '}
              <span className="font-mono text-foreground">(r)</span> is exactly equal to the edge
              length of the tetrahedron{' '}
              <span className="font-mono text-foreground">(a)</span>. This single condition
              guarantees every sphere passes through the three opposite vertices, producing the
              shape&apos;s signature curvature.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {facts.map((f, i) => (
            <Reveal key={f.label} delay={0.05 * i}>
              <GlassCard className="text-center">
                <div className="text-sm text-muted-foreground">{f.label}</div>
                <div className="mt-2 font-mono text-2xl font-semibold text-primary">{f.value}</div>
                <div className="mt-1 text-xs text-muted-foreground">{f.note}</div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
