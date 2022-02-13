(function () {
  document.addEventListener("DOMContentLoaded", () => {
    //fullscreen menu with hamburger ------------------------------------

    const fullscreenMenu = document.querySelector(".fullscreen-menu");
    const hamburger = document.querySelector(".hamburger");
    const closeSign = document.querySelector(".fullscreen-menu__close");
    const menuLink = document.querySelectorAll(".menu__link");
    const body = document.body;

    hamburger.addEventListener("click", function (event) {
      event.preventDefault();
      body.style.overflow = "hidden";
      fullscreenMenu.classList.add("fullscreen-menu--active");
    });

    closeSign.addEventListener("click", function (event) {
      event.preventDefault();
      body.style.overflow = "visible";
      fullscreenMenu.classList.remove("fullscreen-menu--active");
    });

    menuLink.forEach((elm) =>
      elm.addEventListener("click", () => {
        body.style.overflow = "visible";
        fullscreenMenu.classList.remove("fullscreen-menu--active");
      })
    );
  });
})();
