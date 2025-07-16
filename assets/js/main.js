document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for internal links (optional, browser handles it well with scroll-behavior: smooth)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Sticky Header Effect
    const header = document.querySelector('.main-header');
    const heroSection = document.querySelector('.hero-section');
    const headerHeight = header.offsetHeight; // Get header height dynamically

    if (heroSection) {
        // Adjust main content padding based on header height
        document.body.style.paddingTop = `${headerHeight}px`;

        // Intersection Observer for sticky header (optional, simple fixed works too)
        // const observerOptions = {
        //     rootMargin: `-${headerHeight}px 0px 0px 0px`,
        //     threshold: 0
        // };
        // const observer = new IntersectionObserver(entries => {
        //     entries.forEach(entry => {
        //         if (!entry.isIntersecting) {
        //             header.classList.add('sticky'); // Add a 'sticky' class for background change if desired
        //         } else {
        //             header.classList.remove('sticky');
        //         }
        //     });
        // }, observerOptions);
        // observer.observe(heroSection);
    }

    // Hamburger menu functionality (Side Drawer)
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileNavDrawer = document.querySelector('.mobile-nav-drawer');
    const closeMobileNavBtn = document.querySelector('.close-mobile-nav-btn');

    function closeMobileNav() {
        mobileNavOverlay.classList.remove('active');
        hamburgerMenu.classList.remove('active');
    }

    if (hamburgerMenu && mobileNavOverlay && mobileNavDrawer && closeMobileNavBtn) {
        hamburgerMenu.addEventListener('click', () => {
            mobileNavOverlay.classList.add('active'); // Always add active when opening
            hamburgerMenu.classList.add('active'); // Add class to animate hamburger icon
        });

        closeMobileNavBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent this click from bubbling up to the overlay
            closeMobileNav();
        });

        // Close mobile nav when a link is clicked (inside the drawer's nav)
        mobileNavDrawer.querySelectorAll('.mobile-nav a').forEach(link => {
            link.addEventListener('click', closeMobileNav);
        });

        // Close mobile nav when clicking on the overlay (outside the drawer)
        mobileNavOverlay.addEventListener('click', (event) => {
            // Check if the click target is outside the drawer itself
            // !mobileNavDrawer.contains(event.target) ensures clicks inside the drawer don't close it
            if (event.target === mobileNavOverlay || !mobileNavDrawer.contains(event.target)) {
                 closeMobileNav();
            }
        });
    }
            
   


    // Scroll Reveal Animations
    const scrollRevealElements = document.querySelectorAll('.animate-scroll-reveal');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseFloat(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay * 1000); // Convert seconds to milliseconds
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, {
        threshold: 0.1, // Element is 10% visible
        rootMargin: '0px 0px -50px 0px' // Adjust reveal point (e.g., reveal earlier)
    });

    scrollRevealElements.forEach(el => {
        observer.observe(el);
    });

    // Voice Search Icon Toggle
    const searchBtn = document.querySelector('.search-btn');
    const voiceSearchIcon = document.querySelector('.voice-search-icon');

    if (searchBtn && voiceSearchIcon) {
        searchBtn.addEventListener('mouseenter', () => {
            voiceSearchIcon.style.opacity = '1';
            voiceSearchIcon.style.transform = 'scale(1)';
        });
        searchBtn.addEventListener('mouseleave', () => {
            voiceSearchIcon.style.opacity = '0';
            voiceSearchIcon.style.transform = 'scale(0.8)';
        });

        // Basic Voice Search (requires HTTPS and user permission)
        searchBtn.addEventListener('click', () => {
            if ('webkitSpeechRecognition' in window) {
                const recognition = new webkitSpeechRecognition();
                recognition.continuous = false;
                recognition.lang = 'en-US';
                recognition.interimResults = false;
                recognition.maxAlternatives = 1;

                recognition.onstart = () => {
                    alert('Voice search active. Speak now.');
                    voiceSearchIcon.style.color = 'red'; // Indicate listening
                };

                recognition.onresult = (event) => {
                    const transcript = event.results[0][0].transcript;
                    alert('You said: ' + transcript);
                    // Here you would integrate with your search functionality
                    // e.g., window.location.href = `shop.html?search=${encodeURIComponent(transcript)}`;
                };

                recognition.onerror = (event) => {
                    console.error('Speech recognition error:', event.error);
                    alert('Voice search error. Please try again.');
                    voiceSearchIcon.style.color = 'var(--color-gold)';
                };

                recognition.onend = () => {
                    voiceSearchIcon.style.color = 'var(--color-gold)'; // Reset color
                };

                recognition.start();
            } else {
                alert('Voice search is not supported in your browser.');
            }
        });
    }


    // Placeholder for Wallet Connect functionality
    const walletConnectBtn = document.querySelector('.wallet-connect-btn');
    const walletConnectBtnMobile = document.querySelector('.wallet-connect-btn-mobile');

    const handleWalletConnect = () => {
        alert('Connecting to Web3 Wallet (e.g., MetaMask)...');
        // In a real application, you would use Web3.js or Ethers.js here:
        // if (window.ethereum) {
        //     try {
        //         window.ethereum.request({ method: 'eth_requestAccounts' })
        //             .then(accounts => {
        //                 console.log('Connected accounts:', accounts);
        //                 alert(`Wallet connected: ${accounts[0].substring(0, 6)}...${accounts[0].slice(-4)}`);
        //                 // Update UI to show connected status
        //             })
        //             .catch(error => {
        //                 console.error('User denied account access or other error:', error);
        //                 alert('Wallet connection failed.');
        //             });
        //     } catch (error) {
        //         console.error('MetaMask not detected or error:', error);
        //         alert('Please install MetaMask or a compatible Web3 wallet.');
        //     }
        // } else {
        //     alert('No Web3 wallet detected. Please install MetaMask.');
        // }
    };

    if (walletConnectBtn) {
        walletConnectBtn.addEventListener('click', handleWalletConnect);
    }
    if (walletConnectBtnMobile) {
        walletConnectBtnMobile.addEventListener('click', handleWalletConnect);
    }

    // Simple Cart Count Update (for demonstration)
    let cartCount = 0;
    const cartCountElement = document.querySelector('.cart-count');
    const wishlistCountSpan = document.querySelector('.wishlist-count');
    
    // In a real app, this would be updated dynamically from local storage or backend

    function updateCartCount(newCount) {
        cartCount = newCount;
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
            if (cartCount > 0) {
                cartCountElement.style.display = 'block';
            } else {
                cartCountElement.style.display = 'none';
            }
        }
    }
    // NEW: Function to update wishlist count in header
    function updateWishlistCount() {
        const wishlist = JSON.parse(localStorage.getItem('oldwynWishlist') || '[]');
        wishlistCountSpan.textContent = wishlist.length;
        if (wishlist.length > 0) {
            wishlistCountSpan.style.display = 'flex';
        } else {
            wishlistCountSpan.style.display = 'none';
        }
    }
    updateCartCount(0); // Initialize cart count on load
     updateWishlistCount(); // NEW: Initial wishlist count update

});

