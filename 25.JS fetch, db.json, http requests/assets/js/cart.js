let data = JSON.parse(localStorage.getItem("cart"));
let tableBody = document.querySelector("tbody");
let allTotal = document.querySelector(".all-total");
let deleteAll = document.querySelector(".delete-all");
let balanceSpan = document.querySelector(".balance");

let balance = localStorage.getItem("balance");

function updateTable() {
  tableBody.innerHTML = "";

  if (balance === null || Number(balance) <= 0) {
    balance = prompt("Balansi daxil edin");
    localStorage.setItem("balance", balance);
  }

  balanceSpan.textContent = balance;

  data.forEach((product, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>${product.price} AZN</td>
      <td>${product.price * product.quantity} AZN</td>
      <td>${product.quantity}</td>
      <td><div class="d-flex gap-2">
        <button class="btn btn-primary text-light decrease">-</button>
        <button class="btn btn-primary text-light increase">+</button>
      </div></td>
      <td><button class="btn btn-danger text-light delete"><i class="fa-solid fa-trash"></i></button></td>
    `;

    tableBody.appendChild(row);

    const deleteButton = row.querySelector(".delete");
    const decreaseButton = row.querySelector(".decrease");
    const increaseButton = row.querySelector(".increase");

    deleteButton.addEventListener("click", () => {
      Swal.fire({
        title: "Silmey istirsen?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        data.splice(index, 1);
        updateLocalStorage(data);
        updateTable();
        updateTotalPrice();
        if (result.isConfirmed) {
          Swal.fire("Silindi");
        }
      });
    });

    decreaseButton.addEventListener("click", () => {
      if (product.quantity > 1) {
        Swal.fire({
          title: "1 eded azaltmaq istirsen?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          product.quantity--;
          updateLocalStorage(data);
          updateTableRow(row, product);
          updateTotalPrice();
          if (result.isConfirmed) {
            Swal.fire("1 eded azaldin");
          }
        });
      }
    });

    increaseButton.addEventListener("click", () => {
      Swal.fire({
        title: "1 eded artirmaq istirsen",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        product.quantity++;
        updateLocalStorage(data);
        updateTableRow(row, product);
        updateTotalPrice();
        if (result.isConfirmed) {
          Swal.fire("1 vahid artirdin");
        }
      });
    });
  });
}

setTimeout(() => {
  updateTotalPrice();
}, 0);

function updateTotalPrice() {
  let totalPrice = data.reduce(
    (accmulator, product) => accmulator + product.price * product.quantity,
    0
  );
  allTotal.textContent = `${totalPrice} AZN`;
  return totalPrice;
}

function updateLocalStorage(data) {
  localStorage.setItem("cart", JSON.stringify(data));
}

function updateTableRow(row, product) {
  row.querySelector("td:nth-child(4)").textContent = `${
    product.price * product.quantity
  } AZN`;
  row.querySelector("td:nth-child(5)").textContent = product.quantity;
}

deleteAll.addEventListener("click", function () {
  Swal.fire({
    title: "Hamisini almaq istirsen?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      if (balance >= updateTotalPrice()) {
        localStorage.setItem(
          "balance",
          (Number(balance) - Number(updateTotalPrice())).toString()
        );
        balance = localStorage.getItem("balance");
        localStorage.removeItem("cart");
        data = [];
        updateTable();
        updateTotalPrice();
        Swal.fire("Hamisin sildin");
      } else {
        Swal.fire("Balansin kifayet qeder deyil");
      }
    }
  });
});

updateTable();
