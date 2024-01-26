import { registerUser ,getAllUser} from "./request.js";

let registerForm = document.getElementById("register-form");
let registerUsername = document.getElementById("register-username");
let registerEmail = document.getElementById("register-email");
let registerPassword = document.getElementById("register-password");
let registerConfirmPassword = document.getElementById(
  "register-confirm-password"
);
let registerBalance = document.getElementById("register-balance");
let emailHelp = document.getElementById("emailHelp");
let passwordHelp = document.getElementById("passwordHelp");
let usernameHelp = document.getElementById("usernameHelp");
let balanceHelp = document.getElementById("balanceHelp");

let usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
let passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}[\]:;<>,.?~\\-]{8,}$/;
let numberRegex = /^-?\d+(\.\d+)?$/;
let emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

registerUsername.addEventListener("keyup", (e) => {
  if (!e.target.value.match(usernameRegex)) {
    usernameHelp.classList.replace("d-none", "d-block");
    usernameHelp.textContent =
      "It should contain 3 to 20 alphanumeric characters or underscores.";
  } else {
    usernameHelp.classList.replace("d-block", "d-none");
    usernameHelp.textContent = "";
  }
});

registerPassword.addEventListener("keyup", (e) => {
  if (!e.target.value.match(passwordRegex)) {
    passwordHelp.classList.replace("d-none", "d-block");
    passwordHelp.textContent =
      "It should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.";
  } else {
    passwordHelp.classList.replace("d-block", "d-none");
    passwordHelp.textContent = "";
  }
});

registerEmail.addEventListener("keyup", (e) => {
  if (!e.target.value.match(emailRegex)) {
    emailHelp.classList.replace("d-none", "d-block");
    emailHelp.textContent = " . _ - @ etc";
  } else {
    emailHelp.classList.replace("d-block", "d-none");
    emailHelp.textContent = "";
  }
});
registerBalance.addEventListener("keyup", (e) => {
  if (!e.target.value.match(numberRegex)) {
    balanceHelp.classList.replace("d-none", "d-block");
    balanceHelp.textContent = " . , and postive number";
  } else {
    balanceHelp.classList.replace("d-block", "d-none");
    balanceHelp.textContent = "";
  }
});

function validatePassword() {
  if (registerPassword.value != registerConfirmPassword.value) {
    registerConfirmPassword.setCustomValidity("Password eyni deyil");
  } else {
    registerConfirmPassword.setCustomValidity("");
  }
}

registerPassword.onchange = validatePassword;
registerConfirmPassword.onkeyup = validatePassword;

registerForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  let username = registerUsername.value.trim();
  let password = registerPassword.value.trim();
  let email = registerEmail.value.trim();
  let balance = registerBalance.value.trim();

  let allUsers = await getAllUser();
  let foundUser = null;
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].username === username ) {
      usernameHelp.textContent ="Bele bir user var"
    } else{
      foundUser = allUsers[i]
      break
    }
  }

  if (!username || !password || !email || isNaN(balance) || balance < 0 || foundUser) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
    return;
  }
  registerUser(username, password, email, balance);
  let user = {
    username,
    email,
    password,
    balance,
  };

  Swal.fire({
    position: "center",
    icon: "success",
    title: `Created new User`,
    showConfirmButton: false,
    timer: 1000,
  });
  window.location.href = "index.html";
});
