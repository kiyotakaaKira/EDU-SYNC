import type { CandidateProfile } from "@/lib/types/candidate"
import type { Job } from "@/lib/seed/jobs"

// ─── Opportunity Fit Scoring ───────────────────────────────────────────────────
// Pure TypeScript — NO AI, NO black box. Each component is documented.
// Formula: opportunityFit = 0.35*skillMatch + 0.20*verifiedSkillEvidence +
//   0.15*credentialRelevance + 0.15*projectRelevance +
//   0.10*experienceMatch + 0.05*profileCompleteness
//
// All components are 0–100. Output is 0–100.
//
// IMPORTANT: This function never receives or uses name, gender, age, or any
// protected characteristic as input. Score is derived purely from skill overlap
// and evidence quality.

export interface FitBreakdown {
  skillMatch: number
  verifiedSkillEvidence: number
  credentialRelevance: number
  projectRelevance: number
  experienceMatch: number
  profileCompleteness: number
}

export interface OpportunityFitResult {
  opportunityFit: number
  breakdown: FitBreakdown
}

export function calculateOpportunityFit(
  candidate: CandidateProfile,
  job: Job
): OpportunityFitResult {
  const candidateSkillNames = candidate.skills.map((s) => s.skill.toLowerCase())
  const allJobSkills = [...job.requiredSkills, ...job.preferredSkills].map((s) => s.toLowerCase())
  const requiredSkills = job.requiredSkills.map((s) => s.toLowerCase())
  const preferredSkills = job.preferredSkills.map((s) => s.toLowerCase())

  // 1. skillMatch — weighted overlap: required skills are worth 1.5x preferred
  const requiredMatches = requiredSkills.filter((s) => candidateSkillNames.includes(s)).length
  const preferredMatches = preferredSkills.filter((s) => candidateSkillNames.includes(s)).length
  const totalWeightedSkills = requiredSkills.length * 1.5 + preferredSkills.length
  const skillMatch =
    totalWeightedSkills > 0
      ? Math.min(100, Math.round(((requiredMatches * 1.5 + preferredMatches) / totalWeightedSkills) * 100))
      : 0

  // 2. verifiedSkillEvidence — proportion of candidate skills at VALIDATED or CREDENTIALLED
  const highEvidenceSkills = candidate.skills.filter(
    (s) => s.level === "VALIDATED" || s.level === "CREDENTIALLED"
  ).length
  const verifiedSkillEvidence =
    candidate.skills.length > 0
      ? Math.round((highEvidenceSkills / candidate.skills.length) * 100)
      : 0

  // 3. credentialRelevance — fraction of job required skills backed by a certificate
  const certifiedSkills = candidate.skills
    .filter((s) => s.evidence.certificate)
    .map((s) => s.skill.toLowerCase())
  const certifiedRelevantCount = requiredSkills.filter((s) => certifiedSkills.includes(s)).length
  const credentialRelevance =
    requiredSkills.length > 0
      ? Math.round((certifiedRelevantCount / requiredSkills.length) * 100)
      : 0

  // 4. projectRelevance — fraction of job required skills backed by a project
  const projectSkills = candidate.skills
    .filter((s) => s.evidence.project)
    .map((s) => s.skill.toLowerCase())
  const projectRelevantCount = allJobSkills.filter((s) => projectSkills.includes(s)).length
  const projectRelevance =
    allJobSkills.length > 0
      ? Math.round((projectRelevantCount / allJobSkills.length) * 100)
      : 0

  // 5. experienceMatch — heuristic based on career readiness score vs. experience level
  const levelScore: Record<string, number> = {
    Intern: 60,
    Junior: 75,
    Mid: 85,
    Senior: 95,
  }
  const targetScore = levelScore[job.experienceLevel] ?? 75
  const gap = Math.abs(candidate.careerReadiness - targetScore)
  const experienceMatch = Math.max(0, 100 - gap * 2)

  // 6. profileCompleteness — simple check: bio, headline, targetRole, ≥3 skills
  let completeness = 0
  if (candidate.bio) completeness += 25
  if (candidate.headline) completeness += 25
  if (candidate.targetRole) completeness += 25
  if (candidate.skills.length >= 3) completeness += 25
  const profileCompleteness = completeness

  // Weighted composite
  const opportunityFit = Math.round(
    0.35 * skillMatch +
    0.20 * verifiedSkillEvidence +
    0.15 * credentialRelevance +
    0.15 * projectRelevance +
    0.10 * experienceMatch +
    0.05 * profileCompleteness
  )

  return {
    opportunityFit: Math.min(100, Math.max(0, opportunityFit)),
    breakdown: {
      skillMatch,
      verifiedSkillEvidence,
      credentialRelevance,
      projectRelevance,
      experienceMatch,
      profileCompleteness,
    },
  }
}
