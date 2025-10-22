// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==========================================
// SMOOTH SCROLLING FOR NAVIGATION
// ==========================================
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// SCROLL ANIMATIONS (FADE IN EFFECT)
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Apply observer to all fade-in elements
const fadeInElements = document.querySelectorAll('.fade-in');
fadeInElements.forEach(function(element) {
    fadeInObserver.observe(element);
});

// ==========================================
// VIDEO AUTOPLAY FIX - NO CONTROLS
// ==========================================
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
    // Remove all controls
    heroVideo.removeAttribute('controls');
    heroVideo.controls = false;
    
    // Force muted for autoplay
    heroVideo.muted = true;
    heroVideo.setAttribute('muted', '');
    heroVideo.setAttribute('playsinline', '');
    heroVideo.setAttribute('webkit-playsinline', '');
    
    // Prevent context menu
    heroVideo.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Try to play immediately
    const playPromise = heroVideo.play();
    
    if (playPromise !== undefined) {
        playPromise.then(function() {
            console.log('✅ Video is playing');
        }).catch(function(error) {
            console.log('Video autoplay blocked:', error);
            
            // Force play on first touch
            document.addEventListener('touchstart', function startVideo() {
                heroVideo.play();
                document.removeEventListener('touchstart', startVideo);
            }, { once: true });
        });
    }
    
    // Loop video
    heroVideo.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    });
    
    // Prevent pause
    heroVideo.addEventListener('pause', function() {
        if (this.currentTime < this.duration) {
            this.play();
        }
    });
}

// ==========================================
// CONTACT FORM - SEND TO GMAIL
// ==========================================
function sendToEmail(event) {
    event.preventDefault();
    
    // Lấy thông tin từ form
    const name = document.getElementById('userName').value;
    const phone = document.getElementById('userPhone').value;
    const message = document.getElementById('userMessage').value;
    
    // Tạo subject và body
    const subject = encodeURIComponent('Đăng ký tập luyện - ' + name);
    const body = encodeURIComponent(
        'THÔNG TIN ĐĂNG KÝ\n\n' +
        '👤 Họ và tên: ' + name + '\n' +
        '📞 Số điện thoại: ' + phone + '\n' +
        '🎯 Mục tiêu: ' + message
    );
    
    // Gmail compose URL
    const gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=minhtanfitx@gmail.com&su=' + subject + '&body=' + body;
    
    // Show success message
    const successMessage = document.getElementById('successMessage');
    successMessage.textContent = '✅ Đang chuyển đến Gmail...';
    successMessage.classList.add('show');
    
    // Mở Gmail
    setTimeout(function() {
        window.open(gmailUrl, '_blank');
        successMessage.classList.remove('show');
        // Reset form
        document.getElementById('contactForm').reset();
    }, 1000);
}

