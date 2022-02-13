//map section
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    ymaps.ready(init);
    function init() {
      let myMap = new ymaps.Map("map", {
        center: [55.752004, 37.576133],
        zoom: 14,
        controls: [],
      });

      var myPlacemark = new ymaps.Placemark([55.752004, 37.576133]);

      var myPlacemark = new ymaps.Placemark(
        [55.752004, 37.576133],
        {},
        {
          iconLayout: "default#image",
          iconImageHref: "img/marker.svg",
          iconImageSize: [58, 73],
          iconImageOffset: [-28, -73],
        }
      );
      myMap.geoObjects.add(myPlacemark);
    }
  });
})();
