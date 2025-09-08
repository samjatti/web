// Scroll Reveal Animation
function revealOnScroll() {
    const elements = document.querySelectorAll('.reveal');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
}

// Add reveal class to sections
function initRevealAnimations() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('reveal');
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    initRevealAnimations();
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);
});
