let id = new URLSearchParams(location.search).get("id");
let dataName = document.querySelector(".data-name");
let API_URL = "http://localhost:3000/books";

document.addEventListener("DOMContentLoaded", async function () {
  fetch(`${API_URL}/${id}`)
    .then((res) => res.json())
    .then((data) => {
      dataName.innerHTML = `
        <div class="card-detail d-flex gap-4">
        <div class="book-img">
        <img src="${data.coverImage}" class="card-img-top" alt="...">
        </div>
        
        <div class="card-detail-body">
          <h2 class="card-title">Kitabin adi: <span>${data.name}</span></h2>
          <p class="card-text h3 mt-3">Kitab Haqqinda: <span>${data.description}</span></p>
          <ul class="h4">
          <li class="list-group-item">Yayimlandigi il: <span>${data.year}</span></li>
          <li class="list-group-item">Seife sayi: <span>${data.pageCount}</pan> </li>
          <li class="list-group-item">Kategoriyasi: <span>${data.genre}</span></li>
          <li class="list-group-item">Yazar: <span>${data.author}</span></li>
          <li class="list-group-item">Qiymet: <span>${data.price}</span>AZN</li>
          </ul>
        </div>
      </div>    
  `;
    });
});
