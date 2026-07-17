"use client"

import { motion } from "framer-motion"
import { Trophy, Star, Target, Lock, Sparkles } from "lucide-react"

const credentials = [
  { id: "1", icon: Trophy, label: "React Native", unlocked: true, color: "blue" },
  { id: "2", icon: Star, label: "Google Analytics", unlocked: true, color: "yellow" },
  { id: "3", icon: Target, label: "UX Certification", unlocked: false, color: "purple" },
  { id: "4", icon: Trophy, label: "AWS Practitioner", unlocked: false, color: "pink" },
]

export function AchievementsPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="relative p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10 backdrop-blur-sm border border-border"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-secondary" />
          Verified Credentials
        </h3>
        <span className="text-xs text-gray-400">2 / 4 Verified</span>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {credentials.map((cred, index) => (
          <motion.div
            key={cred.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            whileHover={{ scale: 1.1, y: -4 }}
            className="relative group cursor-pointer"
          >
            <div
              className={`relative p-4 rounded-xl border ${
                cred.unlocked
                  ? "bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/40"
                  : "bg-black/20 border-white/10"
              }`}
            >
              {cred.unlocked ? (
                <cred.icon
                  className={`w-6 h-6 mx-auto ${
                    cred.color === "orange"
                      ? "text-orange-400"
                      : cred.color === "yellow"
                        ? "text-yellow-400"
                        : cred.color === "purple"
                          ? "text-purple-400"
                          : cred.color === "blue"
                            ? "text-blue-400"
                            : "text-pink-400"
                  }`}
                />
              ) : (
                <Lock className="w-6 h-6 mx-auto text-white/30" />
              )}

              {cred.unlocked && (
                <motion.div
                  className="absolute inset-0 rounded-xl bg-primary/20 blur-md -z-10"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 }}
                />
              )}
            </div>

            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-black/80 text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              {cred.label}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-white font-medium">Overall Readiness Score</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold text-primary">85</span>
            <span className="text-gray-400">%</span>
            <Sparkles className="w-4 h-4 text-secondary ml-1" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
