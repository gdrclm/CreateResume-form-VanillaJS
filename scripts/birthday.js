// document.addEventListener("DOMContentLoaded", function () {
//   const Inputday = document.querySelector("#day");
//   const InputMonth = document.querySelector("#month");
//   const InputYear = document.querySelector("#year");
//   const zodiacSignElement = document.querySelector(".zodiak-pholder"); // Обновил селектор
//   zodiacSignElement.textContent = "Знак зодиака";
//   const ageElement = document.querySelector(".age-pholder "); // Обновил селектор

//   const zodiac = [
//     "Козерог",
//     "Водолей",
//     "Рыбы",
//     "Овен",
//     "Телец",
//     "Близнецы",
//     "Рак",
//     "Лев",
//     "Дева",
//     "Весы",
//     "Скорпион",
//     "Стрелец",
//   ];

//   function calculateZodiacSign(day, month) {
//     return zodiac[(month - 1 + (day >= 21 ? 1 : 0)) % 12];
//   }

//   function calculateAge(year) {
//     const currentYear = new Date().getFullYear();
//     return currentYear - parseInt(year);
//   }

//   function updateResults() {
//     const day = Inputday.value;
//     const month = InputMonth.value;
//     const year = InputYear.value;

//     // Проверяем, что значения состоят из двух цифр для дня и месяца,
//     // и из четырех цифр для года
//     if (day.length === 2 && month.length === 2 && year.length === 4) {
//       // Если все условия выполнены, преобразуем значения в числа
//       const numericDay = parseInt(day);
//       const numericMonth = parseInt(month);
//       const numericYear = parseInt(year);

//       // Проверяем, что числовые значения дня, месяца и года корректны
//       if (!isNaN(numericDay) && !isNaN(numericMonth) && !isNaN(numericYear)) {
//         // Если все условия выполнены, обновляем элементы
//         zodiacSignElement.textContent = calculateZodiacSign(
//           numericDay,
//           numericMonth
//         );
//         ageElement.textContent = calculateAge(numericYear);
//       } else {
//         // Если числовые значения некорректны, очищаем элементы
//         zodiacSignElement.textContent = "Знак зодиака";
//         ageElement.textContent = "_";
//       }
//     } else {
//       // Если значения не соответствуют ожидаемой длине, очищаем элементы
//       zodiacSignElement.textContent = "Знак зодиака";
//       ageElement.textContent = "_";
//     }
//   }

//   Inputday.addEventListener("input", updateResults);
//   InputMonth.addEventListener("input", updateResults);
//   InputYear.addEventListener("input", updateResults);
// });

const zodiac = [
  {name: "Козерог", icon: "CAPRICORN.svg"},
  {name: "Водолей", icon: "AQUARIUS.svg"},
  {name: "Рыбы", icon: "PISCES.svg"},
  {name: "Овен", icon: "OVEN.svg"},
  {name: "Телец", icon: "TAURUS.svg"},
  {name: "Близнецы", icon: "GEMINI.svg"},
  {name: "Рак", icon: "RAK.svg"},
  {name: "Лев", icon: "LEO.svg"},
  {name: "Дева", icon: "VIRGO.svg"},
  {name: "Весы", icon: "LIBRA.svg"},
  {name: "Скорпион", icon: "SCORP.svg"},
  {name: "Стрелец", icon: "STRELETS.svg"},
  // Добавьте остальные знаки зодиака с их соответствующими иконками
];

function calculateZodiacSign(day, month) {
  const signIndex = (month - 1 + (day >= 21 ? 1 : 0)) % 12;
  return zodiac[signIndex];
}

document.addEventListener("DOMContentLoaded", function () {
  const Inputday = document.querySelector("#day");
  const InputMonth = document.querySelector("#month");
  const InputYear = document.querySelector("#year");
  const zodiacSignElement = document.querySelector(".zodiak-pholder");
  const zodiacIconElement = document.querySelector(".zodiac-icon"); // Добавлен элемент для иконки
  zodiacSignElement.textContent = "Знак зодиака";
  const ageElement = document.querySelector(".age-pholder");

  function calculateAge(year) {
    const currentYear = new Date().getFullYear();
    return currentYear - parseInt(year);
  }

  function updateResults() {
    const day = Inputday.value;
    const month = InputMonth.value;
    const year = InputYear.value;

    if (day.length === 2 && month.length === 2 && year.length === 4) {
      const numericDay = parseInt(day);
      const numericMonth = parseInt(month);
      const numericYear = parseInt(year);

      if (!isNaN(numericDay) && !isNaN(numericMonth) && !isNaN(numericYear)) {
        const zodiacSign = calculateZodiacSign(numericDay, numericMonth);
        zodiacSignElement.textContent = zodiacSign.name;
        ageElement.textContent = calculateAge(numericYear);

        // Установка иконки знака зодиака
        zodiacIconElement.src = "/icons/icons_zodiak/" + zodiacSign.icon;
        zodiacIconElement.alt = zodiacSign.name;

        zodiacSignElement.insertAdjacentElement(
          "afterbegin",
          zodiacIconElement
        );
      } else {
        zodiacSignElement.textContent = "Знак зодиака";
        ageElement.textContent = "_";
      }
    } else {
      zodiacSignElement.textContent = "Знак зодиака";
      ageElement.textContent = "_";
    }
  }

  Inputday.addEventListener("input", updateResults);
  InputMonth.addEventListener("input", updateResults);
  InputYear.addEventListener("input", updateResults);
});
