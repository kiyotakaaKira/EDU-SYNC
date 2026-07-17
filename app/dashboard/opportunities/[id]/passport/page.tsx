"use client"

import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Users, CheckCircle2, AlertTriangle, Check, X, ArrowRight, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { SEEDED_JOBS } from "@/lib/seed/jobs"
import { DEMO_CANDIDATE } from "@/lib/seed/candidate"
import { calculateOpportunityFit } from "@/lib/scoring/opportunity-fit"
import { Progress } from "@/components/ui/progress"
import type { EvidenceLevel } from "@/lib/types/candidate"

// ─── Shared Evidence Config (same as profile/detail pages) ────────────────────
const EVIDENCE_CONFIG: Record<EvidenceLevel, { label: string; className: string }> = {
  VALIDATED: { label: "VALIDATED", className: "bg-emerald-500/15 border-emerald-500/40 text-emerald-300" },
  CREDENTIALLED: { label: "CREDENTIALLED", className: "bg-blue-500/15 border-blue-500/40 text-blue-300" },
  DEMONSTRATED: { label: "DEMONSTRATED", className: "bg-violet-500/15 border-violet-500/40 text-violet-300" },
  DEVELOPING: { label: "DEVELOPING", className: "bg-yellow-500/15 border-yellow-500/40 text-yellow-300" },
  CLAIMED: { label: "CLAIMED", className: "bg-slate-500/15 border-slate-500/40 text-slate-300" },
}

// ─── Score Bar ────────────────────────────────────────────────────────────────
function ScoreBar({ label, value, color = "bg-primary" }: { label: string; value: number; color?: string }) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-sm font-bold text-white">{value}%</span>
      </div>
      <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ReferralPassportPage({ params }: { params: { id: string } }) {
  const job = SEEDED_JOBS.find((j) => j.id === params.id)
  if (!job) notFound()

  const candidate = DEMO_CANDIDATE
  const fit = calculateOpportunityFit(candidate, job)
  const { breakdown } = fit

  // Referral status: REFERRAL READY if opportunityFit >= 80
  const isReferralReady = fit.opportunityFit >= 80

  const jobTitle = `${job.title} @ ${job.company}`

  const evidenceItems: { key: keyof typeof candidate.skills[0]["evidence"]; label: string }[] = [
    { key: "resume", label: "Resume" },
    { key: "certificate", label: "Cert" },
    { key: "project", label: "Project" },
    { key: "assessment", label: "Assessment" },
  ]

  return (
    <div className="p-6 lg:p-8 min-h-screen max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link
          href={`/dashboard/opportunities/${job.id}`}
          className="flex items-center gap-1 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> {job.title} @ {job.company}
        </Link>
        <span>/</span>
        <span className="text-primary">Referral Passport</span>
      </div>

      {/* Passport Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative p-8 rounded-2xl border overflow-hidden mb-6"
        style={{
          background: "linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(79,70,229,0.08) 100%)",
          borderColor: "rgba(37,99,235,0.3)",
        }}
      >
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative flex items-center gap-3 mb-1">
          <ShieldCheck className="w-7 h-7 text-primary" />
          <h1 className="text-2xl font-bold text-white">EduSync Referral Passport</h1>
        </div>
        <p className="text-muted-foreground text-sm mb-4 relative">
          Job-specific profile prepared for referral consideration
        </p>

        {/* Candidate + Opportunity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
          <div className="p-4 rounded-xl bg-white/5 border border-border">
            <p className="text-xs text-muted-foreground mb-0.5">Candidate</p>
            <p className="font-bold text-white text-lg">{candidate.name}</p>
            <p className="text-xs text-muted-foreground">{candidate.targetRole}</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-border">
            <p className="text-xs text-muted-foreground mb-0.5">Target Opportunity</p>
            <p className="font-bold text-white text-lg">{job.title}</p>
            <p className="text-xs text-muted-foreground">{job.company} · {job.location}</p>
          </div>
        </div>

        {/* Caption */}
        <p className="relative mt-4 text-xs text-muted-foreground/80 italic">
          This passport reflects fit for <strong className="text-muted-foreground">{jobTitle}</strong> specifically and is not a universal candidate score.
        </p>
      </motion.div>

      {/* Four Fit Scores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 rounded-2xl bg-white/5 border border-border mb-6"
      >
        <h2 className="text-lg font-bold text-white mb-5">Fit Scores</h2>
        <ScoreBar label="Opportunity Fit" value={fit.opportunityFit} color="bg-primary" />
        <ScoreBar label="Verified Skill Fit" value={breakdown.verifiedSkillEvidence} color="bg-emerald-500" />
        <ScoreBar label="Credential Relevance" value={breakdown.credentialRelevance} color="bg-blue-500" />
        <ScoreBar label="Project Relevance" value={breakdown.projectRelevance} color="bg-violet-500" />
      </motion.div>

      {/* Skills with evidence */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-2xl bg-white/5 border border-border mb-6"
      >
        <h2 className="text-lg font-bold text-white mb-5">Verified Skills</h2>
        <div className="space-y-3">
          {candidate.skills.map((skill, i) => (
            <motion.div
              key={skill.skill}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.05 }}
              className="flex flex-col sm:flex-row sm:items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-border"
            >
              <p className="flex-1 font-medium text-white text-sm">{skill.skill}</p>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${EVIDENCE_CONFIG[skill.level].className}`}>
                {skill.level}
              </span>
              <div className="flex items-center gap-3">
                {evidenceItems.map(({ key, label }) => (
                  <div key={key} className="flex flex-col items-center gap-0.5">
                    {skill.evidence[key] ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <X className="w-3.5 h-3.5 text-muted-foreground/40" />
                    )}
                    <span className="text-[10px] text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Referral Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`p-6 rounded-2xl border mb-6 ${
          isReferralReady
            ? "bg-emerald-500/5 border-emerald-500/30"
            : "bg-yellow-500/5 border-yellow-500/30"
        }`}
      >
        <div className="flex items-center gap-3">
          {isReferralReady ? (
            <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
          ) : (
            <AlertTriangle className="w-8 h-8 text-yellow-400 shrink-0" />
          )}
          <div>
            <p className={`text-xl font-bold ${isReferralReady ? "text-emerald-300" : "text-yellow-300"}`}>
              {isReferralReady ? "REFERRAL READY" : "IMPROVEMENT RECOMMENDED"}
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">
              {isReferralReady
                ? `${candidate.name} meets the threshold for referral consideration for ${jobTitle}.`
                : `Opportunity fit is ${fit.opportunityFit}% — additional skill verification would strengthen this passport.`
              }
            </p>
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Link
          href="/dashboard/referrals"
          className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:opacity-90 transition-opacity"
        >
          <Users className="w-5 h-5" />
          Find Matching Alumni
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  )
}
