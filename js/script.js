/**
 * PREM BARASKAR - CREATIVE PORTFOLIO INTERACTION ENGINE
 * Lightweight ES6+ Vanilla JavaScript — Zero dependencies
 */

const CONFIG = {
  LINKEDIN_URL: "https://www.linkedin.com/in/prem-baraskar-a155b2327/",
  GITHUB_URL: "https://github.com/PremB2907",
  INSTAGRAM_URL: "https://www.instagram.com/bandu_scribbles",
  X_URL: "https://x.com/PremB2907",
  YOUTUBE_URL: "https://www.youtube.com/@Khodkarbandya",
  SUBSTACK_URL: "https://premb2907.substack.com/",
  BLOGSPOT_URL: "https://banduscribblesreviews.blogspot.com/",
  BOOK_INDIA_URL: "https://store.pothi.com/book/prem-sudesh-baraskar-after-all-we%E2%80%99re-here-only-once/",
  BOOK_INTL_URL: "https://www.amazon.sg/After-were-here-Only-Once/dp/B0H6M52M8S",
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
 * 1. Scroll Progress Bar
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
 * 2. Ambient Cursor Glow on Desktop
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
    currentX += (mouseX - currentX) * 0.14;
    currentY += (mouseY - currentY) * 0.14;
    glow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

/**
 * 3. Mobile Navigation Drawer (with Escape key support)
 */
function initMobileNav() {
  const burger = document.querySelector(".nav-burger");
  const overlay = document.querySelector(".mobile-nav-overlay");
  const closeLinks = document.querySelectorAll(".mobile-nav-overlay a");

  if (!burger || !overlay) return;

  const setMenuState = (open) => {
    overlay.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    overlay.setAttribute("aria-hidden", open ? "false" : "true");
    document.body.style.overflow = open ? "hidden" : "";
  };

  burger.addEventListener("click", () => {
    setMenuState(!overlay.classList.contains("open"));
  });

  closeLinks.forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("open")) {
      setMenuState(false);
    }
  });
}

/**
 * 4. IntersectionObserver Scroll Reveal
 */
function initScrollReveal() {
  const elements = document.querySelectorAll(".reveal-init");
  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("reveal-visible"));
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
    threshold: 0.1,
    rootMargin: "0px 0px -30px 0px"
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
      const sectionTop = section.offsetTop - 150;
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
 * 6. Smooth Scroll with Fixed Header Offset
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 92;
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
