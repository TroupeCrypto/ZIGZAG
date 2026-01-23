'use client'

import { useState } from 'react'

export default function ArtGallery() {
  const [selectedArt, setSelectedArt] = useState(null)

  const artworks = [
    { id: 1, name: 'Cosmic Mandala', emoji: '🌈' },
    { id: 2, name: 'Digital Dreamscape', emoji: '🎨' },
    { id: 3, name: 'Neon Geometry', emoji: '✨' },
    { id: 4, name: 'Ethereal Visions', emoji: '🔮' },
    { id: 5, name: 'Psychedelic Waves', emoji: '🌟' },
    { id: 6, name: 'Abstract Realms', emoji: '💫' }
  ]

  const handleView = (art) => {
    setSelectedArt(art)
  }

  const closeModal = () => {
    setSelectedArt(null)
  }

  return (
    <>
      <section id="art" className="section art-section">
        <h2 className="section-title">Virtual Art Showcase</h2>
        <div className="gallery-grid">
          {artworks.map((art) => (
            <div key={art.id} className="art-piece">
              <div className="art-placeholder">
                <span>{art.emoji}</span>
              </div>
              <h4>{art.name}</h4>
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
            background: 'linear-gradient(135deg, #ff00ff, #00ffff)',
            padding: '40px',
            borderRadius: '20px',
            textAlign: 'center',
            maxWidth: '90vw',
            maxHeight: '90vh',
            animation: 'zoomIn 0.3s ease-out',
            overflow: 'auto'
          }}>
            <h2 style={{ marginBottom: '20px', fontSize: '2.5rem' }}>{selectedArt.name}</h2>
            <div style={{
              width: '100%',
              maxWidth: '600px',
              height: 'auto',
              aspectRatio: '1',
              maxHeight: '60vh',
              background: 'linear-gradient(45deg, #ff0080, #00ff80, #0080ff)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10rem',
              margin: '20px auto'
            }}>🎨</div>
            <p style={{ margin: '20px 0', fontSize: '1.2rem' }}>High-resolution artwork would be displayed here</p>
            <button onClick={closeModal} style={{
              padding: '15px 40px',
              background: 'white',
              color: 'black',
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
