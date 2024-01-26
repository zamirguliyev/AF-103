import { getAllData } from "./request.js";

function initializeSwiper(selector, slidesPerView) {
  return new Swiper(selector, {
    direction: "horizontal",
    loop: true,
    slidesPerView: slidesPerView,
    slidesPerGroup: 1,
    speed: 2000,
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
}

function createSliderItem(item, sliderIndex) {
  let priceHtml = `
    <h4 class="mx-5">$<span>${item.price}</span></h4>
  `;

  if (item.isDiscounted) {
    const discountedPrice = item.price - (item.price * item.discountedPercent / 100);
    priceHtml = `
      <h4 class="mx-5">
        $<span style="text-decoration: line-through;">${item.price - discountedPrice.toFixed(2)}</span>
      </h4>
    `;
  }

  const isNewButton = item.isNew
    ? '<div class="btn btn-success new my-3">New</div>'
    : `<div class="btn ${item.isDiscounted ? 'btn-danger' : 'btn-success'} new my-3">${item.discountedPercent}%</div>`;

  return `
    <div class="swiper-slide">
      <div style="width: 80%;" class="col-md-6 col-lg-4">
        <div class="new-heart d-flex align-items-center justify-content-between mx-4 mt-3">
          ${isNewButton}
          <i id="heart_${sliderIndex}_${item.id}" class="fa-regular fa-heart favorite-icon" style="color: #ff0000;font-size:25px;"></i>
        </div>
        <img width="60%" style="margin-left: 25%;" src="${item.image}" alt="">
        <img width="40%" class="mx-5" src="./assests/photo/Pasted Graphic 15.png" alt="">
        <h3 class="mx-5">${item.name}</h3>
        <p class="mx-5">Shoulder Bag Leather Bag Leather
          undertakes laborious physical physical </p>
        ${priceHtml}
       <div class="d-flex">
       <button id="${item.id}" class="btn w-50 add">Add to card</button>
       <a href="detail.html?id=${item.id}" id="${item.id}" class="btn btn-primary text-light w-25">Detail</a>
       </div>
      </div>
    </div>
  `;
}

function updateHeartIcons() {
  const heartIcons = document.querySelectorAll(".favorite-icon");
  heartIcons.forEach((icon) => {
    const favoriteList = JSON.parse(localStorage.getItem("favorite")) || [];
    const existingIndex = favoriteList.findIndex((x) => x.id === icon.id);

    if (existingIndex > -1) {
      icon.classList.replace("fa-regular", "fa-solid");
    }

    icon.addEventListener("click", function () {
      const favoriteList = JSON.parse(localStorage.getItem("favorite")) || [];
      const existingIndex = favoriteList.findIndex((x) => x.id === this.id);

      if (existingIndex > -1) {
        favoriteList.splice(existingIndex, 1);
        this.classList.replace("fa-solid", "fa-regular");
        showNotification(`Removed from favorites`);
      } else {
        favoriteList.push({ id: this.id });
        this.classList.replace("fa-regular", "fa-solid");
        showNotification(`Added to favorites`);
      }

      localStorage.setItem("favorite", JSON.stringify(favoriteList));
    });
  });
}

function showNotification(message) {
  Swal.fire({
    position: "center",
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const swiper = new Swiper(".swiper", {
  loop: true,
  speed: 2000,
  autoplay: {
    delay: 2000,
  },
});

let featureSwiper = null;
let bestsellerSwiper = null;
let discountSwiper = null;

  const updateSwipers = () => {
    const slidesPerView = getSlidesPerView();

    featureSwiper.params.slidesPerView = slidesPerView;
    bestsellerSwiper.params.slidesPerView = slidesPerView;
    discountSwiper.params.slidesPerView = slidesPerView;

    featureSwiper.update();
    bestsellerSwiper.update();
    discountSwiper.update();
  };

  window.addEventListener("resize", updateSwipers);

  const sliderData = await getAllData();

  const featureSlider = document.querySelector(".feature");
  sliderData.forEach((item) => {
    featureSlider.innerHTML += createSliderItem(item, 1);
  });

  featureSwiper = initializeSwiper(".mySwiper2", getSlidesPerView());
  updateHeartIcons();

  const bestsellerSlider = document.querySelector(".bestseller");
  sliderData.forEach((item) => {
    bestsellerSlider.innerHTML += createSliderItem(item, 2);
  });

  bestsellerSwiper = initializeSwiper(".mySwiper1", getSlidesPerView());
  updateHeartIcons();

  const discountSlider = document.querySelector(".discount");
  sliderData.forEach((item) => {
    discountSlider.innerHTML += createSliderItem(item, 3);
  });

  discountSwiper = initializeSwiper(".mySwiper3", getSlidesPerView());
  updateHeartIcons();

  const addButtons = document.querySelectorAll(".add");
  addButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.id;
      const basket = JSON.parse(localStorage.getItem("basket")) || [];
      basket.push(productId);
      localStorage.setItem("basket", JSON.stringify(basket));
      showNotification("Added to basket");
      addToCard(productId);
    });
  });

  function addToCard(productId) {
    const card = sliderData.find((item) => item.id === productId);
    let cartItems = JSON.parse(localStorage.getItem("basket")) || [];
    let existingItem = cartItems.find((item) => item.id === card.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ id: card.id, quantity: 1 });
    }

    localStorage.setItem("basket", JSON.stringify(cartItems));
    showNotification(`Added to card`);
  }

  function showNotification(message) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  // İstenilen ekran genişliğine bağlı olarak slider sayısını döndüren fonksiyon
  function getSlidesPerView() {
    if (window.innerWidth < 576) {
      return 1;
    } else if (window.innerWidth < 992) {
      return 2;
    } else {
      return 3;
    }
  }
});

