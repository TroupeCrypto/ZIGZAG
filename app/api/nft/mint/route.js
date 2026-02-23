import { ethers } from 'ethers'
import { NextResponse } from 'next/server'

async function mintToBlockchain(nftId, walletAddress) {
  if (!nftId || typeof nftId !== 'string') {
    throw new Error('Invalid nftId: must be a non-empty string')
  }

  if (!walletAddress || !ethers.isAddress(walletAddress)) {
    throw new Error('Invalid wallet address')
  }

  const rpcUrl = process.env.ETHEREUM_RPC_URL || process.env.POLYGON_RPC_URL
  const privateKey = process.env.MINTER_PRIVATE_KEY
  const contractAddress = process.env.NFT_CONTRACT_ADDRESS

  if (!rpcUrl || !privateKey || !contractAddress) {
    throw new Error('Blockchain configuration missing. Set ETHEREUM_RPC_URL, MINTER_PRIVATE_KEY, and NFT_CONTRACT_ADDRESS environment variables.')
  }

  const provider = new ethers.JsonRpcProvider(rpcUrl)
  const wallet = new ethers.Wallet(privateKey, provider)
  const nftContract = new ethers.Contract(
    contractAddress,
    [
      'function mintNFT(address recipient, uint256 tokenId) public returns (uint256)',
    ],
    wallet,
  )

  const tokenIdHash = ethers.keccak256(
    ethers.concat([ethers.toUtf8Bytes(nftId), ethers.randomBytes(16)]),
  )
  const tokenId = BigInt(tokenIdHash) % BigInt('0xFFFFFFFFFFFFFFFF')

  const tx = await nftContract.mintNFT(walletAddress, tokenId)
  const receipt = await tx.wait()

  return { hash: receipt.hash, tokenId: tokenId.toString() }
}

export async function POST(request) {
  try {
    const { nftId, walletAddress } = await request.json()
    const result = await mintToBlockchain(nftId, walletAddress)

    return NextResponse.json({
      success: true,
      transactionHash: result.hash,
      tokenId: result.tokenId,
    })
  } catch (error) {
    const message = error?.message === 'Invalid wallet address' || error?.message?.startsWith('Invalid nftId')
      ? error.message
      : 'Failed to mint NFT'
    const status = message === error?.message ? 400 : 500

    return NextResponse.json({ success: false, error: message }, { status })
  }
}
