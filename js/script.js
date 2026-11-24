/**
 * PREM BARASKAR - PORTFOLIO INTERACTION ENGINE
 * Lightweight ES6+ Vanilla JavaScript
 * Zero dependencies
 */

// Configuration Constants
const CONFIG = {
  // If no YouTube channel was set, provide this identifiable placeholder
  YOUTUBE_URL: "ADD_YOUR_YOUTUBE_CHANNEL_URL",
  GITHUB_URL: "https://github.com/PremB2907",
  LINKEDIN_URL: "https://linkedin.com/in/prem-baraskar",
  EMAIL: "prem.baraskar24@sakec.ac.in",
  PHONE: "+91-8692070513"
};

document.addEventListener("DOMContentLoaded", () => {
  initScrollProgress();
  initCursorGlow();
  initMobileNav();
  initScrollReveal();
  initActiveNavSpy();
  initSmoothScroll();
});

/**
 * 1. Scroll Progress Indicator
 */
function initScrollProgress() {
  const progressBar = document.getElementById("scroll-progress");
  if (!progressBar) return;

  window.addEventListener("scroll", () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  }, { passive: true });
}

/**
 * 2. Subtle Interactive Cursor Glow on Desktop
 */
function initCursorGlow() {
  const glow = document.querySelector(".cursor-glow");
  if (!glow || window.matchMedia("(pointer: coarse)").matches) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function render() {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;
    glow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

/**
 * 3. Mobile Navigation Drawer
 */
function initMobileNav() {
  const burger = document.querySelector(".nav-burger");
  const overlay = document.querySelector(".mobile-nav-overlay");
  const closeLinks = document.querySelectorAll(".mobile-nav-link");

  if (!burger || !overlay) return;

  const toggle = () => {
    const isOpen = overlay.classList.toggle("open");
    burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    document.body.style.overflow = isOpen ? "hidden" : "";
  };

  burger.addEventListener("click", toggle);

  closeLinks.forEach((link) => {
    link.addEventListener("click", () => {
      overlay.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });
}

/**
 * 4. IntersectionObserver Scroll Reveal
 */
function initScrollReveal() {
  const elements = document.querySelectorAll(".reveal-init");
  if (!("IntersectionObserver" in window)) {
    elements.forEach(el => el.classList.add("reveal-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  elements.forEach((el) => observer.observe(el));
}

/**
 * 5. Active Navigation Scroll Spy
 */
function initActiveNavSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!sections.length || !navLinks.length) return;

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }, { passive: true });
}

/**
 * 6. Smooth Scroll with Offset for Fixed Header
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
}

