import { getDataID } from "./request.js";
let favoritCount = document.querySelector(".watchlistCount");
let basketCount = document.querySelector(".basketCount");

document.addEventListener("DOMContentLoaded", async function () {
  let detail = document.querySelector(".detail");
  let id = new URLSearchParams(location.search).get("id");

  let singer = await getDataID(id);

  let item = document.createElement("div");
  item.className = "card ";
  item.innerHTML = `
    <div class="card-img" style="height:450px;">
      <img style="height:450px;" src="${singer.imageLink}" class="card-img-top" alt="${singer.name}">
    </div>
    <div class="card-body">
      <h5 class="card-title">${singer.name}</h5>
      <p class="card-text">${singer.name} is <b>${singer.nationality}</b></p>
      <p class="card-text">AGE: ${singer.age} </p>
      <p class="card-text">Genre: ${singer.genre} </p>
      <a href="index.html" class="btn btn-outline-primary">Home</a>
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
