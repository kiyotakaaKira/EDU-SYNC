"use client"

import React, { createContext, useContext, useState } from "react"

// ─── Pipeline Store ────────────────────────────────────────────────────────────
// Shared in-memory state for candidate pipeline stages.
// Key: `${candidateId}::${jobId}` → stage string
// Wired to: Shortlist (Talent Discovery 10C), Invite to Interview (10D), Pipeline (10E)

export type PipelineStage = "DISCOVERED" | "SHORTLISTED" | "INTERVIEW" | "SELECTED" | "HIRED"

type PipelineKey = string // `${candidateId}::${jobId}`

interface PipelineContextValue {
  stages: Record<PipelineKey, PipelineStage>
  setStage: (candidateId: string, jobId: string, stage: PipelineStage) => void
  getStage: (candidateId: string, jobId: string) => PipelineStage
  advance: (candidateId: string, jobId: string) => void
}

const STAGE_ORDER: PipelineStage[] = ["DISCOVERED", "SHORTLISTED", "INTERVIEW", "SELECTED", "HIRED"]

const PipelineContext = createContext<PipelineContextValue | null>(null)

export function PipelineProvider({ children }: { children: React.ReactNode }) {
  const [stages, setStages] = useState<Record<PipelineKey, PipelineStage>>({
    // Seed Adithyan J as DISCOVERED for all three jobs
    "adithyan-j::ai-engineer-intern-techcorp": "DISCOVERED",
    "adithyan-j::backend-engineer-innovatex": "DISCOVERED",
    "adithyan-j::ml-intern-novalabs": "DISCOVERED",
  })

  const key = (cId: string, jId: string) => `${cId}::${jId}`

  const setStage = (cId: string, jId: string, stage: PipelineStage) =>
    setStages((prev) => ({ ...prev, [key(cId, jId)]: stage }))

  const getStage = (cId: string, jId: string): PipelineStage =>
    stages[key(cId, jId)] ?? "DISCOVERED"

  const advance = (cId: string, jId: string) => {
    const current = getStage(cId, jId)
    const idx = STAGE_ORDER.indexOf(current)
    if (idx < STAGE_ORDER.length - 1) {
      setStage(cId, jId, STAGE_ORDER[idx + 1])
    }
  }

  return (
    <PipelineContext.Provider value={{ stages, setStage, getStage, advance }}>
      {children}
    </PipelineContext.Provider>
  )
}

export function usePipeline() {
  const ctx = useContext(PipelineContext)
  if (!ctx) throw new Error("usePipeline must be used within <PipelineProvider>")
  return ctx
}

export { STAGE_ORDER }
