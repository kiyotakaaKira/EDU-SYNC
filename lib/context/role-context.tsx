"use client"

import React, { createContext, useContext, useState } from "react"

export type DemoRole = "student" | "alumni" | "hr"

interface RoleContextValue {
  role: DemoRole
  setRole: (r: DemoRole) => void
}

const RoleContext = createContext<RoleContextValue>({ role: "student", setRole: () => {} })

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<DemoRole>("student")
  return <RoleContext.Provider value={{ role, setRole }}>{children}</RoleContext.Provider>
}

export function useRole() {
  return useContext(RoleContext)
}
