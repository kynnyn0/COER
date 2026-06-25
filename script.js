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
// 검색했을 때 어느 페이지로 이동해야 하는지 저장하는 객체

// ================= SEARCH =================
// 검색창 요소 가져오기
const input = document.getElementById("searchInput");
// 검색 결과 출력 요소 가져오기
const result = document.getElementById("searchResult");

if (input) {
  input.addEventListener("input", () => {
    //입력 감지(사용자가 키보드를 입력할 때마다 실행됨)
    const keyword = input.value.toLowerCase(); //입력 값을 소문자로 변환함

    result.innerHTML = ""; //기존 결과를 지우고 새 결과를 넣음

    if (pages[keyword]) {
      //검색 성공 했을 때 객체 안에 단어가 존재하는지 확인
      result.style.display = "block";

      result.innerHTML = `                      
        <div class="result-item"
        onclick="location.href='${pages[keyword].url}'">  
          ${pages[keyword].name}
        </div>
      `;
    } else {
      //결과가 없을때 아무것도 표출하지 않음
      result.style.display = "none";
    }
  });
}

// ================= COPY LINK =================
function copyLink() {
  //현재 페이지 주소를 복사하는 함수
  navigator.clipboard.writeText(window.location.href);
  alert("링크가 복사되었습니다!");
}

// ================= THEME =================
function applyTheme() {
  //페이지를 처음 열었을 때 저장된 테마를 적용
  const theme = localStorage.getItem("theme"); //저장된 테마를 가져옴
  if (theme) {
    document.documentElement.dataset.theme = theme; //html태그에 다크테마를 추가한다는 의미

    const btn = document.getElementById("darkModeBtn"); //버튼 글자 변경
    if (btn) {
      btn.textContent = theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
    }
  }
}

//다크모드와 라이트 모드 전환하는 역할
function toggleTheme() {
  //버튼을 눌렀을 때 바로 변경
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
  const name = document.getElementById("nicknameInput")?.value; //입력한 닉네임 가져오기

  localStorage.setItem("nickname", name); //저장
  applyNickname(); //적용
}

function applyNickname() {
  const name = localStorage.getItem("nickname");

  const welcome = document.getElementById("welcomeText"); //가져오기
  const input = document.getElementById("nicknameInput");

  if (name) {
    if (welcome) welcome.textContent = "WELCOME, " + name; //결과
    if (input) input.value = name;
  }
}

//호출하여 저장함
function selectFav(name) {
  localStorage.setItem("favorite", name);
  applyFavorite(); //화면 갱신
}

//저장된 최애 멤버를 화면에 적용하는 것
function applyFavorite() {
  const fav = localStorage.getItem("favorite"); //저장된 곳에서 최애를 가져오기

  //모든 최애 카드 가져오기                //가져온 카드들을 하나씩 반복해서 검사
  document.querySelectorAll(".fav-card").forEach((card) => {
    if (!fav) return; //최애가 없으면 종료함
    card.classList.toggle("active", card.dataset.name === fav);
  }); //저장된 최애와 결과가 같으면 active 클래스 추가 다르면 제거
}

// 페이지가 시작될 때 필요한 기능들을 한번에 실행함(저장된 것들을 적용)
function initApp() {
  applyTheme();
  applyNickname();
  applyFavorite();
}

//html이 전부 로드 된 후 실행하도록 함
document.addEventListener("DOMContentLoaded", initApp);
