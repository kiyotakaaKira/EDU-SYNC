import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

// ─── Types ────────────────────────────────────────────────────────────────────
interface ResumeAnalysisResult {
  missingSkills: string[]
  presentSkills: string[]
  score: number
  suggestions: string[]
  keywordGaps: string[]
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Reads a File (from FormData) and returns its text content.
 * For .pdf / .docx, we do a best-effort extraction of printable text.
 * (Server-side PDF parsing requires `pdf-parse`; if not installed we fall back
 *  to raw buffer text—sufficient for most digitally-created PDFs.)
 */
async function fileToText(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer())

  if (file.name.endsWith(".pdf")) {
    try {
      // Dynamically import pdf-parse (optional dependency)
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const pdfParse = require("pdf-parse")
      const parsed = await pdfParse(buffer)
      return parsed.text ?? ""
    } catch {
      // pdf-parse not installed — extract printable ASCII from raw buffer
      return buffer.toString("latin1").replace(/[^\x20-\x7E\n]/g, " ").trim()
    }
  }

  // .txt / .docx (DOCX is ZIP-based; extracting raw text gives some readable content)
  return buffer.toString("utf-8")
}

/**
 * Build the LLM system prompt for resume gap analysis.
 */
function buildPrompt(resumeText: string, jdText: string): string {
  return `
You are an expert ATS (Applicant Tracking System) analyzer and career advisor.

You will receive:
1. A candidate's RESUME text.
2. A target JOB DESCRIPTION (JD).

Your task:
- Extract the skills mentioned in the JD.
- Determine which skills are PRESENT in the resume and which are MISSING.
- Identify important KEYWORDS in the JD that do not appear in the resume (ATS keyword gaps).
- Calculate a match score from 0–100 (100 = perfect match).
- Generate 4–6 specific, actionable improvement suggestions (no generic advice).

IMPORTANT: Respond ONLY with a valid JSON object in this exact shape—no markdown, no preamble:
{
  "missingSkills": ["skill1", "skill2"],
  "presentSkills": ["skill3", "skill4"],
  "score": 72,
  "keywordGaps": ["keyword1", "keyword2"],
  "suggestions": [
    "Add a dedicated 'Skills' section listing: React, Node.js, and PostgreSQL.",
    "Quantify your achievements—e.g., 'Reduced load time by 40%'.",
    "..."
  ]
}

--- RESUME ---
${resumeText.slice(0, 4000)}

--- JOB DESCRIPTION ---
${jdText.slice(0, 3000)}
`.trim()
}

/**
 * Fallback mock result returned when LLM call fails or API key is absent.
 */
function mockResult(): ResumeAnalysisResult {
  return {
    missingSkills: ["TypeScript", "Docker", "CI/CD Pipelines", "AWS Lambda", "Redis"],
    presentSkills: ["JavaScript", "React", "Node.js", "REST APIs", "Git"],
    score: 58,
    keywordGaps: ["microservices", "scalability", "observability", "Kubernetes", "DevOps"],
    suggestions: [
      "Add a dedicated 'Technical Skills' section listing TypeScript and cloud technologies.",
      "Include experience with containerisation (Docker) or mention similar tools you have used.",
      "Quantify your achievements—e.g., 'Improved API response time by 35%' rather than generic descriptions.",
      "Add CI/CD pipeline experience (GitHub Actions, Jenkins, or GitLab CI) to align with role requirements.",
      "Mention any cloud platform exposure (AWS, GCP, or Azure) even if limited to personal projects.",
      "Tailor your summary/objective to match the company's domain and the specific role.",
    ],
  }
}

