   // Create floating particles
        function createParticles() {
            const particleCount = 20;
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.width = Math.random() * 10 + 5 + 'px';
                particle.style.height = particle.style.width;
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 4 + 's';
                document.body.appendChild(particle);
            }
        }

        createParticles();

        const giftBox = document.getElementById('giftBox');
        const overlay = document.getElementById('overlay');
        const messagePopup = document.getElementById('messagePopup');
        const closeBtn = document.getElementById('closeBtn');
        let isOpened = false;

        // Create flying hearts
        function createHeart(x, y) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = '💖';
            heart.style.left = x + 'px';
            heart.style.top = y + 'px';
            heart.style.animationDelay = Math.random() * 0.3 + 's';
            document.body.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 3000);
        }

        // Create confetti
        function createConfetti() {
            const colors = ['#ff1493', '#ff69b4', '#ffd700', '#ffb6c1', '#fff'];
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.className = 'confetti';
                    confetti.style.left = Math.random() * 100 + '%';
                    confetti.style.top = '-10px';
                    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.animationDelay = Math.random() * 0.5 + 's';
                    document.body.appendChild(confetti);

                    setTimeout(() => {
                        confetti.remove();
                    }, 3000);
                }, i * 30);
            }
        }

        // Open gift box
        giftBox.addEventListener('click', function(e) {
            if (!isOpened) {
                isOpened = true;
                
                // Shake animation first
                giftBox.classList.add('shake');
                
                setTimeout(() => {
                    giftBox.classList.remove('shake');
                    giftBox.classList.add('opened');
                    
                    // Create multiple hearts from gift box position
                    const rect = giftBox.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;

                    for (let i = 0; i < 20; i++) {
                        setTimeout(() => {
                            const offsetX = (Math.random() - 0.5) * 100;
                            const offsetY = (Math.random() - 0.5) * 100;
                            createHeart(centerX + offsetX, centerY + offsetY);
                        }, i * 100);
                    }

                    // Show confetti
                    createConfetti();

                    // Show message popup after delay
                    setTimeout(() => {
                        overlay.classList.add('show');
                        messagePopup.classList.add('show');
                    }, 800);
                }, 500);
            }
        });

        // Close popup
        closeBtn.addEventListener('click', function() {
            overlay.classList.remove('show');
            messagePopup.classList.remove('show');
        });

        overlay.addEventListener('click', function() {
            overlay.classList.remove('show');
            messagePopup.classList.remove('show');
        });

        // Add touch feedback for mobile
        if ('ontouchstart' in window) {
            giftBox.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            giftBox.addEventListener('touchend', function() {
                this.style.transform = 'scale(1.05)';
            });
        }