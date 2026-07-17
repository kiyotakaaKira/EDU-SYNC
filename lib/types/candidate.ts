// ─── Candidate Profile Types ──────────────────────────────────────────────────
// CANONICAL shape — reused by student profile, alumni referral passport, and HR
// candidate view. Do NOT create a second shape downstream; import from here.

export type EvidenceLevel = "CLAIMED" | "CREDENTIALLED" | "DEMONSTRATED" | "VALIDATED" | "DEVELOPING"

export interface SkillEvidence {
  skill: string
  level: EvidenceLevel
  evidence: {
    resume: boolean
    certificate: boolean
    project: boolean
    assessment: boolean
  }
}

export interface CandidateProfile {
  id: string
  name: string
  headline: string
  targetRole: string
  bio: string
  careerReadiness: number
  verifiedSkillsCount: number
  projectsCount: number
  certificatesCount: number
  skills: SkillEvidence[]
}
