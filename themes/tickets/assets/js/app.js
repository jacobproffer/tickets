// Cache DOM elements
const fadeIns = document.querySelectorAll('.gsap-fade-in');
const counters = document.querySelectorAll('[data-counter]');

// GSAP ScrollTrigger plugin registration
gsap.registerPlugin(ScrollTrigger);

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
