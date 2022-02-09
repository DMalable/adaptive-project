//fullscreen menu with hamburger ------------------------------------

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

  //catalog section ------------------------------------------------
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

  //review section -------------------------------------------------

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

  //menu section -------------------------------------------------
  const accordionBoardTypes = document.querySelectorAll(".board-type__title");
  accordionBoardTypes.forEach((type) => {
    type.addEventListener("click", (e) => {
      const $this = e.currentTarget;
      const accordionItems = document.querySelectorAll(".board-type__descr-container");
      const activeItem = $this.closest(".board-type");
      const activeItemDescr = activeItem.querySelector(".board-type__descr-container");
      const accordTabletMenu = document.querySelector(".menu-section__col-content");

      // console.log(accordionItems);
      if (!activeItemDescr.classList.contains("board-type__descr-container--active")) {
        accordionItems.forEach((item) => {
          item.classList.remove("board-type__descr-container--active");
          item.closest(".board-type").classList.remove("board-type--active");
        });
      }

      activeItemDescr.classList.toggle("board-type__descr-container--active");
      activeItem.classList.toggle("board-type--active");
      // add class whith position absolute for menu and item (uses on tablet and mobile)
      if (activeItemDescr.classList.contains("board-type__descr-container--active")) {
        accordTabletMenu.classList.add("menu-section__col-content--active");
      } else {
        accordTabletMenu.classList.remove("menu-section__col-content--active");
      }
    });
  });

  // form section -----------------------------------------------

  const orderForm = document.querySelector(".form");
  const sendButton = document.querySelector(".form-button");
  const sendStatus = orderForm.elements.status;

  sendButton.addEventListener("click", (e) => {
    e.preventDefault();

    let messageText = "";

    if (validateForm(orderForm)) {
      //request if form is valid
      const data = {
        name: orderForm.elements.firstName.value,
        phone: orderForm.elements.phone.value,
        comment: orderForm.elements.comment.value,
        to: orderForm.elements.to.value,
        street: orderForm.elements.street.value,
        house: orderForm.elements.house.value,
        building: orderForm.elements.building.value,
        flat: orderForm.elements.flat.value,
        floor: orderForm.elements.floor.value,
        cash: orderForm.elements.payment[0].checked,
        card: orderForm.elements.payment[1].checked,
        call: orderForm.elements.call_option.checked,
      };
      const xhr = new XMLHttpRequest();
      xhr.responseType = "json";
      xhr.open("POST", "https://webdev-api.loftschool.com/sendmail");
      xhr.setRequestHeader("content-type", "application/json");
      xhr.send(JSON.stringify(data));
      xhr.addEventListener("load", () => {
        let modalTextBlock = document.querySelector(".modal__window-message");

        sendStatus.value = xhr.response.status;
        messageText = xhr.response.message;
        modalTextBlock.textContent = messageText;
      });
    } else {
      messageText = 'Заполните поля "Имя", "Телефон" и "Комментарий"';
    }

    function validateForm(form) {
      const name = form.elements.firstName;
      const tel = form.elements.phone;
      const comment = form.elements.comment;
      const to = form.elements.to;
      let resultValid = true;
      [name, tel, comment, to].forEach((item) => {
        resultValid = resultValid && item.checkValidity();
        item.classList.remove("form__input--error");
        if (!item.checkValidity()) {
          item.classList.add("form__input--error");
        }
      });
      return resultValid;
    }

    const modal = document.querySelector(".modal");
    let modalTextBlock = document.querySelector(".modal__window-message");
    modalTextBlock.textContent = messageText;
    body.style.overflow = "hidden";
    modal.classList.add("modal--active");

    const modalButton = document.querySelector(".modal__window-button");
    modalButton.addEventListener("click", (e) => {
      e.preventDefault();
      body.style.overflow = "visible";
      modal.classList.remove("modal--active");

      if (sendStatus.value === "1") {
        orderForm.reset();
      }
    });
  });

  //onepage scroll
  function debounce(func, time) {
    let timeout;

    return function () {
      const context = this;
      const args = arguments;

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, time);
    };
  }

  let scroll = debounce((down) => {
    console.log(down);

    const mainContent = document.querySelector(".maincontent");
    mainContent.style.transition = "transform 0.5s";
    const scrollHeight = mainContent.scrollHeight;
    const screenHeight = window.innerHeight;
    const numberOfPages = scrollHeight / screenHeight;
    //diapasone between tops of first and last pages
    const wiewHeight = [0, (numberOfPages - 1) * screenHeight];

    shiftCounter = (currentShift, shiftSize, interval) => {
      let resultShift = 0;
      console.log(currentShift, shiftSize, interval);
      if (!down) {
        if (currentShift < interval[0]) {
          resultShift = currentShift + shiftSize;
          return resultShift;
        } else return interval[0];
      } else {
        if (currentShift > -1 * interval[1]) {
          resultShift = currentShift - shiftSize;
          return resultShift;
        } else return -1 * interval[1];
      }
    };

    heightShift = shiftCounter(heightShift, screenHeight, wiewHeight);
    mainContent.style.transform = `translateY(${heightShift}px)`;
  }, 300);

  let heightShift = 0;

  window.addEventListener("wheel", (e) => {
    e.preventDefault();
    const directionDown = e.deltaY > 0;

    scroll(directionDown);
  });
});
