"use client"

import { motion } from "framer-motion"
import { ShieldCheck } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative border-t border-purple-500/20 py-12 overflow-hidden"
    >
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/30"
            >
              <ShieldCheck className="h-4 w-4 text-white" />
            </motion.div>
            <span className="text-lg font-bold text-foreground">
              EduSync
            </span>
          </Link>

          <div className="flex items-center gap-8">
            {["Privacy", "Terms", "Contact"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-sm text-muted-foreground hover:text-purple-400 transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">© 2026 EduSync. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  )
}
