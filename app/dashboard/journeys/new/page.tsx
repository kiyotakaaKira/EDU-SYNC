"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Sparkles, Check } from "lucide-react"
import Link from "next/link"
import { SkillInputStep } from "@/components/journey/skill-input-step"
import { ValidationStep } from "@/components/journey/validation-step"
import { ProfileStep } from "@/components/journey/profile-step"
import { GeneratingStep } from "@/components/journey/generating-step"
import { RoadmapPreviewStep } from "@/components/journey/roadmap-preview-step"

const STEPS = [
  { id: 1, label: "Skill" },
  { id: 2, label: "Validate" },
  { id: 3, label: "Profile" },
  { id: 4, label: "Generate" },
  { id: 5, label: "Preview" },
]

export interface JourneyData {
  skill: string
  validation: {
    isValid: boolean
    reasons: string[]
    alternatives?: string[]
  } | null
  profile: {
    level: string
    timeCommitment: string
    goal: string
  }
  roadmap: {
    careerScope: {
      salaryRange: string
      timeEstimate: string
      demandLevel: string
      growthRate: string
    }
    phases: {
      title: string
      duration: string
      topics: string[]
    }[]
    projects: {
      title: string
      difficulty: string
      description: string
    }[]
  } | null
}

export default function NewJourneyPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [journeyData, setJourneyData] = useState<JourneyData>({
    skill: "",
    validation: null,
    profile: {
      level: "",
      timeCommitment: "",
      goal: "",
    },
    roadmap: null,
  })

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateJourneyData = (data: Partial<JourneyData>) => {
    setJourneyData((prev) => ({ ...prev, ...data }))
  }

  return (
    <div className="min-h-screen p-4 lg:p-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <Link href="/dashboard">
          <motion.button
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
            whileHover={{ x: -4 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </motion.button>
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <motion.div
            className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          >
            <Sparkles className="w-6 h-6 text-purple-400" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white">Create Your Journey</h1>
        </div>
        <p className="text-gray-400">Let AI craft your personalized learning roadmap</p>
      </div>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="relative flex items-center justify-between">
          {/* Progress Line Background */}
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-800 rounded-full" />

          {/* Progress Line Active */}
          <motion.div
            className="absolute top-5 left-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />

          {STEPS.map((step, index) => {
            const isCompleted = currentStep > step.id
            const isCurrent = currentStep === step.id

            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isCompleted
                      ? "bg-gradient-to-br from-purple-500 to-pink-500 border-purple-500"
                      : isCurrent
                        ? "bg-purple-500/20 border-purple-500"
                        : "bg-gray-900 border-gray-700"
                  }`}
                  animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : isCurrent ? (
                    <motion.div
                      className="w-3 h-3 rounded-full bg-purple-500"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    />
                  ) : (
                    <span className="text-sm text-gray-500">{step.id}</span>
                  )}
                </motion.div>
                <span
                  className={`mt-2 text-xs font-medium ${
                    isCompleted || isCurrent ? "text-purple-400" : "text-gray-500"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <SkillInputStep key="skill" data={journeyData} onUpdate={updateJourneyData} onNext={handleNext} />
          )}
          {currentStep === 2 && (
            <ValidationStep
              key="validation"
              data={journeyData}
              onUpdate={updateJourneyData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 3 && (
            <ProfileStep
              key="profile"
              data={journeyData}
              onUpdate={updateJourneyData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 4 && (
            <GeneratingStep key="generating" data={journeyData} onUpdate={updateJourneyData} onNext={handleNext} />
          )}
          {currentStep === 5 && <RoadmapPreviewStep key="preview" data={journeyData} onBack={handleBack} />}
        </AnimatePresence>
      </div>
    </div>
  )
}
