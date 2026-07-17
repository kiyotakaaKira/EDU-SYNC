"use client"

import { motion } from "framer-motion"
import { Plus, Sparkles, Rocket, ArrowRight, Zap } from "lucide-react"
import Link from "next/link"

export function StartJourneyCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="relative group"
    >
      <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 rounded-3xl blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-700" />

      <div className="relative p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-background to-secondary/10 border border-primary/30 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(37,99,235,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.5) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />

        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
            }}
          />
        ))}

        <motion.div
          className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-primary/50 rounded-tl-2xl"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-secondary/50 rounded-br-2xl"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
        />

        <div className="relative flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <motion.div
              className="absolute -inset-4 rounded-full border-2 border-dashed border-primary/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />

            <motion.div
              className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20"
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />

            <motion.div
              className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary p-[2px]"
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Plus className="w-10 h-10 text-primary" />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center"
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.div>

            <motion.div
              className="absolute -bottom-2 -left-2 w-8 h-8 rounded-full bg-secondary/20 border border-secondary/40 flex items-center justify-center"
              animate={{ y: [2, -2, 2] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <Rocket className="w-4 h-4 text-secondary" />
            </motion.div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <span className="px-2 py-0.5 rounded-full bg-primary/20 border border-primary/30 text-xs font-medium text-primary">
                  ACTION ITEM
                </span>
                <span className="flex items-center gap-1 text-xs text-secondary">
                  <Zap className="w-3 h-3" />
                  High Priority
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">Analyze Your Resume against a Job Description</h3>
              <p className="text-gray-400 max-w-md">
                Upload your resume and a target job description to find missing skills and generate a personalized readiness roadmap.
              </p>
            </motion.div>

            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link href="/dashboard/resume-analyzer">
                <motion.button
                  className="relative inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white overflow-hidden group/btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_200%] animate-[gradient-shift_8s_ease_infinite]" />

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    animate={{ x: ["-200%", "200%"] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />

                  <span className="relative flex items-center gap-2">
                    <Rocket className="w-5 h-5" />
                    Analyze Resume
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
