import { getAllData } from "./request.js";
let sliderWrapper = document.querySelector(".swiper-wrapper");

let sliderCard = async function (arr) {
  arr.forEach((item) => {
    sliderWrapper.innerHTML += `
        <div class="swiper-slide">
        <img src="${item.imageURL}" class="slider-img" alt="${item.title}">
        <div class="image-caption h3"><span>${item.title}</span></div>
    </div>
        `;
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  let sliders = await getAllData();
  sliderCard(sliders);

  const swiper = new Swiper(".swiper", {
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 2000,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});
