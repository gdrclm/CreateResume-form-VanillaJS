var callBack = () => {
  const customSelects = document.querySelectorAll(".custom-select");

  customSelects.forEach(function (customSelect) {
    const select = customSelect.querySelector("select");
    let isOpen = false;
    if (customSelect.querySelector(".select-items")) {
      null;
    } else {
      const selected = document.createElement("div");
      selected.classList.add("select-selected");
      selected.textContent = customSelect.dataset.placeholder;
      customSelect.appendChild(selected);

      const items = document.createElement("div");

      items.classList.add("select-items");

      for (let option of select.options) {
        const item = document.createElement("div");
        item.textContent = option.textContent;
        item.addEventListener("click", function () {
          selected.textContent = this.textContent;
          select.value = option.value;
          closeAllSelect();
        });
        items.appendChild(item);
      }

      customSelect.appendChild(items);
      items.style.height = "69" * items.children.length + "px";
      selected.addEventListener("click", function (event) {
        event.stopPropagation();
        isOpen = !isOpen;
        customSelect.classList.toggle("open", isOpen);
      });
    }
  });

  function closeAllSelect() {
    customSelects.forEach(function (customSelect) {
      customSelect.classList.remove("open");
    });
  }

  document.addEventListener("click", function () {
    closeAllSelect();
  });

  const selectItems = document.querySelector(".select-items");
  selectItems.style.height = "69" * selectItems.children.length + "px";
  console.log(selectItems);
  console.log(selectItems.style.height);
  console.log(selectItems.children);
};

callBack();
