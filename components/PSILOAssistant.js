'use client'

import { useState, useRef, useEffect } from 'react'

export default function PSILOAssistant() {
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
  const [currentTrack, setCurrentTrack] = useState(null)
  
  const containerRef = useRef(null)
  const audioRef = useRef(null)

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
      setCurrentTrack('Iso')
      addNotification('🎵', 'Started playing Iso')
    }
  }

  const handleWalletConnect = async () => {
    setWalletStatus('Connecting...')
    try {
      if (typeof window === 'undefined' || typeof window.ethereum === 'undefined') {
        setWalletStatus('MetaMask not found')
        addNotification('⚠️', 'Please install MetaMask')
        return
      }
      
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      
      if (accounts.length > 0) {
        const address = accounts[0]
        const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`
        
        const { ethers } = await import('ethers')
        const provider = new ethers.BrowserProvider(window.ethereum)
        const balance = await provider.getBalance(address)
        const ethBalance = ethers.formatEther(balance)
        
        setWalletStatus('Connected')
        setWalletConnected(true)
        setWalletBalance({ 
          eth: `${parseFloat(ethBalance).toFixed(4)} ETH`, 
          address: shortAddress 
        })
        loadUserNFTs(address)
        addNotification('💳', 'Wallet connected successfully')
      }
    } catch (error) {
      setWalletStatus('Connection failed')
      addNotification('⚠️', `Connection failed: ${error.message}`)
    }
  }

  const loadUserNFTs = async (address) => {
    try {
      // Fetch user's NFTs from blockchain or API
      // For now, show empty state until real NFTs are loaded
      setNfts([])
      addNotification('🖼️', 'NFT gallery ready - mint or purchase NFTs to see them here')
    } catch (error) {
      console.error('Failed to load NFTs:', error)
    }
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
      id="psilo-container" 
      className={`psilo-container ${isMinimized ? 'minimized' : ''} ${isMaximized ? 'maximized' : ''} ${isDragging ? 'dragging' : ''}`}
      style={containerStyle}
    >
      <div 
        className="psilo-header"
        onMouseDown={handleMouseDown}
      >
        <div className="psilo-avatar">🍄</div>
        <span className="psilo-title">PSILO Assistant</span>
        <div className="psilo-controls">
          <button id="psilo-minimize" className="psilo-btn" onClick={handleMinimize}>
            {isMinimized ? '+' : '−'}
          </button>
          <button id="psilo-maximize" className="psilo-btn" onClick={handleMaximize}>
            {isMaximized ? '⊟' : '□'}
          </button>
        </div>
      </div>
      {!isMinimized && (
        <div className="psilo-content">
          <div className="psilo-tabs">
            <button 
              className={`psilo-tab ${activeTab === 'music' ? 'active' : ''}`}
              onClick={() => handleTabChange('music')}
            >
              🎵 Music
            </button>
            <button 
              className={`psilo-tab ${activeTab === 'wallet' ? 'active' : ''}`}
              onClick={() => handleTabChange('wallet')}
            >
              💳 Wallet
            </button>
            <button 
              className={`psilo-tab ${activeTab === 'nft' ? 'active' : ''}`}
              onClick={() => handleTabChange('nft')}
            >
              🖼️ NFT
            </button>
            <button 
              className={`psilo-tab ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => handleTabChange('notifications')}
            >
              🔔 Alerts
            </button>
          </div>
          
          {activeTab === 'music' && (
            <div className="psilo-panel active" id="music-panel">
              <h3>Music Player</h3>
              <div className="music-player">
                <div className="now-playing">
                  {isPlaying && currentTrack ? `Now Playing: ${currentTrack}` : 'Select a track to play'}
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
            <div className="psilo-panel active" id="wallet-panel">
              <h3>Wallet</h3>
              <div className="wallet-info">
                <div className="wallet-status">{walletStatus}</div>
                <button className="psilo-wallet-connect" onClick={handleWalletConnect}>
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
            <div className="psilo-panel active" id="nft-panel">
              <h3>Your NFTs</h3>
              <div className="nft-gallery">
                {nfts.length === 0 ? (
                  <p className="empty-state">{walletConnected ? 'No NFTs found in wallet' : 'Connect wallet to view NFTs'}</p>
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
            <div className="psilo-panel active" id="notifications-panel">
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
