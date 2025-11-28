// Mobile Menu Toggle
const menuToggle = document.getElementById("menuToggle")
const navLinks = document.querySelector(".nav-links")

menuToggle.addEventListener("click", () => {
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex"
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    if (this.getAttribute("href") !== "#") {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
        // Close mobile menu if open
        if (navLinks.style.display === "flex") {
          navLinks.style.display = "none"
        }
      }
    }
  })
})

// Download Resume Function
function downloadResume() {
  window.print()
}

// Handle Contact Form Submission
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm")
  const formMessage = document.getElementById("formMessage")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()
      handleContactSubmit(e)
    })
  }
})

function handleContactSubmit(event) {
  event.preventDefault()

  const formMessage = document.getElementById("formMessage")
  const formData = new FormData(event.target)

  // Collect form data
  const name = formData.get("name")
  const email = formData.get("email")
  const message = formData.get("message")

  // Basic validation
  if (!name || !email || !message) {
    showMessage("Please fill in all fields", "error", formMessage)
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    showMessage("Please enter a valid email address", "error", formMessage)
    return
  }

  // Send email using fetch (with a backend endpoint)
  sendEmail({
    name: name,
    email: email,
    message: message,
  })
    .then((response) => {
      if (response.ok) {
        showMessage("Message sent successfully! I'll get back to you soon.", "success", formMessage)
        event.target.reset()
      } else {
        showMessage("Failed to send message. Please try again.", "error", formMessage)
      }
    })
    .catch((error) => {
      console.error("Error:", error)
      showMessage("An error occurred. Please try again later.", "error", formMessage)
    })
}

function sendEmail(data) {
  // Replace with your backend endpoint or use a service like EmailJS
  return fetch("/api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
}

function showMessage(message, type, element) {
  element.textContent = message
  element.className = `form-message ${type}`

  // Auto-hide message after 5 seconds
  setTimeout(() => {
    element.textContent = ""
    element.className = "form-message"
  }, 5000)
}

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.style.opacity = "0"
  card.style.transform = "translateY(20px)"
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(card)
})

// Active navigation link on scroll
window.addEventListener("scroll", () => {
  let current = ""
  const sections = document.querySelectorAll("section[id]")

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active")
    }
  })
})
