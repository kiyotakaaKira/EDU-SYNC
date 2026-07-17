import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { PipelineProvider } from "@/lib/context/pipeline-context"
import { RoleProvider } from "@/lib/context/role-context"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "EduSync — From Skill Claims to Verified Careers",
  description:
    "AI-powered verified-talent, career-readiness, alumni-referral, and hiring ecosystem. Verify your skills, analyze your resume, and connect with alumni who can refer you.",
}

export const viewport: Viewport = {
  themeColor: "#0d1117",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <RoleProvider>
          <PipelineProvider>
            {children}
          </PipelineProvider>
        </RoleProvider>
      </body>
    </html>
  )
}
