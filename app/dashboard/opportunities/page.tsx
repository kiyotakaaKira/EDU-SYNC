"use client"

import { motion } from "framer-motion"
import { Briefcase, MapPin, Users, ArrowRight, Star, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { SEEDED_JOBS } from "@/lib/seed/jobs"
import { DEMO_CANDIDATE } from "@/lib/seed/candidate"
import { calculateOpportunityFit } from "@/lib/scoring/opportunity-fit"
import { Progress } from "@/components/ui/progress"

export default function OpportunitiesPage() {
  const candidate = DEMO_CANDIDATE

  return (
    <div className="p-6 lg:p-8 min-h-screen">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/dashboard" className="flex items-center gap-1 hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> Dashboard
        </Link>
        <span>/</span>
        <span className="text-primary">Opportunities</span>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary to-secondary">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Opportunities</h1>
        </div>
        <p className="text-muted-foreground">
          Jobs matched to your verified profile. Click any card to see your detailed fit analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {SEEDED_JOBS.map((job, i) => {
          const fit = calculateOpportunityFit(candidate, job)

          return (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative flex flex-col p-6 rounded-2xl bg-gradient-to-br from-primary/5 via-background to-secondary/5 border border-border hover:border-primary/40 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{job.company}</p>
                  <h3 className="text-lg font-bold text-white">{job.title}</h3>
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {job.location}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-primary">{fit.opportunityFit}%</p>
                  <p className="text-xs text-muted-foreground">Fit Score</p>
                </div>
              </div>

              {/* Progress */}
              <Progress value={fit.opportunityFit} className="h-2 mb-4" />

              {/* Meta chips */}
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-border text-xs text-muted-foreground">
                  <Star className="w-3 h-3 text-primary" /> {job.skillMatch} skills
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/5 border border-border text-xs text-muted-foreground">
                  {job.experienceLevel}
                </span>
                {job.referralAvailable && (
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
                    <Users className="w-3 h-3" /> Referral Available
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="mt-auto flex gap-2">
                <Link
                  href={`/dashboard/opportunities/${job.id}`}
                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary/10 border border-primary/30 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                >
                  Analyze Opportunity <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
