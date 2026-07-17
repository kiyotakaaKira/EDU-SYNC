"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface StatsCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  subValue?: string
  color: "primary" | "secondary" | "blue" | "indigo"
  index?: number
}

const colorClasses = {
  primary: {
    bg: "from-primary/20 to-primary/10",
    icon: "text-primary",
    glow: "bg-primary/30",
    border: "border-primary/30",
    ring: "from-primary to-primary",
  },
  secondary: {
    bg: "from-secondary/20 to-secondary/10",
    icon: "text-secondary",
    glow: "bg-secondary/30",
    border: "border-secondary/30",
    ring: "from-secondary to-secondary",
  },
  blue: {
    bg: "from-blue-500/20 to-blue-900/10",
    icon: "text-blue-400",
    glow: "bg-blue-500/30",
    border: "border-blue-500/30",
    ring: "from-blue-500 to-blue-600",
  },
  indigo: {
    bg: "from-indigo-500/20 to-indigo-900/10",
    icon: "text-indigo-400",
    glow: "bg-indigo-500/30",
    border: "border-indigo-500/30",
    ring: "from-indigo-500 to-indigo-600",
  },
}

export function StatsCard({ icon: Icon, label, value, subValue, color, index = 0 }: StatsCardProps) {
  const colors = colorClasses[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="relative group"
    >
      <div
        className={`absolute -inset-1 ${colors.glow} rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
      />

      <div
        className={`relative p-6 rounded-2xl bg-gradient-to-br ${colors.bg} border ${colors.border} backdrop-blur-sm overflow-hidden`}
      >
        <div className={`absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 ${colors.border} rounded-tl-2xl`} />
        <div className={`absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 ${colors.border} rounded-br-2xl`} />

        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-white/5 via-white/10 to-transparent h-1/2"
          animate={{ y: ["0%", "200%"] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: index * 0.5 }}
        />

        <div className="relative flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-400 font-medium mb-1">{label}</p>
            <motion.p
              className="text-4xl font-bold text-white"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
            >
              {value}
            </motion.p>
            {subValue && <p className="text-xs text-gray-400 mt-1">{subValue}</p>}
          </div>

          <div className="relative">
            <motion.div
              className={`absolute inset-0 rounded-xl bg-gradient-to-br ${colors.ring} opacity-20`}
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.3 }}
            />
            <div className={`relative p-3 rounded-xl bg-black/30 ${colors.icon}`}>
              <Icon className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="flex gap-1 mt-4">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className={`h-1 flex-1 rounded-full ${i < 3 ? colors.glow : "bg-white/10"}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
