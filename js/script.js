
/* =====================================
   1. BUILD TEAM MEMBER CARDS
===================================== */

const teamGrid = document.getElementById("team-grid");

members.forEach((person) => {
  const card = document.createElement("article");
  card.className = "card";

  // Generate initials from the member's name.
  const initials = person.name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Create the card structure.
  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.setAttribute("aria-hidden", "true");
  avatar.textContent = initials;

  const heading = document.createElement("h3");
  heading.textContent = person.name;

  const role = document.createElement("p");
  role.className = "role";
  role.textContent = person.role;

  const bio = document.createElement("p");
  bio.className = "bio";
  bio.textContent = person.bio;

  const link = document.createElement("a");
  link.href = person.link;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "GitHub profile ↗";

  // Add all elements to the card.
  card.append(avatar, heading, role, bio, link);

  // Display the card on the page.
  teamGrid.appendChild(card);
});


/* =====================================
   2. BUILD SKILL CHIPS
===================================== */

const skillsList = document.getElementById("skills-list");

skills.forEach((skill) => {
  const li = document.createElement("li");
  li.textContent = skill;
  skillsList.appendChild(li);
});


/* =====================================
   3. TYPING ANIMATION
===================================== */

const typedName = document.getElementById("typed-name");

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const names = members
  .map((person) => person.name.trim())
  .filter(Boolean);

function typeLoop() {
  let nameIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const currentName = names[nameIndex];

    typedName.textContent = currentName.slice(0, charIndex);

    if (!deleting && charIndex < currentName.length) {
      // Add one character.
      charIndex++;
      setTimeout(tick, 100);
    } else if (!deleting) {
      // Wait before deleting the name.
      deleting = true;
      setTimeout(tick, 1400);
    } else if (charIndex > 0) {
      // Remove one character.
      charIndex--;
      setTimeout(tick, 55);
    } else {
      // Move to the next team member.
      deleting = false;
      nameIndex = (nameIndex + 1) % names.length;
      setTimeout(tick, 250);
    }
  }

  tick();
}

if (names.length === 0) {
  typedName.textContent = "Team Practice";
} else if (reduceMotion) {
  typedName.textContent = names.join(" & ");
} else {
  typeLoop();
}


/* =====================================
   4. LIGHT / DARK THEME
===================================== */

const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");

function updateThemeButton() {
  const isDark = root.dataset.theme === "dark";

  themeToggle.textContent = isDark ? "☀" : "◐";

  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light theme" : "Switch to dark theme"
  );
}

// Load the saved theme, if available.
try {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark" || savedTheme === "light") {
    root.dataset.theme = savedTheme;
  }
} catch (error) {
  // The website still works if browser storage is unavailable.
}

updateThemeButton();

themeToggle.addEventListener("click", () => {
  const nextTheme =
    root.dataset.theme === "dark" ? "light" : "dark";

  root.dataset.theme = nextTheme;
  updateThemeButton();

  try {
    localStorage.setItem("theme", nextTheme);
  } catch (error) {
    // Theme works for the current page even without storage.
  }
});


/* =====================================
   5. MOBILE NAVIGATION
===================================== */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

function closeMenu() {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  menuToggle.textContent = "☰";
}

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );

  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the mobile menu after clicking a navigation link.
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Close the menu when returning to desktop width.
window.addEventListener("resize", () => {
  if (window.innerWidth > 780) {
    closeMenu();
  }
});


/* =====================================
   6. COPY TEAM EMAIL
===================================== */

const copyBtn = document.getElementById("copy-email");
const copyStatus = document.getElementById("copy-status");

copyBtn.addEventListener("click", async () => {
  const email = copyBtn.dataset.email;

  if (!email) {
    copyStatus.textContent = "Please configure the team email.";
    return;
  }

  try {
    // Clipboard access usually requires HTTPS or localhost.
    await navigator.clipboard.writeText(email);
    copyStatus.textContent = "Copied: " + email;
  } catch (error) {
    copyStatus.textContent =
      "Automatic copy unavailable. Please copy manually: " + email;
  }
});


/* =====================================
   7. AUTOMATIC FOOTER YEAR
===================================== */

document.getElementById("year").textContent =
  "© " + new Date().getFullYear();
