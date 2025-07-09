 // Navigation functionality
        function showPage(pageId) {
            // Hide all sections
            const sections = document.querySelectorAll('.page-section');
            sections.forEach(section => {
                section.classList.remove('active');
                section.style.display = 'none';
            });

            // Show selected section
            const targetSection = document.getElementById(pageId);
            if (targetSection) {
                targetSection.classList.add('active');
                targetSection.style.display = 'block';
            }

            // Update navigation active state
            const navLinks = document.querySelectorAll('.nav-menu a');
            navLinks.forEach(link => {
                link.classList.remove('active');
            });

            // Find and activate the clicked link
            const activeLink = document.querySelector(`[onclick="showPage('${pageId}')"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }

            // Close mobile menu if open
            const mobileMenu = document.querySelector('.nav-menu');
            mobileMenu.classList.remove('active');
        }

        // Mobile menu toggle
        function toggleMobileMenu() {
            const mobileMenu = document.querySelector('.nav-menu');
            mobileMenu.classList.toggle('active');
        }

        // Initialize page when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            // Check if redirected from form submission
            const urlParams = new URLSearchParams(window.location.search);
            const submitted = urlParams.get('submitted');
            
            if (submitted) {
                showPage('thankyou');
                // Clean up URL
                window.history.replaceState({}, document.title, window.location.pathname);
            } else {
                showPage('home');
            }
            
            // Add typing animation effect to hero title
            const heroTitle = document.querySelector('.hero h1');
            if (heroTitle) {
                heroTitle.style.opacity = '0';
                setTimeout(() => {
                    heroTitle.style.opacity = '1';
                    heroTitle.style.transform = 'translateY(0)';
                }, 500);
            }
        });

        // Form validation and submission handlers
        document.addEventListener('DOMContentLoaded', function () {
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                contactForm.addEventListener('submit', function (e) {
                    // Validate form
                    const name = this.querySelector('#name').value.trim();
                    const email = this.querySelector('#email').value.trim();
                    const message = this.querySelector('#message').value.trim();

                    if (!name || !email || !message) {
                        e.preventDefault();
                        alert('Please fill in all required fields.');
                        return;
                    }

                    if (!validateEmail(email)) {
                        e.preventDefault();
                        alert('Please enter a valid email address.');
                        return;
                    }

                    // Show loading state
                    const submitBtn = this.querySelector('.submit-btn');
                    submitBtn.textContent = 'Sending...';
                    submitBtn.disabled = true;
                });
            }

            const feedbackForm = document.getElementById('feedbackForm');
            if (feedbackForm) {
                feedbackForm.addEventListener('submit', function (e) {
                    // Validate form
                    const name = this.querySelector('#feedbackName').value.trim();
                    const email = this.querySelector('#feedbackEmail').value.trim();
                    const feedback = this.querySelector('#feedbackMessage').value.trim();

                    if (!name || !email || !feedback) {
                        e.preventDefault();
                        alert('Please fill in all required fields.');
                        return;
                    }

                    if (!validateEmail(email)) {
                        e.preventDefault();
                        alert('Please enter a valid email address.');
                        return;
                    }

                    // Show loading state
                    const submitBtn = this.querySelector('.submit-btn');
                    submitBtn.textContent = 'Submitting...';
                    submitBtn.disabled = true;
                });
            }
        });

        // Email validation function
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        // Smooth scrolling for better UX
        document.addEventListener('DOMContentLoaded', function () {
            const links = document.querySelectorAll('a[href^="#"]');
            links.forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                });
            });
        });

        // Debounce function for performance optimization
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        // Dynamic navigation background on scroll
        const debouncedScrollHandler = debounce(function () {
            const nav = document.querySelector('nav');
            if (window.scrollY > 50) {
                nav.style.background = 'rgba(0, 0, 0, 0.9)';
            } else {
                nav.style.background = 'rgba(15, 15, 15, 0.9)';
            }
        }, 10);

        window.addEventListener('scroll', debouncedScrollHandler);

        // Add some interactive animations for project cards
        document.addEventListener('DOMContentLoaded', function () {
            const projectCards = document.querySelectorAll('.project-card');

            projectCards.forEach(card => {
                card.addEventListener('mouseenter', function () {
                    this.style.transform = 'translateY(-10px) scale(1.02)';
                });

                card.addEventListener('mouseleave', function () {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });
        });

        // Enhanced form validation with visual feedback
        document.addEventListener('DOMContentLoaded', function () {
            const inputs = document.querySelectorAll('input[type="email"]');

            inputs.forEach(input => {
                input.addEventListener('blur', function () {
                    if (this.value && !validateEmail(this.value)) {
                        this.style.borderColor = '#ff4444';
                        this.style.boxShadow = '0 0 5px rgba(255, 68, 68, 0.3)';
                    } else {
                        this.style.borderColor = 'rgba(118, 75, 162, 0.3)';
                        this.style.boxShadow = 'none';
                    }
                });

                input.addEventListener('focus', function () {
                    this.style.borderColor = '#764ba2';
                    this.style.boxShadow = '0 0 5px rgba(118, 75, 162, 0.3)';
                });
            });
        });

        // Add loading animation for social links
        document.addEventListener('DOMContentLoaded', function () {
            const socialLinks = document.querySelectorAll('.social-links a');

            socialLinks.forEach((link, index) => {
                link.style.opacity = '0';
                link.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    link.style.transition = 'all 0.5s ease';
                    link.style.opacity = '1';
                    link.style.transform = 'translateY(0)';
                }, 200 * (index + 1));
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function (e) {
            const mobileMenu = document.querySelector('.nav-menu');
            const toggleButton = document.querySelector('.mobile-menu-toggle');

            if (!mobileMenu.contains(e.target) && !toggleButton.contains(e.target)) {
                mobileMenu.classList.remove('active');
            }
        });

        // Add keyboard navigation support
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                const mobileMenu = document.querySelector('.nav-menu');
                mobileMenu.classList.remove('active');
            }
        });