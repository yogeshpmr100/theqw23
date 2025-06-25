// Modern JavaScript with animations and interactions

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Remove loading screen after content loads
    setTimeout(function() {
        document.body.classList.add('loaded');
    }, 2500);

    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(function() {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });

    document.addEventListener('mousedown', function() {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });

    document.addEventListener('mouseup', function() {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    // Hover effects for links and buttons
    const hoverElements = document.querySelectorAll('a, button, .btn, .work-item, .filter-btn');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursorFollower.style.width = '60px';
            cursorFollower.style.height = '60px';
            cursorFollower.style.backgroundColor = 'rgba(108, 99, 255, 0.1)';
            cursorFollower.style.border = 'none';
        });
        
        element.addEventListener('mouseleave', function() {
            cursorFollower.style.width = '40px';
            cursorFollower.style.height = '40px';
            cursorFollower.style.backgroundColor = 'transparent';
            cursorFollower.style.border = '1px solid var(--primary-color)';
        });
    });

    // Sticky header
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Navigation toggle for mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
            
            // Update active link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Work filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            workItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 200);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 500);
                }
            });
        });
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Form validation
            if (name === '' || email === '' || subject === '' || message === '') {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            setTimeout(() => {
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                showNotification('Message sent successfully!', 'success');
            }, 2000);
        });
    }

    // Show notification
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-text-2, .reveal-text-3, .reveal-image');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
                
                // Animate skill bars if they're in view
                if (element.classList.contains('skills')) {
                    const skillLevels = document.querySelectorAll('.skill-level');
                    skillLevels.forEach(skill => {
                        const width = skill.style.width;
                        skill.style.width = '0';
                        setTimeout(() => {
                            skill.style.width = width;
                        }, 300);
                    });
                }
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);

    // Add CSS for reveal animations
    const style = document.createElement('style');
    style.textContent = `
        .reveal-text, .reveal-text-2, .reveal-text-3 {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }
        
        .reveal-text.revealed {
            opacity: 1;
            transform: translateY(0);
        }
        
        .reveal-text-2.revealed {
            opacity: 1;
            transform: translateY(0);
            transition-delay: 0.2s;
        }
        
        .reveal-text-3.revealed {
            opacity: 1;
            transform: translateY(0);
            transition-delay: 0.4s;
        }
        
        .reveal-image {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
            transition: all 1s ease;
        }
        
        .reveal-image.revealed {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        
        .notification {
            position: fixed;
            bottom: 30px;
            right: 30px;
            padding: 15px 25px;
            border-radius: 5px;
            color: white;
            font-weight: 500;
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 9999;
        }
        
        .notification.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        .notification.success {
            background-color: #4caf50;
        }
        
        .notification.error {
            background-color: #f44336;
        }
        
        .hamburger.active span:first-child {
            transform: translateY(9px) rotate(45deg);
        }
        
        .hamburger.active span:last-child {
            transform: translateY(-9px) rotate(-45deg);
        }
        
        @media (max-width: 768px) {
            .nav-toggle {
                display: block;
            }
            
            .nav-menu {
                position: fixed;
                top: 80px;
                right: -100%;
                width: 70%;
                height: 100vh;
                background-color: white;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                transition: 0.5s;
                box-shadow: -5px 0 10px rgba(0, 0, 0, 0.1);
            }
            
            .nav-menu.active {
                right: 0;
            }
            
            .nav-menu li {
                margin: 20px 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Parallax effect
    document.addEventListener('mousemove', function(e) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        
        if (heroContent && heroImage) {
            heroContent.style.transform = `translate(${moveX * -1}px, ${moveY * -1}px)`;
            heroImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });

    // Typed.js-like effect for hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle p');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 2000);
    }
});

