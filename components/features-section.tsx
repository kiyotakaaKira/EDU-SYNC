"use client"

import { motion } from "framer-motion"
import { FileSearch, BadgeCheck, Users, Briefcase, Sparkles } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const features = [
  {
    icon: FileSearch,
    title: "Resume-to-Job Analyzer",
    description: "Upload your resume and target job. Our AI instantly finds missing skills and keywords.",
    gradient: "from-blue-500 via-indigo-500 to-blue-600",
    href: "/dashboard/resume-analyzer",
  },
  {
    icon: BadgeCheck,
    title: "Skill Certificate Verifier",
    description: "Verify your uploaded certificates against claimed skills and score their industry usefulness.",
    gradient: "from-indigo-500 via-blue-500 to-indigo-600",
    href: "/dashboard/credential-fit",
  },
  {
    icon: Users,
    title: "Internal Referral Matchmaker",
    description: "Connect directly with alumni at your target companies who can refer verified talent.",
    gradient: "from-sky-500 via-blue-500 to-sky-600",
    href: "/dashboard/referrals",
  },
  {
    icon: Briefcase,
    title: "Automated Apply & Track",
    description: "Auto-fill applications using your verified profile and track your entire pipeline.",
    gradient: "from-blue-600 via-indigo-600 to-blue-700",
    href: "/dashboard/opportunities",
  },
]

export function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="features" className="relative py-32 overflow-hidden">
      <motion.div
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-radial from-primary/20 via-transparent to-transparent blur-3xl"
      />

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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Core Features</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-balance">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              get hired
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Link key={feature.title} href={feature.href}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="relative group cursor-pointer"
              >
                {/* Glow effect behind card */}
                <motion.div
                  animate={{
                    opacity: hoveredIndex === index ? 0.6 : 0,
                    scale: hoveredIndex === index ? 1.1 : 1,
                  }}
                  className={`absolute -inset-2 rounded-3xl bg-gradient-to-br ${feature.gradient} blur-2xl transition-all duration-500`}
                />

                {/* Card */}
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative h-full p-8 rounded-2xl glass-panel border-border hover:border-primary/50 transition-all duration-300 overflow-hidden"
                >
                  {/* Animated border gradient */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-secondary/0 group-hover:from-primary/10 group-hover:to-secondary/10 transition-all duration-500" />

                  <div className="relative z-10">
                    {/* Icon with gradient background */}
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg shadow-primary/30`}
                    >
                      <feature.icon className="h-7 w-7 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-4 text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">{feature.description}</p>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
