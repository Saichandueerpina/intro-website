// ---------- Build team cards from js/members.js ----------
const teamGrid = document.getElementById("team-grid");

members.forEach((person) => {
  const card = document.createElement("article");
  card.className = "card";

  const initials = person.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  card.innerHTML = `
    <div class="avatar" aria-hidden="true">${initials}</div>
    <h3></h3>
    <p class="role"></p>
    <p class="bio"></p>
    <a target="_blank" rel="noopener">GitHub profile</a>
  `;

  // textContent keeps typed text safe
  card.querySelector("h3").textContent = person.name;
  card.querySelector(".role").textContent = person.role;
  card.querySelector(".bio").textContent = person.bio;
  card.querySelector("a").href = person.link;

  teamGrid.appendChild(card);
});

// ---------- Skill chips ----------
const skillsList = document.getElementById("skills-list");
skills.forEach((skill) => {
  const li = document.createElement("li");
  li.textContent = skill;
  skillsList.appendChild(li);
});

// ---------- Typing effect: cycles through the member names ----------
const typedName = document.getElementById("typed-name");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const names = members.map((m) => m.name);

function typeLoop() {
  let nameIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = names[nameIndex];
    typedName.textContent = current.slice(0, charIndex);

    if (!deleting && charIndex < current.length) {
      charIndex++;
      setTimeout(tick, 110);
    } else if (!deleting) {
      deleting = true;
      setTimeout(tick, 1500);
    } else if (charIndex > 0) {
      charIndex--;
      setTimeout(tick, 60);
    } else {
      deleting = false;
      nameIndex = (nameIndex + 1) % names.length;
      setTimeout(tick, 300);
    }
  }
  tick();
}

if (reduceMotion || names.length === 0) {
  typedName.textContent = names.join(" & ");
} else {
  typeLoop();
}

// ---------- Light / dark theme toggle (remembered in the browser) ----------
const root = document.documentElement;
const toggle = document.getElementById("theme-toggle");

try {
  const saved = localStorage.getItem("theme");
  if (saved) root.dataset.theme = saved;
} catch (e) { /* storage may be unavailable */ }

toggle.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// ---------- Copy email button ----------
const copyBtn = document.getElementById("copy-email");
const copyStatus = document.getElementById("copy-status");

copyBtn.addEventListener("click", async () => {
  const email = copyBtn.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    copyStatus.textContent = "Copied " + email;
  } catch (e) {
    copyStatus.textContent = "Copy failed. The email is " + email;
  }
});

// ---------- Footer year ----------
document.getElementById("year").textContent = "© " + new Date().getFullYear();
