"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Trophy, Info } from "lucide-react"
import Link from "next/link"
import { SEEDED_JOBS } from "@/lib/seed/jobs"
import { ALL_CANDIDATES } from "@/lib/seed/candidate"
import { calculateOpportunityFit } from "@/lib/scoring/opportunity-fit"
import { usePipeline } from "@/lib/context/pipeline-context"
import { Progress } from "@/components/ui/progress"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function HRTalentPage() {
  const [selectedJobId, setSelectedJobId] = useState(SEEDED_JOBS[0].id)
  const { getStage, setStage } = usePipeline()

  const selectedJob = SEEDED_JOBS.find((j) => j.id === selectedJobId) ?? SEEDED_JOBS[0]

  // Rank ALL candidates for THIS specific job — never a universal score
  const rankedCandidates = ALL_CANDIDATES
    .map((candidate) => ({
      candidate,
      fit: calculateOpportunityFit(candidate, selectedJob),
    }))
    .sort((a, b) => b.fit.opportunityFit - a.fit.opportunityFit)

  return (
    <TooltipProvider>
      <div className="p-6 lg:p-8 min-h-screen">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600">
              <Search className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Talent Discovery</h1>
          </div>
          <p className="text-muted-foreground">
            Candidates ranked by evidence-backed fit for the selected job. Rankings are job-specific — a candidate&apos;s position changes with the role.
          </p>
        </div>

        {/* Job selector */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-white mb-2">Select Job</label>
          <Select value={selectedJobId} onValueChange={setSelectedJobId}>
            <SelectTrigger id="talent-job-select" className="w-full max-w-sm bg-background border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SEEDED_JOBS.map((j) => (
                <SelectItem key={j.id} value={j.id}>{j.title} @ {j.company}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Ranked candidates */}
        <div className="space-y-4">
          {rankedCandidates.map(({ candidate, fit }, i) => {
            const currentStage = getStage(candidate.id, selectedJobId)
            const isShortlisted = currentStage !== "DISCOVERED"

            return (
              <motion.div
                key={candidate.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl bg-gradient-to-br from-primary/5 via-background to-secondary/5 border border-border hover:border-primary/30 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Rank */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg ${
                      i === 0 ? "bg-yellow-500/20 text-yellow-300" :
                      i === 1 ? "bg-slate-400/20 text-slate-300" :
                      "bg-amber-700/20 text-amber-500"
                    }`}>
                      {i + 1}
                    </div>
                    {i === 0 && <Trophy className="w-5 h-5 text-yellow-400" />}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-white">{candidate.name}</p>
                      {isShortlisted && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                          {currentStage}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{candidate.headline}</p>
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      <span className="text-xs text-muted-foreground">
                        Verified Skills: <strong className="text-white">{candidate.verifiedSkillsCount}</strong>
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Credential Fit: <strong className="text-blue-300">{fit.breakdown.credentialRelevance}%</strong>
                      </span>
                    </div>
                  </div>

                  {/* Fit Score + breakdown popover */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <p className="text-2xl font-black text-primary">{fit.opportunityFit}%</p>
                      <p className="text-xs text-muted-foreground">Opportunity Fit</p>
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-muted-foreground hover:text-white transition-colors">
                          <Info className="w-4 h-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="left" className="max-w-xs p-3 bg-background border border-border">
                        <p className="text-xs font-semibold text-white mb-2">Score Breakdown (Transparent Formula)</p>
                        {[
                          ["Skill Match (35%)", fit.breakdown.skillMatch],
                          ["Verified Evidence (20%)", fit.breakdown.verifiedSkillEvidence],
                          ["Credential Relevance (15%)", fit.breakdown.credentialRelevance],
                          ["Project Relevance (15%)", fit.breakdown.projectRelevance],
                          ["Experience Match (10%)", fit.breakdown.experienceMatch],
                          ["Profile Completeness (5%)", fit.breakdown.profileCompleteness],
                        ].map(([label, val]) => (
                          <div key={label as string} className="flex justify-between gap-4 text-xs py-0.5">
                            <span className="text-muted-foreground">{label as string}</span>
                            <span className="text-white font-medium">{val as number}%</span>
                          </div>
                        ))}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                {/* Progress */}
                <Progress value={fit.opportunityFit} className="h-1.5 mt-3 mb-4" />

                {/* Actions */}
                <div className="flex gap-3 flex-wrap">
                  <Link
                    href={`/hr/talent/${candidate.id}?jobId=${selectedJobId}`}
                    className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/30 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                  >
                    View Profile
                  </Link>
                  <button
                    onClick={() => setStage(candidate.id, selectedJobId, "SHORTLISTED")}
                    disabled={isShortlisted}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      isShortlisted
                        ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 cursor-default"
                        : "bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25"
                    }`}
                  >
                    {isShortlisted ? "✓ Shortlisted" : "Shortlist"}
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </TooltipProvider>
  )
}
