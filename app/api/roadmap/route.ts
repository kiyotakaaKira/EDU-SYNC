import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { skill, experience, timeCommitment, learningGoal } = await req.json()

    if (!skill) {
      return NextResponse.json(
        { error: 'Skill is required' },
        { status: 400 }
      )
    }

    const payload = {
      inputs: {
        skill_name: skill,
        user_level: experience || 'complete_beginner',
        time_commitment_: String(timeCommitment || '10'),
        learning_goal: learningGoal || 'get_job'
      },
      query: `Create a learning roadmap for ${skill} at ${experience || 'complete_beginner'} level`,
      response_mode: 'streaming',
      user: 'edusync-user'
    }

    console.log('Sending to Dify:', {
      url: `${process.env.DIFY_API_BASE}/chat-messages`,
      payload
    })

    const response = await fetch(
      `${process.env.DIFY_API_BASE}/chat-messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.DIFY_ROADMAP_ARCHITECT_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Dify API error:', errorData)
      return NextResponse.json(errorData, { status: response.status })
    }

    // Handle streaming response (Server-Sent Events)
    const reader = response.body?.getReader()
    const decoder = new TextDecoder()
    let fullResponse = ""
    let done = false

    if (!reader) {
      return NextResponse.json(
        { error: "No response body" },
        { status: 500 }
      )
    }

    while (!done) {
      const { done: streamDone, value } = await reader.read()
      done = streamDone

      if (value) {
        const chunk = decoder.decode(value)
        const lines = chunk.split("\n")

        for (const line of lines) {
          if (line.startsWith("data:")) {
            try {
              const jsonStr = line.replace(/^data:\s*/, "").trim()
              if (jsonStr) {
                const data = JSON.parse(jsonStr)
                console.log("Stream chunk:", data)

                // Collect answer text
                if (data.answer) {
                  fullResponse += data.answer
                }
              }
            } catch (e) {
              console.log("Failed to parse SSE line:", line)
            }
          }
        }
      }
    }

    console.log("Complete Dify roadmap response:", fullResponse)

    return NextResponse.json({
      roadmap: fullResponse || "I couldn't generate a roadmap. Please try again.",
    })

  } catch (error) {
    console.error('Roadmap generation error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate roadmap' },
      { status: 500 }
    )
  }
}