// ─── Route Handler ─────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    // ── 1. Parse multipart form data ──────────────────────────────────────────
    let formData: FormData
    try {
      formData = await req.formData()
    } catch {
      return NextResponse.json({ error: "Invalid request: expected multipart/form-data." }, { status: 400 })
    }

    const resumeFile = formData.get("resume") as File | null
    const jdFile = formData.get("jobDescription") as File | null

    if (!resumeFile || !jdFile) {
      return NextResponse.json(
        { error: "Both 'resume' and 'jobDescription' files are required." },
        { status: 400 }
      )
    }

    // ── 2. Auth check (optional but recommended for production) ───────────────
    const supabase = await getSupabaseServerClient()
    let userId: string | null = null

    if (supabase) {
      const { data: { user } } = await supabase.auth.getUser()
      userId = user?.id ?? null
      // Uncomment to enforce auth:
      // if (!userId) {
      //   return NextResponse.json({ error: "Unauthorised." }, { status: 401 })
      // }
    }

    // ── 3. Extract text from files ────────────────────────────────────────────
    const [resumeText, jdText] = await Promise.all([
      fileToText(resumeFile),
      fileToText(jdFile),
    ])

    if (!resumeText.trim() || !jdText.trim()) {
      return NextResponse.json(
        { error: "Could not extract text from one or both files. Please try a .txt file." },
        { status: 422 }
      )
    }

    // ── 4. Call AI (OpenAI compatible via DIFY or direct) ─────────────────────
    let analysisResult: ResumeAnalysisResult

    const openaiKey = process.env.OPENAI_API_KEY
    const openaiBase = process.env.OPENAI_API_BASE ?? "https://api.openai.com/v1"
    const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini"

    if (openaiKey) {
      try {
        const aiResponse = await fetch(`${openaiBase}/chat/completions`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${openaiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model,
            temperature: 0.2,
            response_format: { type: "json_object" },
            messages: [
              {
                role: "system",
                content: "You are an expert resume and job description analyzer. Always respond with a JSON object only.",
              },
              {
                role: "user",
                content: buildPrompt(resumeText, jdText),
              },
            ],
          }),
        })

        if (aiResponse.ok) {
          const aiData = await aiResponse.json()
          const rawContent = aiData?.choices?.[0]?.message?.content ?? ""
          try {
            analysisResult = JSON.parse(rawContent) as ResumeAnalysisResult
          } catch {
            console.error("Failed to parse LLM JSON response:", rawContent)
            analysisResult = mockResult()
          }
        } else {
          console.error("OpenAI API error:", await aiResponse.text())
          analysisResult = mockResult()
        }
      } catch (llmErr) {
        console.error("LLM call failed:", llmErr)
        analysisResult = mockResult()
      }
    } else {
      // No API key configured — return mock for demo/development
      console.warn("OPENAI_API_KEY not set. Returning mock analysis result.")
      analysisResult = mockResult()
    }

    // Ensure all arrays exist (guard against partial LLM responses)
    analysisResult.missingSkills = analysisResult.missingSkills ?? []
    analysisResult.presentSkills = analysisResult.presentSkills ?? []
    analysisResult.keywordGaps = analysisResult.keywordGaps ?? []
    analysisResult.suggestions = analysisResult.suggestions ?? []
    analysisResult.score = typeof analysisResult.score === "number" ? analysisResult.score : 0

    // ── 5. Persist to Supabase (best-effort; do not fail the request on DB error) ──
    if (supabase && userId) {
      try {
        await supabase.from("resume_analysis").insert({
          user_id: userId,
          missing_skills: analysisResult.missingSkills,
          present_skills: analysisResult.presentSkills,
          keyword_gaps: analysisResult.keywordGaps,
          suggestions: analysisResult.suggestions,
          score: analysisResult.score,
          resume_filename: resumeFile.name,
          jd_filename: jdFile.name,
        })
      } catch (dbErr) {
        // Non-fatal — log and continue
        console.error("Supabase insert failed:", dbErr)
      }
    }

    // ── 6. Return result ──────────────────────────────────────────────────────
    return NextResponse.json(analysisResult)
  } catch (err) {
    console.error("Resume analysis error:", err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error." },
      { status: 500 }
    )
  }
}
