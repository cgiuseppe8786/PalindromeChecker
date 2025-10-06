// =========================================================
//  PALINDROME CHECKER SCRIPT
//  - Gestisce la logica dei test FreeCodeCamp
//  - Gestisce gli esempi rapidi
//  - Gestisce il tema (chiaro/scuro) con persistenza
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  // Riferimenti DOM
  const input = document.getElementById("text-input");
  const button = document.getElementById("check-btn");
  const result = document.getElementById("result");
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // ---- Logica palindromo (rispetta i requisiti FCC) ----
  function isPalindrome(str) {
    const cleaned = str.replace(/[^a-z0-9]/gi, "").toLowerCase();
    const reversed = cleaned.split("").reverse().join("");
    return cleaned.length > 0 && cleaned === reversed;
  }

  function handleCheck() {
    const raw = (input.value || "").trim();

    // Requisito #4: alert con testo esatto se vuoto
    if (!raw) {
      alert("Please input a value");
      return;
    }

    const palindrome = isPalindrome(raw);

    // Requisiti #5–#19: messaggio esatto con il testo originale
    result.textContent = `${raw} is ${palindrome ? "" : "not "}a palindrome.`;

    // Classi per lo stile (check verde / X rossa via CSS ::before)
    result.classList.toggle("is-palindrome", palindrome);
    result.classList.toggle("not-palindrome", !palindrome);
  }

  // Eventi: click e tasto Invio
  button.addEventListener("click", handleCheck);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleCheck();
  });

  // ---- Esempi rapidi ----
  document.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      input.value = chip.dataset.sample || "";
      input.focus();
    });
  });

  // ---- Tema: carica preferenza o sistema ----
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    body.dataset.theme = savedTheme;
    themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";
  } else {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    body.dataset.theme = prefersDark ? "dark" : "light";
    themeToggle.textContent = prefersDark ? "☀️" : "🌙";
  }

  function toggleTheme() {
    const isDark = body.dataset.theme === "dark";
    body.dataset.theme = isDark ? "light" : "dark";
    localStorage.setItem("theme", body.dataset.theme);
    themeToggle.textContent = isDark ? "🌙" : "☀️";
  }

  themeToggle.addEventListener("click", toggleTheme);
  themeToggle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") toggleTheme();
  });
});
