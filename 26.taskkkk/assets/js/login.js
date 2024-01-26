import { getAllUser } from "./request.js";

let loginUsername = document.getElementById("loginUsername");
let loginPassword = document.getElementById("loginPassword");
let loginCheck = document.getElementById("loginCheck");
let loginForm = document.getElementById("loginForm");
let emailHelp = document.getElementById("emailHelp");
let passwordHelp = document.getElementById("passwordHelp");

let usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
let passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}[\]:;<>,.?~\\-]{8,}$/;

loginUsername.addEventListener("keyup", (e) => {
  if (!e.target.value.match(usernameRegex)) {
    emailHelp.classList.replace("d-none", "d-block");
    emailHelp.textContent =
      "It should contain 3 to 20 alphanumeric characters or underscores.";
  } else {
    emailHelp.classList.replace("d-block", "d-none");
    emailHelp.textContent = "";
  }
});

loginPassword.addEventListener("keyup", (e) => {
  if (!e.target.value.match(passwordRegex)) {
    passwordHelp.classList.replace("d-none", "d-block");
    passwordHelp.textContent =
      "It should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.";
  } else {
    passwordHelp.classList.replace("d-block", "d-none");
    passwordHelp.textContent = "";
  }
});

loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  let username = loginUsername.value;
  let password = loginPassword.value;
  let allUsers = await getAllUser();
  let foundUser = null;
  for (let i = 0; i < allUsers.length; i++) {
    if (
      allUsers[i].username === username &&
      allUsers[i].password === password
    ) {
      foundUser = allUsers[i];
      break;
    }
  }

  if (foundUser) {
    if (loginCheck.checked) {
      localStorage.setItem("users", JSON.stringify(foundUser));
    } else {
      sessionStorage.setItem("users", JSON.stringify(foundUser));
    }

    window.location.href = "index.html";
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Tapa bilmedi!",
    });
  }
});
