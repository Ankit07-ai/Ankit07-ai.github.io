const particleLayer = document.querySelector('.particle-layer');
const particles = [];
const mouse = { x: 50, y: 50 };

function createParticles() {
    if (!particleLayer) return;

    for (let i = 0; i < 16; i++) {
        const particle = document.createElement('span');
        const size = 4 + Math.random() * 8;
        particle.className = 'particle';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.opacity = `${0.14 + Math.random() * 0.25}`;
        particle.dataset.offsetX = (Math.random() - 0.5) * 50;
        particle.dataset.offsetY = (Math.random() - 0.5) * 50;
        particleLayer.appendChild(particle);
        particles.push(particle);
    }
}

function animateParticles() {
    particles.forEach((particle, index) => {
        const offsetX = Number(particle.dataset.offsetX);
        const offsetY = Number(particle.dataset.offsetY);
        const drift = (Math.sin((Date.now() * 0.0007) + index) * 6) || 0;
        const x = (mouse.x - 50) * 0.12 + offsetX * 0.12 + drift;
        const y = (mouse.y - 50) * 0.08 + offsetY * 0.08 - drift;
        particle.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
    requestAnimationFrame(animateParticles);
}

function handlePointerMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 100;
    mouse.y = (event.clientY / window.innerHeight) * 100;
    document.documentElement.style.setProperty('--mouse-x', `${mouse.x}%`);
    document.documentElement.style.setProperty('--mouse-y', `${mouse.y}%`);
}

function revealSectionItems(pageId) {
    const section = document.getElementById(pageId);
    if (!section) return;

    const items = section.querySelectorAll('.hero-content, .profile-image, .project-card, .about-card, .about-row, .contact-form, .feedback .contact-form');
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(18px)';
        item.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
        window.setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 90 * index + 180);
    });
}

function showPage(pageId) {
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.toggle('active', section.id === pageId);
    });

    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('onclick') === `showPage('${pageId}')`);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.querySelector('.nav-menu').classList.remove('active');

    setTimeout(() => revealSectionItems(pageId), 120);
}

function toggleMobileMenu() {
    document.querySelector('.nav-menu').classList.toggle('active');
}

function animateHeroTitle() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    Array.from(heroTitle.querySelectorAll(':scope > span')).forEach(block => {
        const words = block.textContent.trim().split(' ').filter(Boolean);
        block.innerHTML = words.map(word => `<span class="word"><span>${word}</span></span>`).join(' ');
    });

    const wordNodes = heroTitle.querySelectorAll('.word');
    wordNodes.forEach((word, index) => {
        word.style.transitionDelay = `${index * 0.07}s`;
    });

    window.setTimeout(() => heroTitle.classList.add('reveal'), 200);
}

function enableCardTilt() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('pointermove', event => {
            const rect = card.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width - 0.5) * 18;
            const y = ((event.clientY - rect.top) / rect.height - 0.5) * -18;
            card.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg)`;
        });

        card.addEventListener('pointerleave', () => {
            card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
        });
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function bindFormValidation() {
    const forms = [
        { id: 'contactForm', required: ['name', 'email', 'message'], submitText: 'Sending...' },
        { id: 'feedbackForm', required: ['feedbackName', 'feedbackEmail', 'feedbackMessage'], submitText: 'Submitting...' },
    ];

    forms.forEach(formData => {
        const form = document.getElementById(formData.id);
        if (!form) return;

        form.addEventListener('submit', event => {
            const missing = formData.required.some(name => {
                const field = form.querySelector(`#${name}`);
                return !field || !field.value.trim();
            });

            const emailField = form.querySelector('input[type="email"]');
            const emailIsValid = emailField ? validateEmail(emailField.value.trim()) : true;

            if (missing || !emailIsValid) {
                event.preventDefault();
                alert('Please complete all required fields and use a valid email address.');
                return;
            }

            const submitBtn = form.querySelector('.submit-btn');
            if (submitBtn) {
                submitBtn.textContent = formData.submitText;
                submitBtn.disabled = true;
            }
        });
    });
}

function bindEmailFieldFeedback() {
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value && !validateEmail(input.value.trim())) {
                input.style.borderColor = '#ff4444';
                input.style.boxShadow = '0 0 8px rgba(255, 68, 68, 0.22)';
            } else {
                input.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                input.style.boxShadow = 'none';
            }
        });

        input.addEventListener('focus', () => {
            input.style.borderColor = '#7e4cff';
            input.style.boxShadow = '0 0 8px rgba(126, 76, 255, 0.18)';
        });
    });
}

function setFormSubmitRedirects() {
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    const contactNext = document.getElementById('contactNextInput');
    const feedbackNext = document.getElementById('feedbackNextInput');

    if (contactNext) {
        contactNext.value = `${baseUrl}?submitted=contact`;
    }
    if (feedbackNext) {
        feedbackNext.value = `${baseUrl}?submitted=feedback`;
    }
}

function revealSocialLinks() {
    const links = document.querySelectorAll('.social-links a');
    links.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(20px)';
        window.setTimeout(() => {
            link.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, 170 * (index + 1));
    });
}

function initNavigationInteractions() {
    document.addEventListener('click', event => {
        if (!event.target.closest('.nav-container')) {
            document.querySelector('.nav-menu').classList.remove('active');
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            document.querySelector('.nav-menu').classList.remove('active');
        }
    });
}

function init() {
    createParticles();
    animateParticles();
    animateHeroTitle();
    enableCardTilt();
    bindFormValidation();
    bindEmailFieldFeedback();
    revealSocialLinks();
    initNavigationInteractions();
    setFormSubmitRedirects();

    const urlParams = new URLSearchParams(window.location.search);
    const submitted = urlParams.get('submitted');
    if (submitted) {
        const thankyouSection = document.getElementById('thankyou');
        if (thankyouSection) {
            thankyouSection.style.display = '';
        }
        showPage('thankyou');
        window.history.replaceState({}, document.title, window.location.pathname);
    } else {
        showPage('home');
    }

    window.addEventListener('pointermove', handlePointerMove);
}

window.addEventListener('DOMContentLoaded', init);
