let createCard = document.querySelector(".create-card");
let spinnerWrapper = document.querySelector(".spinner-wrapper");
let searchInput = document.querySelector(".search");
let sortByYear = document.querySelector(".sort");
let formId = document.getElementById("formId");
let bookName = document.getElementById("book-name");
let bookDesc = document.getElementById("bookDesc");
let bookAuthor = document.getElementById("book-author");
let bookCoverImage = document.getElementById("coverImage");
let bookPageCount = document.getElementById("pageCount");
let bookPrice = document.getElementById("price");
let BookYear = document.getElementById("bookYear");
let bookCategory = document.getElementById("bookCategory");
let categorySelect = document.getElementById("categorySelect");

let API_URL = "http://localhost:3000/books";

let getData = async () => {
  showSpinner();
  let response = await fetch(API_URL);
  let data = await response.json();
  data.forEach((item) => {
    createCard.innerHTML += `
      <div class="card">
      <img src="${item.coverImage}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title"><button class='name-btn' id=${item.id}><b>${item.name}</b></button></h5>
        <p class="card-text">${item.description}</p>
      </div>
      <ul class="list-group list-group-flush">
      <li class="list-group-item">Yayimlandigi il: ${item.year}</li>
      <li class="list-group-item">Seife sayi: ${item.pageCount}</li>
      <li class="list-group-item">Kategoriyasi: ${item.genre}</li>
      <li class="list-group-item">Yazar: ${item.author}</li>
      <li class="list-group-item">Qiymet: ${item.price} AZN</li>
      </ul>
      <div class="d-flex justify-content-center gap-1 p-1 align-items-center">
      <button type="button" id=${item.id} class="btn w-25 btn-danger delete-btn"><i class="fa-solid fa-trash"></i></button>
      <button data-name=${item.name} data-desc=${item.description} data-img=${item.coverImage} data-year=${item.year} data-page=${item.pageCount} data-genre=${item.genre} data-author=${item.author} data-price=${item.price} class="btn w-25 btn-success edit-btn" data-bs-toggle="modal" data-bs-target="#editModal"><i class="fa-solid fa-pen-to-square"></i></button>
      <a href="detail.html?id=${item.id}" class="btn w-25 btn-primary"><i class="fa-solid fa-circle-info"></i></a>
      <button type="button" id=${item.id} class="btn w-25 btn-info add-card text-light"><i class="fa-solid fa-cart-shopping"></i></button>
      </div>
    </div>
`;
  });

  //Delete Card
  let deleteCard = async () => {
    let deleteBtn = document.querySelectorAll(".delete-btn");
    deleteBtn.forEach((btn) => {
      btn.addEventListener("click", function () {
        let id = this.getAttribute("id");
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
            fetch(`http://localhost:3000/books/${id}`, {
              method: "DELETE",
            });
            this.closest(".card").remove();
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        });
      });
    });
  };

  // learn More Modal
  let learnMoreModal = async () => {
    let learnMore = document.querySelectorAll(".name-btn");
    learnMore.forEach((item) => {
      item.addEventListener("click", function () {
        fetch(`${API_URL}/${this.id}`)
          .then((res) => res.json())
          .then((item) => {
            Swal.fire({
              title: `Name: ${item.name}`,
              text: `Desc: ${item.description}`,
              imageUrl: `${item.coverImage}`,
              imageWidth: 350,
              imageHeight: 300,
            });
          });
      });
    });
  };

  // edit buttons
  let editButtons = async () => {
    let EditbookName = document.getElementById("edit-book-name");
    let EditbookDesc = document.getElementById("edit-bookDesc");
    let EditbookAuthor = document.getElementById("edit-book-author");
    let EditbookCoverImage = document.getElementById("edit-coverImage");
    let EditbookPageCount = document.getElementById("edit-pageCount");
    let EditBookYear = document.getElementById("edit-bookYear");
    let EditbookCategory = document.getElementById("edit-bookCategory");
    let EditPrice = document.getElementById("edit-price");
    let editForm = document.querySelector(".editForm");

    let editButton = document.querySelectorAll(".edit-btn");

    console.log("editbutton run");

    editButton.forEach((btn) => {
      btn.addEventListener("click", function () {
        let name = this.getAttribute("data-name");
        let desc = this.getAttribute("data-desc");
        let img = this.getAttribute("data-img");
        let year = this.getAttribute("data-year");
        let pageCount = this.getAttribute("data-page");
        let genre = this.getAttribute("data-genre");
        let author = this.getAttribute("data-author");
        let price = this.getAttribute("data-price");
        let id = this.previousElementSibling.getAttribute("id");

        EditbookName.value = name;
        EditbookDesc.value = desc;
        EditbookCoverImage.value = img;
        EditBookYear.value = year;
        EditbookPageCount.value = pageCount;
        EditbookCategory.value = genre;
        EditbookAuthor.value = author;
        EditPrice.value = price;
        editForm.addEventListener("submit", async (e) => {
          e.preventDefault();
          try {
            let response = await fetch(`http://localhost:3000/books/${id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: EditbookName.value,
                pageCount: EditbookPageCount.value,
                coverImage: EditbookCoverImage.value,
                author: EditbookAuthor.value,
                year: EditBookYear.value,
                description: EditbookDesc.value,
                genre: EditbookCategory.value,
                price: EditPrice.value,
              }),
            });

            if (response.ok) {
              Swal.fire({
                position: "top",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500,
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="">Why do I have this issue?</a>',
              });
            }
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              footer: '<a href="">Why do I have this issue?</a>',
            });
          }
        });
      });
    });
  };

  //Add Locale Storage

  let addCardLocale = async () => {
    let addCard = document.querySelectorAll(".add-card");
    let cartCount = document.querySelector(".card-count");
    addCard.forEach((btn) => {
      btn.addEventListener("click", function () {
        fetch(API_URL + `/${this.id}`)
          .then((res) => res.json())
          .then((product) => {
            if (JSON.parse(localStorage.getItem("cart")) === null) {
              product.quantity = 1;
              localStorage.setItem("cart", JSON.stringify([product]));
              cartCount.textContent = JSON.parse(
                localStorage.getItem("cart")
              ).length;
            } else {
              let card = JSON.parse(localStorage.getItem("cart"));

              let found = card.find(
                (cartQuantity) => cartQuantity.id === product.id
              );
              if (found) {
                found.quantity++;
                localStorage.setItem("cart", JSON.stringify([...card]));
              } else {
                product.quantity = 1;
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...card, product])
                );
                cartCount.textContent = JSON.parse(
                  localStorage.getItem("cart")
                ).length;
              }
            }
          });
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Sebete elave olundu",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    });

    cartCount.textContent = JSON.parse(localStorage.getItem("cart")).length;
  };

  addCardLocale();

  // EditButton
  editButtons();
  //Learn More
  learnMoreModal();

  //Delete Button
  deleteCard();

  hideSpinner();

  //Search Input
  searchInput.addEventListener("input", (e) => {
    if (e.target.value.length > 0) {
      fetch(`${API_URL}`)
        .then((res) => res.json())
        .then((data) => {
          const foundArr = data.filter((item) =>
            item.name
              .toLowerCase()
              .trim()
              .includes(searchInput.value.trim().toLowerCase())
          );

          if (foundArr.length > 0) {
            createCard.innerHTML = "";
            showSpinner();
            foundArr.forEach((item) => {
              createCard.innerHTML += `
              <div class="card">
              <img src="${item.coverImage}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title"><button class='name-btn' id=${item.id}><b>${item.name}</b></button></h5>
                <p class="card-text">${item.description}</p>
              </div>
              <ul class="list-group list-group-flush">
              <li class="list-group-item">Yayimlandigi il: ${item.year}</li>
              <li class="list-group-item">Seife sayi: ${item.pageCount}</li>
              <li class="list-group-item">Kategoriyasi: ${item.genre}</li>
              <li class="list-group-item">Yazar: ${item.author}</li>
              </ul>
              <div class="d-flex justify-content-center gap-1 p-1 align-items-center">
              <button type="button" id=${item.id} class="btn w-25 btn-danger delete-btn"><i class="fa-solid fa-trash"></i></button>
              <button data-name=${item.name} data-desc=${item.description} data-img=${item.coverImage} data-year=${item.year} data-page=${item.pageCount} data-genre=${item.genre} data-author=${item.author} data-price=${item.price} class="btn w-25 btn-success edit-btn" data-bs-toggle="modal" data-bs-target="#editModal"><i class="fa-solid fa-pen-to-square"></i></button>
              <a href="detail.html?id=${item.id}" class="btn w-25 btn-primary"><i class="fa-solid fa-circle-info"></i></a>
              <button type="button" id=${item.id} class="btn w-25 btn-info add-card text-light"><i class="fa-solid fa-cart-shopping"></i></button>
              </div>
            </div>     
              `;
            });
            editButtons();
            deleteCard();
            learnMoreModal();
            addCardLocale();
            hideSpinner();
          } else {
            createCard.innerHTML = `
              <div class="text-danger h3">Not Found</div>
            `;
          }
        });
    } else {
      createCard.innerHTML = "";
    }
  });

  //Sort by Years
  sortByYear.addEventListener("click", () => {
    createCard.innerHTML = "";
    showSpinner();
    fetch(`${API_URL}`)
      .then((resp) => resp.json())
      .then((data) => {
        const sortedCats = data.sort((x, y) => y.year - x.year);
        sortedCats.forEach((item) => {
          createCard.innerHTML += `
            <div class="card">
            <img src="${item.coverImage}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title"><button class='name-btn' id=${item.id}><b>${item.name}</b></button></h5>
              <p class="card-text">${item.description}</p>
            </div>
            <ul class="list-group list-group-flush">
            <li class="list-group-item">Yayimlandigi il: ${item.year}</li>
            <li class="list-group-item">Seife sayi: ${item.pageCount}</li>
            <li class="list-group-item">Kategoriyasi: ${item.genre}</li>
            <li class="list-group-item">Yazar: ${item.author}</li>
            <li class="list-group-item">Qiymet: ${item.price} AZN</li>
            </ul>
            <div class="d-flex justify-content-center gap-1 p-1 align-items-center">
            <button type="button" id=${item.id} class="btn w-25 btn-danger delete-btn"><i class="fa-solid fa-trash"></i></button>
            <button data-name=${item.name} data-desc=${item.description} data-img=${item.coverImage} data-year=${item.year} data-page=${item.pageCount} data-genre=${item.genre} data-author=${item.author} data-price=${item.price} class="btn w-25 btn-success edit-btn" data-bs-toggle="modal" data-bs-target="#editModal"><i class="fa-solid fa-pen-to-square"></i></button>
            <a href="detail.html?id=${item.id}" class="btn w-25 btn-primary"><i class="fa-solid fa-circle-info"></i></a>
            <button type="button" id=${item.id} class="btn w-25 btn-info text-light add-card"><i class="fa-solid fa-cart-shopping"></i></button>
            </div>
          </div>   
          `;
        });
        deleteCard();
        learnMoreModal();
        editButtons();
        addCardLocale();
        hideSpinner();
      });
  });

  //Category Select
  categorySelect.addEventListener("change", (e) => {
    let selectedCategory = e.target.value;
    if (selectedCategory === "All") {
      getData();
    } else {
      fetch(`${API_URL}`)
        .then((res) => res.json())
        .then((data) => {
          let filteredBooks = data.filter(
            (item) =>
              item.genre.toLowerCase() === selectedCategory.toLowerCase()
          );
          if (filteredBooks.length > 0) {
            showSpinner();
            createCard.innerHTML = "";
            filteredBooks.forEach((item) => {
              createCard.innerHTML += `
              <div class="card">
              <img src="${item.coverImage}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title"><button class='name-btn' id=${item.id}><b>${item.name}</b></button></h5>
                <p class="card-text">${item.description}</p>
              </div>
              <ul class="list-group list-group-flush">
              <li class="list-group-item">Yayimlandigi il: ${item.year}</li>
              <li class="list-group-item">Seife sayi: ${item.pageCount}</li>
              <li class="list-group-item">Kategoriyasi: ${item.genre}</li>
              <li class="list-group-item">Yazar: ${item.author}</li>
              <li class="list-group-item">Qiymet: ${item.price} AZN</li>
              </ul>
              <div class="d-flex justify-content-center gap-1 p-1 align-items-center">
              <button type="button" id=${item.id} class="btn w-25 btn-danger delete-btn"><i class="fa-solid fa-trash"></i></button>
              <button data-name=${item.name} data-desc=${item.description} data-img=${item.coverImage} data-year=${item.year} data-page=${item.pageCount} data-genre=${item.genre} data-author=${item.author} data-price=${item.price} class="btn w-25 btn-success edit-btn" data-bs-toggle="modal" data-bs-target="#editModal"><i class="fa-solid fa-pen-to-square"></i></button>
              <a href="detail.html?id=${item.id}" class="btn w-25 btn-primary"><i class="fa-solid fa-circle-info"></i></a>
              <button type="button" id=${item.id} class="btn w-25 btn-info text-light add-card"><i class="fa-solid fa-cart-shopping"></i></button>
              </div>
            </div>  
              `;
            });
            learnMoreModal();
            editButtons();
            addCardLocale();
            deleteCard();
            hideSpinner();
          } else {
            createCard.innerHTML = `
              <div class="text-danger h3">Not Found</div>
            `;
          }
        });
    }
  });
};

//Add Book
formId.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = bookName.value.trim();
  const pageCount = parseInt(bookPageCount.value);
  const coverImage = bookCoverImage.value.trim();
  const author = bookAuthor.value.trim();
  const year = parseInt(BookYear.value);
  const description = bookDesc.value.trim();
  const genre = bookCategory.value.trim();
  const price = bookPrice.value.trim();

  if (
    !name ||
    !coverImage ||
    !author ||
    isNaN(pageCount) ||
    pageCount < 0 ||
    pageCount > 700 ||
    isNaN(year) ||
    year < 0 ||
    !price
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        pageCount,
        coverImage,
        author,
        year,
        description,
        genre,
        price,
      }),
    });

    if (!response.ok) {
      throw new Error("An error occurred while adding the book.");
    }

    const item = await response.json();

    createCard.innerHTML += `
      <div class="card">
        <img src="${item.coverImage}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title"><button class='name-btn' id="${item.id}"><b>${item.name}</b></button></h5>
          <p class="card-text">${item.description}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Yayimlandigi il: ${item.year}</li>
          <li class="list-group-item">Seife sayi: ${item.pageCount}</li>
          <li class="list-group-item">Kategoriyasi: ${item.genre}</li>
          <li class="list-group-item">Yazar: ${item.author}</li>
          <li class="list-group-item">Qiymet: ${item.price}</li>
        </ul>
        <div class="d-flex justify-content-center gap-1 p-1 align-items-center">
          <button type="button" id="${item.id}" class="btn w-25 btn-danger delete-btn"><i class="fa-solid fa-trash"></i></button>
          <button id="${item.id}" class="btn w-25 btn-success edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
          <a href="detail.html?id=${item.id}" class="btn w-25 btn-primary"><i class="fa-solid fa-circle-info"></i></a>
        </div>
      </div>
    `;
  } catch (error) {
    alert(error.message);
  }
});

function showSpinner() {
  spinnerWrapper.classList.replace("d-none", "d-flex");
}

function hideSpinner() {
  spinnerWrapper.classList.replace("d-flex", "d-none");
}

getData();
