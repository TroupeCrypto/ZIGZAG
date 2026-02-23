import { NextResponse } from 'next/server'

function generateUniqueId() {
  return crypto.randomUUID()
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { style, colors, complexity } = body || {}

    if (!isNonEmptyString(style) || !isNonEmptyString(colors) || !isNonEmptyString(complexity)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request: style, colors, and complexity are required non-empty strings',
        },
        { status: 400 },
      )
    }

    const id = generateUniqueId()

    const nftData = {
      id,
      style,
      colors,
      complexity,
      imageUrl: null,
      metadata: {
        name: `ZIG ZAG NFT #${id}`,
        description: `A unique ${style} artwork`,
        attributes: [
          { trait_type: 'Style', value: style },
          { trait_type: 'Colors', value: colors },
          { trait_type: 'Complexity', value: complexity },
        ],
      },
    }

    return NextResponse.json({ success: true, data: nftData })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to generate NFT' }, { status: 500 })
  }
}
