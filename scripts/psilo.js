/**
 * PSILO Persistent Modal/Dashboard Functionality
 * 
 * Handles the floating PSILO assistant modal that persists across all pages.
 * Features include minimize/maximize, dragging, tab switching, music player,
 * wallet connection, NFT gallery, and notifications.
 * 
 * @author ZIG ZAG
 * @version 1.0.0
 * @license MIT
 */

/**
 * Initialize PSILO modal functionality when DOM is loaded
 * @listens DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', function() {
    const psiloContainer = document.getElementById('psilo-container');
    const psiloMinimize = document.getElementById('psilo-minimize');
    const psiloMaximize = document.getElementById('psilo-maximize');
    const psiloHeader = document.querySelector('.psilo-header');
    const psiloTabs = document.querySelectorAll('.psilo-tab');
    const psiloPanels = document.querySelectorAll('.psilo-panel');
    
    let isDragging = false;
    let currentX, currentY, initialX, initialY;
    let xOffset = 0, yOffset = 0;
    
    // Minimize/Maximize functionality
    psiloMinimize.addEventListener('click', function() {
        psiloContainer.classList.toggle('minimized');
        this.textContent = psiloContainer.classList.contains('minimized') ? '+' : '−';
    });
    
    psiloMaximize.addEventListener('click', function() {
        psiloContainer.classList.toggle('maximized');
        this.textContent = psiloContainer.classList.contains('maximized') ? '⊟' : '□';
    });
    
    // Tab switching
    psiloTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            psiloTabs.forEach(t => t.classList.remove('active'));
            psiloPanels.forEach(p => p.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(`${targetTab}-panel`).classList.add('active');
        });
    });
    
    // Dragging functionality
    psiloHeader.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);
    
    /**
     * Initialize dragging functionality for PSILO modal
     * @param {MouseEvent} e - Mouse event
     */
    function dragStart(e) {
        if (psiloContainer.classList.contains('minimized')) return;
        
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        
        if (e.target === psiloHeader || psiloHeader.contains(e.target)) {
            isDragging = true;
            psiloContainer.classList.add('dragging');
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
            
            setTranslate(currentX, currentY, psiloContainer);
        }
    }
    
    /**
     * End dragging
     */
    function dragEnd() {
        isDragging = false;
        psiloContainer.classList.remove('dragging');
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
    const walletConnectBtn = document.querySelector('.psilo-wallet-connect');
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
    window.psiloNotify = addNotification;
    
    console.log('🎭 PSILO Assistant loaded and ready!');
});