// ==========================================
// STATS COUNTER ANIMATION
// ==========================================
function animateCounter(element, target, duration) {
    let startValue = 0;
    const endValue = parseInt(target);
    const suffix = element.textContent.replace(/[0-9]/g, '');
    const increment = endValue / (duration / 16);
    
    const counterInterval = setInterval(function() {
        startValue += increment;
        
        if (startValue >= endValue) {
            element.textContent = endValue + suffix;
            clearInterval(counterInterval);
        } else {
            element.textContent = Math.floor(startValue) + suffix;
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            
            statNumbers.forEach(function(statNumber) {
                const targetValue = statNumber.textContent;
                const numericValue = parseInt(targetValue);
                animateCounter(statNumber, numericValue, 2000);
            });
            
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ==========================================
// SERVICE CARDS CLICK ANIMATION
// ==========================================
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(function(card) {
    card.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        
        setTimeout(function() {
            card.style.transform = '';
        }, 200);
    });
});

// ==========================================
// CONTACT METHOD CLICK ANIMATION
// ==========================================
const contactMethods = document.querySelectorAll('.contact-method');
contactMethods.forEach(function(method) {
    method.addEventListener('click', function() {
        this.style.transform = 'scale(0.95) translateX(10px)';
        
        const self = this;
        setTimeout(function() {
            self.style.transform = '';
        }, 200);
    });
});

// ==========================================
// BUTTON RIPPLE EFFECT
// ==========================================
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = size + 'px';
    ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.transform = 'scale(0)';
    ripple.style.pointerEvents = 'none';
    
    button.appendChild(ripple);
    
    // Animate ripple
    setTimeout(function() {
        ripple.style.transition = 'transform 0.6s, opacity 0.6s';
        ripple.style.transform = 'scale(4)';
        ripple.style.opacity = '0';
    }, 10);
    
    // Remove ripple after animation
    setTimeout(function() {
        ripple.remove();
    }, 600);
}

// Apply ripple effect to buttons
const buttons = document.querySelectorAll('.cta-button, .submit-btn');
buttons.forEach(function(button) {
    button.addEventListener('click', createRipple);
});

// ==========================================
// LOGO CLICK - SCROLL TO TOP
// ==========================================
const logoText = document.querySelector('.logo-text');
const logoImage = document.querySelector('.logo-image');

if (logoText) {
    logoText.addEventListener('click', function() {
        scrollToSection('about');
    });
}

if (logoImage) {
    logoImage.addEventListener('click', function() {
        scrollToSection('about');
    });
}

// ==========================================
// ACTIVE NAV LINK ON SCROLL
// ==========================================
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(function(section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(function(link) {
        link.classList.remove('active');
        
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// HERO TITLE FLOATING ANIMATION
// ==========================================
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    let floatDirection = 1;
    
    setInterval(function() {
        const currentTransform = heroTitle.style.transform || '';
        heroTitle.style.transform = 'translateY(' + (floatDirection * 2) + 'px)';
        floatDirection = floatDirection * -1;
    }, 2000);
}

// ==========================================
// PAGE LOAD ANIMATION
// ==========================================
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    
    setTimeout(function() {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ==========================================
// KEYBOARD ACCESSIBILITY
// ==========================================
contactMethods.forEach(function(method) {
    method.setAttribute('tabindex', '0');
    
    method.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            method.click();
        }
    });
});

// ==========================================
// SOCIAL LINKS ACCESSIBILITY
// ==========================================
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(function(link) {
    const title = link.getAttribute('title');
    if (title) {
        link.setAttribute('aria-label', title);
    }
});

// ==========================================
// CONSOLE MESSAGE
// ==========================================
console.log('%c🏋️ FITNESS COACH PORTFOLIO', 'color: #ff0066; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%c💪 Bắt đầu hành trình thay đổi của bạn ngay hôm nay!', 'color: #ffffff; font-size: 16px; font-weight: bold;');
console.log('%c✨ Website được thiết kế với HTML, CSS, JavaScript thuần', 'color: #ff3385; font-size: 12px;');

// ==========================================
// PREVENT CONTEXT MENU ON IMAGES (OPTIONAL)
// ==========================================
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// ==========================================
// MOBILE DEVICE DETECTION
// ==========================================
const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobileDevice) {
    console.log('%c📱 Mobile device detected - Optimized experience enabled', 'color: #00ff00; font-size: 12px;');
}

// ==========================================
// TESTIMONIAL CARDS HOVER EFFECT
// ==========================================
const testimonialCards = document.querySelectorAll('.testimonial-card');
testimonialCards.forEach(function(card) {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ==========================================
// TESTIMONIAL VIDEO PLAY BUTTON
// ==========================================
const testimonialVideos = document.querySelectorAll('.testimonial-video video');
testimonialVideos.forEach(function(video) {
    const overlay = video.nextElementSibling;
    
    video.addEventListener('play', function() {
        if (overlay && overlay.classList.contains('video-overlay')) {
            overlay.style.opacity = '0';
        }
    });
    
    video.addEventListener('pause', function() {
        if (overlay && overlay.classList.contains('video-overlay')) {
            overlay.style.opacity = '1';
        }
    });
    
    video.addEventListener('ended', function() {
        if (overlay && overlay.classList.contains('video-overlay')) {
            overlay.style.opacity = '1';
        }
        video.currentTime = 0;
    });
});

const videoOverlays = document.querySelectorAll('.video-overlay');
videoOverlays.forEach(function(overlay) {
    overlay.addEventListener('click', function() {
        const video = this.previousElementSibling;
        if (video && video.tagName === 'VIDEO') {
            video.play();
        }
    });
    
    overlay.style.pointerEvents = 'auto';
    overlay.style.cursor = 'pointer';
});
// ==========================================
// FORCE VIDEO AUTOPLAY ON MOBILE
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const programVideos = document.querySelectorAll('.program-video');
    
    programVideos.forEach(function(video) {
        // Force play on load
        video.play().catch(function(error) {
            console.log('Autoplay prevented:', error);
            
            // Retry on user interaction
            document.addEventListener('touchstart', function() {
                video.play();
            }, { once: true });
        });
        
        // Ensure loop
        video.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        });
    });
});

// ==========================================
// END OF SCRIPT
// ==========================================
console.log('%c✅ All scripts loaded successfully!', 'color: #00ff00; font-size: 14px; font-weight: bold;');