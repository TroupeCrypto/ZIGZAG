// ZIG ZAG Hub - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 ZIG ZAG Hub Loaded');
    
    // Initialize features
    initializeWalletConnect();
    initializeMusicPlayers();
    initializeArtGallery();
    initializeMarketplace();
    initializeSmoothScrolling();
    
    // Add entrance animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// Wallet Connection Feature
function initializeWalletConnect() {
    const connectButton = document.getElementById('connect-wallet');
    const walletStatus = document.getElementById('wallet-status');
    
    if (!connectButton || !walletStatus) return;
    
    connectButton.addEventListener('click', async function() {
        // Simulate wallet connection (in production, use Web3.js or ethers.js)
        walletStatus.textContent = 'Connecting...';
        connectButton.disabled = true;
        
        setTimeout(() => {
            if (typeof window.ethereum !== 'undefined') {
                walletStatus.textContent = 'Connected: 0x1234...5678';
                walletStatus.style.color = '#00ff00';
                connectButton.textContent = 'Disconnect';
                connectButton.disabled = false;
                showNotification('Wallet connected successfully! 🎉');
            } else {
                walletStatus.textContent = 'MetaMask not found';
                walletStatus.style.color = '#ff0000';
                connectButton.disabled = false;
                showNotification('Please install MetaMask to connect', 'error');
            }
        }, 1500);
    });
}

// Music Player Features
function initializeMusicPlayers() {
    const streamButtons = document.querySelectorAll('.btn-stream');
    const downloadButtons = document.querySelectorAll('.btn-download');
    const buyButtons = document.querySelectorAll('.btn-buy');
    
    streamButtons.forEach(button => {
        button.addEventListener('click', function() {
            const trackName = this.closest('.music-item').querySelector('h4').textContent;
            showNotification(`🎵 Streaming: ${trackName}`);
            animateButton(this);
        });
    });
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const trackName = this.closest('.music-item').querySelector('h4').textContent;
            showNotification(`⬇️ Downloading: ${trackName}`);
            animateButton(this);
        });
    });
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const trackName = this.closest('.music-item').querySelector('h4').textContent;
            showNotification(`🛒 Opening purchase page for: ${trackName}`);
            animateButton(this);
        });
    });
}

// Art Gallery Features
function initializeArtGallery() {
    const viewButtons = document.querySelectorAll('.btn-view');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const artName = this.closest('.art-piece').querySelector('h4').textContent;
            showArtModal(artName);
            animateButton(this);
        });
    });
}

// Marketplace Features
function initializeMarketplace() {
    const marketplaceButtons = document.querySelectorAll('.btn-marketplace');
    
    marketplaceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const marketplace = this.closest('.marketplace-card').querySelector('h3').textContent;
            showNotification(`Opening ${marketplace}...`);
            animateButton(this);
        });
    });
    
    // Initialize crypto buttons
    const cryptoButtons = document.querySelectorAll('.crypto-card .btn-primary');
    cryptoButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const action = this.closest('.crypto-card').querySelector('h3').textContent;
            showNotification(`Loading ${action}...`);
            animateButton(this);
        });
    });
}

// Smooth Scrolling for Navigation
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Add highlight effect
                targetSection.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    targetSection.style.transform = 'scale(1)';
                }, 300);
            }
        });
    });
}

// Utility Functions
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) {
        existingNotif.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? 'linear-gradient(135deg, #ff0000, #ff6b6b)' : 'linear-gradient(135deg, #00ff00, #00ffff)'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-weight: bold;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function animateButton(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
}

function showArtModal(artName) {
    const modal = document.createElement('div');
    modal.className = 'art-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        animation: fadeIn 0.3s ease-out;
    `;
    
    modal.innerHTML = `
        <div style="
            background: linear-gradient(135deg, #ff00ff, #00ffff);
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            max-width: 800px;
            animation: zoomIn 0.3s ease-out;
        ">
            <h2 style="margin-bottom: 20px; font-size: 2.5rem;">${artName}</h2>
            <div style="
                width: 600px;
                height: 600px;
                background: linear-gradient(45deg, #ff0080, #00ff80, #0080ff);
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 10rem;
                margin: 20px 0;
            ">🎨</div>
            <p style="margin: 20px 0; font-size: 1.2rem;">High-resolution artwork would be displayed here</p>
            <button onclick="this.closest('.art-modal').remove()" style="
                padding: 15px 40px;
                background: white;
                color: black;
                border: none;
                border-radius: 25px;
                font-weight: bold;
                cursor: pointer;
                font-size: 1.1rem;
            ">Close</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes zoomIn {
        from {
            transform: scale(0.5);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s infinite';
    showNotification('🎉 PSYCHEDELIC MODE ACTIVATED! 🌈');
    
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);
    
    setTimeout(() => {
        document.body.style.animation = '';
        rainbowStyle.remove();
    }, 10000);
}

console.log('💡 Tip: Try the Konami code for a surprise!');
