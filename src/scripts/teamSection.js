(function () {
  document.addEventListener("DOMContentLoaded", () => {
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
    });
  });
})();
