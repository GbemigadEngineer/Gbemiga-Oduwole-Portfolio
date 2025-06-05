"use strict";
// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle");
const navbarNav = document.getElementById("navbarNav");

menuToggle.addEventListener("click", () => {
  navbarNav.classList.toggle("active");

  // Change icon based on state
  const icon = menuToggle.querySelector("i");
  if (navbarNav.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

// Theme toggle
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");

// Check for saved theme preference
const currentTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", currentTheme);

// Set initial icon
if (currentTheme === "dark") {
  themeIcon.classList.remove("fa-moon");
  themeIcon.classList.add("fa-sun");
}

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  // Apply new theme
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  // Update icon
  if (newTheme === "dark") {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  } else {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  }
});

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    if (navbarNav.classList.contains("active")) {
      navbarNav.classList.remove("active");
      menuToggle.querySelector("i").classList.remove("fa-times");
      menuToggle.querySelector("i").classList.add("fa-bars");
    }
  });
});

// Smooth scrolling functionality
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    // Close mobile menu if open
    if (navbarNav.classList.contains("active")) {
      navbarNav.classList.remove("active");
      const icon = menuToggle.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }

    // Calculate position with navbar offset
    const navbarHeight = document.querySelector(".navbar").offsetHeight;
    const targetPosition =
      targetElement.getBoundingClientRect().top +
      window.pageYOffset -
      navbarHeight;

    // Smooth scroll to target
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  });
});

// Active section highlighting
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

function highlightActiveSection() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const navbarHeight = document.querySelector(".navbar").offsetHeight;

    if (window.pageYOffset >= sectionTop - navbarHeight - 50) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

// Scroll progress indicator
const progressBar = document.querySelector(".scroll-progress");

function updateProgressBar() {
  const scrollPosition = window.pageYOffset;
  const documentHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrollPercentage = (scrollPosition / documentHeight) * 100;

  progressBar.style.width = `${scrollPercentage}%`;
}

// Initialize scroll effects
window.addEventListener("scroll", () => {
  highlightActiveSection();
  updateProgressBar();
});

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  highlightActiveSection();
  updateProgressBar();
});
