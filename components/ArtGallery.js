'use client'

import { useState } from 'react'

export default function ArtGallery() {
  const [selectedArt, setSelectedArt] = useState(null)
  const [imageError, setImageError] = useState({})
  const [modalImageError, setModalImageError] = useState(false)

  const artworks = [
    { id: 1, name: 'Cosmic Mandala', image: '/art/cosmic-mandala.png', artist: 'ZIG ZAG' },
    { id: 2, name: 'Digital Dreamscape', image: '/art/digital-dreamscape.png', artist: 'ZIG ZAG' },
    { id: 3, name: 'Neon Geometry', image: '/art/neon-geometry.png', artist: 'ZIG ZAG' },
    { id: 4, name: 'Ethereal Visions', image: '/art/ethereal-visions.png', artist: 'ZIG ZAG' },
    { id: 5, name: 'Psychedelic Waves', image: '/art/psychedelic-waves.png', artist: 'ZIG ZAG' },
    { id: 6, name: 'Abstract Realms', image: '/art/abstract-realms.png', artist: 'ZIG ZAG' }
  ]

  const handleView = (art) => {
    setSelectedArt(art)
    setModalImageError(false)
  }

  const closeModal = () => {
    setSelectedArt(null)
    setModalImageError(false)
  }

  const handleImageError = (artId) => {
    setImageError(prev => ({ ...prev, [artId]: true }))
  }

  return (
    <>
      <section id="art" className="section art-section">
        <h2 className="section-title">Virtual Art Showcase</h2>
        <div className="gallery-grid">
          {artworks.map((art) => (
            <div key={art.id} className="art-piece">
              <div className="art-image-container">
                {!imageError[art.id] ? (
                  <img 
                    src={art.image} 
                    alt={art.name}
                    onError={() => handleImageError(art.id)}
                  />
                ) : (
                  <div className="art-fallback" style={{ display: 'flex', background: 'linear-gradient(135deg, #ff00ff, #00ffff)', width: '100%', height: '200px', alignItems: 'center', justifyContent: 'center', borderRadius: '10px' }}>
                    <span style={{ fontSize: '3rem' }}>🎨</span>
                  </div>
                )}
              </div>
              <h4>{art.name}</h4>
              <p className="artist-name">by {art.artist}</p>
              <button className="btn-view" onClick={() => handleView(art)}>View Full Size</button>
            </div>
          ))}
        </div>
      </section>

      {selectedArt && (
        <div 
          className="art-modal"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.95)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            animation: 'fadeIn 0.3s ease-out'
          }}
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div style={{
            background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
            padding: '40px',
            borderRadius: '20px',
            textAlign: 'center',
            maxWidth: '90vw',
            maxHeight: '90vh',
            animation: 'zoomIn 0.3s ease-out',
            overflow: 'auto',
            border: '2px solid rgba(255, 0, 255, 0.5)'
          }}>
            <h2 style={{ marginBottom: '20px', fontSize: '2.5rem', color: '#fff' }}>{selectedArt.name}</h2>
            <p style={{ color: '#ccc', marginBottom: '20px' }}>by {selectedArt.artist}</p>
            <div style={{
              width: '100%',
              maxWidth: '600px',
              height: 'auto',
              maxHeight: '60vh',
              margin: '20px auto',
              borderRadius: '10px',
              overflow: 'hidden'
            }}>
              {!modalImageError ? (
                <img 
                  src={selectedArt.image} 
                  alt={selectedArt.name}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  onError={() => setModalImageError(true)}
                />
              ) : (
                <div style={{ width: '100%', height: '400px', background: 'linear-gradient(45deg, #ff0080, #00ff80, #0080ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8rem' }}>🎨</div>
              )}
            </div>
            <button onClick={closeModal} style={{
              padding: '15px 40px',
              background: 'linear-gradient(135deg, #ff00ff, #00ffff)',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1.1rem'
            }}>Close</button>
          </div>
        </div>
      )}
    </>
  )
}
