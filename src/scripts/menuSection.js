(function () {
  document.addEventListener("DOMContentLoaded", () => {
    //menu section -------------------------------------------------
    const accordionBoardTypes = document.querySelectorAll(".board-type__title");
    accordionBoardTypes.forEach((type) => {
      type.addEventListener("click", (e) => {
        const $this = e.currentTarget;
        const accordionItems = document.querySelectorAll(".board-type__descr-container");
        const activeItem = $this.closest(".board-type");
        const activeItemDescr = activeItem.querySelector(".board-type__descr-container");
        const accordTabletMenu = document.querySelector(".menu-section__col-content");

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
  });
})();
