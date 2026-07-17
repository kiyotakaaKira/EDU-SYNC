"use client"

import { Rocket, BookOpen, Clock, Zap } from "lucide-react"
import { StatsCard } from "@/components/dashboard/stats-card"
import { StartJourneyCard } from "@/components/dashboard/start-journey-card"
import { RecentJourneys } from "@/components/dashboard/recent-journeys"
import { AchievementsPanel } from "@/components/dashboard/achievements-panel"

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-8 min-h-screen">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-purple-400">Home</span>
        </div>
        <h1 className="text-3xl font-bold text-white">
          Welcome back,{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Student
          </span>
        </h1>
        <p className="text-muted-foreground mt-1">Track your career readiness, verify skills, and apply.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard icon={Rocket} label="Resume Match Score" value="85%" subValue="Highly matched" color="primary" index={0} />
        <StatsCard
          icon={BookOpen}
          label="Verified Certificates"
          value={4}
          subValue="+1 this week"
          color="secondary"
          index={1}
        />
        <StatsCard icon={Clock} label="Pending Referrals" value="2" subValue="Awaiting response" color="blue" index={2} />
        <StatsCard icon={Zap} label="Upcoming Interviews" value="1" subValue="Next in 3 days" color="indigo" index={3} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Start Journey & Recent Journeys */}
        <div className="lg:col-span-2 space-y-6">
          <StartJourneyCard />
          <RecentJourneys />
        </div>

        {/* Right Column - Achievements */}
        <div className="space-y-6">
          <AchievementsPanel />
        </div>
      </div>
    </div>
  )
}
