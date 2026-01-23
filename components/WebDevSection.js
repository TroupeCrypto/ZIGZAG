'use client'

export default function WebDevSection() {
  return (
    <section id="webdev" className="section webdev-section">
      <h2 className="section-title">Web Development</h2>
      <div className="dev-container">
        <div className="code-showcase">
          <h3>Public Repositories</h3>
          <ul className="repo-list">
            <li>
              <a href="https://github.com/TroupeCrypto/ZIGZAG" target="_blank" rel="noopener noreferrer">
                🔓 ZIGZAG Hub - This Website
              </a>
            </li>
            <li>
              <span>🔓 ZIG-ZAG-Tools - Utility Scripts</span>
            </li>
            <li>
              <span>🔓 Psychedelic-UI - Design System</span>
            </li>
          </ul>
        </div>
        <div className="code-showcase">
          <h3>Private Projects</h3>
          <ul className="repo-list">
            <li><span>🔒 Advanced Audio Engine</span></li>
            <li><span>🔒 Crypto Trading Bots</span></li>
            <li><span>🔒 NFT Minting Platform</span></li>
          </ul>
        </div>
        <div className="skills-grid">
          <div className="skill-tag">JavaScript</div>
          <div className="skill-tag">Python</div>
          <div className="skill-tag">Solidity</div>
          <div className="skill-tag">Web3</div>
          <div className="skill-tag">React</div>
          <div className="skill-tag">Node.js</div>
          <div className="skill-tag">Smart Contracts</div>
          <div className="skill-tag">API Development</div>
        </div>
      </div>
    </section>
  )
}
