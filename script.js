// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Cursor hover effect
const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-card');
hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.5)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});

// Mobile Menu
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.querySelector('i').classList.toggle('fa-bars');
    menuBtn.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking a link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.querySelector('i').classList.remove('fa-times');
        menuBtn.querySelector('i').classList.add('fa-bars');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
        navLinks.classList.remove('active');
        menuBtn.querySelector('i').classList.remove('fa-times');
        menuBtn.querySelector('i').classList.add('fa-bars');
    }
});

// Prevent scrolling when mobile menu is open
menuBtn.addEventListener('click', () => {
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Active Navigation Link
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// Timeline Animation
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, {
    threshold: 0.5
});

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = item.classList.contains('timeline-item:nth-child(odd)') 
        ? 'translateX(-100px)' 
        : 'translateX(100px)';
    item.style.transition = 'all 0.6s ease';
    timelineObserver.observe(item);
});

// Form Submission
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    contactForm.reset();
});

// Profile Image Parallax Effect
const imageContainer = document.querySelector('.image-container');
let bounds;

function rotateToMouse(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    if (!bounds) bounds = imageContainer.getBoundingClientRect();
    
    const leftX = mouseX - bounds.x;
    const topY = mouseY - bounds.y;
    const center = {
        x: bounds.width / 2,
        y: bounds.height / 2
    }
    
    const distance = Math.sqrt(Math.pow(leftX - center.x, 2) + Math.pow(topY - center.y, 2));
    
    if (distance < bounds.width) {
        const rotateX = ((topY - center.y) / 15).toFixed(2);
        const rotateY = ((leftX - center.x) / 15).toFixed(2);
        
        imageContainer.style.setProperty('--rotateX', `${rotateX}deg`);
        imageContainer.style.setProperty('--rotateY', `${rotateY}deg`);
    }
}

function resetRotation() {
    imageContainer.style.setProperty('--rotateX', '0deg');
    imageContainer.style.setProperty('--rotateY', '0deg');
}

// Update bounds on scroll and resize
function updateBounds() {
    bounds = imageContainer.getBoundingClientRect();
}

// Event listeners for parallax effect
imageContainer.addEventListener('mousemove', rotateToMouse);
imageContainer.addEventListener('mouseleave', resetRotation);
window.addEventListener('scroll', updateBounds);
window.addEventListener('resize', updateBounds);

// Typing Effect
class TypeWriter {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.element.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Initial Type Speed
        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        // If word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const titleElement = document.querySelector('.typing-title');
    const descElement = document.querySelector('.typing-desc');
    
    const titles = [
        'Crafting innovative web solutions',
        'Building scalable digital experiences',
        'Developing modern web applications'
    ];
    
    const descriptions = [
        'I\'m a software system development student specializing in web development',
        'Committed to developing high-performance web applications that meet both user needs and business goals',
        'Passionate about creating innovative solutions through code'
    ];

    // Start typing effects with different delays
    setTimeout(() => {
        new TypeWriter(titleElement, titles, 3000);
    }, 1000);

    setTimeout(() => {
        new TypeWriter(descElement, descriptions, 3000);
    }, 2000);
}

// Floating Icons Animation
const floatingIcons = document.querySelectorAll('.floating-icon');

floatingIcons.forEach(icon => {
    // Initial random position within constraints
    const speed = parseFloat(icon.getAttribute('data-speed'));
    let x = 0;
    let y = 0;
    let vx = (Math.random() - 0.5) * speed;
    let vy = (Math.random() - 0.5) * speed;

    function animate() {
        // Update position
        x += vx;
        y += vy;

        // Bounce off walls
        if (x > 50 || x < -50) vx *= -1;
        if (y > 50 || y < -50) vy *= -1;

        // Apply transform with parallax effect
        icon.style.transform = `translate(${x}px, ${y}px) scale(${1 + Math.abs(y/100)})`;

        // Add subtle rotation
        icon.style.transform += ` rotate(${x * 0.5}deg)`;

        requestAnimationFrame(animate);
    }

    animate();
});

// Mouse parallax effect for floating icons
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    floatingIcons.forEach(icon => {
        const speed = parseFloat(icon.getAttribute('data-speed'));
        const offsetX = (mouseX - 0.5) * 20 * speed;
        const offsetY = (mouseY - 0.5) * 20 * speed;

        icon.style.transform += ` translate(${offsetX}px, ${offsetY}px)`;
    });
}); 