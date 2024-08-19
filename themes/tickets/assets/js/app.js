const mainHeader = document.querySelector('[data-header]');
const mainNavigation = document.querySelector('[data-navigation]');
const mainNavigationList = document.querySelector('[data-navigation-list]');
const mobileNavigationTrigger = document.querySelector('[data-navigation-toggle]');
const mobileNavigation = document.querySelector('[data-navigation-list]');
const fadeIns = document.querySelectorAll('.gsap-fade-in');
const counters = document.querySelectorAll('[data-counter]');

// GSAP ScrollTrigger plugin registration
gsap.registerPlugin(ScrollTrigger);

/**
 * Trap focus within navigation
 */
function navigationFocus() {
  const focusableElements = mainNavigation.querySelectorAll('a[href], button');
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  mainNavigation.addEventListener('keydown', function (e) {
    if (e.target === firstFocusableElement && e.key === 'Tab' && e.shiftKey) {
      e.preventDefault();
      lastFocusableElement.focus();
    } else if (e.target === lastFocusableElement && e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      firstFocusableElement.focus();
    }
  });
}

/**
 * Close navigation if escape key is pressed
 */
function handleEscape() {
  document.addEventListener('keyup', function (e) {
    const escape = e.key;

    if (escape === 'Escape' && mobileNavigation.classList.contains('open')) {
      mobileNavigationTrigger.setAttribute('aria-expanded', 'false');
      mobileNavigationTrigger.focus();
      mobileNavigation.classList.remove('open');
      mainHeader.classList.remove('main-header--navigation-open');
      mobileNavigationTrigger.innerHTML = "Open Menu";
    }
  });
}

mobileNavigationTrigger.addEventListener("click", function () {
  mainHeader.classList.toggle('main-header--navigation-open');
  mainNavigationList.classList.toggle("open")
  this.classList.toggle("nav-open");

  navigationFocus();
  handleEscape();

  if (mainNavigationList.classList.contains('open')) {
    this.setAttribute('aria-expanded', 'true');
    this.innerHTML = "Close Menu";
  } else {
    this.setAttribute('aria-expanded', 'false');
    this.innerHTML = "Open Menu";
  }
});

// Function to handle counter animations
const animateCounters = () => {
  counters.forEach(counter => {
    const targetValue = parseFloat(counter.getAttribute('data-value'));

    gsap.to(counter, {
      duration: 2,
      innerHTML: targetValue,
      snap: { innerHTML: 1 },
      onUpdate() {
        counter.innerHTML = Math.round(this.targets()[0].innerHTML);
      },
      ease: "power1.out"
    });
  });
};

// Function to handle fade-in animations
const animateFadeIns = () => {
  fadeIns.forEach(fadeIn => {
    // Set initial visibility
    gsap.set(fadeIn, { visibility: 'visible' });

    // Scroll-triggered fade-in animation
    gsap.fromTo(fadeIn,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: fadeIn,
          start: 'top 90%',
          end: 'bottom top',
          once: true
        }
      }
    );

    // Focus-triggered fade-in animation
    fadeIn.addEventListener('focus', () => triggerAnimation(fadeIn));
  });
};

// Function to trigger fade-in animation on focus
const triggerAnimation = (element) => {
  gsap.fromTo(element,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1 }
  );
};

// Initialize all animations
const initAnimations = () => {
  if (counters.length > 0) animateCounters();
  if (fadeIns.length > 0) animateFadeIns();
};

// Run the animations
initAnimations();
