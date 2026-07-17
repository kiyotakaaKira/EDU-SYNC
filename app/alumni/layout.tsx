"use client"

import type React from "react"
import { PortalSidebar } from "@/components/dashboard/portal-sidebar"
import { DashboardMobileNav } from "@/components/dashboard/mobile-nav"
import { LayoutDashboard, Users, UserSearch } from "lucide-react"

const alumniNav = [
  { href: "/alumni", icon: LayoutDashboard, label: "Overview" },
  { href: "/alumni/requests", icon: Users, label: "Referral Requests" },
  { href: "/alumni/candidates", icon: UserSearch, label: "Candidates" },
]

export default function AlumniLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      <DashboardMobileNav />
      <PortalSidebar navItems={alumniNav} portalLabel="Alumni Portal" accentColor="text-secondary" />
      <main className="lg:pl-72 pt-16 lg:pt-0 min-h-screen">{children}</main>
    </div>
  )
}
