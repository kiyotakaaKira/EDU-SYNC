"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Code, Loader2, ArrowLeft, Clock, Star, TrendingUp, CheckCircle2, Sparkles, Zap } from "lucide-react"
import Link from "next/link"

// Parse JSON from text response
function parseJSONFromText(text: string): any {
  try {
    // First, try to find JSON in code blocks
    const codeBlockMatch = text.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/)
    if (codeBlockMatch) {
      return JSON.parse(codeBlockMatch[1])
    }
    
    // Try to find JSON object directly
    const jsonMatch = text.match(/\{[\s\S]*"suggested_projects"[\s\S]*\}/)
    if (jsonMatch) {
      // Try to fix common JSON issues
      let jsonStr = jsonMatch[0]
      // Remove trailing commas before closing braces/brackets
      jsonStr = jsonStr.replace(/,(\s*[}\]])/g, '$1')
      return JSON.parse(jsonStr)
    }
    
    // Try parsing the entire text
    return JSON.parse(text)
  } catch (e) {
    console.log('JSON parse error:', e)
    return null
  }
}

// Format project suggestions
function ProjectSuggestions({ projects, mode }: { projects: any[], mode: string }) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return 'from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-400'
      case 'intermediate':
        return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30 text-yellow-400'
      case 'advanced':
        return 'from-red-500/20 to-rose-500/20 border-red-500/30 text-red-400'
      default:
        return 'from-blue-500/20 to-purple-500/20 border-blue-500/30 text-blue-400'
    }
  }

  const getPortfolioValueColor = (value: string) => {
    switch (value?.toLowerCase()) {
      case 'high':
        return 'text-purple-400'
      case 'medium':
        return 'text-pink-400'
      case 'low':
        return 'text-blue-400'
      default:
        return 'text-muted-foreground'
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
          <Sparkles className="h-5 w-5 text-purple-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Suggested Projects
          </h3>
          <p className="text-sm text-muted-foreground">Select a project to get started</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-6">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-950/40 via-background to-pink-950/30 backdrop-blur-sm hover:border-purple-500/40 transition-all cursor-pointer"
          >
            {/* Animated glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10" />
            
            {/* Content */}
            <div className="p-6 space-y-4 relative">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center shrink-0">
                      <span className="text-lg">🚀</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-pink-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all mb-1">
                        {project.title}
                      </h4>
                      <div className={`inline-flex px-2.5 py-1 rounded-md text-xs font-semibold bg-gradient-to-br ${getDifficultyColor(project.difficulty)} border`}>
                        {project.difficulty?.toUpperCase() || 'BEGINNER'}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mt-2">{project.description}</p>
                </div>
              </div>

              {/* Tech Stack */}
              {project.tech_stack && Array.isArray(project.tech_stack) && project.tech_stack.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-purple-300 flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech_stack.map((tech: string, techIdx: number) => (
                      <motion.span
                        key={techIdx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 + techIdx * 0.05 }}
                        className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-medium hover:bg-blue-500/20 hover:border-blue-500/50 transition-colors"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Reinforced */}
              {project.skills_reinforced && Array.isArray(project.skills_reinforced) && project.skills_reinforced.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-pink-300 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Skills Reinforced
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.skills_reinforced.map((skill: string, skillIdx: number) => (
                      <motion.span
                        key={skillIdx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 + skillIdx * 0.05 }}
                        className="px-3 py-1.5 rounded-lg bg-pink-500/10 border border-pink-500/30 text-pink-300 text-sm flex items-center gap-1.5 hover:bg-pink-500/20 hover:border-pink-500/50 transition-colors"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {project.estimated_hours && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 + 0.2 }}
                    className="group/stat flex items-center gap-3 p-3.5 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 hover:border-purple-500/40 hover:from-purple-500/15 hover:to-purple-600/10 transition-all cursor-default"
                  >
                    <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 group-hover/stat:scale-110 transition-transform">
                      <Clock className="h-4 w-4 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Estimated Time</p>
                      <p className="text-base font-bold text-purple-300">{project.estimated_hours} hours</p>
                    </div>
                  </motion.div>
                )}
                {project.portfolio_value && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 + 0.25 }}
                    className="group/stat flex items-center gap-3 p-3.5 rounded-xl bg-gradient-to-br from-pink-500/10 to-pink-600/5 border border-pink-500/20 hover:border-pink-500/40 hover:from-pink-500/15 hover:to-pink-600/10 transition-all cursor-default"
                  >
                    <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500/20 to-pink-600/10 border border-pink-500/30 group-hover/stat:scale-110 transition-transform">
                      <Star className="h-4 w-4 text-pink-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Portfolio Value</p>
                      <p className={`text-base font-bold capitalize ${getPortfolioValueColor(project.portfolio_value)}`}>
                        {project.portfolio_value}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Why This Project */}
              {project.why_this_project && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.1 + 0.3 }}
                  className="pt-4 mt-4 border-t border-purple-500/20"
                >
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5 border border-purple-500/10">
                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 shrink-0">
                      <Zap className="h-4 w-4 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-purple-300 mb-1">Why this project?</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{project.why_this_project}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Format text response with markdown
