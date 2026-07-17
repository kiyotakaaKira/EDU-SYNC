"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Brain, Map, Sparkles, CheckCircle2, Loader2 } from "lucide-react"
import type { JourneyData } from "@/app/dashboard/journeys/new/page"

const AGENTS = [
  { id: "skill", label: "Skill Validator", icon: CheckCircle2, description: "Confirming skill parameters..." },
  { id: "career", label: "Career Analyst", icon: Brain, description: "Analyzing career trajectories..." },
  { id: "roadmap", label: "Roadmap Architect", icon: Map, description: "Building your learning path..." },
  { id: "projects", label: "Project Generator", icon: Sparkles, description: "Curating hands-on projects..." },
]

interface Props {
  data: JourneyData
  onUpdate: (data: Partial<JourneyData>) => void
  onNext: () => void
}

export function GeneratingStep({ data, onUpdate, onNext }: Props) {
  const [currentAgent, setCurrentAgent] = useState(0)
  const [completedAgents, setCompletedAgents] = useState<number[]>([])

  useEffect(() => {
    const processAgents = async () => {
      for (let i = 0; i < AGENTS.length; i++) {
        setCurrentAgent(i)
        await new Promise((resolve) => setTimeout(resolve, 1200))
        setCompletedAgents((prev) => [...prev, i])
      }

      // Generate mock roadmap data
      onUpdate({
        roadmap: {
          careerScope: {
            salaryRange: "$85,000 - $150,000",
            timeEstimate: "6-12 months",
            demandLevel: "Very High",
            growthRate: "+25% YoY",
          },
          phases: [
            {
              title: "Foundation",
              duration: "4-6 weeks",
              topics: ["Core Concepts", "Development Environment", "Basic Syntax", "Version Control"],
            },
            {
              title: "Intermediate",
              duration: "8-10 weeks",
              topics: ["Advanced Patterns", "Database Integration", "API Development", "Testing"],
            },
            {
              title: "Advanced",
              duration: "6-8 weeks",
              topics: ["System Design", "Performance Optimization", "Security Best Practices", "Deployment"],
            },
            {
              title: "Specialization",
              duration: "4-6 weeks",
              topics: ["Industry Projects", "Portfolio Building", "Interview Prep", "Networking"],
            },
          ],
          projects: [
            {
              title: "Personal Portfolio",
              difficulty: "Beginner",
              description: "Build a responsive portfolio website showcasing your work",
            },
            {
              title: "Task Management API",
              difficulty: "Intermediate",
              description: "Create a RESTful API with authentication and database",
            },
            {
              title: "Real-time Chat App",
              difficulty: "Advanced",
              description: "Build a scalable chat application with WebSockets",
            },
          ],
        },
      })

      setTimeout(() => onNext(), 500)
    }

    processAgents()
  }, [onUpdate, onNext])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center py-12"
    >
      {/* Main Animation Container */}
      <div className="relative w-48 h-48 mb-12">
        {/* Background Glow */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-blue-500/30 blur-2xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        />

        {/* Outer Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-purple-500/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* Middle Ring */}
        <motion.div
          className="absolute inset-4 rounded-full border-4 border-dashed border-pink-500/40"
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* Inner Ring */}
        <motion.div
          className="absolute inset-8 rounded-full border-4 border-blue-500/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* Center Brain Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 p-[2px]"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <div className="w-full h-full rounded-2xl bg-[#0a0a0f] flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                <Brain className="w-10 h-10 text-purple-400" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Orbiting Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              background: `linear-gradient(135deg, ${
                i % 3 === 0 ? "#a855f7" : i % 3 === 1 ? "#ec4899" : "#3b82f6"
              }, transparent)`,
              top: "50%",
              left: "50%",
            }}
            animate={{
              x: [0, Math.cos((i * 2 * Math.PI) / 6 + Date.now() / 1000) * 80],
              y: [0, Math.sin((i * 2 * Math.PI) / 6 + Date.now() / 1000) * 80],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Title */}
      <motion.h2
        className="text-3xl font-bold text-white mb-2 text-center"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        Creating Your Personalized Roadmap
      </motion.h2>
      <p className="text-gray-400 mb-10 text-center">Our AI agents are hard at work analyzing your profile</p>

      {/* Agent Progress */}
      <div className="w-full max-w-md space-y-4">
        {AGENTS.map((agent, index) => {
          const Icon = agent.icon
          const isCompleted = completedAgents.includes(index)
          const isCurrent = currentAgent === index && !isCompleted

          return (
            <motion.div
              key={agent.id}
              className={`relative p-4 rounded-xl border transition-all ${
                isCompleted
                  ? "bg-green-500/10 border-green-500/30"
                  : isCurrent
                    ? "bg-purple-500/20 border-purple-500/50"
                    : "bg-gray-900/50 border-gray-700"
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {isCurrent && (
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                />
              )}

              <div className="relative flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isCompleted ? "bg-green-500/20" : isCurrent ? "bg-purple-500/30" : "bg-gray-800"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                  ) : isCurrent ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Loader2 className="w-6 h-6 text-purple-400" />
                    </motion.div>
                  ) : (
                    <Icon className="w-6 h-6 text-gray-500" />
                  )}
                </div>

                <div className="flex-1">
                  <h4
                    className={`font-semibold ${
                      isCompleted ? "text-green-400" : isCurrent ? "text-white" : "text-gray-500"
                    }`}
                  >
                    {agent.label}
                  </h4>
                  <p
                    className={`text-sm ${isCompleted ? "text-green-300/70" : isCurrent ? "text-gray-400" : "text-gray-600"}`}
                  >
                    {isCompleted ? "Complete" : agent.description}
                  </p>
                </div>

                {isCompleted && (
                  <motion.div
                    className="text-sm font-medium text-green-400"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    +50 XP
                  </motion.div>
                )}
              </div>

              {isCurrent && (
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-b-xl"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
              )}
            </motion.div>
          )
        })}
      </div>

      {/* XP Counter */}
      <motion.div
        className="mt-8 px-6 py-3 rounded-full bg-yellow-500/20 border border-yellow-500/30"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <span className="text-yellow-400 font-semibold">+{completedAgents.length * 50} XP earned</span>
      </motion.div>
    </motion.div>
  )
}
