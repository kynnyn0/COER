const pages = {
  마틴: { name: "MARTIN 페이지로 이동", url: "member1.html" },
  martin: { name: "MARTIN 페이지로 이동", url: "member1.html" },

  제임스: { name: "JAMES 페이지로 이동", url: "member2.html" },
  james: { name: "JAMES 페이지로 이동", url: "member2.html" },

  주훈: { name: "JUHOON 페이지로 이동", url: "member3.html" },
  juhoon: { name: "JUHOON 페이지로 이동", url: "member3.html" },

  성현: { name: "SEONGHYEON 페이지로 이동", url: "member4.html" },
  seonghyeon: { name: "SEONGHYEON 페이지로 이동", url: "member4.html" },

  건호: { name: "KEONHO 페이지로 이동", url: "member5.html" },
  keonho: { name: "KEONHO 페이지로 이동", url: "member5.html" },
};

// ================= SEARCH =================
const input = document.getElementById("searchInput");
const result = document.getElementById("searchResult");

const slides = document.querySelectorAll(".slide");
let current = 0;

setInterval(() => {
  slides[current].classList.remove("active");
  current = (current + 1) % slides.length;
  slides[current].classList.add("active");
}, 3000);
if (input) {
  input.addEventListener("input", () => {
    const keyword = input.value.toLowerCase();

    result.innerHTML = "";

    if (pages[keyword]) {
      result.style.display = "block";

      result.innerHTML = `
        <div class="result-item"
        onclick="location.href='${pages[keyword].url}'">
          ${pages[keyword].name}
        </div>
      `;
    } else {
      result.style.display = "none";
    }
  });
}

// ================= COPY LINK =================
function copyLink() {
  navigator.clipboard.writeText(window.location.href);
  alert("링크가 복사되었습니다!");
}

// ================= THEME =================
function applyTheme() {
  const theme = localStorage.getItem("theme");
  if (theme) {
    document.documentElement.dataset.theme = theme;

    const btn = document.getElementById("darkModeBtn");
    if (btn) {
      btn.textContent = theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
    }
  }
}

function toggleTheme() {
  const cur = localStorage.getItem("theme") || "light";
  const next = cur === "dark" ? "light" : "dark";

  localStorage.setItem("theme", next);
  document.documentElement.dataset.theme = next;

  const btn = document.getElementById("darkModeBtn");
  if (btn) {
    btn.textContent = next === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
  }
}

// ================= NICKNAME =================
function saveNickname() {
  const name = document.getElementById("nicknameInput")?.value;

  localStorage.setItem("nickname", name);
  applyNickname();
}

function applyNickname() {
  const name = localStorage.getItem("nickname");

  const welcome = document.getElementById("welcomeText");
  const input = document.getElementById("nicknameInput");

  if (name) {
    if (welcome) welcome.textContent = "WELCOME, " + name;
    if (input) input.value = name;
  }
}

// ================= FAVORITE =================
function selectFav(name, el) {
  localStorage.setItem("favorite", name);
  applyFavorite();
}

function applyFavorite() {
  const fav = localStorage.getItem("favorite");

  document.querySelectorAll(".fav-card").forEach((card) => {
    if (!fav) return;
    card.classList.toggle("active", card.dataset.name === fav);
  });
}

// ================= INIT =================
function initApp() {
  applyTheme();
  applyNickname();
  applyFavorite();
}

document.addEventListener("DOMContentLoaded", initApp);
