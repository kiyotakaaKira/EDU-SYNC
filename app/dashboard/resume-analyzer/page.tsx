"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FileText,
  Briefcase,
  Upload,
  X,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  BarChart3,
  Lightbulb,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

// ─── Types ────────────────────────────────────────────────────────────────────
interface ResumeAnalysisResult {
  missingSkills: string[]
  presentSkills: string[]
  score: number
  suggestions: string[]
  keywordGaps: string[]
}

// ─── Sub-component: File Upload Panel ─────────────────────────────────────────
function UploadPanel({
  label,
  icon: Icon,
  accept,
  file,
  onFileSelect,
  onClear,
  description,
}: {
  label: string
  icon: React.FC<{ className?: string }>
  accept: string
  file: File | null
  onFileSelect: (f: File) => void
  onClear: () => void
  description: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const dropped = e.dataTransfer.files[0]
    if (dropped) onFileSelect(dropped)
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-white font-semibold">
        <Icon className="w-5 h-5 text-primary" />
        <span>{label}</span>
      </div>
      <p className="text-sm text-muted-foreground -mt-2">{description}</p>

      {!file ? (
        <motion.div
          whileHover={{ scale: 1.01 }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className="relative flex flex-col items-center justify-center gap-3 p-10 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 hover:border-primary/60 hover:bg-primary/10 cursor-pointer transition-all duration-300"
        >
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Upload className="w-10 h-10 text-primary/60" />
          </motion.div>
          <p className="text-sm text-muted-foreground text-center">
            Drag & drop or <span className="text-primary font-medium">browse</span> to upload
          </p>
          <p className="text-xs text-muted-foreground/60">{accept.replace(/\./g, "").toUpperCase()} supported</p>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) onFileSelect(f)
            }}
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-4 p-4 rounded-xl bg-primary/10 border border-primary/30"
        >
          <div className="p-3 rounded-lg bg-primary/20">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{file.name}</p>
            <p className="text-xs text-muted-foreground">
              {(file.size / 1024).toFixed(1)} KB
            </p>
          </div>
          <button
            onClick={onClear}
            className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </div>
  )
}

