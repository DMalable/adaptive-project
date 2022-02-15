(function () {
  document.addEventListener("DOMContentLoaded", () => {
    //catalog section ------------------------------------------------
    //plugin https://www.npmjs.com/package/bxslider
    const slider = $(".slider__list").bxSlider({
      pager: false,
      controls: false,
      wrapperClass: "bx-wrapper-null",
    });

    $(".slider__arrow-link--left").on("click", (e) => {
      e.preventDefault();
      slider.goToPrevSlide();
    });

    $(".slider__arrow-link--right").on("click", (e) => {
      e.preventDefault();
      slider.goToNextSlide();
    });
  });
})();
