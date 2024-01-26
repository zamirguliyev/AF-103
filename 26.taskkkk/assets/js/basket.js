let basketCount = document.querySelector(".basketCount");
let favoritCount = document.querySelector(".watchlistCount");
import { getAllDataMeal, patchUser } from "./request.js";
let basketData = localStorage.getItem("basket");
let localBasket = JSON.parse(basketData);
let tBody = document.querySelector("tbody");
let allTotal = document.querySelector(".all-total");
let deleteAll = document.querySelector(".delete-all");

let meals = await getAllDataMeal();
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

// Show basket Items
baskets.forEach((meal) => {
  tBody.innerHTML += `
    <td>${meal.id}</td>
      <td>${meal.name}</td>
      <td>${meal.price} AZN</td>
      <td>${meal.price * meal.quantity} AZN</td>
      <td>${meal.quantity}</td>
      <td><div class="d-flex gap-2">
        <button id="${
          meal.id
        }" class="btn btn-primary text-light decrease">-</button>
        <button id="${
          meal.id
        }" class="btn btn-primary text-light increase">+</button>
      </div></td>
      <td><button class="btn btn-danger text-light delete"><i class="fa-solid fa-trash"></i></button></td>
    `;
});

// Delete
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
        this.closest("tr").remove();
        basketCount.textContent = localFavorit.length;
        Swal.fire("Silindi!");
      }
    });
  });
});

let decreaseButtons = document.querySelectorAll(".decrease");
let increaseButtons = document.querySelectorAll(".increase");

//Total Price
function calculateTotalPrice() {
  let totalPrice = 0;
  baskets.forEach((meal) => {
    totalPrice += meal.price * meal.quantity;
  });
  return totalPrice;
}
allTotal.textContent = `${calculateTotalPrice()} AZN`;

//Decrease meal
decreaseButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    let mealId = this.getAttribute("id");
    let meal = baskets.find((x) => x.id == mealId);

    if (meal && meal.quantity > 1) {
      meal.quantity--;
      this.parentElement.parentElement.previousElementSibling.textContent =
        meal.quantity;
      localStorage.setItem("basket", JSON.stringify(baskets));
      this.parentElement.parentElement.previousElementSibling.previousElementSibling.textContent =
        meal.quantity * meal.price + "AZN";
      localStorage.setItem("basket", JSON.stringify(baskets));
      allTotal.textContent = `${calculateTotalPrice()} AZN`;
    }
  });
});

//Increase meal
increaseButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    let mealId = this.getAttribute("id");
    let meal = baskets.find((x) => x.id == mealId);

    if (meal) {
      meal.quantity++;
      this.parentElement.parentElement.previousElementSibling.textContent =
        meal.quantity;
      this.parentElement.parentElement.previousElementSibling.previousElementSibling.textContent =
        meal.quantity * meal.price + "AZN";
      localStorage.setItem("basket", JSON.stringify(baskets));
      allTotal.textContent = `${calculateTotalPrice()} AZN`;
    }
  });
});

// Buy all items
deleteAll.addEventListener("click", function (e) {
  e.preventDefault();
  let usersLocalStorage = JSON.parse(localStorage.getItem("users"));
  let usersSessionStorage = JSON.parse(sessionStorage.getItem("users"));
  let users = usersSessionStorage || usersLocalStorage;

  if (users) {
    let basketData = localStorage.getItem("basket");
    let localBasket = JSON.parse(basketData);
    localBasket = [];
    localStorage.setItem("basket", JSON.stringify(localBasket));
    sessionStorage.setItem("basket", JSON.stringify(localBasket));
    basketCount.textContent = 0;
    let totalPrice = calculateTotalPrice();

    Swal.fire({
      title: "Are you sure buy all?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, buy all!",
    }).then((result) => {
      let orderDate = moment().format("MMM dd, YYYY, h:mm:ss a");
      let order1 = {
        id: Math.floor(Math.random() * 1000),
        total: totalPrice,
        orderDate: orderDate,
      };
      if (!users.orders) {
        users.orders = [];
      }
      users.orders.push(order1);
      users.balance -= totalPrice;
      let blnc = users.balance - totalPrice;
      if (result.isConfirmed) {
        if (blnc < 0) {
          Swal.fire({
            icon: "warning",
            title: "Balansin catmir",
            text: "You must log in to perform this action.",
          });
        } else {
          axios.patch("http://localhost:3000/users/" + users.id, {
            orders: users.orders,
            balance: users.balance,
          });

          localStorage.setItem("users", JSON.stringify(users));
          sessionStorage.setItem("users", JSON.stringify(users));
          allTotal.textContent = "0 AZN";
          tBody.innerHTML = "";

          Swal.fire("All items bought!");
          console.log(users.balance);
        }
      }
    });
  } else {
    Swal.fire({
      icon: "warning",
      title: "Login olun",
      text: "You must log in to perform this action.",
    });
  }
});

let favC = JSON.parse(localStorage.getItem("favorite"));
if (favC != null) {
  favoritCount.textContent = favC.length;
}
let basketC = JSON.parse(localStorage.getItem("basket"));
if (basketC != null) {
  basketCount.textContent = basketC.length;
}
