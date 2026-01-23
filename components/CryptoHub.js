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

  const drawPlaceholder = (ctx, canvas) => {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, '#ff00ff')
    gradient.addColorStop(0.5, '#00ffff')
    gradient.addColorStop(1, '#ffff00')
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
    ctx.font = '24px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('Click Generate to create NFT', canvas.width / 2, canvas.height / 2)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      drawPlaceholder(ctx, canvas)
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
        alert(`Generated ${artStyle} NFT with ${colorScheme} colors!\n\n⚠️ Demo: This is a simulated NFT generator.`)
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

  const mintNFT = () => {
    alert('⚠️ Demo Mode: Minting NFT to blockchain...\n\nNote: This is a simulated minting process for demonstration purposes only.')
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
    alert('Contract code copied to clipboard!\n\n⚠️ Demo: Please review and test before deployment.')
  }

  const deployContract = () => {
    alert('⚠️ Demo Mode: Deploying contract to network...\n\nNote: This is a simulated deployment for demonstration purposes only.')
  }

  const connectWallet = async () => {
    setWalletStatus('Connecting...')
    setTimeout(() => {
      if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
        setWalletStatus('Connected: 0x1234...5678')
        setWalletConnected(true)
        alert('⚠️ Demo Mode: Wallet connected successfully! 🎉\n\nNote: This is a simulated connection for demonstration purposes only.')
      } else {
        setWalletStatus('MetaMask not found')
        alert('Please install MetaMask to connect.\n\nNote: This is currently a demo feature.')
      }
    }, 1500)
  }

  return (
    <section id="crypto" className="section crypto-section">
      <h2 className="section-title">Crypto Hub</h2>
      <div style={{ textAlign: 'center', marginBottom: '20px', padding: '10px', background: 'rgba(255, 193, 7, 0.1)', borderRadius: '10px', border: '1px solid rgba(255, 193, 7, 0.3)' }}>
        <p style={{ margin: 0, color: '#ffc107' }}>⚠️ Demo Mode: Features shown are simulated for demonstration purposes</p>
      </div>
      
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
            <button className="btn-mint" onClick={mintNFT}>Mint to Blockchain</button>
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
              <button className="btn-deploy-contract" onClick={deployContract}>Deploy to Network</button>
            </div>
          )}
        </div>
      </div>
      
      <div className="crypto-grid">
        <div className="crypto-card">
          <h3>NFT Collections</h3>
          <p>Explore exclusive digital collectibles and NFT art pieces</p>
          <button className="btn-primary" onClick={() => alert('Browse NFTs (Demo feature)')}>Browse NFTs</button>
        </div>
        <div className="crypto-card">
          <h3>Wallet Connect</h3>
          <div id="wallet-status" className="wallet-status">{walletStatus}</div>
          <button 
            id="connect-wallet" 
            className="btn-primary"
            onClick={connectWallet}
          >
            {walletConnected ? 'Disconnect (Demo)' : 'Connect Wallet (Demo)'}
          </button>
        </div>
        <div className="crypto-card">
          <h3>Token Info</h3>
          <p>ZIG ZAG Token (ZZT) - Official artist token</p>
          <button className="btn-primary" onClick={() => alert('Learn More (Demo feature)')}>Learn More</button>
        </div>
        <div className="crypto-card">
          <h3>Blockchain Portfolio</h3>
          <p>View on-chain assets and transactions</p>
          <button className="btn-primary" onClick={() => alert('View Portfolio (Demo feature)')}>View Portfolio</button>
        </div>
      </div>
    </section>
  )
}
