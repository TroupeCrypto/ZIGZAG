import { NextResponse } from 'next/server'

function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
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
      imageUrl: `/api/nft/image/${id}`,
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
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
