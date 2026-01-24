/**
 * Mimo Persistent Modal/Dashboard Functionality
 * 
 * Handles the floating Mimo assistant modal that persists across all pages.
 * Features include minimize/maximize, dragging, tab switching, music player,
 * wallet connection, NFT gallery, and notifications.
 * 
 * @author ZIG ZAG
 * @version 1.0.0
 * @license MIT
 */

/**
 * Initialize Mimo modal functionality when DOM is loaded
 * @listens DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', function() {
    const mimoContainer = document.getElementById('mimo-container');
    const mimoMinimize = document.getElementById('mimo-minimize');
    const mimoMaximize = document.getElementById('mimo-maximize');
    const mimoHeader = document.querySelector('.mimo-header');
    const mimoTabs = document.querySelectorAll('.mimo-tab');
    const mimoPanels = document.querySelectorAll('.mimo-panel');
    
    let isDragging = false;
    let currentX, currentY, initialX, initialY;
    let xOffset = 0, yOffset = 0;
    
    // Minimize/Maximize functionality
    mimoMinimize.addEventListener('click', function() {
        mimoContainer.classList.toggle('minimized');
        this.textContent = mimoContainer.classList.contains('minimized') ? '+' : '−';
    });
    
    mimoMaximize.addEventListener('click', function() {
        mimoContainer.classList.toggle('maximized');
        this.textContent = mimoContainer.classList.contains('maximized') ? '⊟' : '□';
    });
    
    // Tab switching
    mimoTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            mimoTabs.forEach(t => t.classList.remove('active'));
            mimoPanels.forEach(p => p.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(`${targetTab}-panel`).classList.add('active');
        });
    });
    
    // Dragging functionality
    mimoHeader.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);
    
    /**
     * Initialize dragging functionality for Mimo modal
     * @param {MouseEvent} e - Mouse event
     */
    function dragStart(e) {
        if (mimoContainer.classList.contains('minimized')) return;
        
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        
        if (e.target === mimoHeader || mimoHeader.contains(e.target)) {
            isDragging = true;
            mimoContainer.classList.add('dragging');
        }
    }
    
    /**
     * Handle drag movement
     * @param {MouseEvent} e - Mouse event
     */
    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            xOffset = currentX;
            yOffset = currentY;
            
            setTranslate(currentX, currentY, mimoContainer);
        }
    }
    
    /**
     * End dragging
     */
    function dragEnd() {
        isDragging = false;
        mimoContainer.classList.remove('dragging');
    }
    
    /**
     * Set element transform position
     * @param {number} xPos - X position
     * @param {number} yPos - Y position
     * @param {HTMLElement} el - Element to transform
     */
    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate(${xPos}px, ${yPos}px)`;
    }
    
    // Music Player functionality
    const playBtn = document.querySelector('.play-btn');
    const nowPlaying = document.querySelector('.now-playing');
    let isPlaying = false;
    
    playBtn.addEventListener('click', function() {
        isPlaying = !isPlaying;
        this.textContent = isPlaying ? '⏸️' : '▶️';
        if (isPlaying) {
            nowPlaying.textContent = 'Now Playing: Cosmic Waves';
            addNotification('🎵', 'Started playing Cosmic Waves');
        } else {
            nowPlaying.textContent = 'Paused';
        }
    });
    
    // Wallet Connect functionality
    const walletConnectBtn = document.querySelector('.mimo-wallet-connect');
    const walletStatus = document.querySelector('.wallet-status');
    const walletBalance = document.querySelector('.wallet-balance');
    const nftGallery = document.querySelector('.nft-gallery');
    
    walletConnectBtn.addEventListener('click', async function() {
        if (typeof window.ethereum === 'undefined') {
            walletStatus.textContent = 'MetaMask not found';
            walletStatus.style.color = '#ff0000';
            addNotification('⚠️', 'Please install MetaMask');
            return;
        }
        
        walletStatus.textContent = 'Connecting...';
        this.disabled = true;
        
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            if (accounts.length > 0) {
                const address = accounts[0];
                const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
                
                // Get real balance using ethers
                const provider = new (await import('https://cdn.jsdelivr.net/npm/ethers@6/+esm')).BrowserProvider(window.ethereum);
                const balance = await provider.getBalance(address);
                const ethBalance = (Number(balance) / 1e18).toFixed(4);
                
                walletStatus.textContent = 'Connected';
                walletStatus.style.color = '#00ff00';
                walletBalance.style.display = 'block';
                document.getElementById('eth-balance').textContent = `${ethBalance} ETH`;
                document.getElementById('wallet-address').textContent = shortAddress;
                this.textContent = 'Disconnect';
                this.disabled = false;
                
                // Load NFTs
                loadUserNFTs(address);
                
                addNotification('💳', 'Wallet connected successfully');
            }
        } catch (error) {
            walletStatus.textContent = 'Connection failed';
            walletStatus.style.color = '#ff0000';
            this.disabled = false;
            addNotification('⚠️', `Connection failed: ${error.message}`);
        }
    });
    
    /**
     * Load user's NFT collection into gallery
     * @param {string} address - Wallet address
     */
    function loadUserNFTs(address) {
        nftGallery.innerHTML = '<p style="text-align:center;color:#888;">Loading NFTs...</p>';
        
        // Fetch real NFTs from blockchain or API
        // For now, show empty state with instruction
        setTimeout(() => {
            nftGallery.innerHTML = '<p style="text-align:center;color:#888;">No NFTs found. Mint or purchase NFTs to see them here.</p>';
        }, 1000);
    }
    
    /**
     * Add notification to the notifications panel
     * @param {string} icon - Emoji icon for notification
     * @param {string} text - Notification message text
     */
    function addNotification(icon, text) {
        const notifList = document.querySelector('.notifications-list');
        const notifItem = document.createElement('div');
        notifItem.className = 'notification-item';
        notifItem.innerHTML = `
            <span class="notif-icon">${icon}</span>
            <span class="notif-text">${text}</span>
        `;
        notifList.insertBefore(notifItem, notifList.firstChild);
        
        // Remove old notifications (keep last 10)
        const notifications = notifList.querySelectorAll('.notification-item');
        if (notifications.length > 10) {
            notifications[notifications.length - 1].remove();
        }
        
        // Flash notification tab
        const notifTab = document.querySelector('[data-tab="notifications"]');
        notifTab.style.animation = 'pulse 0.5s';
        setTimeout(() => {
            notifTab.style.animation = '';
        }, 500);
    }
    
    // Expose notification function globally
    window.mimoNotify = addNotification;
    
    console.log('🎭 Mimo Assistant loaded and ready!');
});
