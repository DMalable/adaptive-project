(function () {
  //onepage scroll
  document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const sectionsArr = Array.prototype.slice.call(sections);
    const firstSection = document.querySelector("section");
    const display = document.querySelector(".maincontent");
    const sidemenu = document.querySelector(".scroller");
    const scrollerItems = $(sidemenu).find(".scroller__item");
    //plugin https://www.npmjs.com/package/mobile-detect
    const mobileDetect = new MobileDetect(window.navigator.userAgent);
    const isMobile = mobileDetect.mobile();
    let inScroll = false;

    firstSection.classList.add("active-section");

    const countSectionPosition = (sectionEq) => {
      return sectionEq * -100;
    };

    const switchScrollerTheme = (sectionEq) => {
      const currentSection = $(sections).eq(sectionEq);
      const menuTheme = currentSection.attr("data-sidemenu-theme");
      const activeClass = "scroller--dark";

      if (menuTheme === "black") {
        sidemenu.classList.add(activeClass);
      } else {
        sidemenu.classList.remove(activeClass);
      }
    };

    const resetItemActiveClass = (list, index, activeClass) => {
      list.eq(index).addClass(activeClass).siblings().removeClass(activeClass);
    };

    const performTransition = (sectionEq) => {
      if (!inScroll) {
        inScroll = true;
        const position = countSectionPosition(sectionEq);

        switchScrollerTheme(sectionEq);

        display.style.transform = `translateY(${position}%)`;

        resetItemActiveClass($(sections), sectionEq, "active-section");

        setTimeout(() => {
          inScroll = false;
          resetItemActiveClass(scrollerItems, sectionEq, "scroller__item--active");
        }, 1000);
      }
    };

    const viewportScroller = () => {
      const activeSection = document.querySelector(".active-section");
      const activeSectionNumber = sectionsArr.indexOf(activeSection);
      const nextSection = activeSectionNumber + 1;
      const prevSection = activeSectionNumber - 1;
      const isFirstSection = activeSectionNumber <= 0;
      const isLastSection = activeSectionNumber >= sections.length - 1;

      return {
        next() {
          if (!isLastSection) {
            performTransition(nextSection);
          }
        },
        prev() {
          if (!isFirstSection) {
            performTransition(prevSection);
          }
        },
      };
    };

    window.addEventListener("wheel", (e) => {
      const $this = e.target;
      const map = $this.closest(".map__content");
      const cursorOnMap = map !== null;
      const directionDown = e.deltaY > 0;
      const scroller = viewportScroller();

      if (cursorOnMap) return;
      if (directionDown) {
        scroller.next();
      } else {
        scroller.prev();
      }
    });

    window.addEventListener("keydown", (e) => {
      const tagName = e.target.tagName.toLowerCase();
      const userTypingInInputs = tagName === "input" || tagName === "textarea";
      const scroller = viewportScroller();
      if (!userTypingInInputs) {
        switch (e.key) {
          case "ArrowUp":
            scroller.prev();
            break;

          case "ArrowDown":
            scroller.next();
            break;
        }
      }
    });

    const wrapper = document.querySelector(".wrapper");
    wrapper.addEventListener("touchmove", (e) => e.preventDefault);
    const scrollElements = document.querySelectorAll("[data-scroll-to]");

    scrollElements.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const $this = e.currentTarget;
        const target = $this.getAttribute("data-scroll-to");
        const reqSection = document.querySelector(`[data-section-id=${target}]`);

        performTransition($(reqSection).index());
      });
    });

    if (isMobile) {
      //plugin https://www.npmjs.com/package/jquery-touchswipe
      $("body").swipe({
        swipe: function (event, direction) {
          const scroller = viewportScroller();
          let scrollDirection = "";

          if (direction === "up") scrollDirection = "next";
          if (direction === "down") scrollDirection = "prev";

          scroller[scrollDirection]();
        },
      });
    }
  });
})();
