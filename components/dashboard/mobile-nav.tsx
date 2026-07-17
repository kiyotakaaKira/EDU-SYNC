"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, LayoutDashboard, UserCircle, FileSearch, BadgeCheck, Briefcase, Users, LogOut, ShieldCheck, UserSearch, GitBranch, Search, UserCheck } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import type { User as SupabaseUser } from "@supabase/supabase-js"

const studentNav = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/profile", icon: UserCircle, label: "Career Profile" },
  { href: "/dashboard/resume-analyzer", icon: FileSearch, label: "Resume Analyzer" },
  { href: "/dashboard/credential-fit", icon: BadgeCheck, label: "CredentialFit" },
  { href: "/dashboard/opportunities", icon: Briefcase, label: "Opportunities" },
  { href: "/dashboard/referrals", icon: Users, label: "Referrals" },
]

const alumniNav = [
  { href: "/alumni", icon: LayoutDashboard, label: "Overview" },
  { href: "/alumni/requests", icon: Users, label: "Referral Requests" },
  { href: "/alumni/candidates", icon: UserSearch, label: "Candidates" },
]

const hrNav = [
  { href: "/hr", icon: LayoutDashboard, label: "Overview" },
  { href: "/hr/jobs", icon: Briefcase, label: "Jobs" },
  { href: "/hr/talent", icon: Search, label: "Talent Discovery" },
  { href: "/hr/shortlisted", icon: UserCheck, label: "Shortlisted" },
  { href: "/hr/pipeline", icon: GitBranch, label: "Hiring Pipeline" },
]

export function DashboardMobileNav({ user }: { user?: SupabaseUser | null }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = getSupabaseBrowserClient()
    if (supabase) {
      await supabase.auth.signOut()
      router.push("/")
    }
  }

  let navItems = studentNav
  let portalLabel = "Student Portal"
  
  if (pathname.startsWith("/alumni")) {
    navItems = alumniNav
    portalLabel = "Alumni Portal"
  } else if (pathname.startsWith("/hr")) {
    navItems = hrNav
    portalLabel = "HR Portal"
  }

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 z-50 glass-panel border-b border-border bg-background/80 backdrop-blur-md">
        <div className="flex items-center justify-between h-full px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary p-[2px]">
              <div className="w-full h-full rounded-lg bg-background flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-primary" />
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-foreground">EduSync</span>
              <span className="text-[10px] text-primary font-medium">{portalLabel}</span>
            </div>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg bg-primary/10 border border-primary/20"
          >
            {isOpen ? <X className="w-5 h-5 text-primary" /> : <Menu className="w-5 h-5 text-primary" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-16 right-0 bottom-0 w-72 z-50 bg-background/95 backdrop-blur-xl border-l border-border p-4 flex flex-col"
            >
              {/* User Info */}
              {user && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 mb-6 shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary p-[2px]">
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                      <span className="text-sm font-bold text-foreground">{user.email?.charAt(0).toUpperCase()}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{user.user_metadata?.name || user.email?.split("@")[0]}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>
              )}

              {/* Nav Items */}
              <div className="space-y-2 flex-1 overflow-y-auto">
                {navItems.map((item) => {
                  const isActive = pathname === item.href || (item.href !== "/dashboard" && item.href !== "/alumni" && item.href !== "/hr" && pathname.startsWith(item.href))
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <item.icon className={`w-5 h-5 ${isActive ? "text-primary" : ""}`} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  )
                })}
              </div>

              {/* Switch Portal & Logout */}
              <div className="mt-4 shrink-0 space-y-2 border-t border-border pt-4">
                <Link
                  href="/switch-role"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground font-medium"
                >
                  Switch Portal
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
