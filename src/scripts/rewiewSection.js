(function () {
  document.addEventListener("DOMContentLoaded", () => {
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
  });
})();