// ─── Sub-component: Result Card ────────────────────────────────────────────────
function ResultCard({ result }: { result: ResumeAnalysisResult }) {
  const scoreColor =
    result.score >= 75
      ? "from-emerald-500 to-teal-500"
      : result.score >= 50
        ? "from-yellow-500 to-orange-500"
        : "from-rose-500 to-pink-500"

  const scoreLabel =
    result.score >= 75 ? "Strong Match" : result.score >= 50 ? "Moderate Match" : "Needs Work"

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 mt-8"
    >
      {/* Score Banner */}
      <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-primary/10 via-background to-secondary/10 border border-primary/30">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="flex items-center gap-6">
          <div className="relative">
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                strokeWidth="10"
                strokeLinecap="round"
                stroke="url(#scoreGrad)"
                strokeDasharray={`${2 * Math.PI * 40}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - result.score / 100) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--primary)" />
                  <stop offset="100%" stopColor="var(--secondary)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">{result.score}%</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1 uppercase tracking-widest">Resume Match Score</p>
            <p className={`text-2xl font-bold bg-gradient-to-r ${scoreColor} bg-clip-text text-transparent`}>
              {scoreLabel}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {result.presentSkills.length} skills matched · {result.missingSkills.length} gaps found
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Missing Skills */}
        <div className="p-5 rounded-2xl bg-rose-500/5 border border-rose-500/20">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-rose-400" />
            <h3 className="font-semibold text-white">Missing Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.missingSkills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-medium"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Present Skills */}
        <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h3 className="font-semibold text-white">Skills You Have</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.presentSkills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Keyword Gaps */}
      {result.keywordGaps.length > 0 && (
        <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-yellow-400" />
            <h3 className="font-semibold text-white">ATS Keyword Gaps</h3>
            <span className="text-xs text-muted-foreground">(keywords in the JD missing from your resume)</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.keywordGaps.map((kw, i) => (
              <motion.span
                key={kw}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="px-3 py-1 rounded-full bg-yellow-500/15 border border-yellow-500/30 text-yellow-300 text-xs font-medium"
              >
                {kw}
              </motion.span>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      <div className="p-5 rounded-2xl bg-primary/5 border border-primary/20">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-secondary" />
          <h3 className="font-semibold text-white">AI-Powered Suggestions</h3>
        </div>
        <ul className="space-y-3">
          {result.suggestions.map((s, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              className="flex items-start gap-3 text-sm text-muted-foreground"
            >
              <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              {s}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function ResumeAnalyzerPage() {
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [jdFile, setJdFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<ResumeAnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const canAnalyze = resumeFile && jdFile && !isLoading

  const handleAnalyze = async () => {
    if (!resumeFile || !jdFile) return
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append("resume", resumeFile)
      formData.append("jobDescription", jdFile)

      const res = await fetch("/api/resume-analysis", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Analysis failed. Please try again.")
      }

      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6 lg:p-8 min-h-screen">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/dashboard" className="flex items-center gap-1 hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Dashboard
        </Link>
        <span>/</span>
        <span className="text-primary">Resume Analyzer</span>
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary to-secondary">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Resume Gap Analyzer</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Upload your resume and a target job description. Our AI will identify missing skills, keyword gaps, and give you a personalized readiness score.
        </p>
      </div>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-primary/5 via-background to-secondary/5 border border-border"
      >
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-primary/40 rounded-tl-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-secondary/40 rounded-br-2xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Resume Upload */}
          <UploadPanel
            label="Your Resume"
            icon={FileText}
            accept=".pdf,.docx,.txt"
            file={resumeFile}
            onFileSelect={setResumeFile}
            onClear={() => setResumeFile(null)}
            description="Upload your current resume in PDF, DOCX, or TXT format."
          />

          {/* Job Description Upload */}
          <UploadPanel
            label="Target Job Description"
            icon={Briefcase}
            accept=".pdf,.docx,.txt"
            file={jdFile}
            onFileSelect={setJdFile}
            onClear={() => setJdFile(null)}
            description="Upload the job description you are targeting (PDF, DOCX, or TXT)."
          />
        </div>

        {/* Analyze Button */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <motion.button
            id="analyze-btn"
            onClick={handleAnalyze}
            disabled={!canAnalyze}
            whileHover={canAnalyze ? { scale: 1.03 } : {}}
            whileTap={canAnalyze ? { scale: 0.97 } : {}}
            className={`relative inline-flex items-center gap-3 px-10 py-4 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 ${
              canAnalyze
                ? "cursor-pointer"
                : "cursor-not-allowed opacity-40"
            }`}
          >
            {/* Button background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-[gradient-shift_4s_ease_infinite]" />
            {/* Shimmer */}
            {canAnalyze && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                animate={{ x: ["-200%", "200%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              />
            )}
            <span className="relative flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              {isLoading ? "Analyzing…" : "Analyze My Resume"}
            </span>
          </motion.button>

          {!resumeFile || !jdFile ? (
            <p className="text-xs text-muted-foreground">Upload both files to enable analysis</p>
          ) : null}
        </div>
      </motion.div>

      {/* Loading State */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-8 flex flex-col items-center gap-6 py-12"
          >
            <div className="relative w-20 h-20">
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-primary/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="text-white font-semibold text-lg">AI is analyzing your resume…</p>
              <p className="text-muted-foreground text-sm max-w-sm">
                Comparing skills, identifying keyword gaps, and generating your readiness score. This takes a few seconds.
              </p>
            </div>

            {/* Animated progress steps */}
            <div className="flex items-center gap-3">
              {["Parsing documents", "Extracting skills", "Scoring match", "Generating insights"].map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {step}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error State */}
      <AnimatePresence>
        {error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 flex items-center gap-3 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300"
          >
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {result && !isLoading && (
          <ResultCard key="result" result={result} />
        )}
      </AnimatePresence>
    </div>
  )
}
