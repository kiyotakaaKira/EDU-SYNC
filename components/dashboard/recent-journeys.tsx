"use client"

import { motion } from "framer-motion"
import { BookOpen, Play, Clock, Target, Sparkles } from "lucide-react"
import Link from "next/link"

const mockItems = [
  {
    id: "1",
    title: "Frontend Developer Resume",
    type: "Analysis",
    progress: 85,
    metric1: "Score: 85%",
    metric2: "Missing: 2 skills",
    time: "Last updated 2 days ago",
    score: 85,
  },
  {
    id: "2",
    title: "React Certification",
    type: "Verification",
    progress: 40,
    metric1: "Status: Pending",
    metric2: "Wait: ~1 day",
    time: "Uploaded yesterday",
    score: 40,
  },
  {
    id: "3",
    title: "Google SWE Referral",
    type: "Referral",
    progress: 10,
    metric1: "Status: Matching",
    metric2: "Alumni: 4 available",
    time: "Requested 5 hours ago",
    score: 10,
  },
]

export function RecentJourneys() {
  if (mockItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10 backdrop-blur-sm border border-border text-center"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">No Pending Actions</h3>
            <p className="text-gray-400">You are all caught up on your career readiness tasks!</p>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Pending Action Items
        </h2>
        <Link href="/dashboard/action-items" className="text-sm text-primary hover:text-primary/80 transition-colors">
          View All
        </Link>
      </div>

      <div className="grid gap-4">
        {mockItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            whileHover={{ scale: 1.01, x: 4 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative p-5 rounded-xl bg-gradient-to-br from-primary/10 via-background to-secondary/10 backdrop-blur-sm border border-border overflow-hidden">
              <div className="absolute inset-0 overflow-hidden rounded-xl">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary/10 to-transparent"
                  initial={{ width: 0 }}
                  animate={{ width: `${item.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                />
              </div>

              <div className="relative flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 border border-primary/40 flex flex-col items-center justify-center">
                    <span className="text-xs text-primary">SCORE</span>
                    <span className="text-lg font-bold text-white">{item.score}</span>
                  </div>
                  {item.progress >= 80 && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-secondary/20 border border-secondary/40 flex items-center justify-center"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <Sparkles className="w-3 h-3 text-secondary" />
                    </motion.div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white truncate">{item.title}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-primary/20 text-xs text-primary">
                      {item.type}
                    </span>
                  </div>

                  <div className="relative h-2 bg-black/40 rounded-full overflow-hidden mb-2">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-secondary to-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${item.progress}%` }}
                      transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: index * 0.3 }}
                    />
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {item.metric1}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.metric2}
                    </span>
                    <span className="text-primary">{item.time}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/25"
                >
                  <Play className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
