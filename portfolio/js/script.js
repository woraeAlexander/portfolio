// Initialize EmailJS - Replace with your actual Public Key from EmailJS
emailjs.init("YOUR_PUBLIC_KEY_HERE"); // Get this from emailjs.com

// Smooth scrolling and active nav links
document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when nav link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        });
    });

    // Add active class to current nav link based on scroll position
    window.addEventListener('scroll', () => {
        updateActiveNavLink();
    });

    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            submitContactForm();
        });
    }

    // Intersection Observer for fade-in animations
    observeElements();
});

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// Intersection Observer for fade-in animations on scroll
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                // Remove the animation attribute after it's done
                entry.target.style.animationDelay = '0s';
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all project cards and skill categories
    const cards = document.querySelectorAll('.project-card, .skill-category, .stat, .contact-item');
    cards.forEach(card => {
        observer.observe(card);
    });
}

// Contact form submission handler with EmailJS
function submitContactForm() {
    const form = document.querySelector('.contact-form');
    const nameInput = form.querySelector('input[name="user_name"]');
    const emailInput = form.querySelector('input[name="user_email"]');
    const subjectInput = form.querySelector('input[name="subject"]');
    const messageInput = form.querySelector('textarea[name="message"]');

    // Basic validation
    if (!nameInput.value.trim()) {
        showNotification('Please enter your name', 'error');
        return;
    }

    if (!emailInput.value.trim()) {
        showNotification('Please enter your email', 'error');
        return;
    }

    if (!isValidEmail(emailInput.value)) {
        showNotification('Please enter a valid email', 'error');
        return;
    }

    if (!messageInput.value.trim()) {
        showNotification('Please enter your message', 'error');
        return;
    }

    // Send email using EmailJS
    const templateParams = {
        to_email: "woraealexander1@gmail.com",
        from_name: nameInput.value,
        from_email: emailInput.value,
        subject: subjectInput.value || "Portfolio Contact",
        message: messageInput.value
    };

    emailjs.send('service_portfolio', 'template_portfolio', templateParams)
        .then((response) => {
            console.log('Email sent successfully!', response);
            showNotification('Message sent successfully! I will get back to you soon.', 'success');
            form.reset();
        })
        .catch((error) => {
            console.error('Error sending email:', error);
            showNotification('Error sending message. Please try again.', 'error');
        });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#00b894' : '#d63031'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add slide animations
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

    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 70px;
        left: 0;
        width: 100%;
        background: white;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        padding: 20px;
        gap: 10px;
        margin: 0;
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(10px, 10px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }

    .nav-link.active {
        color: var(--primary-color);
    }

    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Scroll to top functionality
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        showScrollToTop();
    } else {
        hideScrollToTop();
    }
});

function showScrollToTop() {
    let button = document.getElementById('scrollToTop');
    if (!button) {
        button = document.createElement('button');
        button.id = 'scrollToTop';
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        button.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 999;
            transition: all 0.3s ease;
        `;

        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        button.addEventListener('mouseover', () => {
            button.style.background = 'var(--secondary-color)';
            button.style.transform = 'translateY(-5px)';
        });

        button.addEventListener('mouseout', () => {
            button.style.background = 'var(--primary-color)';
            button.style.transform = 'translateY(0)';
        });

        document.body.appendChild(button);
    }
    button.style.opacity = '1';
    button.style.pointerEvents = 'auto';
}

function hideScrollToTop() {
    const button = document.getElementById('scrollToTop');
    if (button) {
        button.style.opacity = '0';
        button.style.pointerEvents = 'none';
    }
}

// Add parallax effect on scroll
window.addEventListener('scroll', () => {
    const parallax = document.querySelector('.hero::before');
    if (parallax) {
        const scrollPosition = window.scrollY;
        parallax.style.transform = `translate(${scrollPosition * 0.5}px, ${scrollPosition * 0.5}px)`;
    }
});

// Typing effect for hero title (optional)
function typeEffect(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(interval);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Animate counters when they come into view
const statElements = document.querySelectorAll('.stat h3');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statElements.forEach(stat => {
                const number = parseInt(stat.textContent);
                animateCounter(stat, number);
            });
            statsAnimated = true;
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Mobile responsive adjustments
function handleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');

    if (window.innerWidth > 768) {
        navMenu?.classList.remove('active');
        hamburger?.classList.remove('active');
    }
}

window.addEventListener('resize', handleMobileMenu);

// Initialize
console.log('Portfolio website loaded successfully!');
