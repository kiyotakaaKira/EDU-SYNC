"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useState } from "react"
import type { LucideIcon } from "lucide-react"

interface AuthInputProps {
  icon: LucideIcon
  type: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  name: string
  required?: boolean
}

export function AuthInput({ icon: Icon, type, placeholder, value, onChange, name, required = true }: AuthInputProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <motion.div className="relative" whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 400 }}>
      {/* Glow effect on focus */}
      <motion.div
        className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary to-secondary opacity-0 blur-sm"
        animate={{ opacity: isFocused ? 0.5 : 0 }}
        transition={{ duration: 0.2 }}
      />

      <div className="relative flex items-center">
        <div className="absolute left-4 text-muted-foreground">
          <Icon className="w-5 h-5" />
        </div>

        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          className="w-full pl-12 pr-4 py-4 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
        />
      </div>
    </motion.div>
  )
}
