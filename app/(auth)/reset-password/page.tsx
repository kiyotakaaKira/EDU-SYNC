"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Lock, ArrowRight, CheckCircle } from "lucide-react"
import { AuthCard } from "@/components/auth/auth-card"
import { AuthInput } from "@/components/auth/auth-input"
import { AuthButton } from "@/components/auth/auth-button"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if we have a session from the reset link
    const supabase = getSupabaseBrowserClient()
    if (supabase) {
      supabase.auth.onAuthStateChange(async (event: string) => {
        if (event === "PASSWORD_RECOVERY") {
          // User is in password recovery mode
        }
      })
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters")
      setIsLoading(false)
      return
    }

    try {
      const supabase = getSupabaseBrowserClient()
      const { error } = await supabase.auth.updateUser({
        password,
      })

      if (error) {
        setError(error.message)
      } else {
        setSuccess(true)
        setTimeout(() => {
          router.push("/login")
        }, 3000)
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
        title="Password Updated"
        subtitle="Your password has been reset"
        footerText="Redirecting to login..."
        footerLink="/login"
        footerLinkText="Go now"
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
            Your password has been successfully reset. You&apos;ll be redirected to login shortly.
          </p>
        </motion.div>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="New Password"
      subtitle="Create a new secure password"
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
          icon={Lock}
          type="password"
          name="password"
          placeholder="Create a new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <AuthInput
          icon={Lock}
          type="password"
          name="confirmPassword"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {/* Password match indicator */}
        {confirmPassword && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex items-center gap-2 text-sm ${
              password === confirmPassword ? "text-green-500" : "text-red-500"
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${password === confirmPassword ? "bg-green-500" : "bg-red-500"}`} />
            {password === confirmPassword ? "Passwords match" : "Passwords do not match"}
          </motion.div>
        )}

        <AuthButton isLoading={isLoading}>
          Update Password <ArrowRight className="w-5 h-5" />
        </AuthButton>
      </form>
    </AuthCard>
  )
}
