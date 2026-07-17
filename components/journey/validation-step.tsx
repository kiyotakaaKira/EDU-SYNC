"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
  Target,
} from "lucide-react"
import type { JourneyData } from "@/app/dashboard/journeys/new/page"

interface Props {
  data: JourneyData
  onUpdate: (data: Partial<JourneyData>) => void
  onNext: () => void
  onBack: () => void
}

export function ValidationStep({ data, onUpdate, onNext, onBack }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingText, setLoadingText] = useState("Analyzing market demand...")

  useEffect(() => {
    const texts = [
      "Analyzing market demand...",
      "Checking job listings...",
      "Evaluating growth potential...",
      "Finalizing assessment...",
    ]

    let index = 0
    const interval = setInterval(() => {
      index++
      if (index < texts.length) {
        setLoadingText(texts[index])
      }
    }, 800)

    // Simulate AI validation
    const timeout = setTimeout(() => {
      setIsLoading(false)
      clearInterval(interval)

      // Mock validation result - in production, call AI agent
      const isValid = !data.skill.toLowerCase().includes("invalid")
      onUpdate({
        validation: {
          isValid,
          reasons: isValid
            ? [
                "High demand in current job market",
                "Strong salary growth potential",
                "Aligns with industry trends",
                "Abundant learning resources available",
              ]
            : ["Limited job opportunities in this niche", "Consider broadening your focus"],
          alternatives: isValid ? undefined : ["Full-Stack Development", "DevOps Engineering", "Data Science"],
        },
      })
    }, 3500)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [data.skill, onUpdate])

  const handleSelectAlternative = (alt: string) => {
    onUpdate({ skill: alt, validation: null })
    onBack()
  }

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="flex flex-col items-center justify-center py-20"
      >
        {/* Animated Loader */}
        <div className="relative w-32 h-32 mb-8">
          {/* Outer Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-purple-500/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          {/* Middle Ring */}
          <motion.div
            className="absolute inset-2 rounded-full border-4 border-dashed border-pink-500/30"
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          {/* Inner Ring */}
          <motion.div
            className="absolute inset-4 rounded-full border-4 border-blue-500/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          {/* Center Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <Target className="w-10 h-10 text-purple-400" />
            </motion.div>
          </div>

          {/* Orbiting Dots */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
              style={{ top: "50%", left: "50%", marginTop: -6, marginLeft: -6 }}
              animate={{
                x: Math.cos((i * 2 * Math.PI) / 3) * 50,
                y: Math.sin((i * 2 * Math.PI) / 3) * 50,
                rotate: 360,
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        <motion.h3
          className="text-2xl font-bold text-white mb-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          {loadingText}
        </motion.h3>

        <p className="text-gray-400 mb-6">Validating "{data.skill}"</p>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-[length:200%_200%]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3.5, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    )
  }

  const { validation } = data
  if (!validation) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-50" />

        <div className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-br from-purple-900/30 via-[#0a0a0f] to-pink-900/20 border border-purple-500/30">
          {/* Grid Background */}
          <div
            className="absolute inset-0 opacity-5 rounded-2xl overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(rgba(168,85,247,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.5) 1px, transparent 1px)`,
              backgroundSize: "30px 30px",
            }}
          />

          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-10">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
              >
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-purple-300">STEP 2 OF 5</span>
                <span className="text-xs text-yellow-400">+150 XP</span>
              </motion.div>

              {/* Validation Result Badge */}
              <motion.div
                className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl mb-6 ${
                  validation.isValid
                    ? "bg-green-500/20 border border-green-500/30"
                    : "bg-yellow-500/20 border border-yellow-500/30"
                }`}
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                {validation.isValid ? (
                  <>
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                    <div className="text-left">
                      <p className="text-lg font-bold text-green-400">Great Choice!</p>
                      <p className="text-sm text-green-300/70">{data.skill} is in high demand</p>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-8 h-8 text-yellow-400" />
                    <div className="text-left">
                      <p className="text-lg font-bold text-yellow-400">Limited Scope</p>
                      <p className="text-sm text-yellow-300/70">Consider these alternatives</p>
                    </div>
                  </>
                )}
              </motion.div>

              <h2 className="text-3xl font-bold text-white mb-3">
                Skill Analysis:{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  {data.skill}
                </span>
              </h2>
            </div>

            {/* Reasons Grid */}
            <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-10">
              {validation.reasons.map((reason, index) => (
                <motion.div
                  key={index}
                  className={`flex items-start gap-3 p-4 rounded-xl border ${
                    validation.isValid ? "bg-green-500/10 border-green-500/20" : "bg-yellow-500/10 border-yellow-500/20"
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className={`p-2 rounded-lg ${validation.isValid ? "bg-green-500/20" : "bg-yellow-500/20"}`}>
                    {validation.isValid ? (
                      [TrendingUp, Users, Sparkles, CheckCircle2][index % 4] && (
                        <div className="w-5 h-5 text-green-400">
                          {index === 0 && <TrendingUp className="w-5 h-5" />}
                          {index === 1 && <Users className="w-5 h-5" />}
                          {index === 2 && <Sparkles className="w-5 h-5" />}
                          {index === 3 && <CheckCircle2 className="w-5 h-5" />}
                        </div>
                      )
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    )}
                  </div>
                  <p className={validation.isValid ? "text-green-200" : "text-yellow-200"}>{reason}</p>
                </motion.div>
              ))}
            </div>

            {/* Alternatives (if not valid) */}
            {!validation.isValid && validation.alternatives && (
              <motion.div
                className="mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-lg font-semibold text-white text-center mb-4">Recommended Alternatives</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {validation.alternatives.map((alt, index) => (
                    <motion.button
                      key={alt}
                      onClick={() => handleSelectAlternative(alt)}
                      className="px-6 py-3 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-300 hover:bg-purple-500/30 hover:text-white transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      {alt}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <motion.button
                onClick={onBack}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </motion.button>

              {validation.isValid && (
                <motion.button
                  onClick={onNext}
                  className="relative inline-flex items-center gap-3 px-10 py-4 rounded-xl font-semibold text-white overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_200%] animate-[gradient-shift_8s_ease_infinite]" />

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    animate={{ x: ["-200%", "200%"] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />

                  <span className="relative flex items-center gap-2">
                    Continue
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
