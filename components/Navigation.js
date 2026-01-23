export default function Navigation() {
  const handleClick = (e, targetId) => {
    e.preventDefault()
    const targetSection = document.querySelector(targetId)
    
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
      
      // Add highlight effect
      targetSection.style.transform = 'scale(1.02)'
      setTimeout(() => {
        targetSection.style.transform = 'scale(1)'
      }, 300)
    }
  }

  return (
    <nav className="main-nav">
      <a href="#music" className="nav-link" onClick={(e) => handleClick(e, '#music')}>🎵 Music</a>
      <a href="#art" className="nav-link" onClick={(e) => handleClick(e, '#art')}>🎨 Art Gallery</a>
      <a href="#crypto" className="nav-link" onClick={(e) => handleClick(e, '#crypto')}>₿ Crypto</a>
      <a href="#webdev" className="nav-link" onClick={(e) => handleClick(e, '#webdev')}>💻 Web Dev</a>
      <a href="#marketplace" className="nav-link" onClick={(e) => handleClick(e, '#marketplace')}>🛒 Marketplace</a>
    </nav>
  )
}
