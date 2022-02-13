(function () {
  document.addEventListener("DOMContentLoaded", () => {
    // form section -----------------------------------------------
    const orderForm = document.querySelector(".form");
    const sendButton = document.querySelector(".form-button");
    const sendStatus = orderForm.elements.status;
    const body = document.body;

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
  });
})();
