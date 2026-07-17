import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { skill, level, mode } = await req.json()

    if (!skill) {
      return NextResponse.json(
        { error: 'Skill is required' },
        { status: 400 }
      )
    }

    // Validate mode parameter
    const validMode = mode === 'suggest' || mode === 'guide' ? mode : 'guide'

    // Call Dify streaming API
    const response = await fetch(
      `${process.env.DIFY_API_BASE}/chat-messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.DIFY_PROJECT_MENTOR_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: {
            skill_name: skill,
            user_level: level || 'beginner',
            user_interests: `Build a ${level || 'beginner'} level project for ${skill}`,
            mode: validMode
          },
          query: validMode === 'guide' 
            ? `Help me build a project for ${skill} at ${level || 'beginner'} level`
            : `Suggest project ideas for ${skill} at ${level || 'beginner'} level`,
          response_mode: 'streaming',
          user: 'edusync-user'
        })
      }
    )

    if (!response.ok) {
      const error = await response.json()
      console.error('Dify API error:', error)
      return NextResponse.json(
        { error: error.message || 'Failed to generate project' },
        { status: response.status }
      )
    }

    // Handle streaming response
    const reader = response.body?.getReader()
    const decoder = new TextDecoder()
    let fullResponse = ''

    if (reader) {
      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split('\n')

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6))
                if (data.answer) {
                  fullResponse += data.answer
                }
              } catch (e) {
                // Skip invalid JSON lines
              }
            }
          }
        }
      } finally {
        reader.releaseLock()
      }
    }

    return NextResponse.json({ answer: fullResponse || response })

  } catch (error) {
    console.error('Project guidance error:', error)
    return NextResponse.json(
      { error: 'Failed to generate project guidance' },
      { status: 500 }
    )
  }
}
