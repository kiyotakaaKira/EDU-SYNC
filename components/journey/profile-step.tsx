"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  Zap,
  GraduationCap,
  Clock,
  Target,
  Briefcase,
  Laptop,
  Blocks,
  Compass,
} from "lucide-react"
import type { JourneyData } from "@/app/dashboard/journeys/new/page"

const LEVELS = [
  { id: "beginner", label: "Beginner", description: "Just starting out", icon: GraduationCap },
  { id: "some-experience", label: "Some Experience", description: "Know the basics", icon: Blocks },
  { id: "intermediate", label: "Intermediate", description: "Comfortable with concepts", icon: Laptop },
]

const TIME_COMMITMENTS = [
  { id: "5-10", label: "5-10 hrs/week", description: "Casual pace" },
  { id: "10-15", label: "10-15 hrs/week", description: "Steady progress" },
  { id: "15+", label: "15+ hrs/week", description: "Intensive learning" },
]

const GOALS = [
  { id: "job", label: "Get a Job", icon: Briefcase, color: "from-blue-500 to-cyan-500" },
  { id: "freelance", label: "Freelance", icon: Laptop, color: "from-green-500 to-emerald-500" },
  { id: "projects", label: "Build Projects", icon: Blocks, color: "from-purple-500 to-pink-500" },
  { id: "explore", label: "Explore", icon: Compass, color: "from-orange-500 to-yellow-500" },
]

interface Props {
  data: JourneyData
  onUpdate: (data: Partial<JourneyData>) => void
  onNext: () => void
  onBack: () => void
}

export function ProfileStep({ data, onUpdate, onNext, onBack }: Props) {
  const [profile, setProfile] = useState(data.profile)

  const updateProfile = (field: keyof typeof profile, value: string) => {
    const newProfile = { ...profile, [field]: value }
    setProfile(newProfile)
    onUpdate({ profile: newProfile })
  }

  const isComplete = profile.level && profile.timeCommitment && profile.goal

  const handleContinue = () => {
    if (isComplete) {
      onNext()
    }
  }

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
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-purple-300">STEP 3 OF 5</span>
                <span className="text-xs text-yellow-400">+200 XP</span>
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Tell us about{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  yourself
                </span>
              </h2>
              <p className="text-gray-400 max-w-lg mx-auto">Help us personalize your learning journey</p>
            </div>

            {/* Question 1: Level */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">What's your current level?</h3>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {LEVELS.map((level, index) => {
                  const Icon = level.icon
                  const isSelected = profile.level === level.id

                  return (
                    <motion.button
                      key={level.id}
                      onClick={() => updateProfile("level", level.id)}
                      className={`relative p-6 rounded-xl border text-left transition-all ${
                        isSelected
                          ? "bg-purple-500/20 border-purple-500"
                          : "bg-gray-900/50 border-gray-700 hover:border-purple-500/50"
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSelected && (
                        <motion.div
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10"
                          layoutId="selected-level"
                        />
                      )}

                      <div className="relative">
                        <div
                          className={`w-12 h-12 rounded-xl mb-3 flex items-center justify-center ${
                            isSelected ? "bg-purple-500/30" : "bg-gray-800"
                          }`}
                        >
                          <Icon className={`w-6 h-6 ${isSelected ? "text-purple-400" : "text-gray-400"}`} />
                        </div>

                        <h4 className="font-semibold text-white mb-1">{level.label}</h4>
                        <p className="text-sm text-gray-400">{level.description}</p>
                      </div>

                      {isSelected && (
                        <motion.div
                          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <motion.div
                            className="w-2 h-2 rounded-full bg-white"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                          />
                        </motion.div>
                      )}
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Question 2: Time Commitment */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Time commitment?</h3>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {TIME_COMMITMENTS.map((time, index) => {
                  const isSelected = profile.timeCommitment === time.id

                  return (
                    <motion.button
                      key={time.id}
                      onClick={() => updateProfile("timeCommitment", time.id)}
                      className={`relative p-5 rounded-xl border text-center transition-all ${
                        isSelected
                          ? "bg-purple-500/20 border-purple-500"
                          : "bg-gray-900/50 border-gray-700 hover:border-purple-500/50"
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <h4 className="font-semibold text-white mb-1">{time.label}</h4>
                      <p className="text-sm text-gray-400">{time.description}</p>

                      {isSelected && (
                        <motion.div
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                          layoutId="selected-time"
                        />
                      )}
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Question 3: Goal */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Primary goal?</h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {GOALS.map((goal, index) => {
                  const Icon = goal.icon
                  const isSelected = profile.goal === goal.id

                  return (
                    <motion.button
                      key={goal.id}
                      onClick={() => updateProfile("goal", goal.id)}
                      className={`relative p-6 rounded-xl border text-center transition-all ${
                        isSelected
                          ? "bg-purple-500/20 border-purple-500"
                          : "bg-gray-900/50 border-gray-700 hover:border-purple-500/50"
                      }`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className={`w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br ${goal.color} p-[2px]`}>
                        <div className="w-full h-full rounded-xl bg-gray-900 flex items-center justify-center">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                      </div>

                      <h4 className="font-semibold text-white">{goal.label}</h4>

                      {isSelected && (
                        <motion.div
                          className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <Zap className="w-3 h-3 text-white" />
                        </motion.div>
                      )}
                    </motion.button>
                  )
                })}
              </div>
            </div>

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

              <motion.button
                onClick={handleContinue}
                disabled={!isComplete}
                className={`relative inline-flex items-center gap-3 px-10 py-4 rounded-xl font-semibold text-white overflow-hidden transition-all ${
                  isComplete ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
                }`}
                whileHover={isComplete ? { scale: 1.05 } : {}}
                whileTap={isComplete ? { scale: 0.95 } : {}}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_200%] animate-[gradient-shift_8s_ease_infinite]" />

                {isComplete && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    animate={{ x: ["-200%", "200%"] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                )}

                <span className="relative flex items-center gap-2">
                  Generate Roadmap
                  <ArrowRight className="w-5 h-5" />
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
