"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Rocket,
  DollarSign,
  Clock,
  TrendingUp,
  BarChart3,
  BookOpen,
  Folder,
  Sparkles,
  Zap,
  Trophy,
} from "lucide-react"
import type { JourneyData } from "@/app/dashboard/journeys/new/page"

type TabId = "career" | "roadmap" | "projects"

interface Props {
  data: JourneyData
  onBack: () => void
}

export function RoadmapPreviewStep({ data, onBack }: Props) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabId>("career")
  const [isSaving, setIsSaving] = useState(false)

  const tabs = [
    { id: "career" as TabId, label: "Career Scope", icon: TrendingUp },
    { id: "roadmap" as TabId, label: "Learning Roadmap", icon: BookOpen },
    { id: "projects" as TabId, label: "Suggested Projects", icon: Folder },
  ]

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate saving to database
    await new Promise((resolve) => setTimeout(resolve, 1500))
    router.push("/dashboard")
  }

  if (!data.roadmap) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-50" />

        <div className="relative p-6 md:p-10 rounded-2xl bg-gradient-to-br from-purple-900/30 via-[#0a0a0f] to-pink-900/20 border border-purple-500/30">
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
            <div className="text-center mb-8">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/20 border border-green-500/30 mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
              >
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-green-300">ROADMAP READY</span>
                <span className="text-xs text-yellow-400">+500 XP</span>
              </motion.div>

              <h2 className="text-3xl font-bold text-white mb-2">
                Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  {data.skill}
                </span>{" "}
                Journey
              </h2>
              <p className="text-gray-400">Review your personalized learning roadmap</p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center gap-2 mb-8">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id

                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                      isActive
                        ? "text-white"
                        : "text-gray-400 hover:text-white bg-gray-900/50 border border-gray-700 hover:border-purple-500/50"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600"
                        layoutId="active-tab"
                      />
                    )}
                    <Icon className={`relative w-4 h-4 ${isActive ? "text-white" : ""}`} />
                    <span className="relative">{tab.label}</span>
                  </motion.button>
                )
              })}
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              {/* Career Scope Tab */}
              {activeTab === "career" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid md:grid-cols-2 gap-6"
                >
                  {[
                    {
                      label: "Salary Range",
                      value: data.roadmap.careerScope.salaryRange,
                      icon: DollarSign,
                      color: "from-green-500 to-emerald-500",
                    },
                    {
                      label: "Time to Job-Ready",
                      value: data.roadmap.careerScope.timeEstimate,
                      icon: Clock,
                      color: "from-blue-500 to-cyan-500",
                    },
                    {
                      label: "Market Demand",
                      value: data.roadmap.careerScope.demandLevel,
                      icon: TrendingUp,
                      color: "from-purple-500 to-pink-500",
                    },
                    {
                      label: "Growth Rate",
                      value: data.roadmap.careerScope.growthRate,
                      icon: BarChart3,
                      color: "from-orange-500 to-yellow-500",
                    },
                  ].map((stat, index) => {
                    const Icon = stat.icon

                    return (
                      <motion.div
                        key={stat.label}
                        className="relative p-6 rounded-xl bg-gray-900/50 border border-gray-700 overflow-hidden group hover:border-purple-500/50 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div
                          className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`}
                        />

                        <div className="relative">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} p-[2px] mb-4`}>
                            <div className="w-full h-full rounded-xl bg-gray-900 flex items-center justify-center">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                          </div>

                          <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                          <p className="text-2xl font-bold text-white">{stat.value}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </motion.div>
              )}

              {/* Learning Roadmap Tab */}
              {activeTab === "roadmap" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  {data.roadmap.phases.map((phase, index) => (
                    <motion.div
                      key={phase.title}
                      className="relative p-6 rounded-xl bg-gray-900/50 border border-gray-700 overflow-hidden"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.15 }}
                    >
                      {/* Phase Number */}
                      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                        <span className="text-sm font-bold text-purple-400">{index + 1}</span>
                      </div>

                      {/* Connection Line */}
                      {index < data.roadmap!.phases.length - 1 && (
                        <div className="absolute left-8 top-full w-0.5 h-4 bg-gradient-to-b from-purple-500 to-transparent" />
                      )}

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-[2px] shrink-0">
                          <div className="w-full h-full rounded-xl bg-gray-900 flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-purple-400" />
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-semibold text-white">{phase.title}</h4>
                            <span className="px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-xs text-blue-300">
                              {phase.duration}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {phase.topics.map((topic) => (
                              <span
                                key={topic}
                                className="px-3 py-1.5 rounded-lg bg-gray-800 border border-gray-700 text-sm text-gray-300"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* XP Reward */}
                      <motion.div
                        className="absolute bottom-4 right-4 flex items-center gap-1 text-yellow-400 text-sm"
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <Zap className="w-4 h-4" />+{(index + 1) * 100} XP
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Projects Tab */}
              {activeTab === "projects" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid md:grid-cols-3 gap-6"
                >
                  {data.roadmap.projects.map((project, index) => {
                    const difficultyColors: Record<string, string> = {
                      Beginner: "from-green-500 to-emerald-500",
                      Intermediate: "from-yellow-500 to-orange-500",
                      Advanced: "from-red-500 to-pink-500",
                    }

                    return (
                      <motion.div
                        key={project.title}
                        className="relative p-6 rounded-xl bg-gray-900/50 border border-gray-700 overflow-hidden group hover:border-purple-500/50 transition-all"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15 }}
                        whileHover={{ scale: 1.02, y: -4 }}
                      >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500" />

                        <div
                          className={`inline-flex px-3 py-1 rounded-full bg-gradient-to-r ${difficultyColors[project.difficulty]} mb-4`}
                        >
                          <span className="text-xs font-semibold text-white">{project.difficulty}</span>
                        </div>

                        <h4 className="text-lg font-semibold text-white mb-2">{project.title}</h4>
                        <p className="text-sm text-gray-400 mb-4">{project.description}</p>

                        <div className="flex items-center gap-2 text-purple-400">
                          <Folder className="w-4 h-4" />
                          <span className="text-sm">Project Template</span>
                        </div>

                        {/* Hover Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all pointer-events-none" />
                      </motion.div>
                    )
                  })}
                </motion.div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-10">
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
                onClick={handleSave}
                disabled={isSaving}
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
                  {isSaving ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <Sparkles className="w-5 h-5" />
                      </motion.div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Rocket className="w-5 h-5" />
                      Save & Start Learning
                    </>
                  )}
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
