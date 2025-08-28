import { NextRequest, NextResponse } from 'next/server'

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`

// Simple in-memory store (resets on server restart)
const ipUsageMap = new Map<string, number>()

const MAX_USAGE_PER_IP = 5

export async function POST(req: NextRequest) {
  try {
    // Get client IP — works in Vercel Edge functions / Next.js middleware
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'

    // Check usage count
    const usageCount = ipUsageMap.get(ip) ?? 0

    if (usageCount >= MAX_USAGE_PER_IP) {
      return NextResponse.json(
        { error: `Rate limit exceeded: max ${MAX_USAGE_PER_IP} requests allowed per IP.` },
        { status: 429 }
      )
    }

    const { idea } = await req.json()

    if (!idea) {
      return NextResponse.json({ error: 'Missing idea input' }, { status: 400 })
    }

    // Update usage count
    ipUsageMap.set(ip, usageCount + 1)

    const prompt = {
      contents: [
        {
          parts: [
            {
              text: `I want to validate this SaaS idea: "${idea}". Please return a validation report with:
- Summary of the idea
- Problem clarity
- Existing demand & market landscape
- Differentiator strength
- Monetization potential
- Suggested marketing channel
- Validation Score (1–10)   in a HTML format with headings for each section.`
            }
          ]
        }
      ]
    }

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(prompt)
    })

    const data = await response.json()

    const result = data?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!result) {
      return NextResponse.json({ error: 'No response from Gemini' }, { status: 500 })
    }

    return NextResponse.json({ result })

  } catch (error) {
    console.error('Validation API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
