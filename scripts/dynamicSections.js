var ismodal = false;

function showModal() {
  const modal = document.getElementById("myModal");
  modal.classList.add("modal-active");
}

function hideModal() {
  const modal = document.getElementById("myModal");
  modal.classList.remove("modal-active");
}

function removeEl(e) {
  if (e && e.target && ismodal === false) {
    console.log(e.target, e.target.parentNode.parentNode);
    e.target.parentNode.parentNode.remove();
  } else {
    const modal = document.getElementById("myModal");
    const closeBnt = document.getElementById("close-modal");
    const delModal = document.getElementById("del-modal");

    const span = document.getElementsByClassName("close")[0];

    showModal();

    span.onclick = function () {
      hideModal();
    };

    closeBnt.onclick = function () {
      hideModal();
    };

    delModal.onclick = () => {
      hideModal();
      ismodal = false;
      if (e && e.target && ismodal === false) {
        console.log(e.target, e.target.parentNode);
        e.target.parentNode.parentNode.remove();
      }
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        hideModal();
        isBlock = false;
      }
    };
    console.log("Ok");
  }
}
const kids = document.getElementById("haveKidsSelect");
const addKids = document.querySelector(".kids-age");
// console.log(selected);
kids.addEventListener("click", haveKids);

const select = kids.querySelector("select");

const optionsArray = [...select.options];
function haveKids() {
  const selected = kids.querySelector(".select-selected");

  if (optionsArray[0].textContent == selected.textContent) {
    addKids.classList.remove("display-none");
  } else addKids.classList.add("display-none");
}
addKids.querySelector("button").addEventListener("click", addItem);

function addItem() {
  addKids.insertAdjacentHTML(
    "afterbegin",

    `<div id="deleteKid">
    <div class="del-block-container"> 
    <span class="delete-button">Удалить блок</span>
    <svg xmlns="http://www.w3.org/2000/svg" class="red-svg" width="30" height="30" fill="none" style="padding-bottom: 3px"
    viewBox="0 0 99 128">
    <path fill="#000" fill-rule="evenodd"
      d="m67 1 7 7h25v14H0V8h25l7-7h35ZM49 68l15-15 10 10-15 15 15 15-10 10-15-15-15 15-10-10 15-15-15-15 10-10 15 15ZM1 113c0 8 12 14 20 14h57c7 0 20-6 20-14H14V35H1v78Z"
      clip-rule="evenodd" />
    <path fill="#000" d="M85 113h13V35H85v78Z" />
  </svg>
</div>
   
    <div data-placeholder="Возраст ребенка" class="custom-select">
    <select>
      <option value="1">Меньше года</option>
      <option value="2">1</option>
      <option value="3">2</option>
      <option value="4">3</option>
      <option value="5">4</option
      <option value="5">5</option>
      <option value="5">6</option>
    </select>
  </div>
    </div>
   `
  );
  callBack();
  const deleteButton = document.querySelector(".del-block-container");
  deleteButton.addEventListener("click", (e) => {
    console.log("Модалка", ismodal);
    removeEl(e);
  });
}

const addSchoolBtn = document.getElementById("addSchool");
addSchoolBtn.addEventListener("click", addSchoolForm);

