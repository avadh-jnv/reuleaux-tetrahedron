import {
  Activity,
  CircleDot,
  Bot,
  Rocket,
  BrainCircuit,
  Leaf,
} from 'lucide-react'
import { Reveal } from './reveal'
import { SectionHeading } from './section-parts'

const future = [
  {
    icon: Activity,
    title: 'Earthquake-inspired structural research',
    body: 'Constant-width bodies as models for resilient, load-distributing structures.',
  },
  {
    icon: CircleDot,
    title: 'Future bearing concepts',
    body: 'Rolling elements that maintain constant clearance without being spheres.',
  },
  {
    icon: Bot,
    title: 'Robotics',
    body: 'Novel wheels, grippers, and locomotion using constant-width geometry.',
  },
  {
    icon: Rocket,
    title: 'Aerospace',
    body: 'Lightweight curved components and packing-efficient structural units.',
  },
  {
    icon: BrainCircuit,
    title: 'AI-assisted optimization',
    body: 'Generative design refining constant-width solids for target properties.',
  },
  {
    icon: Leaf,
    title: 'Sustainable architecture',
    body: 'Material-efficient forms inspired by mathematically optimal shapes.',
  },
]

export function FutureSection() {
  return (
    <section id="future" className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Future Scope"
        title="Directions worth exploring"
        description="The mathematics hints at applications well beyond today's tools."
      />

      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {future.map((item, i) => (
          <Reveal key={item.title} delay={0.04 * (i % 2)}>
            <div className="group flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition-colors hover:border-primary/30 hover:bg-white/[0.06]">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
