const toggleBtn = document.getElementById("toggle-btn");


function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    toggleBtn.textContent = "☀️"; 
  } else {
    localStorage.setItem("theme", "light");
    toggleBtn.textContent = "🌙"; 
  }
}


function loadTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
      toggleBtn.textContent = "☀️";
    }
  } else {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.body.classList.add("dark-mode");
      toggleBtn.textContent = "☀️";
    }
  }
}

toggleBtn.addEventListener("click", toggleDarkMode);
loadTheme();