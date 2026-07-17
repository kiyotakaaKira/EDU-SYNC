// ─── CredentialFit Types ──────────────────────────────────────────────────────

export interface CredentialFitResult {
  verificationStatus: "VERIFIED" | "PARTIALLY_VERIFIED" | "UNABLE_TO_VERIFY"
  certificateTitle: string
  issuer: string
  issueDate: string
  certificateId: string
  verificationUrl?: string
  skills: string[]
  jobRelevance: number
  impact: "HIGH" | "MEDIUM" | "LOW"
  explanation: string
}
