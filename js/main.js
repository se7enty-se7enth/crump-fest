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

document.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 10) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// === Видео (Crump Clips) ===
document.addEventListener("DOMContentLoaded", () => {
  const clips = document.querySelectorAll(".clip");

  clips.forEach((clip) => {
    const wrapper = clip.querySelector(".clip__wrapper");
    const playBtn = clip.querySelector(".clip__play");
    const src = clip.dataset.src;

    function insertIframe() {
      if (wrapper.querySelector("iframe")) return;

      const iframe = document.createElement("iframe");
      iframe.src = src;
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("allow", "autoplay; encrypted-media; fullscreen");
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.border = "0";

      wrapper.innerHTML = "";
      wrapper.appendChild(iframe);
    }

    playBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      insertIframe();
    });

    wrapper.addEventListener("click", (e) => {
      if (e.target.closest(".clip__play")) return;
      insertIframe();
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(
    ".welcome__screen, .piter__screen"
  );
  if (!sections.length) return;

  const speed = 0.2;
  const maxShift = 200; // макс смещение в px (подгони под дизайн)

  // подсказка: в CSS для секций можно добавить will-change: background-position;
  let ticking = false;

  function update() {
    const scrollY = window.scrollY;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const offsetTop = rect.top + scrollY;
      const relativeY = scrollY - offsetTop;

      const pos = relativeY * speed;
      // ограничиваем, чтобы не получить огромные числа
      const clamped = Math.max(Math.min(pos, maxShift), -maxShift);

      section.style.backgroundPosition = `center calc(50% + ${clamped}px)`;
    });

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => {
    /* можно пересчитать, но update использует getBoundingClientRect уже */ onScroll();
  });

  // первый прогон
  update();
});

const selectWrappers = document.querySelectorAll(".select-wrapper");

selectWrappers.forEach((wrapper) => {
  const select = wrapper.querySelector("select");
  select.addEventListener("click", () => {
    wrapper.classList.toggle("open");
  });

  select.addEventListener("blur", () => {
    wrapper.classList.remove("open");
  });
});
