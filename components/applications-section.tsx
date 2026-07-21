import {
  GraduationCap,
  Shapes,
  PenTool,
  Box,
  Monitor,
  FlaskConical,
} from 'lucide-react'
import { Reveal } from './reveal'
import { SectionHeading, GlassCard } from './section-parts'

const applications = [
  {
    icon: GraduationCap,
    title: 'Education',
    body: 'A tangible way to teach constant width, solids of revolution, and spatial reasoning.',
  },
  {
    icon: Shapes,
    title: 'Computational Geometry',
    body: 'A benchmark shape for intersection, convex hull, and mesh generation algorithms.',
  },
  {
    icon: PenTool,
    title: 'CAD',
    body: 'Parametric modelling of curved solids defined by sphere intersections.',
  },
  {
    icon: Box,
    title: '3D Printing',
    body: 'Additive manufacturing lets these complex curved bodies exist as physical objects.',
  },
  {
    icon: Monitor,
    title: 'Computer Graphics',
    body: 'Rendering, collision, and procedural geometry demonstrations in real time.',
  },
  {
    icon: FlaskConical,
    title: 'Research',
    body: 'Exploring constant-width bodies and their surprising geometric properties.',
  },
]

export function ApplicationsSection() {
  return (
    <section id="applications" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Applications"
        title="Where the geometry goes to work"
        description="From classrooms to render pipelines, the Reuleaux tetrahedron is more than a curiosity."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {applications.map((app, i) => (
          <Reveal key={app.title} delay={0.05 * (i % 3)}>
            <GlassCard className="h-full">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                <app.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{app.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{app.body}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
