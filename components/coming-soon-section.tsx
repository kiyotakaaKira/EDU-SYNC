"use client"

import { motion } from "framer-motion"
import { Trophy, TrendingUp, Briefcase, Award, MessageCircle, Lock } from "lucide-react"
import { useState } from "react"

const comingSoonFeatures = [
  { icon: Trophy, label: "Aura Ranking", description: "Compete and earn recognition" },
  { icon: TrendingUp, label: "Company Signals", description: "Real-time hiring trends" },
  { icon: Briefcase, label: "Job Mapping", description: "Direct job matching" },
  { icon: Award, label: "Verified Badge", description: "Prove your expertise" },
  { icon: MessageCircle, label: "Discussions", description: "Learn with community" },
]

export function ComingSoonSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="coming-soon" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-950/10 to-background" />

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-500/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/30 mb-6"
          >
            <Lock className="h-4 w-4 text-pink-400" />
            <span className="text-sm font-medium text-pink-300 uppercase tracking-wider">Locked Content</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-balance">
            Phase 2{" "}
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Features
            </span>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-lg">
            Unlock these powerful features as we level up the platform
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-10 md:gap-16">
          {comingSoonFeatures.map((feature, index) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                stiffness: 200,
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative flex flex-col items-center cursor-pointer"
            >
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  y: hoveredIndex === index ? 0 : 10,
                  scale: hoveredIndex === index ? 1 : 0.9,
                }}
                transition={{ duration: 0.2 }}
                className="absolute -top-20 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white text-sm font-bold whitespace-nowrap z-30 shadow-xl shadow-purple-500/30"
              >
                Coming in Phase 2
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 bg-pink-600 rotate-45" />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="relative"
              >
                {/* Outer glow ring */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.3,
                  }}
                  className="absolute -inset-3 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 blur-md"
                />

                {/* Icon circle */}
                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full glass-panel border-2 border-purple-500/30 hover:border-pink-500/60 flex items-center justify-center group transition-all duration-300 overflow-hidden">
                  {/* Inner gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-300" />

                  {/* Lock overlay */}
                  <div className="absolute top-2 right-2 opacity-60 group-hover:opacity-0 transition-opacity">
                    <Lock className="h-4 w-4 text-purple-400" />
                  </div>

                  <feature.icon className="h-10 w-10 md:h-12 md:w-12 text-muted-foreground group-hover:text-pink-400 transition-colors duration-300 relative z-10" />
                </div>
              </motion.div>

              <motion.span
                animate={{ opacity: hoveredIndex === index ? 1 : 0.7 }}
                className="mt-5 text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors"
              >
                {feature.label}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
