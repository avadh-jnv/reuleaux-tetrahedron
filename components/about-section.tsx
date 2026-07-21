import { Reveal } from './reveal'
import { GlassCard, SectionHeading } from './section-parts'

const stats = [
  { value: '4', label: 'Intersecting spheres' },
  { value: '6', label: 'Curved edges' },
  { value: 'r = a', label: 'Sphere radius = edge' },
]

export function AboutSection() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="About"
        title="A shape that rolls almost like a ball"
        description="The Reuleaux Tetrahedron is one of the most fascinating solids in geometry — built from four overlapping spheres, it teeters on the edge of being a true body of constant width."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <GlassCard className="h-full">
            <h3 className="text-lg font-semibold text-foreground">What is it?</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Take a regular tetrahedron and, for each vertex, draw a sphere whose radius equals
              the edge length and whose center is that vertex. The region common to all four
              spheres is the Reuleaux Tetrahedron — a bulging, curved-faced version of the
              tetrahedron. Its four faces are gently domed sections of spheres, and its six edges
              are circular arcs.
            </p>
          </GlassCard>
        </Reveal>

        <Reveal delay={0.1}>
          <GlassCard className="h-full">
            <h3 className="text-lg font-semibold text-foreground">Why is it special?</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              It is closely related to Reuleaux polygons, which are perfect curves of constant
              width. While the Reuleaux Tetrahedron is not exactly constant-width (its width varies
              by roughly 2.5%), the Meissner bodies derived from it are — making it a beautiful
              bridge between recreational mathematics and real engineering.
            </p>
          </GlassCard>
        </Reveal>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={0.05 * i}>
            <GlassCard className="text-center">
              <div className="bg-gradient-to-b from-white to-sky-300/80 bg-clip-text text-3xl font-semibold text-transparent">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
