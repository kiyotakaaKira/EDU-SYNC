"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CheckCircle, Loader2, ArrowLeft, Check, X, TrendingUp, Star } from "lucide-react"
import Link from "next/link"

function parseJSONResponse(text: string): any {
  try {
    // Try to extract JSON from code blocks if present
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1] || jsonMatch[0])
    }
    return JSON.parse(text)
  } catch {
    return null
  }
}

function FormattedResult({ result }: { result: any }) {
  let parsedData: any = null
  let rawText = result.answer || result.output || ""

  // Try to parse JSON from the response
  if (rawText) {
    parsedData = parseJSONResponse(rawText)
  }

  // If we have parsed data, display it formatted
  if (parsedData && typeof parsedData === 'object') {
    return (
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              {parsedData.skill_name || "Skill Validation"}
            </h3>
            {parsedData.validation_summary && (
              <p className="text-muted-foreground leading-relaxed">
                {parsedData.validation_summary}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {parsedData.is_valid !== undefined && (
              <div className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                parsedData.is_valid 
                  ? 'bg-green-500/10 border border-green-500/30 text-green-400' 
                  : 'bg-red-500/10 border border-red-500/30 text-red-400'
              }`}>
                {parsedData.is_valid ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <X className="h-4 w-4" />
                )}
                <span className="font-medium">
                  {parsedData.is_valid ? 'Valid' : 'Not Valid'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {parsedData.demand_level && (
            <div className="rounded-xl glass-panel border-purple-500/20 p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <TrendingUp className="h-4 w-4" />
                <span>Demand Level</span>
              </div>
              <div className={`text-lg font-bold capitalize ${
                parsedData.demand_level === 'high' ? 'text-green-400' :
                parsedData.demand_level === 'medium' ? 'text-yellow-400' :
                'text-red-400'
              }`}>
                {parsedData.demand_level}
              </div>
            </div>
          )}
          {parsedData.confidence_score !== undefined && (
            <div className="rounded-xl glass-panel border-purple-500/20 p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Star className="h-4 w-4" />
                <span>Confidence Score</span>
              </div>
              <div className="text-lg font-bold text-purple-400">
                {parsedData.confidence_score}%
              </div>
            </div>
          )}
        </div>

        {/* Pros and Cons */}
        {parsedData.reasons && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {parsedData.reasons.pros && parsedData.reasons.pros.length > 0 && (
              <div className="rounded-xl glass-panel border-green-500/20 p-5">
                <h4 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  Pros
                </h4>
                <ul className="space-y-2">
                  {parsedData.reasons.pros.map((pro: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {parsedData.reasons.cons && parsedData.reasons.cons.length > 0 && (
              <div className="rounded-xl glass-panel border-red-500/20 p-5">
                <h4 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                  <X className="h-5 w-5" />
                  Cons
                </h4>
                <ul className="space-y-2">
                  {parsedData.reasons.cons.map((con: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                      <X className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Alternatives */}
        {parsedData.alternatives && parsedData.alternatives.length > 0 && (
          <div className="rounded-xl glass-panel border-blue-500/20 p-5">
            <h4 className="text-lg font-bold text-blue-400 mb-4">Alternative Skills</h4>
            <div className="flex flex-wrap gap-2">
              {parsedData.alternatives.map((alt: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm"
                >
                  {alt}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Fallback to formatted text display
  return (
    <div className="text-foreground whitespace-pre-wrap leading-relaxed">
      {rawText}
    </div>
  )
}

export default function SkillsPage() {
  const [skill, setSkill] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("/api/skill/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skill }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to validate skill")
      }

      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-6">
              <CheckCircle className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300 uppercase tracking-wider">
                Validated Skills
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Validate Your Skills
            </h1>
            <p className="text-muted-foreground text-lg">
              AI analyzes market demand to recommend skills actually worth learning.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="mb-8"
          >
            <div className="rounded-2xl glass-panel border-purple-500/20 p-6 space-y-4">
              <div>
                <label htmlFor="skill" className="block text-sm font-medium mb-2">
                  Enter a skill you want to validate
                </label>
                <input
                  id="skill"
                  type="text"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  placeholder="e.g., React, Python, Machine Learning..."
                  className="w-full px-4 py-3 rounded-xl bg-background border border-purple-500/20 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-500 hover:via-pink-500 hover:to-purple-500 text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Validating...
                  </>
                ) : (
                  "Validate Skill"
                )}
              </Button>
            </div>
          </motion.form>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl glass-panel border-red-500/20 bg-red-500/10 p-6 mb-8"
            >
              <p className="text-red-400">{error}</p>
            </motion.div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl glass-panel border-purple-500/20 p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Validation Result
              </h2>
              <FormattedResult result={result} />
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
