import {
  getAllDataMeal,
  getDataIDMeal,
  deleteMeal,
  postMeal,
  editMeal,
} from "./request.js";
let favoritCount = document.querySelector(".watchlistCount");
let basketCount = document.querySelector(".basketCount");

let createCard = document.querySelector(".create-card");
let spinner = document.querySelector(".spin");
let search = document.getElementById("search");
let formId = document.getElementById("formId");
let MealName = document.getElementById("meal-name");
let MealImg = document.getElementById("mealImage");
let MealPrice = document.getElementById("meal-price");
let MealIngredients = document.getElementById("meal-ingradients");
let EditMealIngredients = document.getElementById("edit-meal-ingradients");
let EditMealName = document.getElementById("edit-meal-name");
let EditMealPrice = document.getElementById("edit-meal-price");
let EditMealImage = document.getElementById("edit-mealImage");
let sortMeal = document.querySelector(".sort");
let BTNID = 0;

let mealCard = async function (arr) {
  arr.forEach((meal) => {
    createCard.innerHTML += `
    <div class="col-3 mb-3">
    <div class="card" >
       <div class="card-img">
        <img src="${meal.imageLink}" class="card-img-top" alt="${meal.name}">
       </div> 
        <div class="card-body">
          <h5 class="card-title">${meal.name}</h5>
          <h5 class="card-title">Price:${meal.price} AZN</h5>
         <div class="col d-flex gap-1">
         <a href="mealdetail.html?id=${meal.id}" class="btn btn-outline-primary">Detail</a>
         <button id="${meal.id}" class="btn btn-outline-danger delete"><i class="fa-solid fa-trash"></i></button>
         <button data-name="${meal.name}" id="${meal.id}" class="btn btn-outline-success basket"><i class="fa-solid fa-cart-shopping"></i></button>
         <button  data-id="${meal.id}" class="btn  btn-outline-success edit-btn " data-bs-toggle="modal" data-bs-target="#editModal"><i class="fa-solid fa-pen-to-square"></i></button>
         </div>
          </div>
      </div>
</div>
    `;

    // DELETE
    let deleteButton = document.querySelectorAll(".delete");
    deleteButton.forEach((btn) => {
      btn.addEventListener("click", async function () {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            deleteMeal(this.id);
            this.closest(".col-3");
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        });
      });
    });
  });

  //ADD BASKET
  let basketBtn = document.querySelectorAll(".basket");
  basketBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      let mealId = this.id;
      let basketC = JSON.parse(localStorage.getItem("basket")) || [];

      let existingItem = basketC.find((item) => item.id === mealId);

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${this.getAttribute("data-name")} added basket`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        basketC.push({ id: mealId, quantity: 1 });
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${this.getAttribute("data-name")} added basket`,
          showConfirmButton: false,
          timer: 1500,
        });
      }

      localStorage.setItem("basket", JSON.stringify(basketC));

      basketCount.textContent = basketC.length;
    });
  });

  //EDIT MEAL
  let editButton = document.querySelectorAll(".edit-btn");

  editButton.forEach((btn) => {
    btn.addEventListener("click", function () {
      getDataIDMeal(this.getAttribute("data-id")).then((data) => {
        BTNID = this.getAttribute("data-id");
        EditMealName.value = data.name;
        EditMealPrice.value = data.price;
        EditMealImage.value = data.imageLink;
        EditMealIngredients.value = data.ingredients;
      });
    });
  });
  editFormId.addEventListener("submit", function (e) {
    e.preventDefault();
    try {
      let id = BTNID;

      editMeal(id, {
        name: EditMealName.value,
        price: EditMealPrice.value,
        imageLink: EditMealImage.value,
        ingredients: EditMealIngredients.value,
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Edit Singer`,
        showConfirmButton: false,
        timer: 1000,
      });
    } catch (error) {
      alert(error.message);
    }
  });
};

// GET DATA
document.addEventListener("DOMContentLoaded", async () => {
  let meals = await getAllDataMeal();
  spinner.classList.replace("d-flex", "d-none");
  mealCard(meals);
});

// SEARCH
search.addEventListener("keyup", async function (e) {
  let meals = await getAllDataMeal();
  let searchTerm = e.target.value.toLowerCase().trim();
  let searchMeals = meals.filter((x) =>
    x.name.toLowerCase().trim().includes(searchTerm)
  );

  createCard.innerHTML = "";
  if (searchTerm === "") {
    mealCard(meals);
  } else {
    if (searchMeals.length === 0) {
      createCard.innerHTML = `
        <h1 class="text-danger text-center mt-3">Not Found</h1>
      `;
    } else {
      mealCard(searchMeals);
    }
  }
});

// ADD MEAL

formId.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = MealName.value.trim();
  const price = parseInt(MealPrice.value);
  const imageLink = MealImg.value.trim();
  const ingredients = MealIngredients.value
    .split(",")
    .map((ingredients) => ingredients.trim());

  if (!name || !imageLink || !ingredients || isNaN(price) || price < 0) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
    return;
  }

  try {
    postMeal(name, price, imageLink, ingredients);
    Swal.fire({
      position: "center",
      icon: "success",
      title: `Created new Singer`,
      showConfirmButton: false,
      timer: 1000,
    });
  } catch (error) {
    alert(error.message);
  }
});

// SORT MEAL
sortMeal.addEventListener("click", async function () {
  createCard.innerHTML = "";
  spinner.classList.replace("d-flex", "d-none");
  let meals = await getAllDataMeal();
  let sortName = meals.sort((x, y) => {
    return x.name.localeCompare(y.name);
  });

  mealCard(sortName);
});

let favC = JSON.parse(localStorage.getItem("favorite"));
if (favC != null) {
  favoritCount.textContent = favC.length;
}

let basketC = JSON.parse(localStorage.getItem("basket"));
if (basketC != null) {
  basketCount.textContent = basketC.length;
}
