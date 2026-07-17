// ─── Seeded Alumni Data ───────────────────────────────────────────────────────

export interface Alumni {
  id: string
  name: string
  title: string
  company: string
  domain: string
  careerMatchPercent: number
  roleSimilarityBasis: string
  referralAvailable: boolean
  avatarInitials: string
  graduationYear: number
}

export const SEEDED_ALUMNI: Alumni[] = [
  {
    id: "arjun-kumar",
    name: "Arjun Kumar",
    title: "Senior AI Engineer",
    company: "TechCorp",
    domain: "AI / Machine Learning",
    careerMatchPercent: 94,
    roleSimilarityBasis:
      "Both Arjun's role and Adithyan's target role (AI Systems Engineer) centre on Python-based ML system development, AWS deployment, and LLM integration — the match is driven by direct skill and domain overlap, not personal characteristics.",
    referralAvailable: true,
    avatarInitials: "AK",
    graduationYear: 2020,
  },
  {
    id: "meera-nair",
    name: "Meera Nair",
    title: "ML Platform Engineer",
    company: "NovaLabs",
    domain: "ML Infrastructure",
    careerMatchPercent: 81,
    roleSimilarityBasis:
      "Meera's work on ML infrastructure (FastAPI services, MLflow, cloud pipelines) aligns with Adithyan's demonstrated FastAPI and Python skills and target trajectory.",
    referralAvailable: true,
    avatarInitials: "MN",
    graduationYear: 2021,
  },
  {
    id: "karthik-r",
    name: "Karthik R",
    title: "Backend Engineer",
    company: "InnovateX",
    domain: "Backend / APIs",
    careerMatchPercent: 73,
    roleSimilarityBasis:
      "Karthik specialises in FastAPI + PostgreSQL microservices. Adithyan's FastAPI and CI/CD exposure partially overlaps, though AI specialisation is less relevant here.",
    referralAvailable: false,
    avatarInitials: "KR",
    graduationYear: 2019,
  },
]
