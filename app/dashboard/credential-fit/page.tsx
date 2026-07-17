"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BadgeCheck, Upload, X, Sparkles, AlertCircle, CheckCircle2,
  ExternalLink, ChevronRight, ArrowLeft, Shield, ShieldAlert, ShieldOff
} from "lucide-react"
import Link from "next/link"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { SEEDED_JOBS } from "@/lib/seed/jobs"
import type { CredentialFitResult } from "@/lib/types/credential-fit"

// ─── Verification Status Badge ────────────────────────────────────────────────
function VerificationBadge({ status }: { status: CredentialFitResult["verificationStatus"] }) {
  if (status === "VERIFIED") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-sm font-semibold">
        <Shield className="w-4 h-4" /> VERIFIED
      </span>
    )
  }
  if (status === "PARTIALLY_VERIFIED") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-500/15 border border-yellow-500/40 text-yellow-300 text-sm font-semibold">
        <ShieldAlert className="w-4 h-4" /> PARTIALLY VERIFIED
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/40 text-rose-300 text-sm font-semibold">
      <ShieldOff className="w-4 h-4" /> UNABLE TO VERIFY
    </span>
  )
}

// ─── Impact Badge ─────────────────────────────────────────────────────────────
function ImpactBadge({ impact }: { impact: "HIGH" | "MEDIUM" | "LOW" }) {
  const config = {
    HIGH: "bg-emerald-500/15 border-emerald-500/40 text-emerald-300",
    MEDIUM: "bg-yellow-500/15 border-yellow-500/40 text-yellow-300",
    LOW: "bg-slate-500/15 border-slate-500/40 text-slate-300",
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config[impact]}`}>
      {impact} IMPACT
    </span>
  )
}

// ─── Result Card ──────────────────────────────────────────────────────────────
function ResultCard({ result }: { result: CredentialFitResult }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 space-y-5"
    >
      {/* Transparency caption */}
      <div className="flex items-start gap-2 p-3 rounded-xl bg-primary/5 border border-primary/20 text-xs text-muted-foreground">
        <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        EduSync evaluates <strong className="text-foreground mx-1">trust</strong> and
        <strong className="text-foreground mx-1">job relevance</strong> separately —
        a valid certificate can still be <strong className="text-foreground mx-1">low-relevance</strong> for a specific role.
      </div>

      <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 via-background to-secondary/5 border border-border">
        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-xs text-muted-foreground mb-1 uppercase tracking-widest">Certificate</p>
            <h3 className="text-xl font-bold text-white">{result.certificateTitle}</h3>
            <p className="text-sm text-muted-foreground mt-1">{result.issuer}</p>
          </div>
          <VerificationBadge status={result.verificationStatus} />
        </div>

        {/* Label/Value pairs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 p-4 rounded-xl bg-white/5 border border-border">
          {[
            { label: "Issue Date", value: result.issueDate },
            { label: "Certificate ID", value: result.certificateId || "—" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-sm text-white font-medium">{value}</p>
            </div>
          ))}
          {result.verificationUrl && (
            <div className="sm:col-span-2">
              <p className="text-xs text-muted-foreground">Verification URL</p>
              <a
                href={result.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                {result.verificationUrl} <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="mb-6">
          <p className="text-xs text-muted-foreground mb-2 uppercase tracking-widest">Skills Covered</p>
          <div className="flex flex-wrap gap-2">
            {result.skills.map((s) => (
              <span key={s} className="px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-medium">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Job Relevance */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-white">Job Relevance</p>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">{result.jobRelevance}%</span>
              <ImpactBadge impact={result.impact} />
            </div>
          </div>
          <Progress value={result.jobRelevance} className="h-3" />
        </div>

        {/* Explanation */}
        <div className="p-4 rounded-xl bg-white/5 border border-border">
          <div className="flex items-start gap-2">
            <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">{result.explanation}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────
function ResultSkeleton() {
  return (
    <div className="mt-8 space-y-4">
      <Skeleton className="h-4 w-full rounded-xl" />
      <div className="p-6 rounded-2xl border border-border space-y-4">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-32" />
        <div className="grid grid-cols-2 gap-3">
          <Skeleton className="h-10 rounded-xl" />
          <Skeleton className="h-10 rounded-xl" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-7 w-20 rounded-full" />
          <Skeleton className="h-7 w-24 rounded-full" />
          <Skeleton className="h-7 w-16 rounded-full" />
        </div>
        <Skeleton className="h-3 w-full rounded-full" />
        <Skeleton className="h-12 rounded-xl" />
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CredentialFitPage() {
  const [targetJobId, setTargetJobId] = useState(SEEDED_JOBS[0].id)
  const [certFile, setCertFile] = useState<File | null>(null)
  const [certText, setCertText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<CredentialFitResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const selectedJob = SEEDED_JOBS.find((j) => j.id === targetJobId) ?? SEEDED_JOBS[0]

  const canAnalyze = (certFile || certText.trim().length > 10) && !isLoading

  const handleAnalyze = async () => {
    if (!canAnalyze) return
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const payload = {
        certificateText: certText || (certFile ? `File: ${certFile.name}` : ""),
        targetJobId,
      }
      const res = await fetch("/api/credential-fit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Analysis failed.")
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const f = e.dataTransfer.files[0]
    if (f) setCertFile(f)
  }

  return (
    <div className="p-6 lg:p-8 min-h-screen max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/dashboard" className="flex items-center gap-1 hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> Dashboard
        </Link>
        <span>/</span>
        <span className="text-primary">CredentialFit AI</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary to-secondary">
            <BadgeCheck className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">CredentialFit AI</h1>
        </div>
        <p className="text-muted-foreground">
          Verify your certificate's authenticity AND its relevance to a specific job — because a real certificate can still be low-relevance.
        </p>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-primary/5 via-background to-secondary/5 border border-border space-y-6"
      >
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-primary/40 rounded-tl-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-secondary/40 rounded-br-2xl pointer-events-none" />

        {/* 1. Target Job */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">Target Job</label>
          <Select value={targetJobId} onValueChange={setTargetJobId}>
            <SelectTrigger id="target-job-select" className="w-full bg-background border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SEEDED_JOBS.map((j) => (
                <SelectItem key={j.id} value={j.id}>
                  {j.title} @ {j.company}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground mt-1">
            Required skills: {selectedJob.requiredSkills.join(", ")}
          </p>
        </div>

        {/* 2. Certificate Input */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-white">Certificate</label>

          {/* File drop zone */}
          {!certFile ? (
            <motion.div
              whileHover={{ scale: 1.01 }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              className="flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 hover:border-primary/60 hover:bg-primary/10 cursor-pointer transition-all"
            >
              <motion.div animate={{ y: [-4, 4, -4] }} transition={{ duration: 2, repeat: Infinity }}>
                <Upload className="w-9 h-9 text-primary/60" />
              </motion.div>
              <p className="text-sm text-muted-foreground text-center">
                Drag & drop or <span className="text-primary font-medium">browse</span> certificate image/PDF
              </p>
              <input
                ref={fileRef}
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) setCertFile(f) }}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-primary/10 border border-primary/30"
            >
              <BadgeCheck className="w-5 h-5 text-primary shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{certFile.name}</p>
                <p className="text-xs text-muted-foreground">{(certFile.size / 1024).toFixed(1)} KB</p>
              </div>
              <button onClick={() => setCertFile(null)} className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* Fallback textarea */}
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5">
              Or paste certificate details (title, issuer, date, ID, skills)
            </label>
            <Textarea
              id="cert-text-input"
              placeholder="e.g. AWS Certified Cloud Practitioner, Amazon Web Services, Issued: Jan 2024, ID: ABC-123, Skills: AWS, Cloud Computing, Deployment..."
              value={certText}
              onChange={(e) => setCertText(e.target.value)}
              className="min-h-[100px] bg-background border-border resize-none"
            />
          </div>
        </div>

        {/* 3. CTA */}
        <div className="flex flex-col items-center gap-3">
          <Button
            id="analyze-cert-btn"
            onClick={handleAnalyze}
            disabled={!canAnalyze}
            className="relative px-10 py-6 text-base font-semibold rounded-xl overflow-hidden bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%] animate-[gradient-shift_4s_ease_infinite] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            {isLoading ? "Analyzing…" : "Analyze Certificate"}
          </Button>
          {!canAnalyze && (
            <p className="text-xs text-muted-foreground">Upload a certificate or paste details to continue</p>
          )}
        </div>
      </motion.div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            key="err"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 flex items-center gap-3 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300"
          >
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading skeleton */}
      {isLoading && <ResultSkeleton />}

      {/* Results */}
      <AnimatePresence>
        {result && !isLoading && <ResultCard key="result" result={result} />}
      </AnimatePresence>
    </div>
  )
}