function FormattedText({ text }: { text: string }) {
  // Clean up the text first - remove JSON blocks and markdown artifacts
  let cleanedText = text
    .replace(/```json[\s\S]*?```/g, '') // Remove JSON code blocks
    .replace(/```[\s\S]*?```/g, '') // Remove other code blocks
    .replace(/\*\*Suggested Projects:\*\*/g, '') // Remove markdown headers
    .replace(/I'd be happy to help you with that!/gi, '')
    .replace(/Based on your input.*?here are.*?:/gi, '')
    .replace(/Please select one of these projects.*?/gi, '')
    .replace(/Which project would you like to start with\?/gi, '')
    .trim()

  // Split by paragraphs
  const sections = cleanedText.split('\n\n').filter(s => s.trim() && s.length > 10)
  
  if (sections.length === 0) {
    return null
  }
  
  return (
    <div className="space-y-4">
      {sections.map((section, idx) => {
        const trimmed = section.trim()
        if (!trimmed || trimmed.length < 10) return null

        // Headers
        if (trimmed.startsWith('## ')) {
          return (
            <motion.h3
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mt-6 mb-4"
            >
              {trimmed.replace('## ', '')}
            </motion.h3>
          )
        }
        if (trimmed.startsWith('### ')) {
          return (
            <motion.h4
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="text-xl font-bold text-pink-300 mt-4 mb-3"
            >
              {trimmed.replace('### ', '')}
            </motion.h4>
          )
        }

        // Lists
        if (trimmed.includes('- ') || trimmed.includes('* ') || /^\d+\.\s/.test(trimmed)) {
          const items = trimmed.split('\n').filter(line => 
            line.trim().startsWith('-') || 
            line.trim().startsWith('*') || 
            /^\d+\.\s/.test(line.trim())
          )
          return (
            <motion.ul
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="space-y-2 ml-4"
            >
              {items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-pink-400 font-bold mt-1 flex-shrink-0">•</span>
                  <span className="leading-relaxed">{item.trim().replace(/^[-*\d+\.]\s*/, '')}</span>
                </li>
              ))}
            </motion.ul>
          )
        }

        // Regular paragraphs
        return (
          <motion.p
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="text-muted-foreground leading-relaxed"
          >
            {trimmed}
          </motion.p>
        )
      })}
    </div>
  )
}

