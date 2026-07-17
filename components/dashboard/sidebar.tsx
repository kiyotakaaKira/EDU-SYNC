"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { LayoutDashboard, UserCircle, FileSearch, BadgeCheck, Briefcase, Users, LogOut, ShieldCheck, ChevronRight } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import type { User as SupabaseUser } from "@supabase/supabase-js"

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/profile", icon: UserCircle, label: "Career Profile" },
  { href: "/dashboard/resume-analyzer", icon: FileSearch, label: "Resume Analyzer" },
  { href: "/dashboard/credential-fit", icon: BadgeCheck, label: "CredentialFit" },
  { href: "/dashboard/opportunities", icon: Briefcase, label: "Opportunities" },
  { href: "/dashboard/referrals", icon: Users, label: "Referrals" },
]

export function DashboardSidebar({ user }: { user: SupabaseUser }) {
  const pathname = usePathname()
  const router = useRouter()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const handleLogout = async () => {
    const supabase = getSupabaseBrowserClient()
    if (supabase) {
      await supabase.auth.signOut()
      router.push("/")
    }
  }

  const readinessScore = 82

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 flex-col z-40">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/40 via-[#0a0a0f]/95 to-[#0a0a0f]/95 backdrop-blur-xl border-r border-purple-500/20" />

      <div className="absolute top-0 right-0 w-px h-full overflow-hidden">
        <motion.div
          className="w-full h-32 bg-gradient-to-b from-transparent via-primary to-transparent"
          animate={{ y: ["-100%", "400%"] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 flex flex-col h-full p-4">
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary p-[2px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
            </motion.div>
            <div>
              <span className="text-xl font-bold text-foreground">
                EduSync
              </span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>Verified Talent Platform</span>
              </div>
            </div>
          </Link>

          <motion.div
            className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent backdrop-blur-sm border border-primary/20 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-foreground text-sm">Career Readiness</span>
              <span className="text-sm text-primary font-bold">{readinessScore}%</span>
            </div>

            <div className="relative h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${readinessScore}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href
            const isHovered = hoveredItem === item.href

            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link
                  href={item.href}
                  onMouseEnter={() => setHoveredItem(item.href)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="relative block"
                >
                  <motion.div
                    className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full"
                          initial={{ opacity: 0, scaleY: 0 }}
                          animate={{ opacity: 1, scaleY: 1 }}
                          exit={{ opacity: 0, scaleY: 0 }}
                        />
                      )}
                    </AnimatePresence>

                    <div className="relative">
                      <item.icon
                        className={`w-5 h-5 transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`}
                      />
                    </div>

                    <span className={`font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>{item.label}</span>

                    <ChevronRight
                      className={`w-4 h-4 ml-auto transition-all ${
                        isActive ? "text-primary opacity-100" : "text-muted-foreground opacity-0 group-hover:opacity-100"
                      }`}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </nav>

        <motion.div
          className="mt-auto pt-4 border-t border-purple-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border mb-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary p-[2px]">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                  <span className="text-sm font-bold text-foreground">{user.email?.charAt(0).toUpperCase() || "U"}</span>
                </div>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-background" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {user.user_metadata?.name || user.email?.split("@")[0] || "User"}
              </p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>

          <motion.button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive hover:bg-destructive/20 transition-all group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span className="font-medium">Logout</span>
          </motion.button>
        </motion.div>
      </div>
    </aside>
  )
}
