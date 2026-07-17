"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GitBranch, Building2, ChevronRight, ChevronLeft, MoreHorizontal, UserCircle, Star } from "lucide-react"
import Link from "next/link"
import { usePipeline, STAGE_ORDER, type PipelineStage } from "@/lib/context/pipeline-context"
import { SEEDED_JOBS } from "@/lib/seed/jobs"
import { ALL_CANDIDATES } from "@/lib/seed/candidate"
import { calculateOpportunityFit } from "@/lib/scoring/opportunity-fit"

const STAGE_CONFIG: Record<PipelineStage, { label: string; color: string; border: string }> = {
  DISCOVERED: { label: "Discovered", color: "bg-slate-500/10", border: "border-slate-500/20" },
  SHORTLISTED: { label: "Shortlisted", color: "bg-primary/10", border: "border-primary/20" },
  INTERVIEW: { label: "Interview", color: "bg-violet-500/10", border: "border-violet-500/20" },
  SELECTED: { label: "Selected", color: "bg-blue-500/10", border: "border-blue-500/20" },
  HIRED: { label: "Hired", color: "bg-emerald-500/10", border: "border-emerald-500/30" },
}

export default function HRPipelinePage() {
  const { stages, setStage } = usePipeline()
  const [selectedJobId, setSelectedJobId] = useState<string | "all">("all")

  // Reconstruct the pipeline data by joining the stages context with candidates and jobs
  const pipelineItems = Object.entries(stages).map(([key, stage]) => {
    const [cId, jId] = key.split("::")
    const candidate = ALL_CANDIDATES.find((c) => c.id === cId)!
    const job = SEEDED_JOBS.find((j) => j.id === jId)!
    const fit = calculateOpportunityFit(candidate, job)
    return { id: key, candidate, job, stage, fit }
  })

  const filteredItems = selectedJobId === "all" ? pipelineItems : pipelineItems.filter((i) => i.job.id === selectedJobId)

  return (
    <div className="p-6 lg:p-8 min-h-screen flex flex-col h-screen max-h-screen">
      <div className="mb-6 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-secondary">
              <GitBranch className="w-6 h-6 text-white" />
            </div>
            Hiring Pipeline
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">Track candidates from discovery to offer.</p>
        </div>

        <select
          value={selectedJobId}
          onChange={(e) => setSelectedJobId(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-background border border-border text-sm font-medium text-white focus:outline-none focus:border-primary max-w-[250px]"
        >
          <option value="all">All Active Jobs</option>
          {SEEDED_JOBS.map((j) => (
            <option key={j.id} value={j.id}>{j.title}</option>
          ))}
        </select>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 flex gap-6 overflow-x-auto pb-4 items-start snap-x snap-mandatory">
        {STAGE_ORDER.map((stage) => {
          const config = STAGE_CONFIG[stage]
          const stageItems = filteredItems.filter((i) => i.stage === stage)

          return (
            <div key={stage} className="flex flex-col w-80 shrink-0 snap-center h-full max-h-full">
              {/* Column Header */}
              <div className={`px-4 py-3 rounded-t-xl border-t border-x ${config.color} ${config.border} flex items-center justify-between`}>
                <h3 className="font-bold text-white text-sm">{config.label}</h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-background border border-border">
                  {stageItems.length}
                </span>
              </div>

              {/* Column Body */}
              <div className={`flex-1 p-3 rounded-b-xl border-x border-b bg-black/20 ${config.border} overflow-y-auto space-y-3`}>
                <AnimatePresence>
                  {stageItems.map((item) => {
                    const currentIndex = STAGE_ORDER.indexOf(stage)
                    const prevStage = STAGE_ORDER[currentIndex - 1]
                    const nextStage = STAGE_ORDER[currentIndex + 1]

                    return (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="p-4 rounded-xl bg-background border border-border hover:border-primary/40 transition-colors shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <Link href={`/hr/talent/${item.candidate.id}?jobId=${item.job.id}`} className="flex-1 group">
                            <h4 className="font-bold text-white text-sm group-hover:text-primary transition-colors">{item.candidate.name}</h4>
                            <p className="text-xs text-muted-foreground line-clamp-1">{item.candidate.headline}</p>
                          </Link>
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary p-[1px] shrink-0">
                            <div className="w-full h-full rounded-lg bg-background flex items-center justify-center">
                              <span className="text-[10px] font-bold text-white">AJ</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 mb-4">
                          <Building2 className="w-3 h-3 text-muted-foreground" />
                          <p className="text-[10px] text-muted-foreground truncate">{item.job.title}</p>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-border">
                          <div className="flex items-center gap-1.5">
                            <Star className="w-3.5 h-3.5 text-yellow-500" />
                            <span className="text-xs font-bold text-white">{item.fit.opportunityFit}% Fit</span>
                          </div>

                          <div className="flex items-center gap-1">
                            {prevStage ? (
                              <button
                                onClick={() => setStage(item.candidate.id, item.job.id, prevStage)}
                                className="p-1 rounded hover:bg-white/10 text-muted-foreground transition-colors"
                                title="Move Back"
                              >
                                <ChevronLeft className="w-4 h-4" />
                              </button>
                            ) : <div className="w-6" />}
                            
                            {nextStage ? (
                              <button
                                onClick={() => setStage(item.candidate.id, item.job.id, nextStage)}
                                className="p-1 rounded hover:bg-primary/20 text-primary transition-colors"
                                title="Move Forward"
                              >
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            ) : <div className="w-6" />}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
                
                {stageItems.length === 0 && (
                  <div className="h-24 border-2 border-dashed border-border rounded-xl flex items-center justify-center">
                    <p className="text-xs text-muted-foreground">Drop candidates here</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
