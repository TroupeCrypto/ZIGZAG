/**
 * NFT Generator Backend API
 * 
 * Express.js API endpoints for NFT generation and minting operations.
 * Provides RESTful endpoints for generating unique NFT metadata and
 * simulating blockchain minting transactions.
 * 
 * @author ZIG ZAG
 * @version 1.0.0
 * @license MIT
 */

const express = require('express');
const router = express.Router();

/**
 * Generate NFT endpoint
 * Creates unique NFT with metadata based on style, colors, and complexity
 * @route POST /api/nft/generate
 * @param {Object} req.body - Request body
 * @param {string} req.body.style - Art style (Psychedelic, Abstract, Geometric, Cyberpunk)
 * @param {string} req.body.colors - Color scheme
 * @param {number} req.body.complexity - Complexity level (1-10)
 * @returns {Object} NFT data with metadata
 */
router.post('/generate', async (req, res) => {
    try {
        const { style, colors, complexity } = req.body;
        
        // Generate unique ID
        const id = generateUniqueId();
        
        // NFT generation logic here
        const nftData = {
            id: id,
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
                    { trait_type: 'Complexity', value: complexity }
                ]
            }
        };
        
        res.json({ success: true, data: nftData });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

/**
 * Mint NFT endpoint
 * Simulates blockchain minting transaction
 * @route POST /api/nft/mint
 * @param {Object} req.body - Request body
 * @param {string} req.body.nftId - NFT identifier
 * @param {string} req.body.walletAddress - Ethereum wallet address
 * @returns {Object} Transaction hash and token ID
 */
router.post('/mint', async (req, res) => {
    try {
        const { nftId, walletAddress } = req.body;
        
        // Blockchain minting logic here
        const transactionHash = await mintToBlockchain(nftId, walletAddress);
        
        res.json({ 
            success: true, 
            transactionHash,
            tokenId: nftId 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

/**
 * Generate unique ID for NFT
 * @returns {string} Unique identifier
 */
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Mint NFT to blockchain using ethers.js
 * 
 * SECURITY WARNING: This endpoint uses a server-side hot wallet (MINTER_PRIVATE_KEY).
 * In production, you MUST implement:
 * - Authentication (verify user identity)
 * - Rate limiting (prevent spam minting)
 * - Allowlists/quotas (control who can mint and how many)
 * - Use a dedicated low-value minter wallet, not a personal wallet
 * 
 * @async
 * @param {string} nftId - NFT identifier
 * @param {string} walletAddress - Ethereum wallet address
 * @returns {Promise<string>} Transaction hash
 */
async function mintToBlockchain(nftId, walletAddress) {
    const { ethers } = require('ethers');
    
    // Validate nftId
    if (!nftId || typeof nftId !== 'string' || nftId.length === 0) {
        throw new Error('Invalid nftId: must be a non-empty string');
    }
    
    // Validate wallet address format
    if (!walletAddress || !ethers.isAddress(walletAddress)) {
        throw new Error('Invalid wallet address');
    }
    
    const rpcUrl = process.env.ETHEREUM_RPC_URL || process.env.POLYGON_RPC_URL;
    const privateKey = process.env.MINTER_PRIVATE_KEY;
    const contractAddress = process.env.NFT_CONTRACT_ADDRESS;
    
    if (!rpcUrl || !privateKey || !contractAddress) {
        throw new Error('Blockchain configuration missing. Set ETHEREUM_RPC_URL, MINTER_PRIVATE_KEY, and NFT_CONTRACT_ADDRESS environment variables.');
    }
    
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);
    
    const nftContractABI = [
        'function mintNFT(address recipient, uint256 tokenId) public returns (uint256)',
        'function safeMint(address to, uint256 tokenId) public'
    ];
    
    const nftContract = new ethers.Contract(contractAddress, nftContractABI, wallet);
    
    // Generate collision-resistant tokenId using keccak256 hash
    const tokenIdHash = ethers.keccak256(ethers.toUtf8Bytes(nftId + Date.now().toString()));
    const tokenId = BigInt(tokenIdHash) % BigInt('0xFFFFFFFFFFFFFFFF'); // Fit into uint64 range
    
    const tx = await nftContract.mintNFT(walletAddress, tokenId);
    const receipt = await tx.wait();
    
    return receipt.hash;
}

module.exports = router;