// Custom Toast Notification Function
document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu functionality
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');

    if (hamburgerMenu && mobileNavOverlay) {
        hamburgerMenu.addEventListener('click', () => {
            mobileNavOverlay.classList.toggle('active');
            hamburgerMenu.classList.toggle('active'); // Add class to animate hamburger icon
        });

        // Close mobile nav when a link is clicked
        mobileNavOverlay.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNavOverlay.classList.remove('active');
                hamburgerMenu.classList.remove('active');
            });
        });
    }

    // Header scroll effect
    const mainHeader = document.querySelector('.main-header');
    if (mainHeader) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                mainHeader.classList.add('scrolled');
            } else {
                mainHeader.classList.remove('scrolled');
            }
        });
    }

    // --- Custom Toast Notification Function ---
    // Make this function globally accessible or attach to window for easy use
    window.showToast = function(message, type = 'success', duration = 3000) {
        const toast = document.getElementById('custom-toast');
        const toastMessage = toast.querySelector('.toast-message');
        const toastIcon = toast.querySelector('.toast-icon');

        if (!toast || !toastMessage || !toastIcon) {
            console.error('Toast elements not found. Make sure #custom-toast, .toast-message, and .toast-icon exist.');
            return;
        }

        // Reset classes
        toast.className = 'custom-toast'; // Resets all classes
        toastIcon.className = 'toast-icon'; // Resets icon classes

        // Set message and type-specific styling
        toastMessage.textContent = message;
        if (type === 'success') {
            toastIcon.classList.add('fas', 'fa-check-circle');
            toast.style.backgroundColor = 'rgba(0, 0, 0, 0.85)'; // Default for success
            toastIcon.style.color = 'var(--color-gold)';
        } else if (type === 'error') {
            toast.classList.add('error');
            toastIcon.classList.add('fas', 'fa-times-circle');
            toast.style.backgroundColor = 'rgba(220, 53, 69, 0.85)'; // Red for error
            toastIcon.style.color = '#fff';
        } else if (type === 'warning') {
            toast.classList.add('warning');
            toastIcon.classList.add('fas', 'fa-exclamation-triangle');
            toast.style.backgroundColor = 'rgba(255, 193, 7, 0.85)'; // Yellow for warning
            toastIcon.style.color = '#333';
        } else if (type === 'info') {
            toastIcon.classList.add('fas', 'fa-info-circle');
            toast.style.backgroundColor = 'rgba(23, 162, 184, 0.85)'; // Blue for info
            toastIcon.style.color = '#fff';
        }

        toast.classList.add('show'); // Show the toast

        // Hide the toast after 'duration' milliseconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    };

    // Animation for elements on scroll (from animations.css)
    const animateOnScrollElements = document.querySelectorAll('.animate-scroll-reveal');

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the item is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseFloat(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('in-view');
                }, delay * 1000); // Convert seconds to milliseconds
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    animateOnScrollElements.forEach(el => {
        observer.observe(el);
    });
});