export default function ProjectsPage() {
  const [skill, setSkill] = useState("")
  const [level, setLevel] = useState("beginner")
  const [mode, setMode] = useState("guide")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("/api/project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skill, level, mode }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate project")
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
              <Code className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300 uppercase tracking-wider">
                Real Projects
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Build Real Projects
            </h1>
            <p className="text-muted-foreground text-lg">
              Work on portfolio-worthy projects with intelligent mentorship every step of the way.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="mb-8"
          >
            <div className="rounded-2xl glass-panel border-blue-500/20 p-6 space-y-4">
              <div>
                <label htmlFor="skill" className="block text-sm font-medium mb-2">
                  What skill are you building a project for?
                </label>
                <input
                  id="skill"
                  type="text"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  placeholder="e.g., React, Python, Machine Learning..."
                  className="w-full px-4 py-3 rounded-xl bg-background border border-blue-500/20 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  required
                />
              </div>
              <div>
                <label htmlFor="level" className="block text-sm font-medium mb-2">
                  Project Level
                </label>
                <select
                  id="level"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-blue-500/20 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label htmlFor="mode" className="block text-sm font-medium mb-2">
                  Assistance Mode
                </label>
                <select
                  id="mode"
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-blue-500/20 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="guide">Guide - Step-by-step guidance</option>
                  <option value="suggest">Suggest - Project ideas</option>
                </select>
                <p className="text-xs text-muted-foreground mt-1">
                  {mode === "guide" 
                    ? "Get detailed step-by-step instructions to build your project"
                    : "Receive project ideas and suggestions tailored to your skill level"}
                </p>
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-500 hover:via-purple-500 hover:to-blue-500 text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Project...
                  </>
                ) : (
                  "Get Project Guidance"
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
              className="space-y-6"
            >
              <div className="rounded-2xl glass-panel border-blue-500/20 p-8">
                <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Your Project {mode === "guide" ? "Guidance" : "Suggestions"}
                </h2>
                <p className="text-muted-foreground mb-6">
                  For {skill} • {level?.toUpperCase()} • {mode === "guide" ? "Step-by-step Guide" : "Project Ideas"}
                </p>

                {result.answer && (() => {
                  // Try to parse JSON from the response
                  const parsedData = parseJSONFromText(result.answer)
                  
                  // Check if we have project suggestions
                  if (parsedData && parsedData.suggested_projects && Array.isArray(parsedData.suggested_projects) && parsedData.suggested_projects.length > 0) {
                    return (
                      <div className="space-y-6">
                        {/* Welcome message */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-5 rounded-xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 border border-purple-500/20 backdrop-blur-sm"
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 shrink-0">
                              <Sparkles className="h-5 w-5 text-purple-400" />
                            </div>
                            <div>
                              <p className="text-foreground font-medium mb-1">Ready to build something amazing?</p>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                Here are {parsedData.suggested_projects.length} project {parsedData.suggested_projects.length === 1 ? 'idea' : 'ideas'} tailored to your {level} level in {skill}.
                              </p>
                            </div>
                          </div>
                        </motion.div>
                        
                        <ProjectSuggestions projects={parsedData.suggested_projects} mode={mode} />
                        
                        {/* Call to action */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="p-5 rounded-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20 backdrop-blur-sm"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                              <Zap className="h-5 w-5 text-blue-400" />
                            </div>
                            <div className="flex-1">
                              <p className="text-foreground font-semibold mb-1">Ready to start building?</p>
                              <p className="text-sm text-muted-foreground">
                                Select a project above to receive detailed step-by-step guidance and start your learning journey!
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    )
                  }
                  
                  // Otherwise, format as text
                  return <FormattedText text={result.answer} />
                })()}
              </div>

              {/* Quick Tips Card */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-xl p-6 bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30"
                >
                  <p className="text-2xl mb-2">🎯</p>
                  <p className="font-semibold text-white mb-2">Project Focus</p>
                  <p className="text-sm text-muted-foreground">Build real-world projects to strengthen your {skill} skills</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="rounded-xl p-6 bg-gradient-to-br from-pink-600/20 to-rose-600/20 border border-pink-500/30"
                >
                  <p className="text-2xl mb-2">📚</p>
                  <p className="font-semibold text-white mb-2">Learn by Doing</p>
                  <p className="text-sm text-muted-foreground">Practical experience is the best way to master any skill</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="rounded-xl p-6 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border border-purple-500/30"
                >
                  <p className="text-2xl mb-2">🚀</p>
                  <p className="font-semibold text-white mb-2">Portfolio Ready</p>
                  <p className="text-sm text-muted-foreground">Create projects worthy of your professional portfolio</p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
