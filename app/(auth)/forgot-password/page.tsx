"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, ArrowRight, CheckCircle } from "lucide-react"
import { AuthCard } from "@/components/auth/auth-card"
import { AuthInput } from "@/components/auth/auth-input"
import { AuthButton } from "@/components/auth/auth-button"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const supabase = getSupabaseBrowserClient()
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/reset-password`,
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
        subtitle="Password reset link sent"
        footerText="Remember your password?"
        footerLink="/login"
        footerLinkText="Sign in"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="flex flex-col items-center gap-4 py-4"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <p className="text-center text-muted-foreground">
            We&apos;ve sent a password reset link to <strong>{email}</strong>. Check your inbox!
          </p>
        </motion.div>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Reset Password"
      subtitle="Enter your email to receive a reset link"
      footerText="Remember your password?"
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
          icon={Mail}
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <AuthButton isLoading={isLoading}>
          Send Reset Link <ArrowRight className="w-5 h-5" />
        </AuthButton>
      </form>
    </AuthCard>
  )
}
