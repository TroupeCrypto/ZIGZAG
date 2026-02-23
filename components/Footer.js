export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer>
      <p>&copy; {currentYear} ZIG ZAG. All rights reserved.</p>
      <div className="social-links">
        <a href="https://twitter.com/zigzag" target="_blank" rel="noopener noreferrer" className="social-link">Twitter</a>
        <a href="https://instagram.com/zigzag" target="_blank" rel="noopener noreferrer" className="social-link">Instagram</a>
        <a href="https://open.spotify.com/artist/zigzag" target="_blank" rel="noopener noreferrer" className="social-link">Spotify</a>
        <a href="https://github.com/TroupeCrypto/ZIGZAG" target="_blank" rel="noopener noreferrer" className="social-link">GitHub</a>
      </div>
    </footer>
  )
}
