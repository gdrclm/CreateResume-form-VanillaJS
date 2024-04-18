// Переменные
const inputFile = document.getElementById("fileInput");
const imagesContainer = document.getElementById("imagesContainer");
const buttonClose = document.getElementById("button-close");
const buttonUploadLabel = document.querySelector(".custom-file-upload");
const imageInfo = document.querySelector(".imageInfo");
const format = document.getElementById("formatImage");
const size = document.getElementById("sizeImage");
const resolution = document.getElementById("resolutionImage");
let images = [];

function closeEditor(event) {
  imagesContainer.innerHTML = "";
  inputFile.value = "";
  inputFile.style.display = "block";
  buttonClose.style.display = "none";
  buttonUploadLabel.style.display = "inline-block";
  imageInfo.style.display = "none";
}
// Функция загрузки изображения
function loadImage(event) {
  const reader = new FileReader();

  reader.onload = function (event) {
    const image = new Image();
    image.onload = function () {
      const formatImage = getImageFormat(image);
      const sizeImage = getImageSize(image);
      const resolutionImage = getImageResolution(image);

      format.textContent = "Формат: " + formatImage;
      size.textContent = "Размер: " + sizeImage;
      resolution.textContent = "Разрешение: " + resolutionImage;

      inputFile.style.display = "none";
      buttonUploadLabel.style.display = "none";
      buttonClose.style.display = "flex";
      imageInfo.style.display = "block";

      // Очищаем контейнер перед добавлением нового изображения
      imagesContainer.innerHTML = "";
      createEditor(image);
    };
    image.src = event.target.result;
  };

  reader.readAsDataURL(event.target.files[0]);
}

function getImageFormat(image) {
  if (!image.complete || !image.src) {
    return "Unknown";
  }
  const url = image.src;
  const format = url
    .substring(url.indexOf("/") + 1, url.indexOf(";"))
    .toUpperCase();
  return format;
}

function getImageSize(image) {
  // Получаем размер изображения в байтах
  const sizeInBytes = image.src.length;
  // Преобразуем размер в килобайты с округлением до двух знаков после запятой
  const sizeInKilobytes = (sizeInBytes / 1024).toFixed(2) + " KB";
  return sizeInKilobytes;
}

function getImageResolution(image) {
  // Получаем разрешение изображения (ширина x высота)
  const resolution = image.width + " x " + image.height;
  return resolution;
}

