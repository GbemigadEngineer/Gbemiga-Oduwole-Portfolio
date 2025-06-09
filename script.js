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

// Project filtering functionality
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.getAttribute("data-filter");

      // Filter projects
      projectCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-type") === filter) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});

// Contact form submission
document.getElementById("enquiryForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Form data collection
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  // Show success message
  alert(
    `Thank you ${formData.name}! Your message has been sent successfully. I'll get back to you soon.`
  );

  // Reset form
  this.reset();
});

// Copy to clipboard functionality
function copyToClipboard(text) {
  const tempInput = document.createElement("input");
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);

  // Show feedback
  const notification = document.createElement("div");
  notification.textContent = `Copied: ${text}`;
  notification.style.position = "fixed";
  notification.style.bottom = "20px";
  notification.style.right = "20px";
  notification.style.padding = "10px 20px";
  notification.style.background = "#2c3e50";
  notification.style.color = "white";
  notification.style.borderRadius = "4px";
  notification.style.zIndex = "10000";
  notification.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
  notification.style.animation = "fadeInOut 3s forwards";

  document.body.appendChild(notification);

  setTimeout(() => {
    document.body.removeChild(notification);
  }, 2500);
}

// Add animation for notification
const style = document.createElement("style");
style.textContent = `
      @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(10px); }
        20% { opacity: 1; transform: translateY(0); }
        80% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(10px); }
      }
    `;
document.head.appendChild(style);

// Modal functionality
const modals = document.querySelectorAll(".modal");
const closeButtons = document.querySelectorAll(".close-modal");

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add("active");
}

function closeModal(modal) {
  modal.classList.remove("active");
}

closeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const modal = this.closest(".modal");
    closeModal(modal);
  });
});

modals.forEach((modal) => {
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal(modal);
    }
  });
});

// Contact form validation and submission
document.getElementById("enquiryForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Form validation
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !subject || !message) {
    document.getElementById("errorMessage").textContent =
      "Please fill in all required fields.";
    openModal("errorModal");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById("errorMessage").textContent =
      "Please enter a valid email address.";
    openModal("errorModal");
    return;
  }

  // Form submission to Netlify
  const formData = new FormData(this);

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
    .then((response) => {
      if (response.ok) {
        openModal("successModal");
        this.reset();
      } else {
        throw new Error("Form submission failed");
      }
    })
    .catch((error) => {
      document.getElementById("errorMessage").textContent =
        "There was an error submitting your form. Please try again.";
      openModal("errorModal");
      console.error("Form submission error:", error);
    });
});

// FOOTER
// Set current year in footer
document.getElementById("current-year").textContent = new Date().getFullYear();
