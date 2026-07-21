'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ChevronDown, MousePointer2 } from 'lucide-react'
import { ParticleBackground } from './particle-background'

const ReuleauxScene = dynamic(
  () => import('./reuleaux-scene').then((m) => m.ReuleauxScene),
  { ssr: false },
)

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Layered background */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,oklch(0.28_0.08_262)_0%,transparent_60%)]" />
      <ParticleBackground />

      {/* 3D model — sits behind text on mobile, beside it on desktop */}
      <div className="absolute inset-0 lg:left-1/2">
        <ReuleauxScene />
      </div>
      {/* Fade for text legibility on small screens */}
      <div className="absolute inset-0 bg-navy-950/40 lg:hidden" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-6 pt-28 pb-20 lg:grid-cols-2 lg:pt-0">
        <div className="max-w-xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-primary backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Body of Constant Width
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-balance bg-gradient-to-b from-white to-sky-300/80 bg-clip-text text-5xl font-semibold leading-[1.05] tracking-tight text-transparent sm:text-6xl lg:text-7xl"
          >
            Reuleaux Tetrahedron
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 space-y-1.5"
          >
            <p className="text-pretty text-lg font-medium text-foreground/90">
              Rashtriya Bal Vigyan Pradarshani (RBVP) 2026–27
            </p>
            <p className="text-pretty text-base text-muted-foreground">
              Theme: Recreational Mathematical Modelling
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#about"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-[1.03]"
            >
              Explore the Project
            </a>
            <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <MousePointer2 className="h-4 w-4 text-primary" />
              Drag the model to rotate
            </span>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-muted-foreground"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </motion.a>
    </section>
  )
}