// Функция создания редактора для изображения
function createEditor(image) {
  const canvasOriginal = createCanvas(image, 1, 1);
  const canvasSmall1 = createCanvas(image, 0.5, 28);
  const canvasSmall2 = createCanvas(image, 0.5, 28);

  // Добавляем элементы в контейнер
  const editorContainer = document.createElement("div");
  imagesContainer.appendChild(editorContainer);

  const canvasContainer = document.createElement("div");
  const canvasSmallContainer = document.createElement("div");
  const imageInfo = ``;
  const sizeImage = document.getElementById("sizeImage");
  editorContainer.classList.add("editor");
  canvasContainer.appendChild(canvasOriginal);
  canvasOriginal.insertAdjacentHTML("afterend", imageInfo);
  const cropContainerSquare = document.getElementById("cropContainerSquare");
  const cropContainerCircle = document.getElementById("cropContainerCircle");

  canvasSmallContainer.appendChild(cropContainerSquare);

  canvasSmallContainer.appendChild(cropContainerCircle);

  editorContainer.appendChild(canvasContainer);
  canvasContainer.appendChild(canvasSmallContainer);

  canvasOriginal.className = "canvasOriginal";
  canvasSmall1.className = "canvasSmall";
  canvasSmall2.className = "canvasSmall";

  canvasContainer.className = "canvasContainer";
  canvasSmallContainer.className = "canvasSmallContainer";
  // Инициализируем параметры изображений
  const editorDataOriginal = initializeEditorData(canvasOriginal, image);
  const editorDataSmall1 = initializeEditorData(canvasSmall1, image, 3);
  const editorDataSmall2 = initializeEditorData(canvasSmall2, image, 3);
  console.log(canvasSmall1, canvasSmall2);
  // Функция изменения ширины canvas без изменения высоты с сохранением пропорций изображения
  function resizeCanvasWithoutDistortion(editorData, newWidth, newHeight) {
    editorData.canvas.width = newWidth;
    editorData.canvas.height = newHeight;

    // Устанавливаем размеры изображения в canvas
    editorData.image.width = editorData.canvas.width;
    editorData.image.height = editorData.canvas.height;

    redrawImage(editorData);
  }
  function cropImage(editorData, newWidth, newHeight) {
    const ctx = editorData.canvas.getContext("2d");

    // Создаем новый canvas с нужными размерами
    const croppedCanvas = document.createElement("canvas");
    croppedCanvas.width = newWidth;
    croppedCanvas.height = newHeight;
    const croppedCtx = croppedCanvas.getContext("2d");

    // Копируем только часть изображения внутри текущей рамки canvas
    croppedCtx.drawImage(
      editorData.image,
      editorData.horizontalOffset,
      editorData.verticalOffset,
      editorData.cropSize.width * editorData.zoom,
      editorData.cropSize.height * editorData.zoom,
      0,
      0,
      croppedCanvas.width,
      croppedCanvas.height
    );

    // Обновляем изображение внутри canvas
    editorData.image = new Image();
    editorData.image.onload = function () {
      resetImageTransform(editorData);
      redrawImage(editorData);
    };
    editorData.image.src = croppedCanvas.toDataURL();
  }
  // Используйте эту функцию для изменения ширины editorDataSmall1 и editorDataSmall2
  const newWidth = 100; // Установите новую ширину, которую вы хотите установить для editorDataSmall1 и editorDataSmall2
  const newHeight = 100;

  cropImage(editorDataSmall1, newWidth, newHeight);
  cropImage(editorDataSmall2, newWidth, newHeight);

  // Обновляем изображения
  redrawImage(editorDataOriginal);
  redrawImage(editorDataSmall1);
  redrawImage(editorDataSmall2);

  // Добавляем кнопки управления для каждого изображения

  createEditorButtons(cropContainerCircle, editorDataSmall2);
  createEditorButtons(cropContainerSquare, editorDataSmall1);
  cropContainerSquare.appendChild(canvasSmall1);
  cropContainerCircle.appendChild(canvasSmall2);
}

// Функция создания canvas
function createCanvas(image, scale = 1) {
  const canvas = document.createElement("canvas");
  canvas.width = image.width * scale;
  canvas.height = image.height * scale;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  return canvas;
}

// Функция инициализации параметров изображения
function initializeEditorData(canvas, image, scale = 1, zoom = 1) {
  return {
    className: "wrapper",
    canvas,
    image,
    originalImage: image.cloneNode(true),
    verticalOffset: 0,
    horizontalOffset: 0,
    zoom: zoom,
    cropSize: {
      width: canvas.width,
      height: canvas.height,
    },
    scale,
  };
}

// Функция отрисовки изображения на canvas с учетом трансформаций
function redrawImage(editorData) {
  const ctx = editorData.canvas.getContext("2d");
  ctx.clearRect(0, 0, editorData.canvas.width, editorData.canvas.height);
  ctx.drawImage(
    editorData.image,
    editorData.horizontalOffset,
    editorData.verticalOffset,
    editorData.canvas.width * editorData.zoom,
    editorData.canvas.height * editorData.zoom
  );
}

// Функция смещения изображения по вертикали вверх
function verticalOffsetDown(editorData) {
  editorData.verticalOffset -= 20;
  redrawImage(editorData);
}

// Функция смещения изображения по вертикали вниз
function verticalOffsetUp(editorData) {
  editorData.verticalOffset += 20;
  redrawImage(editorData);
}

// Функция смещения изображения по горизонтали влево
function horizontalOffsetRight(editorData) {
  editorData.horizontalOffset -= 20;
  redrawImage(editorData);
}

// Функция смещения изображения по горизонтали вправо
function horizontalOffsetLeft(editorData) {
  editorData.horizontalOffset += 20;
  redrawImage(editorData);
}

// Функция увеличения масштаба изображения
function zoomIn(editorData) {
  const prevZoom = editorData.zoom;
  editorData.zoom *= 1.1;
  const zoomRatio = editorData.zoom / prevZoom;

  const centerX = editorData.canvas.width / 2;
  const centerY = editorData.canvas.height / 2;

  editorData.horizontalOffset =
    (editorData.horizontalOffset - centerX) * zoomRatio + centerX;
  editorData.verticalOffset =
    (editorData.verticalOffset - centerY) * zoomRatio + centerY;

  redrawImage(editorData);
}

