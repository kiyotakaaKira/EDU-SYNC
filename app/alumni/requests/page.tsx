"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, X, MessageSquare, Eye, Send } from "lucide-react"
import Link from "next/link"
import { DEMO_CANDIDATE } from "@/lib/seed/candidate"
import { SEEDED_JOBS } from "@/lib/seed/jobs"
import { calculateOpportunityFit } from "@/lib/scoring/opportunity-fit"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Textarea } from "@/components/ui/textarea"

// Seed the referral request created in 9A: Adithyan J → AI Engineer Intern @ TechCorp
const SEEDED_REQUESTS = [
  {
    id: "req-1",
    candidate: DEMO_CANDIDATE,
    jobId: "ai-engineer-intern-techcorp",
  },
]

type RequestStatus = "pending" | "referred" | "improvement_requested" | "declined"

export default function AlumniRequestsPage() {
  const { toast } = useToast()
  const [statuses, setStatuses] = useState<Record<string, RequestStatus>>({ "req-1": "pending" })
  const [feedbackOpen, setFeedbackOpen] = useState<string | null>(null)
  const [feedbackText, setFeedbackText] = useState("")

  const setStatus = (reqId: string, status: RequestStatus) => {
    setStatuses((prev) => ({ ...prev, [reqId]: status }))
  }

  const sendImprovement = (reqId: string, candidateName: string) => {
    setStatus(reqId, "improvement_requested")
    setFeedbackOpen(null)
    setFeedbackText("")
    toast({
      title: "Feedback sent",
      description: `Improvement request sent to ${candidateName}.`,
    })
  }

  return (
    <div className="p-6 lg:p-8 min-h-screen">
      <Toaster />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Referral Requests</h1>
        <p className="text-muted-foreground mt-1">
          Students requesting your referral. Review their job-specific Referral Passport before deciding.
        </p>
      </div>

      <div className="space-y-6">
        {SEEDED_REQUESTS.map((req) => {
          const job = SEEDED_JOBS.find((j) => j.id === req.jobId)!
          const fit = calculateOpportunityFit(req.candidate, job)
          const status = statuses[req.id]

          return (
            <motion.div
              key={req.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 via-background to-secondary/5 border border-border"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary p-[2px] shrink-0">
                  <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">AJ</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white text-lg">{req.candidate.name}</h3>
                  <p className="text-sm text-muted-foreground">{req.candidate.headline}</p>
                  <p className="text-sm text-primary mt-1 font-medium">{job.title} @ {job.company}</p>
                </div>
                <div className="flex items-center gap-4 text-center">
                  <div>
                    <p className="text-2xl font-black text-primary">{fit.opportunityFit}%</p>
                    <p className="text-xs text-muted-foreground">Referral Readiness</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-emerald-400">{req.candidate.verifiedSkillsCount}</p>
                    <p className="text-xs text-muted-foreground">Verified Skills</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-violet-400">{req.candidate.projectsCount}</p>
                    <p className="text-xs text-muted-foreground">Projects</p>
                  </div>
                </div>
              </div>

              {/* Status badge */}
              {status !== "pending" && (
                <div className={`mb-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${
                  status === "referred" ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300" :
                  status === "improvement_requested" ? "bg-yellow-500/15 border-yellow-500/40 text-yellow-300" :
                  "bg-rose-500/15 border-rose-500/40 text-rose-300"
                }`}>
                  {status === "referred" && "✓ Referred"}
                  {status === "improvement_requested" && "⟳ Improvement Requested"}
                  {status === "declined" && "✗ Declined"}
                </div>
              )}

              {/* Actions */}
              {status === "pending" && (
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/dashboard/opportunities/${req.jobId}/passport`}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary/10 border border-primary/30 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                  >
                    <Eye className="w-4 h-4" /> View Passport
                  </Link>
                  <button
                    onClick={() => { setStatus(req.id, "referred"); toast({ title: "Referral submitted!", description: `You referred ${req.candidate.name} for ${job.title}.` }) }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-sm font-medium hover:bg-emerald-500/25 transition-colors"
                  >
                    <Check className="w-4 h-4" /> Refer
                  </button>
                  <button
                    onClick={() => setFeedbackOpen(feedbackOpen === req.id ? null : req.id)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-yellow-500/15 border border-yellow-500/40 text-yellow-300 text-sm font-medium hover:bg-yellow-500/25 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" /> Request Improvement
                  </button>
                  <button
                    onClick={() => { setStatus(req.id, "declined"); toast({ title: "Request declined", description: "The candidate has been notified." }) }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-sm font-medium hover:bg-rose-500/25 transition-colors"
                  >
                    <X className="w-4 h-4" /> Decline
                  </button>
                </div>
              )}

              {/* Feedback textarea */}
              {feedbackOpen === req.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 space-y-3"
                >
                  <Textarea
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Please strengthen your CI/CD pipeline experience before requesting a referral."
                    className="min-h-[80px] bg-background border-border resize-none"
                  />
                  <button
                    onClick={() => sendImprovement(req.id, req.candidate.name)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-yellow-500/15 border border-yellow-500/40 text-yellow-300 text-sm font-medium hover:bg-yellow-500/25 transition-colors"
                  >
                    <Send className="w-4 h-4" /> Send Feedback
                  </button>
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