function addSchoolForm() {
  addSchoolBtn.insertAdjacentHTML(
    "beforebegin",
    `
    <div class="school-container">
      <div class="del-block-container"> 
        <span class="delete-button">Удалить блок</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="red-svg" width="30" height="30" fill="none" style="padding-bottom: 3px" viewBox="0 0 99 128">
          <path fill="#000" fill-rule="evenodd" d="m67 1 7 7h25v14H0V8h25l7-7h35ZM49 68l15-15 10 10-15 15 15 15-10 10-15-15-15 15-10-10 15-15-15-15 10-10 15 15ZM1 113c0 8 12 14 20 14h57c7 0 20-6 20-14H14V35H1v78Z" clip-rule="evenodd" />
          <path fill="#000" d="M85 113h13V35H85v78Z" />
        </svg>
      </div>
      <div class="school-education education">
        <h2>Образование в школе, гимназии</h2>
        <div class="school-city">
          <div class="input-wrapper">
            <p>Город</p>
            <input type="text" name="city-school" id="city-school" placeholder="Город обучения в школе, гимназии" />
            <p class="validation"> Пожалуйста, укажите Город.</p>
          </div>
        </div>
        <div class="period-study">
          <h3>Период обучения</h3>
          <div style="display: flex; gap: 10px; margin-bottom: 40px;">
            <div>
              <p class="date-education-title">Начало обучения</p>
              <div class="date-education">
                <input type="text" maxlength="2" placeholder="ДД" id="day" />
                .
                <input type="text" maxlength="2" placeholder="ММ" id="month" />
                .
                <input type="text" maxlength="4" placeholder="ГГГГ" id="year" />
              </div>
            </div>
            <div>
              <p class="date-education-title">Окончание</p>
              <div class="date-education">
                <input type="text" maxlength="2" placeholder="ДД" id="day" />
                .
                <input type="text" maxlength="2" placeholder="ММ" id="month" />
                .
                <input type="text" maxlength="4" placeholder="ГГГГ" id="year" />
              </div>
            </div>
          </div>
          <p class="validation"> Пожалуйста, укажите Период обучения.</p>
        </div>
        <div class="school-description">
          <div class="input-wrapper">
            <p>Номер и название школы</p>
            <input type="text" name="num-name-school" id="num-name-school" placeholder="например: ООШ №20" />
            <p class="validation"> Пожалуйста, укажите Номер и название школы.</p>
          </div>
          <div class="input-wrapper">
            <p>Наличие медали</p>
            <div data-placeholder="Налачие медали" class="custom-select">
              <select>
                <option value="1">Нет</option>
                <option value="2">Золотая</option>
                <option value="3">Серебрянная</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
  );
  callBack();
  ismodal = true;

  // Получаем все кнопки удаления и добавляем к ним обработчики событий
  const deleteButtons = document.querySelectorAll(".del-block-container");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      removeEl(e);
    });
  });
}
const addCollegeBtn = document.getElementById("addCollege");
addCollegeBtn.addEventListener("click", addCollegeForm);
function addCollegeForm() {
  addCollegeBtn.insertAdjacentHTML(
    "beforebegin",
    `
  
  <div class="school-container">
  <h2>Средне-специальное образование(техникум, училище, колледж)</h2>
  <div class="del-block-container"> 
  <span class="delete-button">Удалить блок</span>

    <svg xmlns="http://www.w3.org/2000/svg" class="red-svg" width="30" height="30" fill="none" style="padding-bottom: 3px"
      viewBox="0 0 99 128">
      <path fill="#000" fill-rule="evenodd"
        d="m67 1 7 7h25v14H0V8h25l7-7h35ZM49 68l15-15 10 10-15 15 15 15-10 10-15-15-15 15-10-10 15-15-15-15 10-10 15 15ZM1 113c0 8 12 14 20 14h57c7 0 20-6 20-14H14V35H1v78Z"
        clip-rule="evenodd" />
      <path fill="#000" d="M85 113h13V35H85v78Z" />
    </svg>
    </div>
    <div class="college-education education">
    <div class="name-organization">
      <div class="input-wrapper">
        <p> Название учебного заведения</p>
        <input type="text" name="college-name-organization" id="college-name-organization"
          placeholder="Название учебного заведения" />
          <p class="validation"> Пожалуйста, укажите Название учебного заведения.</p>
      </div>
    </div>
    <div class="speciality input-wrapper">
      <p>Специальность</p>

      <input type="text" name="speciality" id="speciality" placeholder="Специальность" />
      <p class="validation"> Пожалуйста, укажите Специальность.</p>

    </div>
    <div class="period-study">
    <h3>Период обучения</h3>
    <div style="display: flex; gap: 10px; margin-bottom: 40px;">
      <div>
        <div class="date-education">
          <input type="text" maxlength="2" placeholder="ДД" id="day" />
          .
          <input type="text" maxlength="2" placeholder="ММ" id="month" />
          .
          <input type="text" maxlength="4" placeholder="ГГГГ" id="year" />
        </div>
      </div>
      <div>
        <div class="date-education">
          <input type="text" maxlength="2" placeholder="ДД" id="day" />
          .
          <input type="text" maxlength="2" placeholder="ММ" id="month" />
          .
          <input type="text" maxlength="4" placeholder="ГГГГ" id="year" />
        </div>
      </div>
    </div>
    <p class="validation"> Пожалуйста, укажите период обучения.</p>
  </div>  
  <h3>Форма обучения</h3>
    <div data-placeholder="Форма обучения" class="custom-select">
      <select>
        <option value="1">Очная</option>
        <option value="2">Заочная</option>
        <option value="3">Очно-заочная</option>
      </select>
    </div>

    <div class="profession input-wrapper">
      <h3>Квалификация, профессия</h3>
      <input type="text" name="profession" id="profession" placeholder="Квалификация, профессия" />
      <p class="validation"> Пожалуйста, укажите квалификацию, профессию.</p>
    </div>
    <h3>Наличие красного диплома</h3>
    <div data-placeholder="Налачие красного диплома" class="custom-select">
      <select>
        <option value="1">Есть</option>
        <option value="2">Нет</option>
      </select>
    </div>
  </div>
</div>`
  );
  callBack();
  ismodal = true;
  const deleteButtons = document.querySelectorAll(".del-block-container");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      removeEl(e);
    });
  });
}

const addUniversityBtn = document.getElementById("addUniversity");
addUniversityBtn.addEventListener("click", addUniversityForm);

function addUniversityForm() {
  addUniversityBtn.insertAdjacentHTML(
    "beforebegin",
    `
  
  <div class="school-container">
  <h2>Высшее-профессиональное образование(институт, университет, академия)</h2>
  <div class="del-block-container"> 
  <span class="delete-button">Удалить блок</span>

    <svg xmlns="http://www.w3.org/2000/svg" class="red-svg" width="30" height="30" fill="none" style="padding-bottom: 3px"
      viewBox="0 0 99 128">
      <path fill="#000" fill-rule="evenodd"
        d="m67 1 7 7h25v14H0V8h25l7-7h35ZM49 68l15-15 10 10-15 15 15 15-10 10-15-15-15 15-10-10 15-15-15-15 10-10 15 15ZM1 113c0 8 12 14 20 14h57c7 0 20-6 20-14H14V35H1v78Z"
        clip-rule="evenodd" />
      <path fill="#000" d="M85 113h13V35H85v78Z" />
    </svg>
   </div>
    <div class="university-education education">
    <div class="name-organization input-wrapper">
      <p>Название учебной организации</p>
      <input type="text" name="college-name-organization" id="college-name-organization"
        placeholder="Название учебной организации" />
        <p class="validation"> Пожалуйста, укажитеНазвание учебной организации.</p>
    </div>
    <div class="speciality input-wrapper">
      <p>Специальность</p>
      <input type="text" name="speciality" id="speciality" placeholder="Специальность" />
      <p class="validation"> Пожалуйста, укажите Специальнось обучения.</p>
    </div>
    <div class="period-study">
          <h3>Период обучения</h3>
          <div style="display: flex; gap: 10px; margin-bottom: 40px;">
            <div>
              <div class="date-education">
              
                <input type="text" maxlength="2" placeholder="ДД" id="day" />
                .
                <input type="text" maxlength="2" placeholder="ММ" id="month" />
                .
                <input type="text" maxlength="4" placeholder="ГГГГ" id="year" />
              </div>
            </div>
            <div>
              <div class="date-education">
                <input type="text" maxlength="2" placeholder="ДД" id="day" />
                .
                <input type="text" maxlength="2" placeholder="ММ" id="month" />
                .
                <input type="text" maxlength="4" placeholder="ГГГГ" id="year" />
              </div>
            </div>
          </div>
          <p class="validation"> Пожалуйста, укажите период обучения.</p>
        </div>
        <h3>Форма обучения</h3>
    <div data-placeholder="Форма обучения" class="custom-select">
      <select>
        <option value="1">Очная</option>
        <option value="2">Заочная</option>
        <option value="3">Очно-заочная</option>
      </select>
    </div>
    <h3>Квалификация высшего образования</h3>
    <div data-placeholder="Квалификация высшего образования" class="custom-select">

      <select>
        <option value="1">Бакалавр</option>
        <option value="2">Специалист</option>
        <option value="3">Магистр</option>
      </select>
    </div>
    <h3>Налачие красного диплома</h3>
    <div data-placeholder="Налачие красного диплома" class="custom-select">
      <select>
        <option value="1">Есть</option>
        <option value="2">Нет</option>
      </select>
    </div>
  </div>
</div>`
  );
  callBack();
  ismodal = true;
  const deleteButtons = document.querySelectorAll(".del-block-container");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      removeEl(e);
    });
  });
}

const addWorkBtn = document.getElementById("addWorkBtn");
addWorkBtn.addEventListener("click", addWorkForm);

function addWorkForm() {
  addWorkBtn.insertAdjacentHTML(
    "beforebegin",
    ` <div class="work-place">
    <h2>Последующее место работы</h2>
<div class="del-block-container"> 
<span class="delete-button">Удалить блок</span>

    <svg xmlns="http://www.w3.org/2000/svg" class="red-svg" width="30" height="30" fill="none" style="padding-bottom: 3px"
      viewBox="0 0 99 128">
      <path fill="#000" fill-rule="evenodd"
        d="m67 1 7 7h25v14H0V8h25l7-7h35ZM49 68l15-15 10 10-15 15 15 15-10 10-15-15-15 15-10-10 15-15-15-15 10-10 15 15ZM1 113c0 8 12 14 20 14h57c7 0 20-6 20-14H14V35H1v78Z"
        clip-rule="evenodd" />
      <path fill="#000" d="M85 113h13V35H85v78Z" />
    </svg>
    </div>
    <p>Сначала добавьте сведения о последнем месте(местах) работы.</p>
    <div class="name-organization input-wrapper">
      <p for="work-name-organization">название компании</p>
      <input type="text" name="work-name-organization" id="work-name-organization"
        placeholder="Название компании" />
      <p class="validation">Пожалуйста, укажите название компании.</p>
    </div>
    <div class="rank input-wrapper">
      <p for="rank-in-company">Должность</p>
      <input type="text" name="rank" id="rank" placeholder="Название компании" />
      <p class="validation">Пожалуйста, укажите должность.</p>
    </div>
    <p>Начало работы</p>
    <div class="working-timeline">
      <div data-placeholder="Месяц" class="custom-select">
        <select>
          <option value="1">Январь</option>
          <option value="2">Февраль</option>
          <option value="3">Март</option>
          <option value="4">Апрель</option>
          <option value="5">Май</option>
          <option value="6">Июнь</option>
          <option value="7">Июль</option>
          <option value="8">Август</option>
          <option value="9">Сентябрь</option>
          <option value="10">Октябрь</option>
          <option value="11">Ноябрь</option>
          <option value="12">Декабрь</option>
        </select>

      </div>
      <input type="number" name="start-working" id="start-working" placeholder="Год" />
      <p class="validation">Пожалуйста, укажите начало работы.</p>
    </div>
    <p>Конец работы</p>
    <div class="for-today">
      <label for="for-today"> <span>По настоящее время</span></label>
      <input type="checkbox" name="for-today" id="for-today" />
    </div>

    <div class="working-timeline working-timeline-end">
      <div class="custom-select" data-placeholder="Месяц">
        <select>
          <option value="1">Январь</option>
          <option value="2">Февраль</option>
          <option value="3">Март</option>
          <option value="4">Апрель</option>
          <option value="5">Май</option>
          <option value="6">Июнь</option>
          <option value="7">Июль</option>
          <option value="8">Август</option>
          <option value="9">Сентябрь</option>
          <option value="10">Октябрь</option>
          <option value="11">Ноябрь</option>
          <option value="12">Декабрь</option>
        </select>
      </div>
      <input type="number" name="finish-working" id="finish-working" placeholder="Год" />
    </div>
    <p class="validation">Пожалуйста, укажите конец работы.</p>
    <div class="tasks input-wrapper">
      <div class="inputContainer">
        <p>Обязанности</p>
        <div id="skillsInput">

          <input id="skillsInputInner" placeholder="Введите должностные функции и ключевые навыки" type="text">

          <button id="addSkillButton">+</button>
        </div>
        <div class="containerSkillsElements"></div>
        <p class="validation">Пожалуйста, укажите Обязанности</p>
      </div>
    </div>
  </div>`
  );
  callBack();
  ismodal = true;
  const deleteButtons = document.querySelectorAll(".del-block-container");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      removeEl(e);
    });
  });
}
