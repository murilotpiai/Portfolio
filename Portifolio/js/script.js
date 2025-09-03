const toggleBtn = document.getElementById("toggle-btn");

function applyThemeButton(dark) {
  if (!toggleBtn) return;
  toggleBtn.textContent = dark ? "☀️" : "🌙";
  toggleBtn.setAttribute("aria-pressed", dark ? "true" : "false");
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const dark = document.body.classList.contains("dark-mode");
  try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch {}
  applyThemeButton(dark);
}

function loadTheme() {
  let dark = false;
  try {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    dark = saved ? saved === "dark" : !!prefersDark;
  } catch {}
  if (dark) document.body.classList.add("dark-mode");
  applyThemeButton(dark);
}

if (toggleBtn) {
  toggleBtn.addEventListener("click", toggleDarkMode);
}
loadTheme();

const menuToggle = document.getElementById("menu-toggle");
const navLinks   = document.getElementById("nav-links");

function setMenu(open) {
  if (!menuToggle || !navLinks) return;
  menuToggle.setAttribute("aria-expanded", String(open));
  navLinks.setAttribute("aria-hidden", open ? "false" : "true");
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    setMenu(!expanded);
  });

  navLinks.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      if (window.innerWidth <= 860) setMenu(false);
    });
  });
}
