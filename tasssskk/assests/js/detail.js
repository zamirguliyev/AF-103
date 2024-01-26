document.addEventListener("DOMContentLoaded", async function () {
  let slidesPerView = getSlidesPerView();

  window.addEventListener("resize", function () {
    slidesPerView = getSlidesPerView();
    updateSwiper();
  });

  const descLink = document.getElementById("descLink");
  const reviewsLink = document.getElementById("reviewsLink");

  descLink.addEventListener("click", function () {
    showDescription();
  });

  reviewsLink.addEventListener("click", function () {
    showReviews();
  });

  function getSlidesPerView() {
    if (window.innerWidth < 992 && window.innerWidth >= 576) {
      return 2;
    } else if (window.innerWidth < 576) {
      return 1;
    } else {
      return 3;
    }
  }

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

  function updateSwiper() {
    featureSwiper.params.slidesPerView = slidesPerView;
    featureSwiper.update();
  }

  const sliderData = await getAllData();
  const sliderContainer = document.getElementById("sliderContainer");

  sliderData.forEach((item, index) => {
    const sliderItem = createSliderItem(item, index);
    sliderContainer.insertAdjacentHTML("beforeend", sliderItem);
  });

  const featureSwiper = initializeSwiper(".mySwiper2", slidesPerView);
  updateHeartIcons();
});





function showDescription() {
  document.querySelector(".desc").style.display = "block";
  document.querySelector(".review").style.display = "none";
}

function showReviews() {
  document.querySelector(".desc").style.display = "none";
  document.querySelector(".review").style.display = "block";
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


function createSliderItem(item, sliderIndex) {
    let priceHtml = `
      <h4 class="mx-5">$<span>${item.price}</span></h4>
    `;
  
    if (item.isDiscounted) {
      const discountedPrice = item.price - (item.price * item.discountedPercent / 100);
      priceHtml = `
        <h4 class="mx-5">
          $<span style="text-decoration: line-through;">${item.price}</span>
          $<span>${discountedPrice.toFixed(2)}</span>
        </h4>
      `;
    }
  
    const isNewButton = item.isNew
      ? '<div class="btn btn-success new my-3">New</div>'
      : `<div class="btn ${item.isDiscounted ? 'btn-danger' : 'btn-success'} new my-3">${item.discountedPercent}%</div>`;
  
    return `
      <div class="swiper-slide">
        <div style="width: 80%;" class="col-4">
          <div class="new-heart d-flex align-items-center justify-content-between mx-4 mt-3">
            ${isNewButton}
            <i id="heart_${sliderIndex}_${item.id}" class="fa-regular fa-heart favorite-icon" style="color: #ff0000;"></i>
          </div>
          <img width="60%" style="margin-left: 25%;" src="${item.image}" alt="">
          <img width="40%" class="mx-5" src="./assests/photo/Pasted Graphic 15.png" alt="">
          <h3 class="mx-5">${item.name}</h3>
          <p>Shoulder Bag Leather Bag Leather
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
  


import { getAllData } from "./request.js";

document.addEventListener("DOMContentLoaded", async function () {
  let detail = document.querySelector(".detail");
  let id = new URLSearchParams(location.search).get("id");
  let card = (await getAllData()).find((product) => product.id === id);

  let buttonContent = card.isNew ? "New" : `${card.discountedPercent}%`;

  detail.innerHTML = `
      <div class="col-md-6 col-12 mx-3  mb-3" style="background: #F9F9F9; width: 30%; height: 30%;">
        <div class="d-flex justify-content-between p-2 align-items-center mx-2">
          <button class="btn btn-danger newOrDiscount">${buttonContent}</button>
          <i id="favoriteIcon" class="fa-regular fa-heart favorite-icon" style="color: #ff0000; font-size: 30px;"></i>
        </div>
        <img style="width: 100%; height: 100%;" class="detail-img" src="${card.image}" alt="">
      </div>
      <div class="col-md-6 col-12 mt-5">
        <p class="detail-name mt-md-3 mt-sm-3">${card.name}</p>
        <div class="d-flex align-items-center justify-content-start">
          <div class="icon">
            <img width="50%" src="./assests/photo/Pasted Graphic 15.png" alt="">
          </div>
          <p class="icon-title mt-2">5.0 | 2 reviews</p>
        </div>
        <div class="size d-flex gap-3">
          <button class="btn border xs ${
            card.size === "xs" ? "active" : ""
          }" style="${
    card.size === "xs" ? "background-color: blue;color:white;" : ""
  }">XS</button>
          <button class="btn border s ${
            card.size === "s" ? "active" : ""
          }" style="${
    card.size === "s" ? "background-color: blue;color:white;" : ""
  }">S</button>
          <button class="btn border m ${
            card.size === "m" ? "active" : ""
          }" style="${
    card.size === "m" ? "background-color: blue;color:white;" : ""
  }">M</button>
        </div>
        <div class="d-flex gap-3 mt-3">
          <button id="${
            card.id
          }" class="btn btn-danger add w-25 add">Add to card</button>
          <button class="btn border w-25">Cash payment</button>
        </div>
      </div>
    `;

    

  const favoriteIcon = document.getElementById("favoriteIcon");
  const addToCardButton = document.querySelector(".add");

  updateFavoriteIcon();

  favoriteIcon.addEventListener("click", function () {
    toggleFavorite();
  });

  addToCardButton.addEventListener("click", function () {
    addToCard();
  });

  function updateFavoriteIcon() {
    const favoriteList = JSON.parse(localStorage.getItem("favorite")) || [];
    const isFavorite = favoriteList.some((item) => item.id === card.id);

    if (isFavorite) {
      favoriteIcon.classList.replace("fa-regular", "fa-solid");
    }
  }

  function toggleFavorite() {
    const favoriteList = JSON.parse(localStorage.getItem("favorite")) || [];
    const existingIndex = favoriteList.findIndex((x) => x.id === card.id);

    if (existingIndex > -1) {
      favoriteList.splice(existingIndex, 1);
      favoriteIcon.classList.replace("fa-solid", "fa-regular");
      showNotification(`Removed from favorites`);
    } else {
      favoriteList.push({ id: card.id });
      favoriteIcon.classList.replace("fa-regular", "fa-solid");
      showNotification(`Added to favorites`);
    }

    localStorage.setItem("favorite", JSON.stringify(favoriteList));
  }

  function addToCard() {
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
  
  const sliderData = await getAllData();
  const sliderContainer = document.getElementById("sliderContainer");

  sliderData.forEach((item, index) => {
    const sliderItem = createSliderItem(item, index);
    sliderContainer.insertAdjacentHTML("beforeend", sliderItem);
  });
});
