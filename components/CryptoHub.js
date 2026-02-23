'use client'

import { useState, useEffect, useRef } from 'react'

export default function CryptoHub() {
  const canvasRef = useRef(null)
  const [artStyle, setArtStyle] = useState('Psychedelic')
  const [colorScheme, setColorScheme] = useState('Rainbow')
  const [complexity, setComplexity] = useState(5)
  const [contractType, setContractType] = useState('ERC-721 (NFT)')
  const [tokenName, setTokenName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [showContract, setShowContract] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletStatus, setWalletStatus] = useState('Not Connected')
  const [walletAddress, setWalletAddress] = useState('')
  const [isMinting, setIsMinting] = useState(false)
  const [isDeploying, setIsDeploying] = useState(false)
  const [nftGenerated, setNftGenerated] = useState(false)

  const drawInitialCanvas = (ctx, canvas) => {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, '#1a1a2e')
    gradient.addColorStop(0.5, '#16213e')
    gradient.addColorStop(1, '#0f3460')
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    ctx.strokeStyle = 'rgba(255, 0, 255, 0.3)'
    ctx.lineWidth = 1
    for (let i = 0; i < canvas.width; i += 30) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, canvas.height)
      ctx.stroke()
    }
    for (let i = 0; i < canvas.height; i += 30) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(canvas.width, i)
      ctx.stroke()
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      drawInitialCanvas(ctx, canvas)
    }
  }, [])

  const generateNFT = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Optimized generative art with requestAnimationFrame
    const colors = getColorScheme(colorScheme)
    const shapes = complexity * 10
    
    // Draw in batches to avoid blocking
    let i = 0
    const drawBatch = () => {
      const batchSize = Math.min(20, shapes - i)
      for (let j = 0; j < batchSize; j++) {
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)]
        ctx.globalAlpha = 0.5
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = Math.random() * 100
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }
      i += batchSize
      
      if (i < shapes) {
        requestAnimationFrame(drawBatch)
      } else {
        setNftGenerated(true)
      }
    }
    
    requestAnimationFrame(drawBatch)
  }

  const getColorScheme = (scheme) => {
    const schemes = {
      'Rainbow': ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'],
      'Neon': ['#ff006e', '#fb5607', '#ffbe0b', '#8338ec', '#3a86ff'],
      'Pastel': ['#ffc8dd', '#ffafcc', '#bde0fe', '#a2d2ff', '#cdb4db'],
      'Dark': ['#1a1a2e', '#16213e', '#0f3460', '#533483', '#e94560']
    }
    return schemes[scheme] || schemes['Rainbow']
  }

  const mintNFT = async () => {
    if (!walletConnected || !walletAddress) {
      alert('Please connect your wallet first')
      return
    }
    if (!nftGenerated) {
      alert('Please generate an NFT first')
      return
    }
    
    setIsMinting(true)
    try {
      const canvas = canvasRef.current
      const imageData = canvas.toDataURL('image/png')
      
      const response = await fetch('/api/nft/mint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nftId: `zigzag-${Date.now()}`,
          walletAddress: walletAddress,
          metadata: {
            name: `ZIG ZAG ${artStyle} #${Date.now()}`,
            description: `A unique ${artStyle} artwork with ${colorScheme} colors`,
            image: imageData,
            attributes: [
              { trait_type: 'Style', value: artStyle },
              { trait_type: 'Colors', value: colorScheme },
              { trait_type: 'Complexity', value: complexity }
            ]
          }
        })
      })
      
      const result = await response.json()
      if (result.success) {
        alert(`NFT minted successfully!\nTransaction: ${result.transactionHash}\nToken ID: ${result.tokenId}`)
      } else {
        throw new Error(result.error || 'Minting failed')
      }
    } catch (error) {
      alert(`Minting failed: ${error.message}`)
    } finally {
      setIsMinting(false)
    }
  }

  const generateContract = () => {
    if (!tokenName || !tokenSymbol) {
      alert('Please enter token name and symbol')
      return
    }
    setShowContract(true)
  }

  const getContractCode = () => {
    const templates = {
      'ERC-721 (NFT)': `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ${tokenSymbol} is ERC721, Ownable {
    constructor() ERC721("${tokenName}", "${tokenSymbol}") {}
    
    function mintNFT(address recipient, uint256 tokenId) 
        public onlyOwner 
    {
        _mint(recipient, tokenId);
    }
}`,
      'ERC-20 (Token)': `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ${tokenSymbol} is ERC20 {
    constructor(uint256 initialSupply) ERC20("${tokenName}", "${tokenSymbol}") {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }
}`,
      'ERC-1155 (Multi-Token)': `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract ${tokenSymbol} is ERC1155 {
    constructor() ERC1155("https://api.${tokenName.toLowerCase()}.com/metadata/{id}") {}
}`,
      'Custom': `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ${tokenSymbol} {
    // Custom contract for ${tokenName}
}`
    }
    return templates[contractType] || templates['ERC-721 (NFT)']
  }

  const copyContract = () => {
    navigator.clipboard.writeText(getContractCode())
    alert('Contract code copied to clipboard!')
  }

  const deployContract = async () => {
    if (!walletConnected) {
      alert('Please connect your wallet first')
      return
    }
    
    setIsDeploying(true)
    try {
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is required for deployment')
      }
      
      const contractCode = getContractCode()
      if (!contractCode || !contractCode.trim()) {
        throw new Error('Generated contract code is empty')
      }
      
      alert(`Contract ready for deployment!\n\nTo deploy:\n1. Copy the contract code\n2. Go to Remix IDE (remix.ethereum.org)\n3. Paste and compile the contract\n4. Deploy using your connected wallet\n\nConnected wallet: ${walletAddress}`)
    } catch (error) {
      alert(`Deployment preparation failed: ${error.message}`)
    } finally {
      setIsDeploying(false)
    }
  }

  const connectWallet = async () => {
    setWalletStatus('Connecting...')
    try {
      if (typeof window === 'undefined' || typeof window.ethereum === 'undefined') {
        setWalletStatus('MetaMask not found')
        alert('Please install MetaMask to connect your wallet')
        return
      }
      
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      
      if (accounts.length > 0) {
        const address = accounts[0]
        const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`
        setWalletAddress(address)
        setWalletStatus(`Connected: ${shortAddress}`)
        setWalletConnected(true)
      }
    } catch (error) {
      setWalletStatus('Connection failed')
      alert(`Failed to connect wallet: ${error.message}`)
    }
  }
  
  const disconnectWallet = () => {
    setWalletConnected(false)
    setWalletAddress('')
    setWalletStatus('Not Connected')
  }

  return (
    <section id="crypto" className="section crypto-section">
      <h2 className="section-title">Crypto Hub</h2>
      
      {/* NFT Generator */}
      <div className="nft-generator-section">
        <h3 className="subsection-title">NFT Generator</h3>
        <div className="generator-container">
          <div className="generator-canvas">
            <canvas ref={canvasRef} id="nft-canvas" width="500" height="500"></canvas>
            <div className="generator-preview">
              <p>Generate unique NFTs with AI</p>
            </div>
          </div>
          <div className="generator-controls">
            <div className="control-group">
              <label>Art Style:</label>
              <select id="art-style" value={artStyle} onChange={(e) => setArtStyle(e.target.value)}>
                <option>Psychedelic</option>
                <option>Abstract</option>
                <option>Geometric</option>
                <option>Cyberpunk</option>
              </select>
            </div>
            <div className="control-group">
              <label>Color Scheme:</label>
              <select id="color-scheme" value={colorScheme} onChange={(e) => setColorScheme(e.target.value)}>
                <option>Rainbow</option>
                <option>Neon</option>
                <option>Pastel</option>
                <option>Dark</option>
              </select>
            </div>
            <div className="control-group">
              <label>Complexity:</label>
              <input 
                type="range" 
                id="complexity" 
                min="1" 
                max="10" 
                value={complexity}
                onChange={(e) => setComplexity(Number(e.target.value))}
              />
            </div>
            <button className="btn-generate" onClick={generateNFT}>Generate NFT</button>
            <button className="btn-mint" onClick={mintNFT} disabled={isMinting || !nftGenerated}>
              {isMinting ? 'Minting...' : 'Mint to Blockchain'}
            </button>
          </div>
        </div>
      </div>

      {/* Smart Contract Generator */}
      <div className="contract-generator-section">
        <h3 className="subsection-title">Smart Contract Generator</h3>
        <div className="contract-form">
          <div className="form-row">
            <label>Contract Type:</label>
            <select id="contract-type" value={contractType} onChange={(e) => setContractType(e.target.value)}>
              <option>ERC-721 (NFT)</option>
              <option>ERC-20 (Token)</option>
              <option>ERC-1155 (Multi-Token)</option>
              <option>Custom</option>
            </select>
          </div>
          <div className="form-row">
            <label>Token Name:</label>
            <input 
              type="text" 
              id="token-name" 
              placeholder="My Token"
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label>Token Symbol:</label>
            <input 
              type="text" 
              id="token-symbol" 
              placeholder="MTK"
              value={tokenSymbol}
              onChange={(e) => setTokenSymbol(e.target.value)}
            />
          </div>
          <button className="btn-generate-contract" onClick={generateContract}>Generate Contract</button>
          {showContract && (
            <div className="contract-output">
              <pre><code id="contract-code">{getContractCode()}</code></pre>
              <button className="btn-copy-contract" onClick={copyContract}>Copy Code</button>
              <button className="btn-deploy-contract" onClick={deployContract} disabled={isDeploying}>
                {isDeploying ? 'Preparing...' : 'Deploy to Network'}
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="crypto-grid">
        <div className="crypto-card">
          <h3>NFT Collections</h3>
          <p>Explore exclusive digital collectibles and NFT art pieces</p>
          <button className="btn-primary" onClick={() => window.open('https://opensea.io/collection/zigzag', '_blank')}>Browse NFTs</button>
        </div>
        <div className="crypto-card">
          <h3>Wallet Connect</h3>
          <div id="wallet-status" className="wallet-status">{walletStatus}</div>
          <button 
            id="connect-wallet" 
            className="btn-primary"
            onClick={walletConnected ? disconnectWallet : connectWallet}
          >
            {walletConnected ? 'Disconnect' : 'Connect Wallet'}
          </button>
        </div>
        <div className="crypto-card">
          <h3>Token Info</h3>
          <p>ZIG ZAG Token (ZZT) - Official artist token</p>
          <button className="btn-primary" onClick={() => window.open('https://etherscan.io/token/zigzag', '_blank')}>Learn More</button>
        </div>
        <div className="crypto-card">
          <h3>Blockchain Portfolio</h3>
          <p>View on-chain assets and transactions</p>
          <button className="btn-primary" onClick={() => {
            if (walletAddress) {
              window.open(`https://etherscan.io/address/${walletAddress}`, '_blank')
            } else {
              alert('Please connect your wallet first')
            }
          }}>View Portfolio</button>
        </div>
      </div>
    </section>
  )
}
