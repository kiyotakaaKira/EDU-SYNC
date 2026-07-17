"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Sparkles, ArrowRight, Code, Brain, Cloud, BarChart3, Palette, Zap } from "lucide-react"
import type { JourneyData } from "@/app/dashboard/journeys/new/page"

const POPULAR_SKILLS = [
  { name: "Backend Development", icon: Code, color: "from-blue-500 to-cyan-500" },
  { name: "AI & Machine Learning", icon: Brain, color: "from-purple-500 to-pink-500" },
  { name: "Cloud Engineering", icon: Cloud, color: "from-indigo-500 to-blue-500" },
  { name: "Data Analytics", icon: BarChart3, color: "from-green-500 to-emerald-500" },
  { name: "Product Design", icon: Palette, color: "from-pink-500 to-rose-500" },
]

interface Props {
  data: JourneyData
  onUpdate: (data: Partial<JourneyData>) => void
  onNext: () => void
}

export function SkillInputStep({ data, onUpdate, onNext }: Props) {
  const [inputValue, setInputValue] = useState(data.skill)
  const [isFocused, setIsFocused] = useState(false)

  const handleSkillSelect = (skill: string) => {
    setInputValue(skill)
    onUpdate({ skill })
  }

  const handleContinue = () => {
    if (inputValue.trim()) {
      onUpdate({ skill: inputValue.trim() })
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
      {/* Main Card */}
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

          {/* Floating Particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-purple-400/50"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 4) * 20}%`,
              }}
              animate={{
                y: [-15, 15, -15],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
              }}
            />
          ))}

          <div className="relative z-10">
            {/* Title */}
            <div className="text-center mb-10">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 mb-4"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-purple-300">STEP 1 OF 5</span>
                <span className="text-xs text-yellow-400">+100 XP</span>
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                What do you want to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  learn?
                </span>
              </h2>
              <p className="text-gray-400 max-w-lg mx-auto">
                Enter a skill you want to master, or choose from popular options below
              </p>
            </div>

            {/* Input Field */}
            <div className="relative max-w-2xl mx-auto mb-10">
              <motion.div
                className={`absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 blur transition-opacity duration-300 ${
                  isFocused ? "opacity-50" : ""
                }`}
              />

              <div className="relative flex items-center">
                <Search className="absolute left-5 w-6 h-6 text-purple-400" />
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="e.g., Backend Development, AI & Machine Learning"
                  className="w-full pl-14 pr-6 py-5 rounded-xl bg-gray-900/80 border border-purple-500/30 text-white text-lg placeholder:text-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                />

                {inputValue && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute right-4"
                  >
                    <Sparkles className="w-5 h-5 text-purple-400" />
                  </motion.div>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 max-w-2xl mx-auto mb-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
              <span className="text-sm text-gray-500">OR CHOOSE POPULAR</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
            </div>

            {/* Popular Skills Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto mb-10">
              {POPULAR_SKILLS.map((skill, index) => {
                const Icon = skill.icon
                const isSelected = inputValue === skill.name

                return (
                  <motion.button
                    key={skill.name}
                    onClick={() => handleSkillSelect(skill.name)}
                    className={`relative group p-4 rounded-xl border transition-all duration-300 ${
                      isSelected
                        ? "bg-purple-500/20 border-purple-500"
                        : "bg-gray-900/50 border-gray-700 hover:border-purple-500/50"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSelected && (
                      <motion.div
                        className="absolute -inset-px rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-20"
                        layoutId="selected-skill"
                      />
                    )}

                    <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${skill.color} p-[2px]`}>
                      <div className="w-full h-full rounded-xl bg-gray-900 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    <p className="text-sm text-center text-gray-300 group-hover:text-white transition-colors">
                      {skill.name}
                    </p>

                    {isSelected && (
                      <motion.div
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <Sparkles className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                )
              })}
            </div>

            {/* Continue Button */}
            <div className="flex justify-center">
              <motion.button
                onClick={handleContinue}
                disabled={!inputValue.trim()}
                className={`relative inline-flex items-center gap-3 px-10 py-4 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 ${
                  inputValue.trim() ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
                }`}
                whileHover={inputValue.trim() ? { scale: 1.05 } : {}}
                whileTap={inputValue.trim() ? { scale: 0.95 } : {}}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_200%] animate-[gradient-shift_8s_ease_infinite]" />

                {inputValue.trim() && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    animate={{ x: ["-200%", "200%"] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                )}

                <span className="relative flex items-center gap-2">
                  Validate Skill
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
