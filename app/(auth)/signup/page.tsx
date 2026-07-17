"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Mail, Lock, User, ArrowRight, CheckCircle } from "lucide-react"
import { AuthCard } from "@/components/auth/auth-card"
import { AuthInput } from "@/components/auth/auth-input"
import { AuthButton } from "@/components/auth/auth-button"
import { SocialAuth } from "@/components/auth/social-auth"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const supabase = getSupabaseBrowserClient()
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
          data: {
            full_name: name,
          },
        },
      })

      if (error) {
        setError(error.message)
      } else {
        setSuccess(true)
      }
    } catch {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <AuthCard
        title="Check Your Email"
        subtitle="We've sent you a confirmation link"
        footerText="Already verified?"
        footerLink="/login"
        footerLinkText="Sign in"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="flex flex-col items-center gap-4 py-4"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <p className="text-muted-foreground text-center text-sm">
            Click the link in your email to activate your account and start your career readiness journey!
          </p>
        </motion.div>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Get Verified"
      subtitle="Create an account to unlock your career readiness"
      footerText="Already have an account?"
      footerLink="/login"
      footerLinkText="Sign in"
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
          icon={User}
          type="text"
          name="name"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Password strength indicator */}
        <div className="space-y-2">
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((level) => (
              <motion.div
                key={level}
                className={`h-1 flex-1 rounded-full ${
                  password.length >= level * 3
                    ? level <= 1
                      ? "bg-red-500"
                      : level <= 2
                        ? "bg-yellow-500"
                        : level <= 3
                          ? "bg-blue-500"
                          : "bg-green-500"
                    : "bg-secondary"
                }`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: password.length >= level * 3 ? 1 : 0.3 }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground">Use at least 8 characters with numbers and symbols</p>
        </div>

        <AuthButton isLoading={isLoading}>
          Create Account <ArrowRight className="w-5 h-5" />
        </AuthButton>

        <SocialAuth />
      </form>
    </AuthCard>
  )
}
