"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useRole, type DemoRole } from "@/lib/context/role-context"
import { GraduationCap, Users, Building2, CheckCircle2 } from "lucide-react"

const roles: { role: DemoRole; icon: React.FC<{className?: string}>; label: string; description: string; destination: string; color: string }[] = [
  {
    role: "student",
    icon: GraduationCap,
    label: "Student",
    description: "Verify skills, analyze resume, find referrals",
    destination: "/dashboard",
    color: "from-primary to-primary/60",
  },
  {
    role: "alumni",
    icon: Users,
    label: "Alumni",
    description: "Review referral requests, mentor students",
    destination: "/alumni",
    color: "from-secondary to-secondary/60",
  },
  {
    role: "hr",
    icon: Building2,
    label: "HR / Recruiter",
    description: "Discover verified talent, manage hiring pipeline",
    destination: "/hr",
    color: "from-emerald-600 to-teal-600",
  },
]

export default function SwitchRolePage() {
  const { role: currentRole, setRole } = useRole()
  const router = useRouter()

  const handleSelect = (r: DemoRole, destination: string) => {
    setRole(r)
    router.push(destination)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-medium mb-4">
            🎭 Demo Role Switcher — not a production auth mechanism
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Select Portal</h1>
          <p className="text-muted-foreground">
            EduSync serves three roles in one platform. Choose which portal to enter.
          </p>
        </div>

        <div className="space-y-4">
          {roles.map((r, i) => {
            const isActive = currentRole === r.role
            return (
              <motion.button
                key={r.role}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(r.role, r.destination)}
                className={`w-full flex items-center gap-5 p-5 rounded-2xl border text-left transition-all ${
                  isActive
                    ? "border-primary/50 bg-primary/10"
                    : "border-border bg-white/5 hover:border-border hover:bg-white/10"
                }`}
              >
                <div className={`p-3 rounded-xl bg-gradient-to-br ${r.color} shrink-0`}>
                  <r.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-white">{r.label}</p>
                  <p className="text-sm text-muted-foreground">{r.description}</p>
                </div>
                {isActive && <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />}
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
