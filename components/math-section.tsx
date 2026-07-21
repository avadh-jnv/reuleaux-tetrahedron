import { Reveal } from './reveal'
import { GlassCard, SectionHeading } from './section-parts'

const steps = [
  {
    step: '01',
    title: 'Start with a regular tetrahedron',
    body: 'Place four points so that every pair is separated by the same distance a. These become the centers of our spheres.',
  },
  {
    step: '02',
    title: 'Draw four equal spheres',
    body: 'Around each vertex, draw a sphere of radius r = a. Each sphere passes exactly through the other three vertices.',
  },
  {
    step: '03',
    title: 'Take the intersection',
    body: 'The solid region shared by all four spheres is the Reuleaux Tetrahedron. Its surface is made of four spherical caps.',
  },
  {
    step: '04',
    title: 'Measure the width',
    body: 'The width between an edge and the opposite edge is close to a, but slightly larger along edge-to-edge directions — about 1.025 a.',
  },
]

export function MathSection() {
  return (
    <section id="math" className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Mathematical Explanation"
        title="How the geometry comes together"
        description="Four simple construction steps turn a flat-faced tetrahedron into a smoothly curved solid."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {steps.map((s, i) => (
          <Reveal key={s.step} delay={0.05 * i}>
            <GlassCard className="flex h-full gap-5">
              <span className="font-mono text-2xl font-semibold text-primary/70">{s.step}</span>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
