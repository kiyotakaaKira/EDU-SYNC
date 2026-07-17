import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    console.log("Sending to Dify chatbot:", {
      url: `${process.env.DIFY_API_BASE}/chat-messages`,
      message,
    })

    // Detect if it's a greeting
    const isGreeting = /^(hi|hello|hey|greetings|sup|what's up)$/i.test(message.trim())

    const response = await fetch(`${process.env.DIFY_API_BASE}/chat-messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.DIFY_CHATBOT_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: {
          variable_name_1: message,
          variable_name_2: message,
          greeting: isGreeting ? "yes" : "no",
          request: isGreeting ? "" : message,
        },
        query: message,
        response_mode: "streaming",
        user: "edusync-user",
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Dify API error:", errorData)
      return NextResponse.json(
        { error: errorData.message || "Failed to get response" },
        { status: response.status }
      )
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
                // Also check for other possible response fields
                if (data.text) {
                  fullResponse += data.text
                }
                if (data.message) {
                  fullResponse += data.message
                }
              }
            } catch (e) {
              console.log("Failed to parse SSE line:", line)
            }
          }
        }
      }
    }

    console.log("Final response:", fullResponse)

    if (!fullResponse) {
      return NextResponse.json(
        { error: "No response received from Dify" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      response: fullResponse,
    })
  } catch (error) {
    console.error("Chat error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to process chat message" },
      { status: 500 }
    )
  }
}
