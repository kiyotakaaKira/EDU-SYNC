import type { CandidateProfile } from "@/lib/types/candidate"

// ─── Canonical Demo Candidate — Adithyan J ────────────────────────────────────
// THIS OBJECT is the single source of truth read by:
//   • Career Profile page (8A)
//   • Referral Passport (8C)
//   • Alumni Referral Requests (9C)
//   • HR Candidate Profile (10D)
//   • Talent Discovery ranking (10C)
// Never re-type or copy this by hand in those files — import from here.

export const DEMO_CANDIDATE: CandidateProfile = {
  id: "adithyan-j",
  name: "Adithyan J",
  headline: "AI/ML Enthusiast · Full-Stack Builder · Open-Source Contributor",
  targetRole: "AI Systems Engineer",
  bio:
    "Final-year Computer Science student passionate about building production-grade AI systems. Experienced with Python, FastAPI, and cloud deployment. Looking for opportunities to apply ML at scale in a high-growth environment.",
  careerReadiness: 82,
  verifiedSkillsCount: 4,
  projectsCount: 3,
  certificatesCount: 2,
  skills: [
    {
      skill: "Python",
      level: "VALIDATED",
      evidence: { resume: true, certificate: true, project: true, assessment: true },
    },
    {
      skill: "Machine Learning",
      level: "VALIDATED",
      evidence: { resume: true, certificate: true, project: true, assessment: true },
    },
    {
      skill: "FastAPI",
      level: "DEMONSTRATED",
      evidence: { resume: true, certificate: false, project: true, assessment: false },
    },
    {
      skill: "CI/CD Pipelines",
      level: "DEVELOPING",
      evidence: { resume: true, certificate: false, project: false, assessment: false },
    },
    {
      skill: "AWS",
      level: "CREDENTIALLED",
      evidence: { resume: true, certificate: true, project: false, assessment: false },
    },
  ],
}

// ─── Stub candidates for Talent Discovery list padding ────────────────────────
export const ALL_CANDIDATES: CandidateProfile[] = [
  DEMO_CANDIDATE,
  {
    id: "priya-s",
    name: "Priya S",
    headline: "Backend Developer · Node.js · PostgreSQL",
    targetRole: "Backend Engineer",
    bio: "3rd year CS student focused on backend systems and API design.",
    careerReadiness: 65,
    verifiedSkillsCount: 2,
    projectsCount: 2,
    certificatesCount: 1,
    skills: [
      { skill: "Node.js", level: "DEMONSTRATED", evidence: { resume: true, certificate: false, project: true, assessment: false } },
      { skill: "PostgreSQL", level: "CREDENTIALLED", evidence: { resume: true, certificate: true, project: false, assessment: false } },
      { skill: "Python", level: "CLAIMED", evidence: { resume: true, certificate: false, project: false, assessment: false } },
      { skill: "CI/CD Pipelines", level: "CLAIMED", evidence: { resume: true, certificate: false, project: false, assessment: false } },
    ],
  },
  {
    id: "rahul-k",
    name: "Rahul K",
    headline: "Data Science Student · Analytics",
    targetRole: "Data Analyst",
    bio: "Passionate about data storytelling and business analytics.",
    careerReadiness: 54,
    verifiedSkillsCount: 1,
    projectsCount: 1,
    certificatesCount: 1,
    skills: [
      { skill: "Python", level: "DEMONSTRATED", evidence: { resume: true, certificate: false, project: true, assessment: false } },
      { skill: "Machine Learning", level: "CLAIMED", evidence: { resume: true, certificate: false, project: false, assessment: false } },
    ],
  },
]
