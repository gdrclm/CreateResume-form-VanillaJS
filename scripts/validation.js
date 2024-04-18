window.addEventListener("click", function () {
  var input = document.activeElement;
  if (input && input.tagName === "INPUT" && input.value === "") {
    input.setAttribute("required", "");
  }
});
// document.addEventListener("DOMContentLoaded", function () {
//   // Удалить атрибут required у всех полей ввода
//   var inputs = document.querySelectorAll("input[required]");
//   inputs.forEach(function (input) {
//     input.removeAttribute("required");
//   });

//   // Добавить обработчик события клика на форму
//   document.getElementById("myForm").addEventListener("click", function (event) {
//     var target = event.target;
//     if (target.tagName === "INPUT" && target.type === "text") {
//       // Проверить, был ли клик по полю ввода
//       // Если да, добавить атрибут required к этому полю
//       target.setAttribute("required", "");
//     }
//   });

//   // Добавить обработчик события отправки формы
//   document
//     .getElementById("myForm")
//     .addEventListener("submit", function (event) {
//       var inputs = document.querySelectorAll("input[type='text']");
//       inputs.forEach(function (input) {
//         input.setAttribute("required", "");
//       });
//     });
// });
window.addEventListener("DOMContentLoaded", function () {
  // Удалить атрибут required у всех полей ввода
  var inputs = document.querySelectorAll("input[required]");
  inputs.forEach(function (input) {
    input.removeAttribute("required");
  });

  // Добавить обработчик события отправки формы
  document
    .getElementById("myForm")
    .addEventListener("submit", function (event) {
      var inputs = document.querySelectorAll("input[type='text']");
      var isValid = true; // Флаг для проверки валидности формы
      inputs.forEach(function (input) {
        input.removeAttribute("required");
        const elements = document.querySelectorAll(".validation");
        elements.forEach(function (element) {
          element.style.display = "none";
        });
        if (input.value === "") {
          input.setAttribute("required", "");
          const elements = document.querySelectorAll(".validation");
          elements.forEach(function (element) {
            element.style.display = "block";
          });
          isValid = false; // Если поле пустое, форма невалидна
        } else {
          input.removeAttribute("required");
          const elements = document.querySelectorAll(".validation");
          elements.forEach(function (element) {
            element.style.display = "none";
          });
        }
      });

      if (!isValid) {
        event.preventDefault(); // Отмена отправки формы, если форма невалидна
        const elements = document.querySelectorAll(".validation");
        elements.forEach(function (element) {
          element.style.display = "block";
        });
        // Прокрутка страницы к самому верху
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    });
});
