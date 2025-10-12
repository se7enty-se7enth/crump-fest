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

// открытие/закрытие по клику на бургер
burger.addEventListener("click", toggleMenu);

// закрытие при клике на оверлей
overlay.addEventListener("click", closeMenu);

// закрытие при клике по ссылке меню
menu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    closeMenu();
  }
});

// закрытие при клике вне меню и бургера (на десктопе)
document.addEventListener("click", (e) => {
  if (
    menu.classList.contains("active") &&
    !menu.contains(e.target) &&
    !burger.contains(e.target)
  ) {
    closeMenu();
  }
});
