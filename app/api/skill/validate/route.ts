import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { skill } = await req.json()

    if (!skill) {
      return NextResponse.json(
        { error: 'Skill is required' },
        { status: 400 }
      )
    }

    const response = await fetch(
      `${process.env.DIFY_API_BASE}/chat-messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.DIFY_SKILL_VALIDATOR_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: {
            skill_interest: skill
          },
          query: skill,
          response_mode: 'blocking',
          user: 'edusync-user'
        })
      }
    )

    const data = await response.json()

    return NextResponse.json(data)

  } catch (error) {
    console.error('Dify error:', error)
    return NextResponse.json(
      { error: 'Failed to validate skill' },
      { status: 500 }
    )
  }
}