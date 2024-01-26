import {
  getAllData,
  deleteSinger,
  postSinger,
  getDataID,
  editSinger,
} from "./request.js";
let createCard = document.querySelector(".create-card");
let spinner = document.querySelector(".spin");
let search = document.getElementById("search");
let favoritCount = document.querySelector(".watchlistCount");
let basketCount = document.querySelector(".basketCount");
let SingerName = document.getElementById("singer-name");
let SingerNationalty = document.getElementById("singer-nationalty");
let SingerImage = document.getElementById("imageLink");
let SingerAge = document.getElementById("age");
let SingerGenre = document.getElementById("genre");
let formId = document.getElementById("formId");
let editFormId = document.getElementById("editFormId");
let EditSingerName = document.getElementById("edit-singer-name");
let EditSingerNationalty = document.getElementById("edit-singer-nationalty");
let EditSingerImage = document.getElementById("edit-imageLink");
let EditSingerAge = document.getElementById("edit-age");
let EditSingerGenre = document.getElementById("edit-genre");
let sortSinger = document.querySelector(".sort");

let BTNID = 0;

let singerCard = async function (arr) {
  arr.forEach((singer) => {
    createCard.innerHTML += `
    <div class="col-3 mb-3">
    <div class="card" >
       <div class="card-img">
        <img src="${singer.imageLink}" class="card-img-top" alt="${singer.name}">
       </div>
        <div class="card-body">
          <h5 class="card-title">${singer.name}</h5>
          <p class="card-text">${singer.name} is <b>${singer.nationality}</b></p>
         <div class="col d-flex gap-1">
         <a href="detail.html?id=${singer.id}" class="btn btn-outline-primary">Detail</a>
         <button id="${singer.id}" class="btn btn-outline-danger delete"><i class="fa-solid fa-trash"></i></button>
         <button data-name="${singer.name}" id="${singer.id}" class="btn btn-outline-danger watchlist"><i id="icon" class="fa-regular fa-heart " style="color: #ff0000;"></i></button>
         <button  data-id="${singer.id}" class="btn  btn-outline-success  edit-btn" data-bs-toggle="modal" data-bs-target="#editModal"><i class="fa-solid fa-pen-to-square "></i></button>
         </div>
          </div>
      </div>
</div>
    `;

    // DELETE
    let deleteButton = document.querySelectorAll(".delete");
    deleteButton.forEach((btn) => {
      btn.addEventListener("click", async function () {
        this.closest(".col-3").remove();

        let favoriteList = JSON.parse(localStorage.getItem("favorite")) || [];
        let existingSingerIndex = favoriteList.findIndex(
          (x) => x.id === this.id
        );

        if (existingSingerIndex > -1) {
          favoriteList.splice(existingSingerIndex, 1);
          localStorage.setItem("favorite", JSON.stringify(favoriteList));
        }

        let basketList = JSON.parse(localStorage.getItem("basket")) || [];
        let existingBasketIndex = basketList.findIndex((x) => x.id === this.id);

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
            deleteSinger(this.id);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        });
      });
    });

    // WATCH LIST
    let singerWatchlist = document.querySelectorAll(".watchlist");

    singerWatchlist.forEach((btn) => {
      let favoriteList = JSON.parse(localStorage.getItem("favorite")) || [];
      let existingSingerIndex = favoriteList.findIndex((x) => x.id === btn.id);
      let icon = btn.querySelector("#icon");
      if (existingSingerIndex > -1)
        icon.classList.replace("fa-regular", "fa-solid");

      btn.addEventListener("click", function () {
        let favoriteList = JSON.parse(localStorage.getItem("favorite")) || [];
        let existingSingerIndex = favoriteList.findIndex(
          (x) => x.id === this.id
        );

        let icon = this.querySelector("#icon");

        if (existingSingerIndex > -1) {
          favoriteList.splice(existingSingerIndex, 1);
          icon.classList.replace("fa-solid", "fa-regular");

          Swal.fire({
            position: "center",
            icon: "success",
            title: `${this.getAttribute("data-name")} removed from favorites`,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          favoriteList.push({ id: this.id });
          icon.classList.replace("fa-regular", "fa-solid");

          Swal.fire({
            position: "center",
            icon: "success",
            title: `${this.getAttribute("data-name")} added to favorites`,
            showConfirmButton: false,
            timer: 1500,
          });
        }

        localStorage.setItem("favorite", JSON.stringify(favoriteList));

        let favC = JSON.parse(localStorage.getItem("favorite"));
        if (favC != null) {
          favoritCount.textContent = favC.length;
        }
      });
    });
  });

  // EDIT SINGER
  let editButton = document.querySelectorAll(".edit-btn");
  editButton.forEach((btn) => {
    btn.addEventListener("click", function () {
      getDataID(this.getAttribute("data-id")).then((data) => {
        BTNID = this.getAttribute("data-id");
        EditSingerName.value = data.name;
        EditSingerNationalty.value = data.nationality;
        EditSingerImage.value = data.imageLink;
        EditSingerAge.value = data.age;
        EditSingerGenre.value = data.genre;
      });
    });
  });

  editFormId.addEventListener("submit", function (e) {
    e.preventDefault();
    try {
      let id = BTNID;

      editSinger(id, {
        name: EditSingerName.value,
        nationality: EditSingerNationalty.value,
        imageLink: EditSingerImage.value,
        age: EditSingerAge.value,
        genre: EditSingerGenre.value,
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
  let singers = await getAllData();
  spinner.classList.replace("d-flex", "d-none");
  singerCard(singers);
});
// SEARCH
search.addEventListener("keyup", async function (e) {
  let singers = await getAllData();
  let searchTerm = e.target.value.toLowerCase().trim();
  let searchSinger = singers.filter((x) =>
    x.name.toLowerCase().trim().includes(searchTerm)
  );

  createCard.innerHTML = "";
  if (searchTerm === "") {
    singerCard(singers);
  } else {
    if (searchSinger.length === 0) {
      createCard.innerHTML = `
        <h1 class="text-danger text-center mt-3">Not Found</h1>
      `;
    } else {
      singerCard(searchSinger);
    }
  }
});

// ADD SINGER
formId.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = SingerName.value.trim();
  const age = parseInt(SingerAge.value);
  const imageLink = SingerImage.value.trim();
  const nationality = SingerNationalty.value.trim();
  const genre = SingerGenre.value.trim();
  if (!name || !imageLink || !nationality || isNaN(age) || age < 0 || !genre) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
    return;
  }

  try {
    postSinger(name, nationality, imageLink, age, genre);
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

// SORT SINGER
sortSinger.addEventListener("click", async function () {
  createCard.innerHTML = "";
  spinner.classList.replace("d-flex", "d-none");
  let singers = await getAllData();
  let sortName = singers.sort((x, y) => {
    return x.name.localeCompare(y.name);
  });

  singerCard(sortName);
});

let favC = JSON.parse(localStorage.getItem("favorite"));
if (favC != null) {
  favoritCount.textContent = favC.length;
}

let basketC = JSON.parse(localStorage.getItem("basket"));
if (basketC != null) {
  basketCount.textContent = basketC.length;
}