// Функция уменьшения масштаба изображения
function zoomOut(editorData) {
  const prevZoom = editorData.zoom;
  editorData.zoom *= 0.9;
  const zoomRatio = editorData.zoom / prevZoom;

  const centerX = editorData.canvas.width / 2;
  const centerY = editorData.canvas.height / 2;

  editorData.horizontalOffset =
    (editorData.horizontalOffset - centerX) * zoomRatio + centerX;
  editorData.verticalOffset =
    (editorData.verticalOffset - centerY) * zoomRatio + centerY;

  redrawImage(editorData);
}

// Функция обрезки изображения
function cropImage(editorData) {
  const ctx = editorData.canvas.getContext("2d");
  const croppedImage = document.createElement("img");

  croppedImage.onload = function () {
    editorData.image = croppedImage;
    resetImageTransform(editorData);
    redrawImage(editorData);
  };

  croppedImage.src = editorData.canvas.toDataURL();
}

// Функция возвращения исходного изображения
function resetImage(editorData) {
  editorData.image = editorData.originalImage.cloneNode(true);
  resetImageTransform(editorData);
  redrawImage(editorData);
}

// Функция сброса трансформаций изображения
function resetImageTransform(editorData) {
  editorData.verticalOffset = 0;
  editorData.horizontalOffset = 0;
  editorData.zoom = 1;
}

// Функция создания кнопок управления для изображения
function createEditorButtons(container, editorData) {
  const verticalOffsetUpButton = document.createElement("button");

  verticalOffsetUpButton.addEventListener("click", () =>
    verticalOffsetUp(editorData)
  );

  const verticalOffsetDownButton = document.createElement("button");

  verticalOffsetDownButton.addEventListener("click", () =>
    verticalOffsetDown(editorData)
  );

  const horizontalOffsetLeftButton = document.createElement("button");

  horizontalOffsetLeftButton.addEventListener("click", () =>
    horizontalOffsetLeft(editorData)
  );

  const horizontalOffsetRightButton = document.createElement("button");

  horizontalOffsetRightButton.addEventListener("click", () =>
    horizontalOffsetRight(editorData)
  );

  const zoomInButton = document.createElement("button");
  zoomInButton.className = "zoomInButton";
  zoomInButton.addEventListener("click", () => zoomIn(editorData));

  const zoomOutButton = document.createElement("button");
  zoomOutButton.className = "zoomOutButton";
  zoomOutButton.addEventListener("click", () => zoomOut(editorData));

  const cropButton = document.createElement("button");
  cropButton.className = "cropButton";
  cropButton.textContent = "Обрезать";
  cropButton.addEventListener("click", () => cropImage(editorData));

  const resetButton = document.createElement("button");
  resetButton.textContent = "Вернуть оригинал";
  resetButton.addEventListener("click", () => resetImage(editorData));

  verticalOffsetUpButton.id = "upButton";
  verticalOffsetDownButton.id = "downButton";
  horizontalOffsetLeftButton.id = "leftButton";
  horizontalOffsetRightButton.id = "rightButton";
  cropButton.id = "cropButton";
  resetButton.id = "resetButton";

  const buttonsContainer = document.createElement("div");
  const moveButtons = document.createElement("div");
  buttonsContainer.className = "wrapper";
  buttonsContainer.insertAdjacentHTML(
    "afterbegin",
    `<div class="editButtonsContainer">
    <div class="leftButtons"></div>
    <div class="middleButtons"></div>
    </div>
    <div class="downButtons"></div>
    `
  );
  const leftButtons = buttonsContainer.querySelector(".leftButtons");
  const middleButtons = buttonsContainer.querySelector(".middleButtons");
  const downButtons = buttonsContainer.querySelector(".downButtons");
  console.log(leftButtons, middleButtons, downButtons);

  leftButtons.appendChild(verticalOffsetUpButton);
  leftButtons.appendChild(verticalOffsetDownButton);

  middleButtons.appendChild(zoomOutButton);
  middleButtons.appendChild(horizontalOffsetLeftButton);
  middleButtons.appendChild(zoomInButton);

  middleButtons.appendChild(horizontalOffsetRightButton);

  downButtons.appendChild(cropButton);
  downButtons.appendChild(resetButton);

  container.appendChild(buttonsContainer);
}

// Слушатель события загрузки изображения
inputFile.addEventListener("change", loadImage);
buttonClose.addEventListener("click", closeEditor);
