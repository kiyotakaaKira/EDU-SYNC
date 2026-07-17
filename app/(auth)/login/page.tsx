"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, Lock, ArrowRight } from "lucide-react"
import { AuthCard } from "@/components/auth/auth-card"
import { AuthInput } from "@/components/auth/auth-input"
import { AuthButton } from "@/components/auth/auth-button"
import { SocialAuth } from "@/components/auth/social-auth"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const supabase = getSupabaseBrowserClient()
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
      } else {
        router.push("/dashboard")
        router.refresh()
      }
    } catch {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Sign in to continue your career readiness journey"
      footerText="Don't have an account?"
      footerLink="/signup"
      footerLinkText="Create one"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm text-center"
          >
            {error}
          </motion.div>
        )}

        <AuthInput
          icon={Mail}
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <AuthInput
          icon={Lock}
          type="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
            Forgot password?
          </Link>
        </div>

        <AuthButton isLoading={isLoading}>
          Sign In <ArrowRight className="w-5 h-5" />
        </AuthButton>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or Demo Login</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-xl bg-primary/10 hover:bg-primary/20 text-primary transition-colors border border-primary/20"
          >
            Student Portal
          </button>
          <button
            type="button"
            onClick={() => router.push("/alumni")}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-xl bg-secondary/10 hover:bg-secondary/20 text-secondary transition-colors border border-secondary/20"
          >
            Alumni Portal
          </button>
          <button
            type="button"
            onClick={() => router.push("/hr")}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 transition-colors border border-emerald-500/20"
          >
            HR Portal
          </button>
          <button
            type="button"
            onClick={() => router.push("/switch-role")}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10"
          >
            Role Switcher
          </button>
        </div>

        <SocialAuth />
      </form>
    </AuthCard>
  )
}
