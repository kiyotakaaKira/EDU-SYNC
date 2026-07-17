"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, Building2, ArrowLeft, CheckCircle2, Send, Star } from "lucide-react"
import Link from "next/link"
import { SEEDED_ALUMNI } from "@/lib/seed/alumni"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function ReferralsPage() {
  const { toast } = useToast()
  const [sentRequests, setSentRequests] = useState<Set<string>>(new Set())
  const [sending, setSending] = useState<string | null>(null)

  // Note: referral requests are stored in React state for the session.
  // This makes them immediately visible in the Alumni portal (9C) when
  // the alumni portal reads from the same in-memory context/seed.
  // In production, this would insert a row into Supabase `referrals` table.

  const handleRequestReferral = async (alumniId: string, alumniName: string) => {
    setSending(alumniId)
    await new Promise((r) => setTimeout(r, 900)) // simulate network
    setSentRequests((prev) => new Set([...prev, alumniId]))
    setSending(null)
    toast({
      title: "Referral request sent!",
      description: `Your request has been sent to ${alumniName}. They'll review your Referral Passport.`,
    })
  }

  return (
    <div className="p-6 lg:p-8 min-h-screen">
      <Toaster />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/dashboard" className="flex items-center gap-1 hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> Dashboard
        </Link>
        <span>/</span>
        <span className="text-primary">Alumni Referrals</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary to-secondary">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Find Alumni Referrers</h1>
        </div>
        <p className="text-muted-foreground">
          Connect with alumni at your target companies who can refer you. Matches are based on career domain, role similarity, and referral availability.
        </p>
      </div>

      {/* Alumni Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {SEEDED_ALUMNI.map((alumni, i) => {
          const isSent = sentRequests.has(alumni.id)
          const isSending = sending === alumni.id

          return (
            <motion.div
              key={alumni.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col p-6 rounded-2xl bg-gradient-to-br from-primary/5 via-background to-secondary/5 border border-border hover:border-primary/30 transition-all"
            >
              {/* Avatar + Name */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary p-[2px] shrink-0">
                  <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">{alumni.avatarInitials}</span>
                  </div>
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-white">{alumni.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">{alumni.title}</p>
                  <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
                    <Building2 className="w-3 h-3 shrink-0" />
                    {alumni.company} · Class of {alumni.graduationYear}
                  </div>
                </div>
              </div>

              {/* Match + Domain */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/15 border border-primary/30">
                  <Star className="w-3 h-3 text-primary" />
                  <span className="text-xs font-bold text-primary">{alumni.careerMatchPercent}% Career Match</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{alumni.domain}</p>

              {/* Referral Availability */}
              {alumni.referralAvailable ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium mb-4 self-start">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Referral Available
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-500/15 border border-slate-500/30 text-slate-400 text-xs font-medium mb-4 self-start">
                  Referral Paused
                </span>
              )}

              {/* CTA */}
              <div className="mt-auto">
                {isSent ? (
                  <div className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    Request Sent
                  </div>
                ) : (
                  <motion.button
                    onClick={() => alumni.referralAvailable && handleRequestReferral(alumni.id, alumni.name)}
                    disabled={!alumni.referralAvailable || isSending}
                    whileHover={alumni.referralAvailable ? { scale: 1.02 } : {}}
                    whileTap={alumni.referralAvailable ? { scale: 0.98 } : {}}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      alumni.referralAvailable
                        ? "bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20"
                        : "bg-white/5 border border-border text-muted-foreground cursor-not-allowed opacity-50"
                    }`}
                  >
                    {isSending ? (
                      <motion.div
                        className="w-4 h-4 border-2 border-primary/40 border-t-primary rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    {isSending ? "Sending…" : "Request Referral"}
                  </motion.button>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
