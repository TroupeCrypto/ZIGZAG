/**
 * NFT Generator Functionality
 * 
 * Canvas-based generative art system for creating unique NFT artwork.
 * Supports 4 art styles (Psychedelic, Abstract, Geometric, Cyberpunk)
 * with 4 color schemes and adjustable complexity.
 * 
 * @author ZIG ZAG
 * @version 1.0.0
 * @license MIT
 */

/**
 * Initialize NFT generator when DOM is loaded
 * @listens DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('nft-canvas');
    const ctx = canvas ? canvas.getContext('2d') : null;
    const artStyleSelect = document.getElementById('art-style');
    const colorSchemeSelect = document.getElementById('color-scheme');
    const complexitySlider = document.getElementById('complexity');
    const generateBtn = document.querySelector('.btn-generate');
    const mintBtn = document.querySelector('.btn-mint');
    
    let currentNFT = null;
    
    if (!canvas) return;
    
    // Initialize canvas with initial state
    drawInitialCanvas();
    
    // Color schemes
    const colorSchemes = {
        'Rainbow': ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'],
        'Neon': ['#ff006e', '#fb5607', '#ffbe0b', '#8338ec', '#3a86ff'],
        'Pastel': ['#ffc8dd', '#ffafcc', '#bde0fe', '#a2d2ff', '#cdb4db'],
        'Dark': ['#1a1a2e', '#16213e', '#0f3460', '#533483', '#e94560']
    };
    
    /**
     * Draw initial canvas state
     */
    function drawInitialCanvas() {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(0.5, '#16213e');
        gradient.addColorStop(1, '#0f3460');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid pattern
        ctx.strokeStyle = 'rgba(255, 0, 255, 0.2)';
        ctx.lineWidth = 1;
        for (let i = 0; i < canvas.width; i += 25) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
        }
        for (let i = 0; i < canvas.height; i += 25) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
            ctx.stroke();
        }
    }
    
    /**
     * Generate NFT artwork based on selected parameters
     */
    function generateNFT() {
        const artStyle = artStyleSelect.value;
        const colorScheme = colorSchemeSelect.value;
        const complexity = complexitySlider.value;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const colors = colorSchemes[colorScheme];
        
        switch(artStyle) {
            case 'Psychedelic':
                drawPsychedelicArt(colors, complexity);
                break;
            case 'Abstract':
                drawAbstractArt(colors, complexity);
                break;
            case 'Geometric':
                drawGeometricArt(colors, complexity);
                break;
            case 'Cyberpunk':
                drawCyberpunkArt(colors, complexity);
                break;
        }
        
        currentNFT = {
            style: artStyle,
            colors: colorScheme,
            complexity: complexity,
            timestamp: Date.now()
        };
        
        mintBtn.disabled = false;
        
        if (window.psiloNotify) {
            window.psiloNotify('🎨', `Generated ${artStyle} NFT`);
        }
    }
    
    /**
     * Draw psychedelic art style
     * @param {Array<string>} colors - Color palette
     * @param {number} complexity - Complexity level (1-10)
     */
    function drawPsychedelicArt(colors, complexity) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const numCircles = complexity * 5;
        
        for (let i = 0; i < numCircles; i++) {
            const radius = (i + 1) * (250 / numCircles);
            const color = colors[i % colors.length];
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.strokeStyle = color;
            ctx.lineWidth = 3;
            ctx.stroke();
            
            // Add spirals
            for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;
                ctx.beginPath();
                ctx.arc(x, y, 10, 0, Math.PI * 2);
                ctx.fillStyle = colors[(i + 1) % colors.length];
                ctx.fill();
            }
        }
    }
    
    /**
     * Draw abstract art style
     * @param {Array<string>} colors - Color palette
     * @param {number} complexity - Complexity level (1-10)
     */
    function drawAbstractArt(colors, complexity) {
        const numShapes = complexity * 3;
        
        for (let i = 0; i < numShapes; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 100 + 50;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            ctx.fillStyle = color;
            ctx.globalAlpha = 0.6;
            
            if (Math.random() > 0.5) {
                ctx.fillRect(x, y, size, size);
            } else {
                ctx.beginPath();
                ctx.arc(x, y, size / 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        ctx.globalAlpha = 1;
    }
    
    /**
     * Draw geometric art style
     * @param {Array<string>} colors - Color palette
     * @param {number} complexity - Complexity level (1-10)
     */
    function drawGeometricArt(colors, complexity) {
        const gridSize = 10 - complexity;
        const cellWidth = canvas.width / gridSize;
        const cellHeight = canvas.height / gridSize;
        
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                const x = i * cellWidth;
                const y = j * cellHeight;
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                ctx.fillStyle = color;
                
                const shape = Math.floor(Math.random() * 3);
                if (shape === 0) {
                    ctx.fillRect(x, y, cellWidth, cellHeight);
                } else if (shape === 1) {
                    ctx.beginPath();
                    ctx.moveTo(x + cellWidth / 2, y);
                    ctx.lineTo(x + cellWidth, y + cellHeight);
                    ctx.lineTo(x, y + cellHeight);
                    ctx.closePath();
                    ctx.fill();
                } else {
                    ctx.beginPath();
                    ctx.arc(x + cellWidth / 2, y + cellHeight / 2, cellWidth / 2, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }
    }
    
    /**
     * Draw cyberpunk art style
     * @param {Array<string>} colors - Color palette
     * @param {number} complexity - Complexity level (1-10)
     */
    function drawCyberpunkArt(colors, complexity) {
        // Dark background
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Neon grid
        ctx.strokeStyle = colors[0];
        ctx.lineWidth = 2;
        const gridSpacing = 50 / complexity;
        
        for (let i = 0; i < canvas.width; i += gridSpacing) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
        }
        
        for (let i = 0; i < canvas.height; i += gridSpacing) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
            ctx.stroke();
        }
        
        // Glowing elements
        const numElements = complexity * 2;
        for (let i = 0; i < numElements; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 50 + 20;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            ctx.shadowBlur = 20;
            ctx.shadowColor = color;
            ctx.fillStyle = color;
            ctx.fillRect(x, y, size, size);
        }
        
        ctx.shadowBlur = 0;
    }
    
    /**
     * Mint NFT to blockchain
     * @async
     */
    async function mintNFT() {
        if (!currentNFT) return;
        
        if (typeof window.ethereum === 'undefined') {
            if (window.psiloNotify) {
                window.psiloNotify('⚠️', 'Please install MetaMask to mint NFTs');
            }
            return;
        }
        
        mintBtn.textContent = 'Minting...';
        mintBtn.disabled = true;
        
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const walletAddress = accounts[0];
            
            const imageData = canvas.toDataURL('image/png');
            
            const response = await fetch('/api/nft/mint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nftId: `zigzag-${Date.now()}`,
                    walletAddress: walletAddress
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                if (window.psiloNotify) {
                    window.psiloNotify('✅', `NFT minted! Token ID: #${result.tokenId}`);
                }
            } else {
                throw new Error(result.error || 'Minting failed');
            }
        } catch (error) {
            if (window.psiloNotify) {
                window.psiloNotify('❌', `Minting failed: ${error.message}`);
            }
        } finally {
            mintBtn.textContent = 'Mint to Blockchain';
            mintBtn.disabled = false;
        }
    }
    
    // Event listeners
    if (generateBtn) {
        generateBtn.addEventListener('click', generateNFT);
    }
    
    if (mintBtn) {
        mintBtn.addEventListener('click', mintNFT);
        mintBtn.disabled = true;
    }
    
    console.log('🎨 NFT Generator loaded');
});
