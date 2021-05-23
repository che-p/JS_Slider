import { images } from "./settings.js";

function initSlider() {
  let sliderImages = document.querySelector(".projects__img");
  let sliderArrows = document.querySelector(".projects-list-arrows");
  let sliderDots = document.querySelector(".projects-list-dots");
  let sliderMenus = document.querySelector(".projects-navigation");

  initImages();
  initArrows();
  initDots();
  initMenus();

  function initImages() {
    images.forEach((image, index) => {
      let imageTag = `<img class="image n${index} ${
        index == 0 ? "active" : ""
      }" src="${image.src}" alt="${image.alt}" data-index="${index}"/>`;
      sliderImages.innerHTML += imageTag;
    });
  }

  function initArrows() {
    let leftArrow = document.createElement("div");
    let rightArrow = document.createElement("div");

    leftArrow.className = "left-arrow";
    rightArrow.className = "right-arrow";

    sliderArrows.append(leftArrow);
    sliderArrows.append(rightArrow);

    Array.from(sliderArrows.children).forEach((arrow) => {
      arrow.addEventListener("click", function () {
        let curNumber = +sliderImages.querySelector(".active").dataset.index;
        let nextNumber;
        if (arrow.classList.contains("left-arrow")) {
          nextNumber = curNumber === 0 ? images.length - 1 : curNumber - 1;
        } else {
          nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
        }
        moveSlider(nextNumber);
      });
    });
  }

  function initDots() {
    images.forEach((image, index) => {
      let dot = `<div class="n${index} ${
        index == 0 ? "active" : ""
      }" data-index="${index}"></div>`;
      sliderDots.innerHTML += dot;
    });
    sliderDots.querySelectorAll("div").forEach((dot) => {
      dot.addEventListener("click", function () {
        moveSlider(this.dataset.index);
      });
    });
  }

  function initMenus() {
    images.forEach((image, index) => {
      let menuItem = `<li class="projects-navigation__item" data-index="${index}">
    <a class="n${index} ${index == 0 ? "active" : ""}" href="#">${
        image.item
      }</a>
  </li>`;
      sliderMenus.innerHTML += menuItem;
    });
    sliderMenus
      .querySelectorAll(".projects-navigation__item")
      .forEach((menu) => {
        menu.addEventListener("click", function () {
          moveSlider(this.dataset.index);
        });
      });
  }

  function moveSlider(num) {
    sliderImages.querySelector(".active").classList.remove("active");
    sliderImages.querySelector(".n" + num).classList.add("active");

    sliderDots.querySelector(".active").classList.remove("active");
    sliderDots.querySelector(".n" + num).classList.add("active");

    sliderMenus.querySelector(".active").classList.remove("active");
    sliderMenus.querySelector(".n" + num).classList.add("active");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  initSlider();
});
