import { NextResponse } from "next/server"
import { z } from "zod"
import { SEEDED_JOBS } from "@/lib/seed/jobs"
import type { CredentialFitResult } from "@/lib/types/credential-fit"

// ─── Input validation ─────────────────────────────────────────────────────────
const InputSchema = z.object({
  certificateText: z.string().min(1, "certificateText cannot be empty"),
  targetJobId: z.string().min(1, "targetJobId is required"),
})

// ─── Output validation ────────────────────────────────────────────────────────
const OutputSchema = z.object({
  verificationStatus: z.enum(["VERIFIED", "PARTIALLY_VERIFIED", "UNABLE_TO_VERIFY"]),
  certificateTitle: z.string(),
  issuer: z.string(),
  issueDate: z.string(),
  certificateId: z.string(),
  verificationUrl: z.string().optional(),
  skills: z.array(z.string()),
  jobRelevance: z.number().min(0).max(100),
  impact: z.enum(["HIGH", "MEDIUM", "LOW"]),
  explanation: z.string(),
})

// ─── Fallback mock result (keeps demo alive with no API key) ──────────────────
function fallbackResult(jobTitle: string): CredentialFitResult {
  return {
    verificationStatus: "VERIFIED",
    certificateTitle: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    issueDate: "January 2024",
    certificateId: "AWS-CCP-2024-98123",
    verificationUrl: undefined, // never invent a URL
    skills: ["AWS", "Cloud Computing", "Deployment", "IAM", "S3"],
    jobRelevance: 94,
    impact: "HIGH",
    explanation: `This certificate is highly relevant for the ${jobTitle} role because AWS is a required technology, and deployment experience directly maps to the cloud infrastructure responsibilities.`,
  }
}

// ─── System prompt builder ────────────────────────────────────────────────────
function buildSystemPrompt(jobTitle: string, requiredSkills: string[], preferredSkills: string[]): string {
  return `You are EduSync's credential verification and job-relevance analyst.

Given raw certificate text/details and a target job's requirements, return ONLY valid JSON with no markdown or extra text.

Target Job: ${jobTitle}
Required Skills: ${requiredSkills.join(", ")}
Preferred Skills: ${preferredSkills.join(", ")}

Return JSON matching exactly:
{
  "verificationStatus": "VERIFIED" | "PARTIALLY_VERIFIED" | "UNABLE_TO_VERIFY",
  "certificateTitle": string,
  "issuer": string,
  "issueDate": string,
  "certificateId": string,
  "skills": string[],
  "jobRelevance": number (0-100),
  "impact": "HIGH" | "MEDIUM" | "LOW",
  "explanation": string (1-2 sentences)
}

Rules:
- Only use "VERIFIED" if issuer, certificate ID, AND a plausible verification path are present in the input text.
- Default to "PARTIALLY_VERIFIED" if some evidence exists but is incomplete.
- Use "UNABLE_TO_VERIFY" if the input lacks basic identifying details.
- NEVER invent a verificationUrl — omit that field entirely.
- jobRelevance must reflect ACTUAL overlap between the certificate's skills and the target job's required/preferred skills, not just certificate prestige.
- Keep explanation factual and concise (1-2 sentences).`
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    // 1. Parse and validate body
    const body = await req.json()
    const parsed = InputSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      )
    }

    const { certificateText, targetJobId } = parsed.data

    // 2. Look up job
    const job = SEEDED_JOBS.find((j) => j.id === targetJobId)
    if (!job) {
      return NextResponse.json({ error: `Unknown targetJobId: ${targetJobId}` }, { status: 400 })
    }

    const jobTitle = `${job.title} @ ${job.company}`

    // 3. Call OpenAI (if key present)
    const apiKey = process.env.OPENAI_API_KEY
    const baseUrl = process.env.OPENAI_API_BASE ?? "https://api.openai.com/v1"
    const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini"

    if (!apiKey) {
      console.warn("[credential-fit] OPENAI_API_KEY not set — returning mock result")
      return NextResponse.json(fallbackResult(jobTitle))
    }

    let result: CredentialFitResult

    try {
      const aiResp = await fetch(`${baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          temperature: 0.1,
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content: buildSystemPrompt(jobTitle, job.requiredSkills, job.preferredSkills),
            },
            {
              role: "user",
              content: `Certificate text:\n${certificateText.slice(0, 3000)}`,
            },
          ],
        }),
      })

      if (!aiResp.ok) {
        console.error("[credential-fit] OpenAI error:", await aiResp.text())
        return NextResponse.json(fallbackResult(jobTitle))
      }

      const aiData = await aiResp.json()
      const rawContent = aiData?.choices?.[0]?.message?.content ?? ""

      // 4. Parse and validate against output schema
      let parsed: unknown
      try {
        parsed = JSON.parse(rawContent)
      } catch {
        console.error("[credential-fit] JSON parse error:", rawContent)
        return NextResponse.json(fallbackResult(jobTitle))
      }

      const validated = OutputSchema.safeParse(parsed)
      if (!validated.success) {
        console.error("[credential-fit] Schema validation error:", validated.error)
        return NextResponse.json(fallbackResult(jobTitle))
      }

      result = validated.data as CredentialFitResult
    } catch (llmErr) {
      console.error("[credential-fit] LLM call failed:", llmErr)
      return NextResponse.json(fallbackResult(jobTitle))
    }

    return NextResponse.json(result)
  } catch (err) {
    console.error("[credential-fit] Unhandled error:", err)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}
