"use client"

import { notFound, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, UserCircle, Briefcase, Check, X, Building2, UserCheck, CalendarCheck, ShieldCheck, Link as LinkIcon } from "lucide-react"
import Link from "next/link"
import { SEEDED_JOBS } from "@/lib/seed/jobs"
import { ALL_CANDIDATES } from "@/lib/seed/candidate"
import { calculateOpportunityFit } from "@/lib/scoring/opportunity-fit"
import { usePipeline, type PipelineStage } from "@/lib/context/pipeline-context"
import { Progress } from "@/components/ui/progress"
import type { EvidenceLevel } from "@/lib/types/candidate"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const EVIDENCE_CONFIG: Record<EvidenceLevel, { label: string; className: string }> = {
  VALIDATED: { label: "VALIDATED", className: "bg-emerald-500/15 border-emerald-500/40 text-emerald-300" },
  CREDENTIALLED: { label: "CREDENTIALLED", className: "bg-blue-500/15 border-blue-500/40 text-blue-300" },
  DEMONSTRATED: { label: "DEMONSTRATED", className: "bg-violet-500/15 border-violet-500/40 text-violet-300" },
  DEVELOPING: { label: "DEVELOPING", className: "bg-yellow-500/15 border-yellow-500/40 text-yellow-300" },
  CLAIMED: { label: "CLAIMED", className: "bg-slate-500/15 border-slate-500/40 text-slate-300" },
}

export default function HRCandidateProfilePage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams()
  const jobId = searchParams.get("jobId") || SEEDED_JOBS[0].id

  const candidate = ALL_CANDIDATES.find((c) => c.id === params.id)
  const job = SEEDED_JOBS.find((j) => j.id === jobId)

  if (!candidate || !job) notFound()

  const { getStage, setStage } = usePipeline()
  const fit = calculateOpportunityFit(candidate, job)
  const currentStage = getStage(candidate.id, job.id)

  const isShortlisted = ["SHORTLISTED", "INTERVIEW", "SELECTED", "HIRED"].includes(currentStage)
  const isInterviewed = ["INTERVIEW", "SELECTED", "HIRED"].includes(currentStage)

  const evidenceItems: { key: keyof typeof candidate.skills[0]["evidence"]; label: string }[] = [
    { key: "resume", label: "Resume" },
    { key: "certificate", label: "Cert" },
    { key: "project", label: "Project" },
    { key: "assessment", label: "Assessment" },
  ]

  return (
    <TooltipProvider>
      <div className="p-6 lg:p-8 min-h-screen">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/hr/talent" className="flex items-center gap-1 hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" /> Talent Discovery
            </Link>
            <span>/</span>
            <span className="text-primary">{candidate.name}</span>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-border text-sm font-medium">
            <span className="text-muted-foreground">Evaluating for:</span>
            <span className="text-white flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-primary/20">
              <Building2 className="w-4 h-4" /> {job.title}
            </span>
          </div>
        </div>

        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Candidate Identity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-background to-secondary/10 border border-border flex flex-col sm:flex-row items-center sm:items-start gap-6"
          >
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-secondary p-[2px] shrink-0">
              <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                <UserCircle className="w-12 h-12 text-primary" />
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-bold text-white mb-1">{candidate.name}</h1>
              <p className="text-muted-foreground">{candidate.headline}</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
                  <ShieldCheck className="w-4 h-4" /> {candidate.verifiedSkillsCount} Verified Skills
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium">
                  <Briefcase className="w-4 h-4" /> {candidate.projectsCount} Projects
                </div>
              </div>
            </div>
          </motion.div>

          {/* Job Fit Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-white/5 border border-border flex flex-col justify-center"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Opportunity Fit</h2>
              <p className="text-3xl font-black text-primary">{fit.opportunityFit}%</p>
            </div>
            <Progress value={fit.opportunityFit} className="h-2 mb-4" />
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Skill Match</span>
                <span className="text-white font-medium">{fit.breakdown.skillMatch}%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Verified Evidence</span>
                <span className="text-white font-medium">{fit.breakdown.verifiedSkillEvidence}%</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Verified Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl bg-white/5 border border-border"
            >
              <h2 className="text-xl font-bold text-white mb-5">Verified Skills</h2>
              <div className="space-y-3">
                {candidate.skills.map((skill, i) => (
                  <div key={skill.skill} className="flex flex-col sm:flex-row sm:items-center gap-3 p-3.5 rounded-xl bg-background border border-border hover:border-primary/30 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white text-sm">{skill.skill}</p>
                    </div>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${EVIDENCE_CONFIG[skill.level].className}`}>
                      {skill.level}
                    </span>
                    <div className="flex items-center gap-3">
                      {evidenceItems.map(({ key, label }) => (
                        <div key={key} className="flex flex-col items-center gap-0.5 w-12">
                          {skill.evidence[key] ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <X className="w-3.5 h-3.5 text-muted-foreground/40" />
                          )}
                          <span className="text-[9px] text-muted-foreground uppercase">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Credential Intelligence Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-2xl bg-white/5 border border-border"
            >
              <h2 className="text-xl font-bold text-white mb-5">Credential Intelligence</h2>
              <div className="p-4 rounded-xl border border-primary/20 bg-primary/5">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">AWS Certified Cloud Practitioner</h3>
                    <p className="text-xs text-muted-foreground">Amazon Web Services · Verified</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="px-2 py-1 rounded bg-background border border-border text-xs text-white">AWS</span>
                      <span className="px-2 py-1 rounded bg-background border border-border text-xs text-white">Cloud Computing</span>
                    </div>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Job Relevance</p>
                    <p className="text-xl font-bold text-emerald-400">94%</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">HIGH IMPACT</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-2xl bg-white/5 border border-border space-y-4"
            >
              <h2 className="text-lg font-bold text-white mb-2">Hiring Actions</h2>
              
              <button
                onClick={() => setStage(candidate.id, job.id, "SHORTLISTED")}
                disabled={isShortlisted}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isShortlisted
                    ? "bg-white/5 text-muted-foreground border border-border cursor-not-allowed"
                    : "bg-primary/20 text-primary border border-primary/40 hover:bg-primary/30"
                }`}
              >
                <UserCheck className="w-4 h-4" />
                {isShortlisted ? "Already Shortlisted" : "Shortlist Candidate"}
              </button>

              <button
                onClick={() => setStage(candidate.id, job.id, "INTERVIEW")}
                disabled={isInterviewed || !isShortlisted}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isInterviewed
                    ? "bg-white/5 text-muted-foreground border border-border cursor-not-allowed"
                    : isShortlisted
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30"
                    : "bg-white/5 text-muted-foreground border border-border opacity-50 cursor-not-allowed"
                }`}
              >
                <CalendarCheck className="w-4 h-4" />
                {isInterviewed ? "Interview Scheduled" : "Invite to Interview"}
              </button>

              {!isShortlisted && (
                <p className="text-xs text-center text-muted-foreground mt-2">
                  Shortlist the candidate first to schedule an interview.
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
