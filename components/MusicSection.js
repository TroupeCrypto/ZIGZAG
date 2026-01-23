'use client'

export default function MusicSection() {
  const showNotification = (message) => {
    // Simple notification - in production, use a toast library
    alert(message)
  }

  const handleAction = (action, trackName) => {
    const messages = {
      stream: `🎵 Streaming: ${trackName}`,
      download: `⬇️ Downloading: ${trackName}`,
      buy: `🛒 Opening purchase page for: ${trackName}`
    }
    showNotification(messages[action])
  }

  const musicData = {
    singles: [
      'Cosmic Waves',
      'Neon Dreams',
      'Electric Soul'
    ],
    mixtapes: [
      'Summer Vibes 2025',
      'Midnight Sessions'
    ],
    albums: [
      'Psychedelic Journey',
      'Digital Horizons'
    ]
  }

  return (
    <section id="music" className="section music-section">
      <h2 className="section-title">Music Collection</h2>
      <div className="content-grid">
        {Object.entries(musicData).map(([category, tracks]) => (
          <div key={category} className="category-card">
            <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
            <div className="item-list">
              {tracks.map((track) => (
                <div key={track} className="music-item">
                  <h4>{track}</h4>
                  <div className="actions">
                    <button className="btn-stream" onClick={() => handleAction('stream', track)}>Stream</button>
                    <button className="btn-download" onClick={() => handleAction('download', track)}>Download</button>
                    <button className="btn-buy" onClick={() => handleAction('buy', track)}>Buy</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
