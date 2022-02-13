(function () {
  document.addEventListener("DOMContentLoaded", () => {
    /* 
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
   */
  });
})();
