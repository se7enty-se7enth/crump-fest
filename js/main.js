// === Бургер ===
const burger = document.querySelector(".burger");
const menu = document.querySelector(".header__nav");
const overlay = document.querySelector(".overlay");

function toggleMenu() {
  burger.classList.toggle("active");
  menu.classList.toggle("active");
  overlay.classList.toggle("active");
}

function closeMenu() {
  burger.classList.remove("active");
  menu.classList.remove("active");
  overlay.classList.remove("active");
}

burger.addEventListener("click", toggleMenu);
overlay.addEventListener("click", closeMenu);
menu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") closeMenu();
});
document.addEventListener("click", (e) => {
  if (
    menu.classList.contains("active") &&
    !menu.contains(e.target) &&
    !burger.contains(e.target)
  ) {
    closeMenu();
  }
});

// === Видео ===
const videoWrapper = document.querySelector(".video__wrapper");
const playBtn = document.querySelector(".video__play");

const vkEmbedSrc =
  "https://vk.com/video_ext.php?oid=-152077710&id=456240937&autoplay=1";
const vkPageUrl = "https://vk.com/video-152077710_456240937";

// функция вставки видео
function insertIframe() {
  // если уже есть iframe — ничего не делаем
  if (videoWrapper.querySelector("iframe")) return;

  const iframe = document.createElement("iframe");
  iframe.src = vkEmbedSrc;
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute("allow", "autoplay; encrypted-media; fullscreen");
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "0";
  iframe.style.display = "block";

  videoWrapper.innerHTML = ""; // убираем превью
  videoWrapper.appendChild(iframe);
}

playBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  insertIframe();
});

// по клику на сам блок
videoWrapper.addEventListener("click", (e) => {
  if (e.target.closest(".video__play")) return; // чтобы не срабатывало дважды
  insertIframe();
});
