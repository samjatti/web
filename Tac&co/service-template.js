// service-template.js: Modern UI/UX enhancements for service-template.html

document.addEventListener('DOMContentLoaded', function () {
  // Fade-in animation for sections
  const fadeSections = document.querySelectorAll('.fade-in-section');
  const fadeInOnScroll = () => {
    fadeSections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        section.classList.add('visible');
      }
    });
  };
  window.addEventListener('scroll', fadeInOnScroll);
  fadeInOnScroll();

  // Scroll-to-top button
  const scrollBtn = document.getElementById('scrollToTopBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // CTA button pulse animation
  const ctaBtn = document.getElementById('service-cta-btn');
  if (ctaBtn) {
    ctaBtn.addEventListener('mouseenter', () => {
      ctaBtn.style.boxShadow = '0 0 0 8px #FFD70044';
    });
    ctaBtn.addEventListener('mouseleave', () => {
      ctaBtn.style.boxShadow = '';
    });
  }
});
gsap.registerPlugin(ScrollTrigger);

// Animate hero content
gsap.registerPlugin(ScrollTrigger);

// Animate hero content on load
gsap.to(".hero-content", {
  opacity: 1,
  y: 0,
  duration: 1.2,
  ease: "power2.out",
  delay: 0.3
});

// Animate intro block
gsap.from(".intro", {
  scrollTrigger: ".intro",
  opacity: 0,
  y: 40,
  duration: 1,
  ease: "power2.out"
});

// Animate cards in grid sections
gsap.from(".card", {
  scrollTrigger: ".grid",
  opacity: 0,
  y: 30,
  stagger: 0.2,
  duration: 1,
  ease: "power2.out"
});

// Animate strategy and delivery lists
gsap.from(".strategy li, .delivery li, .services li", {
  scrollTrigger: ".strategy, .delivery, .services",
  opacity: 0,
  x: -30,
  stagger: 0.2,
  duration: 1,
  ease: "power2.out"
});
gsap.from(".strategy-block", {
  scrollTrigger: {
    trigger: ".strategy-section",
    start: "top 80%",
  },
  opacity: 0,
  y: 40,
  stagger: 0.2,
  duration: 1,
  ease: "power2.out"
});

// Accordion toggle logic
const headers = document.querySelectorAll(".accordion-header");

headers.forEach(header => {
  header.addEventListener("click", () => {
    const item = header.parentElement;
    const body = item.querySelector(".accordion-body");
    const isActive = item.classList.contains("active");

    // Close all items
    document.querySelectorAll(".accordion-item").forEach(i => {
      i.classList.remove("active");
      gsap.to(i.querySelector(".accordion-body"), { height: 0, opacity: 0, duration: 0.3 });
    });

    // Open clicked item
    if (!isActive) {
      item.classList.add("active");
      gsap.to(body, { height: "auto", opacity: 1, duration: 0.4 });
    }
  });
});