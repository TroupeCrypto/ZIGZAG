// Mimo Persistent Modal/Dashboard Functionality

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
    
    function dragStart(e) {
        if (mimoContainer.classList.contains('minimized')) return;
        
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        
        if (e.target === mimoHeader || mimoHeader.contains(e.target)) {
            isDragging = true;
            mimoContainer.classList.add('dragging');
        }
    }
    
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
    
    function dragEnd() {
        isDragging = false;
        mimoContainer.classList.remove('dragging');
    }
    
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
        walletStatus.textContent = 'Connecting...';
        this.disabled = true;
        
        setTimeout(() => {
            if (typeof window.ethereum !== 'undefined') {
                walletStatus.textContent = 'Connected';
                walletStatus.style.color = '#00ff00';
                walletBalance.style.display = 'block';
                document.getElementById('eth-balance').textContent = '2.45 ETH';
                document.getElementById('wallet-address').textContent = '0x1234...5678';
                this.textContent = 'Disconnect';
                this.disabled = false;
                
                // Load NFTs
                loadUserNFTs();
                
                addNotification('💳', 'Wallet connected successfully');
            } else {
                walletStatus.textContent = 'MetaMask not found';
                walletStatus.style.color = '#ff0000';
                this.disabled = false;
                addNotification('⚠️', 'Please install MetaMask');
            }
        }, 1500);
    });
    
    function loadUserNFTs() {
        nftGallery.innerHTML = '';
        const emojis = ['🎨', '🌈', '✨', '🔮', '🌟', '💫'];
        
        emojis.forEach((emoji, index) => {
            const nftItem = document.createElement('div');
            nftItem.className = 'nft-item';
            nftItem.textContent = emoji;
            nftItem.addEventListener('click', function() {
                addNotification('🖼️', `Viewing NFT #${index + 1}`);
            });
            nftGallery.appendChild(nftItem);
        });
    }
    
    // Notification system
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
