import { getDataIDMeal } from "./request.js";
let favoritCount = document.querySelector(".watchlistCount");
let basketCount = document.querySelector(".basketCount");

document.addEventListener("DOMContentLoaded", async function () {
  let detail = document.querySelector(".detail");
  let id = new URLSearchParams(location.search).get("id");

  let meal = await getDataIDMeal(id);

  let item = document.createElement("div");
  item.className = "card ";
  item.innerHTML = `
    <div class="card-img" style="height:450px;">
      <img style="height:450px;" src="${meal.imageLink}" class="card-img-top" alt="${meal.name}">
    </div>
    <div class="card-body">
    <h5 class="card-title">${meal.name}</h5>
    <h5 class="card-title">Price: ${meal.price} AZN</h5>
    <p class="card-text">Ingredients: ${meal.ingredients} </p>
      <a href="meals.html" class="btn btn-outline-primary">Home</a>
      
    </div>
  `;
  detail.appendChild(item);
});

let favC = JSON.parse(localStorage.getItem("favorite"));
if (favC != null) {
  favoritCount.textContent = favC.length;
}

let basketC = JSON.parse(localStorage.getItem("basket"));
if (basketC != null) {
  basketCount.textContent = basketC.length;
}
