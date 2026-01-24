'use client'

import { useState, useEffect } from 'react'

export default function MusicSection() {
  const [musicData, setMusicData] = useState({
    singles: [],
    albums: [],
    eps: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load music data from API or use actual discography
    const loadMusicData = async () => {
      try {
        const response = await fetch('/api/music')
        if (response.ok) {
          const data = await response.json()
          setMusicData(data)
        } else {
          // Actual ZIG ZAG discography from Troupe Inc.
          setMusicData({
            singles: [
              { id: 1, name: 'Iso', year: '2021', streamUrl: 'https://www.youtube.com/watch?v=7yw78F_0r_c' },
              { id: 2, name: 'Red Pills / Blue Pills', year: '2020', streamUrl: 'https://www.youtube.com/watch?v=Ruk5JDBFfEQ' },
              { id: 3, name: 'Told You So', year: '2019', streamUrl: 'https://www.youtube.com/watch?v=lkAPGTT7k6E' }
            ],
            albums: [
              { id: 4, name: 'MYTH: Created', year: '2025', streamUrl: 'https://www.troupeinc.com/pages/discography-zig-zag', upcoming: true },
              { id: 5, name: 'V8R', year: '2020', streamUrl: 'https://www.troupeinc.com/pages/discography-zig-zag' }
            ],
            eps: [
              { id: 6, name: 'The Rabbit Hole EP', year: '2019', streamUrl: 'https://www.troupeinc.com/pages/discography-zig-zag' }
            ]
          })
        }
      } catch (error) {
        console.error('Failed to load music data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadMusicData()
  }, [])

  const handleStream = (track) => {
    if (track.streamUrl) {
      window.open(track.streamUrl, '_blank')
    }
  }

  const handleTroupeInc = () => {
    window.open('https://www.troupeinc.com/pages/discography-zig-zag', '_blank')
  }

  const handleYouTube = () => {
    window.open('https://www.youtube.com/@ZigZagTroupe', '_blank')
  }

  const handleTikTok = () => {
    window.open('https://www.tiktok.com/@zigzagtroupe', '_blank')
  }

  if (loading) {
    return (
      <section id="music" className="section music-section">
        <h2 className="section-title">Music Collection</h2>
        <p style={{ textAlign: 'center' }}>Loading discography...</p>
      </section>
    )
  }

  return (
    <section id="music" className="section music-section">
      <h2 className="section-title">Music Collection</h2>
      
      <div className="streaming-platforms" style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <button onClick={handleTroupeInc} className="btn-platform">Troupe Inc.</button>
        <button onClick={handleYouTube} className="btn-platform">YouTube</button>
        <button onClick={handleTikTok} className="btn-platform">TikTok</button>
      </div>
      
      <div className="content-grid">
        <div className="category-card">
          <h3>Singles</h3>
          <div className="item-list">
            {musicData.singles.map((track) => (
              <div key={track.id} className="music-item">
                <h4>{track.name}</h4>
                {track.year && <span className="track-year">{track.year}</span>}
                <div className="actions">
                  <button className="btn-stream" onClick={() => handleStream(track)}>Stream</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="category-card">
          <h3>Albums</h3>
          <div className="item-list">
            {musicData.albums.map((track) => (
              <div key={track.id} className="music-item">
                <h4>{track.name} {track.upcoming && <span style={{ color: '#ff00ff', fontSize: '0.8em' }}>(Coming Soon)</span>}</h4>
                {track.year && <span className="track-year">{track.year}</span>}
                <div className="actions">
                  <button className="btn-stream" onClick={() => handleStream(track)}>
                    {track.upcoming ? 'Preview' : 'Stream'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="category-card">
          <h3>EPs</h3>
          <div className="item-list">
            {musicData.eps.map((track) => (
              <div key={track.id} className="music-item">
                <h4>{track.name}</h4>
                {track.year && <span className="track-year">{track.year}</span>}
                <div className="actions">
                  <button className="btn-stream" onClick={() => handleStream(track)}>Stream</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <a href="https://www.troupeinc.com/pages/discography-zig-zag" target="_blank" rel="noopener noreferrer" className="btn-primary">
          View Full Discography on Troupe Inc.
        </a>
      </div>
    </section>
  )
}
