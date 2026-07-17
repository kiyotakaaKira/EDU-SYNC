"use client"

import { motion } from "framer-motion"
import { Users, CheckCircle2, Heart } from "lucide-react"
import { StatsCard } from "@/components/dashboard/stats-card"

export default function AlumniOverviewPage() {
  return (
    <div className="p-6 lg:p-8 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Alumni Overview</h1>
        <p className="text-muted-foreground mt-1">Your referral activity and impact at a glance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatsCard icon={Users} label="Pending Referral Requests" value={3} subValue="Awaiting your review" color="primary" index={0} />
        <StatsCard icon={CheckCircle2} label="Accepted Referrals" value={12} subValue="+2 this month" color="secondary" index={1} />
        <StatsCard icon={Heart} label="Students Helped" value={12} subValue="Total connections made" color="indigo" index={2} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 rounded-2xl bg-gradient-to-br from-secondary/10 via-background to-primary/10 border border-border"
      >
        <h2 className="text-lg font-bold text-white mb-2">Welcome back, Arjun Kumar 👋</h2>
        <p className="text-muted-foreground text-sm">
          You have <strong className="text-white">3 pending referral requests</strong> from students targeting TechCorp.
          Review their Referral Passports to make an informed decision.
        </p>
        <a href="/alumni/requests" className="inline-flex items-center gap-1.5 mt-4 px-4 py-2.5 rounded-xl bg-primary/10 border border-primary/30 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
          Review Requests →
        </a>
      </motion.div>
    </div>
  )
}
