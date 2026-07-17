// ─── Seeded Jobs List ─────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH — imported by CredentialFit API, Opportunities page,
// Talent Discovery, HR Job Management. NEVER duplicate this data elsewhere.

export interface Job {
  id: string
  title: string
  company: string
  location: string
  experienceLevel: "Intern" | "Junior" | "Mid" | "Senior"
  description: string
  requiredSkills: string[]
  preferredSkills: string[]
  matchScore: number     // vs. the seeded candidate (Adithyan J)
  skillMatch: string     // e.g. "8/10"
  referralAvailable: boolean
}

export const SEEDED_JOBS: Job[] = [
  {
    id: "ai-engineer-intern-techcorp",
    title: "AI Engineer Intern",
    company: "TechCorp",
    location: "Bangalore, India (Hybrid)",
    experienceLevel: "Intern",
    description:
      "Build and deploy machine-learning models, contribute to LLM-powered product features, and work with cloud infrastructure on AWS. Ideal candidate has hands-on Python, ML, and FastAPI experience.",
    requiredSkills: ["Python", "Machine Learning", "AWS", "FastAPI", "REST APIs"],
    preferredSkills: ["TypeScript", "Docker", "CI/CD Pipelines", "MLflow", "PostgreSQL"],
    matchScore: 92,
    skillMatch: "8/10",
    referralAvailable: true,
  },
  {
    id: "backend-engineer-innovatex",
    title: "Backend Engineer",
    company: "InnovateX",
    location: "Remote (India)",
    experienceLevel: "Junior",
    description:
      "Design scalable REST APIs with Node.js/FastAPI, manage PostgreSQL databases, and build microservice pipelines with Docker and CI/CD. Strong emphasis on code quality and system reliability.",
    requiredSkills: ["FastAPI", "PostgreSQL", "Docker", "CI/CD Pipelines", "REST APIs"],
    preferredSkills: ["Python", "Redis", "Kubernetes", "AWS", "TypeScript"],
    matchScore: 84,
    skillMatch: "7/10",
    referralAvailable: true,
  },
  {
    id: "ml-intern-novalabs",
    title: "Machine Learning Intern",
    company: "NovaLabs",
    location: "Chennai, India (On-site)",
    experienceLevel: "Intern",
    description:
      "Research and implement deep-learning models for NLP and vision tasks. Experience with Python, scikit-learn, PyTorch, and data-pipeline tooling required.",
    requiredSkills: ["Python", "Machine Learning", "PyTorch", "NLP", "Data Pipelines"],
    preferredSkills: ["AWS", "FastAPI", "MLflow", "Transformers", "Git"],
    matchScore: 78,
    skillMatch: "6/10",
    referralAvailable: true,
  },
]
