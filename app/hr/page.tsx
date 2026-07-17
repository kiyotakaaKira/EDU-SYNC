"use client"

import { motion } from "framer-motion"
import { Briefcase, Users, UserCheck, CalendarCheck } from "lucide-react"
import { StatsCard } from "@/components/dashboard/stats-card"
import { SEEDED_JOBS } from "@/lib/seed/jobs"
import { DEMO_CANDIDATE } from "@/lib/seed/candidate"
import { calculateOpportunityFit } from "@/lib/scoring/opportunity-fit"
import Link from "next/link"

const PIPELINE_COUNTS = { DISCOVERED: 8, SHORTLISTED: 5, INTERVIEW: 3, SELECTED: 2, HIRED: 1 }

export default function HROverviewPage() {
  const firstJob = SEEDED_JOBS[0]
  const candidateFit = calculateOpportunityFit(DEMO_CANDIDATE, firstJob)

  return (
    <div className="p-6 lg:p-8 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">HR Overview</h1>
        <p className="text-muted-foreground mt-1">EduSync surfaces verified talent, ranked for each specific role.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard icon={Briefcase} label="Active Jobs" value={4} subValue="3 with candidates" color="primary" index={0} />
        <StatsCard icon={Users} label="Matched Talent" value={128} subValue="Across all roles" color="secondary" index={1} />
        <StatsCard icon={UserCheck} label="Shortlisted" value={18} subValue="+3 this week" color="indigo" index={2} />
        <StatsCard icon={CalendarCheck} label="Interviews" value={7} subValue="Scheduled" color="blue" index={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Jobs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-6 rounded-2xl bg-white/5 border border-border">
          <h2 className="text-lg font-bold text-white mb-4">Active Jobs</h2>
          <div className="space-y-3">
            {SEEDED_JOBS.map((j) => (
              <Link key={j.id} href="/hr/jobs" className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-border hover:border-primary/30 transition-colors">
                <div>
                  <p className="text-sm font-medium text-white">{j.title}</p>
                  <p className="text-xs text-muted-foreground">{j.company} · {j.experienceLevel}</p>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">Active</span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Hiring Pipeline Overview */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-6 rounded-2xl bg-white/5 border border-border">
          <h2 className="text-lg font-bold text-white mb-4">Pipeline Overview</h2>
          <div className="space-y-3">
            {Object.entries(PIPELINE_COUNTS).map(([stage, count]) => (
              <div key={stage} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-28 shrink-0">{stage}</span>
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(count / 10) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
                <span className="text-xs font-bold text-white w-4">{count}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <h3 className="text-sm font-semibold text-white mb-3">Recent Candidate Matches</h3>
            <Link href={`/hr/talent/${DEMO_CANDIDATE.id}`} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-border hover:border-primary/30 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-white">AJ</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">{DEMO_CANDIDATE.name}</p>
                <p className="text-xs text-muted-foreground">{firstJob.title} — {candidateFit.opportunityFit}% fit</p>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
