"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ShieldCheck, ChevronRight, ArrowRightLeft } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface NavItem {
  href: string
  icon: LucideIcon
  label: string
}

interface PortalSidebarProps {
  navItems: NavItem[]
  portalLabel: string
  accentColor?: string
}

export function PortalSidebar({ navItems, portalLabel, accentColor = "text-primary" }: PortalSidebarProps) {
  const pathname = usePathname()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 flex-col z-40">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/40 via-[#0a0a0f]/95 to-[#0a0a0f]/95 backdrop-blur-xl border-r border-purple-500/20" />

      {/* Animated border highlight */}
      <div className="absolute top-0 right-0 w-px h-full overflow-hidden">
        <motion.div
          className="w-full h-32 bg-gradient-to-b from-transparent via-primary to-transparent"
          animate={{ y: ["-100%", "400%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 flex flex-col h-full p-4">
        {/* Logo */}
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
              <span className="text-xl font-bold text-foreground">EduSync</span>
              <div className={`text-xs font-medium ${accentColor}`}>{portalLabel}</div>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
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
                      isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
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
                    <item.icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                    <span className={`font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                      {item.label}
                    </span>
                    <ChevronRight className={`w-4 h-4 ml-auto transition-all ${isActive ? "text-primary opacity-100" : "opacity-0"}`} />
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </nav>

        {/* Switch Role */}
        <motion.div
          className="mt-auto pt-4 border-t border-purple-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/switch-role"
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-muted/50 border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-all text-sm font-medium"
          >
            <ArrowRightLeft className="w-4 h-4" />
            Switch Portal
          </Link>
        </motion.div>
      </div>
    </aside>
  )
}
