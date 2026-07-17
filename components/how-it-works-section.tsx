"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Target, BarChart3, Hammer, Globe } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Target,
    title: "Upload Resume & Target Job",
    description: "Our AI analyzes your profile against your dream role to instantly find missing skills and keywords.",
  },
  {
    number: "02",
    icon: BarChart3,
    title: "Bridge the Skill Gap",
    description: "Follow customized learning paths to acquire exactly the skills employers are looking for.",
  },
  {
    number: "03",
    icon: Hammer,
    title: "Verify Your Expertise",
    description: "Upload your certificates or projects to have our AI verify them and score their industry usefulness.",
  },
  {
    number: "04",
    icon: Globe,
    title: "Get Internal Referrals",
    description: "Connect directly with verified alumni at your target companies who are ready to refer top talent.",
  },
]

export function HowItWorksSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section id="how-it-works" ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/20 via-background to-pink-950/20" />

      {/* Animated grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

      {/* Background glows */}
      <motion.div
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-radial from-secondary/20 via-transparent to-transparent blur-3xl"
      />
      <motion.div
        animate={{ opacity: [0.2, 0.1, 0.2] }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
        className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-radial from-primary/20 via-transparent to-transparent blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Process</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-balance">
            Your path to a{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              verified career
            </span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M 200 80 Q 400 200 600 160 Q 800 120 1000 240 Q 1200 360 200 400 Q 400 520 600 480"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="3"
              strokeDasharray="10 5"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#4F46E5" />
              </linearGradient>
            </defs>
          </svg>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className={`relative ${index % 2 === 1 ? "md:mt-24" : ""}`}
              >
                <motion.div
                  whileHover={{ scale: 1.03, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative p-8 rounded-3xl glass-panel border-border hover:border-primary/40 group overflow-hidden"
                >
                  {/* Step number */}
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="absolute -top-3 -left-3 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl shadow-primary/30 z-10"
                  >
                    <span className="text-xl font-black text-white">{step.number}</span>
                  </motion.div>

                  {/* Icon */}
                  <div className="flex justify-end mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30 transition-colors">
                      <step.icon className="h-6 w-6 text-primary group-hover:text-secondary transition-colors" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-white transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>

                  {/* Progress bar decoration */}
                  <div className="mt-6 h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(index + 1) * 25}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                    />
                  </div>

                  {/* Corner glow */}
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-secondary/20 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
