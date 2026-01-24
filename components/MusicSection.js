'use client'

import { useState, useEffect } from 'react'

export default function MusicSection() {
  const [musicData, setMusicData] = useState({
    singles: [],
    albums: [],
    features: []
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
              { id: 1, name: 'Therapy Pt. 1', year: '2026', streamUrl: 'https://music.apple.com/us/artist/zig-zag/1423934868' },
              { id: 2, name: 'Iso', year: '2021', streamUrl: 'https://www.youtube.com/watch?v=7yw78F_0r_c' },
              { id: 3, name: 'Come Back to Me', year: '2020', streamUrl: 'https://music.apple.com/us/artist/zig-zag/1423934868' },
              { id: 4, name: 'So Beautiful', year: '2019', streamUrl: 'https://music.apple.com/us/artist/zig-zag/1423934868' },
              { id: 5, name: 'Stimulated', year: '2018', streamUrl: 'https://music.apple.com/us/artist/zig-zag/1423934868' }
            ],
            albums: [
              { id: 6, name: 'Still Makin Paper', year: '2022', streamUrl: 'https://music.apple.com/us/artist/zig-zag/1423934868' },
              { id: 7, name: 'My Love Dedication', year: '2020', streamUrl: 'https://music.apple.com/us/artist/zig-zag/1423934868' },
              { id: 8, name: 'Slow Rida', year: '2018', streamUrl: 'https://music.apple.com/us/artist/zig-zag/1423934868' },
              { id: 9, name: 'The Collection', year: '2017', streamUrl: 'https://music.apple.com/us/artist/zig-zag/1423934868' },
              { id: 10, name: 'Best Of (Vol. 1)', year: '2012', streamUrl: 'https://music.apple.com/us/artist/zig-zag/1423934868' },
              { id: 11, name: 'Straight Rydaz: Better Than Money Pt. 1', year: '2012', streamUrl: 'https://music.apple.com/us/artist/zig-zag/1423934868' }
            ],
            features: [
              { id: 12, name: 'Butterfly (feat. Johnny C, Paige & Rigo Luna)', streamUrl: 'https://music.apple.com/us/artist/zig-zag/1423934868' },
              { id: 13, name: 'Anything (feat. Traincity & Simes Carter)', streamUrl: 'https://music.apple.com/us/artist/zig-zag/1423934868' },
              { id: 14, name: 'Foe No Reason', streamUrl: 'https://music.apple.com/us/artist/zig-zag/1423934868' },
              { id: 15, name: 'Treat You Right (feat. Selo)', streamUrl: 'https://music.apple.com/us/artist/zig-zag/1423934868' },
              { id: 16, name: 'Picture Perfect (feat. Robby D.)', streamUrl: 'https://music.apple.com/us/artist/zig-zag/1423934868' },
              { id: 17, name: 'Show You Somethin\' (feat. Brown Boy & Dave Abrego)', streamUrl: 'https://music.apple.com/us/artist/zig-zag/1423934868' },
              { id: 18, name: 'Down (feat. Marty Obey)', streamUrl: 'https://music.apple.com/us/artist/zig-zag/1423934868' },
              { id: 19, name: 'Crusin\' (feat. D. Salas)', streamUrl: 'https://music.apple.com/us/artist/zig-zag/1423934868' }
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

  const handleAppleMusic = () => {
    window.open('https://music.apple.com/us/artist/zig-zag/1423934868', '_blank')
  }

  const handleSpotify = () => {
    window.open('https://open.spotify.com/artist/zigzag', '_blank')
  }

  const handleYouTube = () => {
    window.open('https://music.youtube.com/channel/UCxVTt8GpIwCoFPK6DVFQMmw', '_blank')
  }

  const handleAmazon = () => {
    window.open('https://music.amazon.com/artists/B000QK9ST8/zig-zag', '_blank')
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
        <button onClick={handleAppleMusic} className="btn-platform">Apple Music</button>
        <button onClick={handleSpotify} className="btn-platform">Spotify</button>
        <button onClick={handleYouTube} className="btn-platform">YouTube Music</button>
        <button onClick={handleAmazon} className="btn-platform">Amazon Music</button>
      </div>
      
      <div className="content-grid">
        <div className="category-card">
          <h3>Singles & RAW Tracks</h3>
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
          <h3>Features & Collaborations</h3>
          <div className="item-list">
            {musicData.features.map((track) => (
              <div key={track.id} className="music-item">
                <h4>{track.name}</h4>
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
