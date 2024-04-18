//Код на показать больше
const hiddenContent = document.getElementById("hiddenText");
const buttonShowMore = document.getElementById("showMoreBtn");

buttonShowMore.addEventListener("click", function () {
  if (hiddenContent.style.maxHeight) {
    hiddenContent.classList.remove("shown");
    hiddenContent.style.maxHeight = null; // Скрываем контент
    buttonShowMore.textContent = "Показать больше";
    hiddenContent.style.margin = "0";
  } else {
    hiddenContent.classList.add("shown");
    hiddenContent.style.maxHeight = hiddenContent.scrollHeight + "px"; // Показываем контент
    buttonShowMore.textContent = "Скрыть";
    hiddenContent.style.margin = " 20px 0";
  }
});
///Код добавляющий елементы через инпут по кнопке

document.body.addEventListener("input", function (e) {
  if (e.target.id === "skillsInputInner") {
    const input = e.target;

    const inputContainer = input.closest("#skillsInput");
    const containerElements = inputContainer.nextElementSibling;
    console.log(input, inputContainer);
    const button = input.nextElementSibling;
    button.addEventListener("click", buttonClick);

    function buttonClick() {
      const textElem = `<div class="skillElem"><span>${input.value}</span><button class="delButton">x</button></div>`;
      if (input.value != "") {
        containerElements.insertAdjacentHTML("beforeend", textElem);
        input.value = "";
        const delButtons = document.querySelectorAll(".delButton");
        delButtons.forEach((button) => {
          button.addEventListener("click", delElem);
        });
      } else {
        console.log("пустой инпут");
      }
    }
    function delElem() {
      const parentElement = this.parentNode;
      parentElement.remove();
    }
  }
});

const range = document.getElementById("myRange");
const rangeFill = document.querySelector(".range-fill");
const rangeValue = document.getElementById("rangeValue");

range.addEventListener("input", () => {
  const value = range.value;
  rangeValue.textContent = value;
  const rangeWidth = range.offsetWidth;
  const fillWidth = (value * rangeWidth) / parseInt(range.max);
  rangeFill.style.width = Math.min(fillWidth, rangeWidth) + "px";
});

document.body.addEventListener("change", function (event) {
  if (event.target.id === "for-today") {
    const timeRangeNow = event.target;
    const forToday = timeRangeNow.closest(".for-today");
    // Найти следующий элемент на том же уровне вложенности
    const workingTimelineEnd = forToday.nextElementSibling;

    if (
      workingTimelineEnd &&
      workingTimelineEnd.classList.contains("working-timeline-end")
    ) {
      // В зависимости от состояния чекбокса скрываем или показываем элемент
      workingTimelineEnd.style.display = timeRangeNow.checked ? "none" : "flex";
    } else {
      console.error("Элемент .working-timeline-end не найден");
    }
  }
});

const telegramCheckbox = document.getElementById("telegram");
telegramCheckbox.addEventListener("change", function () {
  const telegramLinkInput = document.querySelector(".telegram-link");
  if (telegramCheckbox.checked) {
    telegramLinkInput.style.display = "block";
  } else {
    telegramLinkInput.style.display = "none";
  }
});

// document.body.addEventListener("input", (event) => {
//   if (event.target.id === "day") {
//     const dayInput = event.target;

//     const monthInput = dayInput.nextElementSibling;
//     const yearInput = monthInput.nextElementSibling;

//     dayInput.addEventListener("input", function () {
//       if (this.value.length >= parseInt(this.getAttribute("maxlength"))) {
//         monthInput.focus(); // Переключаем фокус на следующий элемент ввода
//       }
//     });

//     monthInput.addEventListener("input", function () {
//       if (this.value.length >= parseInt(this.getAttribute("maxlength"))) {
//         yearInput.focus(); // Переключаем фокус на следующий элемент ввода
//       }
//     });
//     dayInput.addEventListener("keydown", function (event) {
//       if (event.key === "Backspace" && this.value === "") {
//         monthInput.focus();
//       }
//     });

//     monthInput.addEventListener("keydown", function (event) {
//       if (event.key === "Backspace" && this.value === "") {
//         dayInput.focus();
//       }
//     });
//   }
// });
function addInputListeners(input) {
  const maxLength = parseInt(input.getAttribute("maxlength"));
  const nextInput = input.nextElementSibling;
  const prevInput = input.previousElementSibling;

  input.addEventListener("input", function () {
    if (this.value.length >= maxLength) {
      if (nextInput) {
        nextInput.focus();
      }
    }
  });

  input.addEventListener("keydown", function (event) {
    if (event.key === "Backspace" && this.value === "" && prevInput) {
      prevInput.focus();
      event.preventDefault();
    }
  });
}

document.body.addEventListener("input", function (event) {
  if (event.target.tagName === "INPUT" && event.target.type === "text") {
    addInputListeners(event.target);
  }
});

document.body.addEventListener("DOMContentLoaded", function () {
  const dynamicInputs = document.querySelectorAll("input[type='text']");
  dynamicInputs.forEach(addInputListeners);
});