// custom search functionality
document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu functionality
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');

    if (hamburgerMenu && mobileNavOverlay) {
        hamburgerMenu.addEventListener('click', () => {
            mobileNavOverlay.classList.toggle('active');
            hamburgerMenu.classList.toggle('active'); // Add class to animate hamburger icon
        });

        // Close mobile nav when a link is clicked
        mobileNavOverlay.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNavOverlay.classList.remove('active');
                hamburgerMenu.classList.remove('active');
            });
        });
    }

    // Header scroll effect
    const mainHeader = document.querySelector('.main-header');
    if (mainHeader) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                mainHeader.classList.add('scrolled');
            } else {
                mainHeader.classList.remove('scrolled');
            }
        });
    }

    // --- Search Overlay Functionality ---
    const searchBtn = document.querySelector('.search-btn');
    const searchOverlay = document.querySelector('.search-overlay');
    const closeSearchBtn = document.querySelector('.close-search-btn');
    const searchInput = document.querySelector('.search-input');
    const searchOverlaySubmitBtn = document.querySelector('.search-overlay-submit-btn');
    const voiceSearchOverlayBtn = document.querySelector('.voice-search-overlay-btn');

    if (searchBtn && searchOverlay && closeSearchBtn) {
        searchBtn.addEventListener('click', () => {
            searchOverlay.classList.add('active');
            setTimeout(() => { // Focus after transition for better UX
                searchInput.focus();
            }, 400); // Match CSS transition duration
        });

        closeSearchBtn.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
            searchInput.value = ''; // Clear search input on close
        });

        // Close overlay if clicked outside content
        searchOverlay.addEventListener('click', (event) => {
            if (event.target === searchOverlay) {
                searchOverlay.classList.remove('active');
                searchInput.value = ''; // Clear search input on close
            }
        });

        // Handle search submission (basic for now)
        if (searchOverlaySubmitBtn) {
            searchOverlaySubmitBtn.addEventListener('click', () => {
                const query = searchInput.value.trim();
                if (query) {
                    window.showToast(`Searching for: "${query}"`, 'info');
                    // In a real application, you'd redirect or fetch results:
                    // window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
                    searchOverlay.classList.remove('active'); // Close overlay after search
                    searchInput.value = '';
                } else {
                    window.showToast('Please enter a search term.', 'warning');
                }
            });
        }

        // Handle voice search (basic for now)
        if (voiceSearchOverlayBtn) {
            voiceSearchOverlayBtn.addEventListener('click', () => {
                if ('webkitSpeechRecognition' in window) {
                    const SpeechRecognition = window.webkitSpeechRecognition;
                    const recognition = new SpeechRecognition();

                    recognition.continuous = false; // Only get one result
                    recognition.lang = 'en-US';
                    recognition.interimResults = false;
                    recognition.maxAlternatives = 1;

                    recognition.start();
                    window.showToast('Listening for your voice...', 'info', 2000); // Shorter duration for listening

                    recognition.onresult = (event) => {
                        const transcript = event.results[0][0].transcript;
                        searchInput.value = transcript;
                        window.showToast(`Voice input: "${transcript}"`, 'success');
                        // Optionally auto-submit or prompt user to submit
                        // searchOverlaySubmitBtn.click();
                    };

                    recognition.onerror = (event) => {
                        console.error('Speech recognition error:', event.error);
                        if (event.error === 'not-allowed') {
                             window.showToast('Microphone access denied or blocked by browser. Please enable it in your site settings.', 'error', 6000);
                        } else if (event.error === 'no-speech') {
                            window.showToast('No speech detected. Please try again.', 'warning');
                        } else {
                            window.showToast(`Voice search error: ${event.error}`, 'error');
                        }
                    };

                    recognition.onend = () => {
                        // Toast for listening will fade out naturally
                    };

                } else {
                    window.showToast('Voice search not supported in your browser.', 'error');
                }
            });
        }
    }


    // --- Custom Toast Notification Function (ensure it's still here) ---
    window.showToast = function(message, type = 'success', duration = 3000) {
        const toast = document.getElementById('custom-toast');
        const toastMessage = toast.querySelector('.toast-message');
        const toastIcon = toast.querySelector('.toast-icon');

        if (!toast || !toastMessage || !toastIcon) {
            console.error('Toast elements not found. Make sure #custom-toast, .toast-message, and .toast-icon exist.');
            return;
        }

        // Reset classes
        toast.className = 'custom-toast'; // Resets all classes
        toastIcon.className = 'toast-icon'; // Resets icon classes

        // Set message and type-specific styling
        toastMessage.textContent = message;
        if (type === 'success') {
            toastIcon.classList.add('fas', 'fa-check-circle');
            toast.style.backgroundColor = 'rgba(0, 0, 0, 0.85)'; // Default for success
            toastIcon.style.color = 'var(--color-gold)';
        } else if (type === 'error') {
            toast.classList.add('error');
            toastIcon.classList.add('fas', 'fa-times-circle');
            toast.style.backgroundColor = 'rgba(220, 53, 69, 0.85)'; // Red for error
            toastIcon.style.color = '#fff';
        } else if (type === 'warning') {
            toast.classList.add('warning');
            toastIcon.classList.add('fas', 'fa-exclamation-triangle');
            toast.style.backgroundColor = 'rgba(255, 193, 7, 0.85)'; // Yellow for warning
            toastIcon.style.color = '#333';
        } else if (type === 'info') {
            toastIcon.classList.add('fas', 'fa-info-circle');
            toast.style.backgroundColor = 'rgba(23, 162, 184, 0.85)'; // Blue for info
            toastIcon.style.color = '#fff';
        }

        toast.classList.add('show'); // Show the toast

        // Hide the toast after 'duration' milliseconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    };

    // Animation for elements on scroll (from animations.css)
    const animateOnScrollElements = document.querySelectorAll('.animate-scroll-reveal');

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the item is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseFloat(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('in-view');
                }, delay * 1000); // Convert seconds to milliseconds
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    animateOnScrollElements.forEach(el => {
        observer.observe(el);
    });
});