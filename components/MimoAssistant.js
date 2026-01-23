'use client'

import { useState, useRef, useEffect } from 'react'

export default function MimoAssistant() {
  const [isMinimized, setIsMinimized] = useState(true)
  const [isMaximized, setIsMaximized] = useState(false)
  const [activeTab, setActiveTab] = useState('music')
  const [isPlaying, setIsPlaying] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletStatus, setWalletStatus] = useState('Not Connected')
  const [walletBalance, setWalletBalance] = useState({ eth: '0 ETH', address: '-' })
  const [notifications, setNotifications] = useState([
    { icon: '🎉', text: 'Welcome to ZIG ZAG Hub!' }
  ])
  const [nfts, setNfts] = useState([])
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  
  const containerRef = useRef(null)

  const handleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const handleMaximize = () => {
    setIsMaximized(!isMaximized)
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying) {
      addNotification('🎵', 'Started playing Cosmic Waves')
    }
  }

  const handleWalletConnect = async () => {
    setWalletStatus('Connecting...')
    setTimeout(() => {
      if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
        setWalletStatus('Connected')
        setWalletConnected(true)
        setWalletBalance({ eth: '2.45 ETH', address: '0x1234...5678' })
        loadUserNFTs()
        addNotification('💳', 'Wallet connected successfully')
      } else {
        setWalletStatus('MetaMask not found')
        addNotification('⚠️', 'Please install MetaMask')
      }
    }, 1500)
  }

  const loadUserNFTs = () => {
    const emojis = ['🎨', '🌈', '✨', '🔮', '🌟', '💫']
    setNfts(emojis.map((emoji, index) => ({ id: index, emoji })))
  }

  const addNotification = (icon, text) => {
    setNotifications(prev => [{ icon, text }, ...prev].slice(0, 10))
  }

  const handleMouseDown = (e) => {
    if (isMinimized || isMaximized) return
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    })
  }

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e) => {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragStart, position])

  const containerStyle = {
    transform: !isMaximized ? `translate(${position.x}px, ${position.y}px)` : undefined
  }

  return (
    <div 
      ref={containerRef}
      id="mimo-container" 
      className={`mimo-container ${isMinimized ? 'minimized' : ''} ${isMaximized ? 'maximized' : ''} ${isDragging ? 'dragging' : ''}`}
      style={containerStyle}
    >
      <div 
        className="mimo-header"
        onMouseDown={handleMouseDown}
      >
        <div className="mimo-avatar">🎭</div>
        <span className="mimo-title">Mimo Assistant</span>
        <div className="mimo-controls">
          <button id="mimo-minimize" className="mimo-btn" onClick={handleMinimize}>
            {isMinimized ? '+' : '−'}
          </button>
          <button id="mimo-maximize" className="mimo-btn" onClick={handleMaximize}>
            {isMaximized ? '⊟' : '□'}
          </button>
        </div>
      </div>
      {!isMinimized && (
        <div className="mimo-content">
          <div className="mimo-tabs">
            <button 
              className={`mimo-tab ${activeTab === 'music' ? 'active' : ''}`}
              onClick={() => handleTabChange('music')}
            >
              🎵 Music
            </button>
            <button 
              className={`mimo-tab ${activeTab === 'wallet' ? 'active' : ''}`}
              onClick={() => handleTabChange('wallet')}
            >
              💳 Wallet
            </button>
            <button 
              className={`mimo-tab ${activeTab === 'nft' ? 'active' : ''}`}
              onClick={() => handleTabChange('nft')}
            >
              🖼️ NFT
            </button>
            <button 
              className={`mimo-tab ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => handleTabChange('notifications')}
            >
              🔔 Alerts
            </button>
          </div>
          
          {activeTab === 'music' && (
            <div className="mimo-panel active" id="music-panel">
              <h3>Music Player</h3>
              <div className="music-player">
                <div className="now-playing">
                  {isPlaying ? 'Now Playing: Cosmic Waves' : 'No track loaded'}
                </div>
                <div className="player-controls">
                  <button className="player-btn">⏮️</button>
                  <button className="player-btn play-btn" onClick={handlePlayPause}>
                    {isPlaying ? '⏸️' : '▶️'}
                  </button>
                  <button className="player-btn">⏭️</button>
                </div>
                <input type="range" className="volume-slider" min="0" max="100" defaultValue="70" />
              </div>
            </div>
          )}
          
          {activeTab === 'wallet' && (
            <div className="mimo-panel active" id="wallet-panel">
              <h3>Wallet</h3>
              <div className="wallet-info">
                <div className="wallet-status">{walletStatus}</div>
                <button className="mimo-wallet-connect" onClick={handleWalletConnect}>
                  {walletConnected ? 'Disconnect' : 'Connect Wallet'}
                </button>
                {walletConnected && (
                  <div className="wallet-balance" style={{ display: 'block' }}>
                    <p>Balance: <span id="eth-balance">{walletBalance.eth}</span></p>
                    <p>Address: <span id="wallet-address">{walletBalance.address}</span></p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'nft' && (
            <div className="mimo-panel active" id="nft-panel">
              <h3>Your NFTs</h3>
              <div className="nft-gallery">
                {nfts.length === 0 ? (
                  <p className="empty-state">Connect wallet to view NFTs</p>
                ) : (
                  nfts.map(nft => (
                    <div 
                      key={nft.id} 
                      className="nft-item"
                      onClick={() => addNotification('🖼️', `Viewing NFT #${nft.id + 1}`)}
                    >
                      {nft.emoji}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div className="mimo-panel active" id="notifications-panel">
              <h3>Notifications</h3>
              <div className="notifications-list">
                {notifications.map((notif, index) => (
                  <div key={index} className="notification-item">
                    <span className="notif-icon">{notif.icon}</span>
                    <span className="notif-text">{notif.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
