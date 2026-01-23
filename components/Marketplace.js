'use client'

import { useState } from 'react'

export default function Marketplace() {
  const [viewType, setViewType] = useState('public')

  const handleToggle = (type) => {
    setViewType(type)
    const message = type === 'public' ? '🔓 Viewing Public Marketplace' : '🔒 Viewing Private IP Marketplace'
    console.log(message)
  }

  const handleMarketplaceClick = (marketplace) => {
    alert(`Opening ${marketplace}...`)
  }

  return (
    <section id="marketplace" className="section marketplace-section">
      <h2 className="section-title">Marketplaces</h2>
      
      {/* Public vs Private Toggle */}
      <div className="marketplace-toggle">
        <button 
          className={`toggle-btn ${viewType === 'public' ? 'active' : ''}`}
          onClick={() => handleToggle('public')}
        >
          🔓 Public Marketplace
        </button>
        <button 
          className={`toggle-btn ${viewType === 'private' ? 'active' : ''}`}
          onClick={() => handleToggle('private')}
        >
          🔒 Private IP
        </button>
      </div>
      
      {viewType === 'public' && (
        <div className="marketplace-grid public-marketplace">
          <div className="marketplace-card">
            <h3>🎵 Music Store</h3>
            <p>Purchase and download exclusive tracks, beats, and albums</p>
            <ul>
              <li>High-quality WAV/MP3</li>
              <li>Exclusive releases</li>
              <li>Instant download</li>
            </ul>
            <button className="btn-marketplace" onClick={() => handleMarketplaceClick('Music Store')}>
              Browse Music
            </button>
          </div>
          <div className="marketplace-card">
            <h3>🎨 Art Marketplace</h3>
            <p>Buy digital art prints and commissions</p>
            <ul>
              <li>Custom designs</li>
              <li>High-res downloads</li>
              <li>Commercial licenses</li>
            </ul>
            <button className="btn-marketplace" onClick={() => handleMarketplaceClick('Art Marketplace')}>
              Browse Art
            </button>
          </div>
          <div className="marketplace-card">
            <h3>🏪 NFT Marketplace</h3>
            <p>Trade exclusive NFT collections on blockchain</p>
            <ul>
              <li>OpenSea</li>
              <li>Rarible</li>
              <li>Foundation</li>
            </ul>
            <button className="btn-marketplace" onClick={() => handleMarketplaceClick('NFT Marketplace')}>
              View NFTs
            </button>
          </div>
          <div className="marketplace-card">
            <h3>💼 Services</h3>
            <p>Commission custom work and collaborations</p>
            <ul>
              <li>Music production</li>
              <li>Graphic design</li>
              <li>Web development</li>
            </ul>
            <button className="btn-marketplace" onClick={() => handleMarketplaceClick('Services')}>
              Get Quote
            </button>
          </div>
        </div>
      )}
      
      {/* Private IP Marketplace */}
      {viewType === 'private' && (
        <div className="marketplace-grid private-marketplace">
          <div className="marketplace-card private-card">
            <h3>🔐 Proprietary NFT Engine</h3>
            <p>Advanced NFT generation algorithms and intellectual property</p>
            <ul>
              <li>AI-powered generation</li>
              <li>Custom smart contracts</li>
              <li>Exclusive access</li>
            </ul>
            <button className="btn-marketplace" onClick={() => handleMarketplaceClick('NFT Engine')}>
              Request Access
            </button>
          </div>
          <div className="marketplace-card private-card">
            <h3>🔐 Trading Algorithms</h3>
            <p>Proprietary crypto trading bots and strategies</p>
            <ul>
              <li>Advanced ML models</li>
              <li>Real-time analysis</li>
              <li>Premium features</li>
            </ul>
            <button className="btn-marketplace" onClick={() => handleMarketplaceClick('Trading Algorithms')}>
              Request Access
            </button>
          </div>
          <div className="marketplace-card private-card">
            <h3>🔐 Custom Solutions</h3>
            <p>Bespoke development and consulting</p>
            <ul>
              <li>One-on-one consultation</li>
              <li>Tailored development</li>
              <li>Full support</li>
            </ul>
            <button className="btn-marketplace" onClick={() => handleMarketplaceClick('Custom Solutions')}>
              Get Quote
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
