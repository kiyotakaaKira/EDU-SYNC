"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Chrome, Github, Loader2 } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

export function SocialAuth() {
  const [loadingProvider, setLoadingProvider] = useState<"google" | "github" | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleOAuthSignIn = async (provider: "google" | "github") => {
    setLoadingProvider(provider)
    setError(null)

    try {
      const supabase = getSupabaseBrowserClient()
      if (!supabase) {
        setError("Supabase is not configured")
        setLoadingProvider(null)
        return
      }

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        setError(error.message)
        setLoadingProvider(null)
      }
    } catch {
      setError("An unexpected error occurred")
      setLoadingProvider(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <span className="relative px-4 text-sm text-muted-foreground bg-transparent">or continue with</span>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm text-center"
        >
          {error}
        </motion.div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <motion.button
          type="button"
          onClick={() => handleOAuthSignIn("google")}
          disabled={loadingProvider !== null}
          whileHover={{ scale: loadingProvider ? 1 : 1.02, y: loadingProvider ? 0 : -2 }}
          whileTap={{ scale: loadingProvider ? 1 : 0.98 }}
          className="relative flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-secondary/50 border border-border hover:border-primary/50 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
        >
          {/* Glow effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20" />
          </div>

          {loadingProvider === "google" ? (
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
          ) : (
            <Chrome className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          )}
          <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            Google
          </span>
        </motion.button>

        <motion.button
          type="button"
          onClick={() => handleOAuthSignIn("github")}
          disabled={loadingProvider !== null}
          whileHover={{ scale: loadingProvider ? 1 : 1.02, y: loadingProvider ? 0 : -2 }}
          whileTap={{ scale: loadingProvider ? 1 : 0.98 }}
          className="relative flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-secondary/50 border border-border hover:border-primary/50 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
        >
          {/* Glow effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20" />
          </div>

          {loadingProvider === "github" ? (
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
          ) : (
            <Github className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          )}
          <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            GitHub
          </span>
        </motion.button>
      </div>
    </div>
  )
}
