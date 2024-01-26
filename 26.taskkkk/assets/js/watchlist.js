let localFavorits = JSON.parse(localStorage.getItem("favorite"));
let favoritCount = document.querySelector(".watchlistCount");
let basketCount = document.querySelector(".basketCount");
let tBody = document.querySelector("tbody");
import { getAllData } from "./request.js";

let singers = await getAllData();

let favorits = [];
singers.forEach((x) => {
  for (let i = 0; i < localFavorits.length; i++) {
    if (localFavorits[i].id == x.id) {
      favorits.push(x);
    }
  }
});

favorits.forEach((singer) => {
  tBody.innerHTML += `
      <td>${singer.id}</td>
      <td>${singer.name}</td>
      <td>${singer.age}</td>
      <td><img style="height:50px; witdh:50px; object-fit:cover;" src="${singer.imageLink}" alt="${singer.name}" ></td>
      <td>${singer.nationality}</td>
      <td><button data-name="${singer.name}" id="${singer.id}" class="btn btn-danger text-light delete">Delete</button></td>
    `;
});

let deleteBtn = document.querySelectorAll(".delete");
deleteBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    Swal.fire({
      title: `${this.getAttribute("data-name")} silmey istirsen?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        let localFavorit = JSON.parse(localStorage.getItem("favorite"));
        let index = localFavorit.indexOf((x) => x.id === this.id);
        localFavorit.splice(index, 1);
        localStorage.setItem("favorite", JSON.stringify([...localFavorit]));
        this.closest("tr").remove();
        favoritCount.textContent = localFavorit.length;
        Swal.fire("Silindi!");
      }
    });
  });
});

let favC = JSON.parse(localStorage.getItem("favorite"));
if (favC != null) {
  favoritCount.textContent = favC.length;
}
let basketC = JSON.parse(localStorage.getItem("basket"));
if (basketC != null) {
  basketCount.textContent = basketC.length;
}
