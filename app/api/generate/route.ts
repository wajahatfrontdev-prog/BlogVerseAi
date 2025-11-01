import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { topic } = await req.json()

    if (!topic || topic.trim() === "") {
      return NextResponse.json({ error: "Please provide a topic." }, { status: 400 })
    }

    // 🌐 Use environment variable for backend URL (from .env.local)
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

    // Send request to FastAPI backend
    const response = await fetch(`${API_URL}/generate-blog`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }), // ✅ send { topic } not { prompt }
    })

    if (!response.ok) {
      const error = await response.text()
      return NextResponse.json({ error: error || "Backend error" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in Next.js API route:", error)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
