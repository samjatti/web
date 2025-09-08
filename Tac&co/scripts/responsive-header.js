// Responsive mobile menu toggle for header
// Mobile-first, gold-accented, full-width overlay

document.addEventListener('DOMContentLoaded', function() {
  var openBtn = document.getElementById('openMobileNav');
  var closeBtn = document.getElementById('closeMobileNav');
  var mobileNav = document.getElementById('mobileNav');
  var body = document.body;

  function openMenu() {
    mobileNav.classList.add('show-mobile-nav');
    body.classList.add('mobile-nav-open');
    openBtn.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    mobileNav.classList.remove('show-mobile-nav');
    body.classList.remove('mobile-nav-open');
    openBtn.setAttribute('aria-expanded', 'false');
  }

  if (openBtn && mobileNav) {
    openBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (mobileNav.classList.contains('show-mobile-nav')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      closeMenu();
    });
  }

  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
});
