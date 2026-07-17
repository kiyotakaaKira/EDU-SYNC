"use client"

import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Briefcase, MapPin, ArrowRight, Users, Check, X } from "lucide-react"
import Link from "next/link"
import { SEEDED_JOBS } from "@/lib/seed/jobs"
import { DEMO_CANDIDATE } from "@/lib/seed/candidate"
import { calculateOpportunityFit } from "@/lib/scoring/opportunity-fit"
import { Progress } from "@/components/ui/progress"
import type { EvidenceLevel } from "@/lib/types/candidate"

const EVIDENCE_CONFIG: Record<EvidenceLevel, { label: string; className: string }> = {
  VALIDATED: { label: "VALIDATED", className: "bg-emerald-500/15 border-emerald-500/40 text-emerald-300" },
  CREDENTIALLED: { label: "CREDENTIALLED", className: "bg-blue-500/15 border-blue-500/40 text-blue-300" },
  DEMONSTRATED: { label: "DEMONSTRATED", className: "bg-violet-500/15 border-violet-500/40 text-violet-300" },
  DEVELOPING: { label: "DEVELOPING", className: "bg-yellow-500/15 border-yellow-500/40 text-yellow-300" },
  CLAIMED: { label: "CLAIMED", className: "bg-slate-500/15 border-slate-500/40 text-slate-300" },
}

function ScoreBar({ label, value, color = "bg-primary" }: { label: string; value: number; color?: string }) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-sm font-bold text-white">{value}%</span>
      </div>
      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

export default function OpportunityDetailPage({ params }: { params: { id: string } }) {
  const job = SEEDED_JOBS.find((j) => j.id === params.id)
  if (!job) notFound()

  const candidate = DEMO_CANDIDATE
  const fit = calculateOpportunityFit(candidate, job)
  const { breakdown } = fit

  return (
    <div className="p-6 lg:p-8 min-h-screen">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/dashboard/opportunities" className="flex items-center gap-1 hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> Opportunities
        </Link>
        <span>/</span>
        <span className="text-primary">{job.title} @ {job.company}</span>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-background to-secondary/10 border border-primary/30 mb-6 overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 relative">
          <div className="p-3 rounded-xl bg-primary/20">
            <Briefcase className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground mb-0.5">{job.company}</p>
            <h1 className="text-2xl font-bold text-white">{job.title}</h1>
            <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" /> {job.location}
            </div>
          </div>
          <div className="text-right">
            <p className="text-4xl font-black text-primary">{fit.opportunityFit}%</p>
            <p className="text-xs text-muted-foreground">Opportunity Fit</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground relative">{job.description}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fit Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl bg-white/5 border border-border"
        >
          <h2 className="text-lg font-bold text-white mb-5">Fit Analysis</h2>
          <ScoreBar label="Opportunity Fit" value={fit.opportunityFit} />
          <ScoreBar label="Verified Skill Fit" value={breakdown.verifiedSkillEvidence} color="bg-emerald-500" />
          <ScoreBar label="Credential Relevance" value={breakdown.credentialRelevance} color="bg-blue-500" />
          <ScoreBar label="Project Relevance" value={breakdown.projectRelevance} color="bg-violet-500" />
          <ScoreBar label="Experience Match" value={breakdown.experienceMatch} color="bg-yellow-500" />
        </motion.div>

        {/* Required Skills */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-white/5 border border-border"
        >
          <h2 className="text-lg font-bold text-white mb-5">Your Skills vs Requirements</h2>
          <div className="space-y-2">
            {[...job.requiredSkills, ...job.preferredSkills].map((skill) => {
              const candidateSkill = candidate.skills.find(
                (s) => s.skill.toLowerCase() === skill.toLowerCase()
              )
              const isRequired = job.requiredSkills.includes(skill)
              return (
                <div key={skill} className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-border">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-white">{skill}</span>
                    {isRequired && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">Required</span>
                    )}
                  </div>
                  {candidateSkill ? (
                    <div className="flex items-center gap-1.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${EVIDENCE_CONFIG[candidateSkill.level].className}`}>
                        {candidateSkill.level}
                      </span>
                      <Check className="w-4 h-4 text-emerald-400" />
                    </div>
                  ) : (
                    <X className="w-4 h-4 text-rose-400" />
                  )}
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 flex flex-col sm:flex-row gap-4"
      >
        <Link
          href={`/dashboard/opportunities/${job.id}/passport`}
          className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:opacity-90 transition-opacity"
        >
          <Users className="w-5 h-5" />
          View Referral Passport
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/dashboard/referrals"
          className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-border text-white font-medium hover:bg-white/10 transition-colors"
        >
          Find Matching Alumni
        </Link>
      </motion.div>
    </div>
  )
}
