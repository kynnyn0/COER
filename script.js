const pages = {
  마틴: {
    name: "MARTIN 페이지로 이동",
    url: "member1.html",
  },

  martin: {
    name: "MARTIN 페이지로 이동",
    url: "member1.html",
  },

  제임스: {
    name: "JAMES 페이지로 이동",
    url: "member2.html",
  },

  james: {
    name: "JAMES 페이지로 이동",
    url: "member2.html",
  },

  주훈: {
    name: "JUHOON 페이지로 이동",
    url: "member3.html",
  },

  juhoon: {
    name: "JUHOON 페이지로 이동",
    url: "member3.html",
  },

  성현: {
    name: "SEONGHYEON 페이지로 이동",
    url: "member4.html",
  },

  seonghyeon: {
    name: "SEONGHYEON 페이지로 이동",
    url: "member4.html",
  },

  건호: {
    name: "KEONHO 페이지로 이동",
    url: "member5.html",
  },

  keonho: {
    name: "KEONHO 페이지로 이동",
    url: "member5.html",
  },
};

const input = document.getElementById("searchInput");
const result = document.getElementById("searchResult");

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

function copyLink() {
  navigator.clipboard.writeText(window.location.href);

  alert("링크가 복사되었습니다!");
}

window.onload = () => {
  const theme = localStorage.getItem("theme");

  if (theme) {
    document.documentElement.dataset.theme = theme;
  }
};
