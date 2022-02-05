const fullscreenMenu = document.querySelector(".fullscreen-menu");
const hamburger = document.querySelector(".hamburger");
const closeSign = document.querySelector(".fullscreen-menu__close");
const menuLink = document.querySelectorAll(".menu__link");
const body = document.body;

$(window).on("load", () => {
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

  // part with using jQuerry

  // plugin slider
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

  const openItem = (item) => {
    const itemToOpen = item.siblings(".employee__info");
    const container = itemToOpen.find(".employee__info-container");
    itemToOpen.height(container.height());
    item.addClass("employee__name--active");
  };

  const closeAllItems = (container) => {
    const items = container.find(".employee__info");
    items.height(0);
    container.find(".employee__name").removeClass("employee__name--active");
  };

  const employeeName = $(".employee__name");
  $(employeeName).on("click", (e) => {
    const $this = $(e.currentTarget);
    const container = $this.closest(".team__list");

    if ($this.hasClass("employee__name--active")) {
      closeAllItems(container);
    } else {
      closeAllItems(container);
      openItem($this);
    }

    // $this.toggleClass("employee__name--active");
    // employeeName.not($this).each((ndx, item) => {
    //   $(item).removeClass("employee__name--active");
    // });

    // console.log(employeeName.hasClass("employee__name--active"));

    // textBlock.height(reqHeight);
    // console.log(textBlock.height(reqHeight));
  });

  $(".interactive-avatar__link").on("click", (e) => {
    e.preventDefault();
    const $this = $(e.currentTarget);
    const curItem = $this.closest(".interactive-avatar");

    // add active class to current list item and remove it from other list items
    curItem.addClass("interactive-avatar--active").siblings().removeClass("interactive-avatar--active");
    const activeSwitcherNum = $(".interactive-avatar--active").attr("data-open");

    const itemsList = $(".rewiews__item");

    itemsList
      .filter((ndx, item) => $(item).attr("data-linked-with") === activeSwitcherNum)
      .addClass("rewiews__item--active")
      .siblings()
      .removeClass("rewiews__item--active");
  });
});
