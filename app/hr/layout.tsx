"use client"

import type React from "react"
import { PortalSidebar } from "@/components/dashboard/portal-sidebar"
import { DashboardMobileNav } from "@/components/dashboard/mobile-nav"
import { LayoutDashboard, Briefcase, Search, UserCheck, GitBranch } from "lucide-react"

const hrNav = [
  { href: "/hr", icon: LayoutDashboard, label: "Overview" },
  { href: "/hr/jobs", icon: Briefcase, label: "Jobs" },
  { href: "/hr/talent", icon: Search, label: "Talent Discovery" },
  { href: "/hr/shortlisted", icon: UserCheck, label: "Shortlisted" },
  { href: "/hr/pipeline", icon: GitBranch, label: "Hiring Pipeline" },
]

export default function HRLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      <DashboardMobileNav />
      <PortalSidebar navItems={hrNav} portalLabel="HR Portal" accentColor="text-emerald-400" />
      <main className="lg:pl-72 pt-16 lg:pt-0 min-h-screen">{children}</main>
    </div>
  )
}
