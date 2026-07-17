"use client"

import { motion } from "framer-motion"
import {
  UserCircle, Rocket, BookOpen, Code, BadgeCheck,
  Check, X, ArrowLeft, Target
} from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { DEMO_CANDIDATE } from "@/lib/seed/candidate"
import type { EvidenceLevel, SkillEvidence } from "@/lib/types/candidate"

// ─── Evidence Level Badge ─────────────────────────────────────────────────────
const EVIDENCE_CONFIG: Record<EvidenceLevel, { label: string; className: string }> = {
  VALIDATED: {
    label: "VALIDATED",
    className: "bg-emerald-500/15 border-emerald-500/40 text-emerald-300",
  },
  CREDENTIALLED: {
    label: "CREDENTIALLED",
    className: "bg-blue-500/15 border-blue-500/40 text-blue-300",
  },
  DEMONSTRATED: {
    label: "DEMONSTRATED",
    className: "bg-violet-500/15 border-violet-500/40 text-violet-300",
  },
  DEVELOPING: {
    label: "DEVELOPING",
    className: "bg-yellow-500/15 border-yellow-500/40 text-yellow-300",
  },
  CLAIMED: {
    label: "CLAIMED",
    className: "bg-slate-500/15 border-slate-500/40 text-slate-300",
  },
}

function EvidenceBadge({ level }: { level: EvidenceLevel }) {
  const cfg = EVIDENCE_CONFIG[level]
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${cfg.className}`}>
      {cfg.label}
    </span>
  )
}

// ─── Skill Evidence Row ───────────────────────────────────────────────────────
function SkillRow({ skill, index }: { skill: SkillEvidence; index: number }) {
  const evidenceItems: { key: keyof SkillEvidence["evidence"]; label: string }[] = [
    { key: "resume", label: "Resume" },
    { key: "certificate", label: "Cert" },
    { key: "project", label: "Project" },
    { key: "assessment", label: "Assessment" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.05 * index }}
      className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl bg-white/5 border border-border hover:border-primary/30 transition-colors"
    >
      <div className="flex-1 min-w-0">
        <p className="font-medium text-white">{skill.skill}</p>
      </div>
      <EvidenceBadge level={skill.level} />
      <div className="flex items-center gap-3">
        {evidenceItems.map(({ key, label }) => (
          <div key={key} className="flex flex-col items-center gap-0.5">
            {skill.evidence[key] ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <X className="w-4 h-4 text-muted-foreground/40" />
            )}
            <span className="text-[10px] text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function ProfileStat({
  icon: Icon, label, value, color, index,
}: {
  icon: React.FC<{ className?: string }>
  label: string
  value: string | number
  color: string
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      className="p-5 rounded-2xl bg-white/5 border border-border"
    >
      <div className={`inline-flex p-2 rounded-lg mb-3 ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProfilePage() {
  const candidate = DEMO_CANDIDATE

  return (
    <div className="p-6 lg:p-8 min-h-screen">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/dashboard" className="flex items-center gap-1 hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> Dashboard
        </Link>
        <span>/</span>
        <span className="text-primary">Career Profile</span>
      </div>

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-background to-secondary/10 border border-primary/30 mb-6 overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center relative">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary p-[2px] shrink-0">
            <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
              <UserCircle className="w-10 h-10 text-primary" />
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white">{candidate.name}</h1>
            <p className="text-muted-foreground mt-1">{candidate.headline}</p>
            <div className="flex items-center gap-2 mt-2">
              <Target className="w-4 h-4 text-secondary" />
              <span className="text-sm text-secondary font-medium">{candidate.targetRole}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-1 uppercase tracking-widest">Career Readiness</p>
            <p className="text-4xl font-black text-primary">{candidate.careerReadiness}%</p>
          </div>
        </div>
        <p className="mt-4 text-muted-foreground text-sm leading-relaxed relative">{candidate.bio}</p>
      </motion.div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <ProfileStat icon={Rocket} label="Career Readiness" value={`${candidate.careerReadiness}%`} color="bg-primary/20 text-primary" index={0} />
        <ProfileStat icon={BadgeCheck} label="Verified Skills" value={candidate.verifiedSkillsCount} color="bg-emerald-500/20 text-emerald-400" index={1} />
        <ProfileStat icon={Code} label="Projects" value={candidate.projectsCount} color="bg-violet-500/20 text-violet-400" index={2} />
        <ProfileStat icon={BookOpen} label="Certificates" value={candidate.certificatesCount} color="bg-blue-500/20 text-blue-400" index={3} />
      </div>

      {/* Overall Readiness Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-5 rounded-2xl bg-white/5 border border-border mb-8"
      >
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-white">Overall Career Readiness</p>
          <p className="text-sm font-bold text-primary">{candidate.careerReadiness}%</p>
        </div>
        <Progress value={candidate.careerReadiness} className="h-3" />
      </motion.div>

      {/* Skills Section */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Verified Skills</h2>
        <div className="space-y-3">
          {candidate.skills.map((skill, i) => (
            <SkillRow key={skill.skill} skill={skill} index={i} />
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 p-4 rounded-xl bg-white/5 border border-border">
          <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-widest">Evidence Level Legend</p>
          <div className="flex flex-wrap gap-2">
            {(Object.entries(EVIDENCE_CONFIG) as [EvidenceLevel, typeof EVIDENCE_CONFIG[EvidenceLevel]][]).map(
              ([level, cfg]) => (
                <span key={level} className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${cfg.className}`}>
                  {cfg.label}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
