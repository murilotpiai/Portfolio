const toggleBtn = document.getElementById("toggle-btn");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

function applyThemeButton(isDark) {
  if (!toggleBtn) return;
  toggleBtn.textContent = isDark ? "Claro" : "Escuro";
  toggleBtn.setAttribute("aria-pressed", String(isDark));
}

function loadTheme() {
  let isDark = false;

  try {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    isDark = savedTheme ? savedTheme === "dark" : Boolean(prefersDark);
  } catch {
    isDark = false;
  }

  document.body.classList.toggle("dark-mode", isDark);
  applyThemeButton(isDark);
}

function toggleTheme() {
  const isDark = !document.body.classList.contains("dark-mode");
  document.body.classList.toggle("dark-mode", isDark);

  try {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  } catch {
    // Theme preference is optional.
  }

  applyThemeButton(isDark);
}

function setMenu(open) {
  if (!menuToggle || !navLinks) return;
  menuToggle.setAttribute("aria-expanded", String(open));
  navLinks.setAttribute("aria-hidden", String(!open));
}

if (toggleBtn) {
  toggleBtn.addEventListener("click", toggleTheme);
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    setMenu(!isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 860) setMenu(false);
    });
  });
}

loadTheme();
