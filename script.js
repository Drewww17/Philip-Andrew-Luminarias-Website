// script.js

// Year in footer
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

// Theme toggle (light / dark)
const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const storedTheme = localStorage.getItem("theme");

if (storedTheme === "dark" || storedTheme === "light") {
  html.setAttribute("data-theme", storedTheme);
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = html.getAttribute("data-theme") || "light";
    const next = current === "light" ? "dark" : "light";
    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
}

// Scroll reveal animation
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach(el => observer.observe(el));

// Auto-hide navbar on scroll
let lastScrollY = window.scrollY;
const nav = document.querySelector(".auto-hide");

window.addEventListener("scroll", () => {
  const currentY = window.scrollY;
  if (!nav) return;

  if (currentY > lastScrollY && currentY > 80) {
    nav.classList.add("hide");
  } else {
    nav.classList.remove("hide");
  }
  lastScrollY = currentY;
});

// Scroll-to-top button
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (!scrollTopBtn) return;
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Simple tilt effect on cards
const tiltCards = document.querySelectorAll(".tilt");

tiltCards.forEach(card => {
  const strength = 8; // smaller = subtler tilt

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * strength;
    const rotateX = ((y / rect.height) - 0.5) * -strength;

    card.style.transform =
      `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(600px) rotateX(0) rotateY(0)";
  });
});

// Parallax effect for hero background
const hero = document.querySelector(".hero");
if (hero) {
  window.addEventListener("scroll", () => {
    const offset = window.scrollY * 0.3;
    hero.style.backgroundPosition = `center ${offset * -1}px`;
  });
}
