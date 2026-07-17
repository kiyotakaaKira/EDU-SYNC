"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

interface AuthButtonProps {
  children: React.ReactNode
  isLoading?: boolean
  type?: "submit" | "button"
  onClick?: () => void
}

export function AuthButton({ children, isLoading = false, type = "submit", onClick }: AuthButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative w-full py-4 rounded-xl font-semibold text-white overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed group"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary animate-gradient" />

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
        animate={{ x: ["0%", "200%"] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear", repeatDelay: 1 }}
      />

      {/* Glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50 blur-xl" />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing...
          </>
        ) : (
          children
        )}
      </span>
    </motion.button>
  )
}
