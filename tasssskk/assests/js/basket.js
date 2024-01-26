import { getAllData } from "./request.js";
let basketData = localStorage.getItem("basket");
let localBasket = JSON.parse(basketData);

let meals = await getAllData();
let baskets = [];

meals.forEach((x) => {
  for (let i = 0; i < localBasket.length; i++) {
    if (localBasket[i].id == x.id) {
      baskets.push({
        ...x,
        quantity: localBasket[i].quantity,
      });
    }
  }
});

  function updateCartHTML(baskets) {
    const cartItemsContainer = document.getElementById("cartItemsContainer");
    const cartItemsTotal = document.getElementById("cartItemsTotal");
  
    cartItemsContainer.innerHTML = "";
    baskets.forEach((meal) => {
      const cartItemHtml = `
      <div class="col-12 border mt-3 p-3 d-flex">
      <div class="d-flex justify-content-between">
        <img width="30%" src="${meal.image}" alt="">
        <div>
          <div class="d-flex justify-content-between">
            <h4>${meal.name}</h4>
            <h4>${meal.price.toFixed(2)} $</h4>
          </div>
          <div class="d-flex gap-3">
            <p>Size: <span>${meal.size}</span></p>
            <p>Color: <span>Blue</span></p>
          </div>
          <p>Delivery: 10-32 days</p>
          <p>Quantity: <span>${meal.quantity}</span></p>
          <div class="d-flex gap-3">
            <div class="d-flex gap-2 align-items-center">
              <i class="${meal.isFavorite ? 'fa-solid' : 'fa-regular'} fa-heart favorite" style="color: #ff0000; cursor:pointer;"></i>
              <p class="mt-3">${meal.isFavorite ? 'Favorited' : 'Favorite'}</p>
            </div>
            <div class=" btn d-flex gap-2 align-items-center delete">
              <i class="fa-solid fa-trash"></i>
              <p class="mt-3 delete">Delete</p>
            </div>
          </div>
        </div>
      </div>
    </div>
      `;
      cartItemsContainer.insertAdjacentHTML("beforeend", cartItemHtml);
    });
  
    let total = 0;
    let discountedTotal = 0;
    baskets.forEach((meal) => {
      total += meal.price * meal.quantity;
  
      if (meal.discountedPercent > 0) {
        const discountedPrice = meal.price - (meal.price * meal.discountedPercent / 100);
        discountedTotal += discountedPrice * meal.quantity;
      } else {
        discountedTotal += meal.price * meal.quantity;
      }
    });
  
    cartItemsTotal.innerHTML = `
      <div class="border p-3">
        <div class="d-flex justify-content-between">
          <p>Your subtotal</p>
          <p class="subtotal">$${total.toFixed(2)}</p>
        </div>
        <div class="d-flex justify-content-between">
          <p>Shipping changes</p>
          <p>Free</p>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <p><b>Total</b></p>
          <p><b class="total">$${discountedTotal.toFixed(2)}</b></p>
        </div>
        <hr>
        <div class="d-flex border">
          <input class="w-75 form-control border-0" type="text" placeholder="Discount promo code">
          <button class="btn w-25 btn-warning rounded-0 text-light">Apply</button>
        </div>
      </div>
      <button class="btn btn-danger my-3 w-100 text-light deleteAll">Confirm card</button>
      <button class="btn w-100 border">Cash payment</button>
    `;
    updateHeartIcons()
  }
  
  updateCartHTML(baskets);
  

  function updateHeartIcons() {
    const heartIcons = document.querySelectorAll(".favorite");
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


let deleteBtn = document.querySelectorAll(".delete");
deleteBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    Swal.fire({
      title: `Silmey istirsen?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        let localFavorit = JSON.parse(localStorage.getItem("basket"));
        let index = localFavorit.indexOf((x) => x.id === this.id);
        localFavorit.splice(index, 1);
        localStorage.setItem("basket", JSON.stringify([...localFavorit]));
        this.closest(".border").remove();
        Swal.fire("Silindi!");
        window.location.reload()
      }
    });
  });
});

let deleteAllBtn = document.querySelector(".deleteAll");

deleteAllBtn.addEventListener("click", function () {
  if (!localStorage.getItem("basket")) {
    return;
  }

  Swal.fire({
    title: "Hamisini almaq istirsen?",
    text: "Silinsin",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Beli!",
  }).then((result) => {
    if (result.isConfirmed) {
      cartItemsContainer.innerHTML = "";
      localStorage.removeItem("basket");
      Swal.fire("Silindi!", "", "success");
      window.location.reload();
    }
  });
});



