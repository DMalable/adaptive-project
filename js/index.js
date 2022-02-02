const fullscreenMenu = document.querySelector(".fullscreen-menu");
const hamburger = document.querySelector(".hamburger");
const closeSign = document.querySelector(".fullscreen-menu__close");
const menuLink = document.querySelectorAll(".menu__link");

hamburger.addEventListener("click", function (event) {
  event.preventDefault();
  fullscreenMenu.classList.add("fullscreen-menu--active");
});

closeSign.addEventListener("click", function (event) {
  event.preventDefault();
  fullscreenMenu.classList.remove("fullscreen-menu--active");
});

menuLink.forEach((elm) => elm.addEventListener("click", () => fullscreenMenu.classList.remove("fullscreen-menu--active")));

// часть на jquerry

$(window).on("load", () => {
  $(document).ready(function () {
    $(".single-item").slick();
  });

  const employeeName = $(".employee__name");
  $(employeeName).on("click", (e) => {
    $(e.target).toggleClass("employee__name--active");
    employeeName.not($(e.target)).each((ndx, item) => {
      $(item).removeClass("employee__name--active");
    });
  });
});
