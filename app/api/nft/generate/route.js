import { NextResponse } from 'next/server'

function generateUniqueId() {
  return crypto.randomUUID()
}

export async function POST(request) {
  try {
    const { style, colors, complexity } = await request.json()
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
