(function () {
  document.addEventListener("DOMContentLoaded", () => {
    //menu section -------------------------------------------------
    const accordionBoardTypes = document.querySelectorAll(".board-type__title");
    accordionBoardTypes.forEach((type) => {
      type.addEventListener("click", (e) => {
        e.preventDefault();
        const $this = e.currentTarget;
        const accordionItems = document.querySelectorAll(".board-type__descr-container");
        const activeItem = $this.closest(".board-type");
        const activeItemDescr = activeItem.querySelector(".board-type__descr-container");

        const measureWidth = (item) => {
          const itemWidth = parseInt(getComputedStyle(item.closest("ul").querySelector(".board-type__title")).width);
          const itemsQuantity = item.closest("ul").childElementCount;
          const isMobile = window.matchMedia("(max-width: 758px)").matches;
          const isTablet = window.matchMedia("(max-width: 1090px)").matches;

          if (isMobile) return window.innerWidth - itemWidth;
          if (isTablet) return window.innerWidth - itemsQuantity * itemWidth;
          return 524;
        };

        if (!activeItemDescr.classList.contains("board-type__descr-container--active")) {
          accordionItems.forEach((item) => {
            item.classList.remove("board-type__descr-container--active");
            item.closest(".board-type").classList.remove("board-type--active");
          });
        }

        activeItemDescr.classList.toggle("board-type__descr-container--active");
        activeItem.classList.toggle("board-type--active");

        accordionItems.forEach((item) => {
          const isActiveItem = item.classList.contains("board-type__descr-container--active");
          if (isActiveItem) {
            item.style.width = `${measureWidth(item)}px`;
          } else {
            item.style.width = `0px`;
          }
          item.querySelector(".board-type__descr").style.width = `${measureWidth(item)}px`;
        });
      });
    });
  });
})();
