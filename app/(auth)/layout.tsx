import type React from "react"
import { AuthBackground } from "@/components/auth/auth-background"
import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <AuthBackground />

      {/* Logo */}
      <Link href="/" className="absolute top-8 left-8 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center font-bold text-white shadow-lg">
            E
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            EduSync
          </span>
        </div>
      </Link>

      <div className="relative z-10">{children}</div>
    </div>
  )
}
