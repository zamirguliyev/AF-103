import { getAllUser } from "./request.js";

document.addEventListener("DOMContentLoaded", async () => {
  let userUsername = document.querySelector(".username");
  let userUserEmail = document.querySelector(".email");
  let userPassword = document.querySelector(".password");
  let userBalance = document.querySelector(".balance");
  let tBody = document.querySelector("tbody");
  let userFromLocalStorage = JSON.parse(localStorage.getItem("users"));
  let userFromSessionStorage = JSON.parse(sessionStorage.getItem("users"));
  let loggedInUser = userFromSessionStorage || userFromLocalStorage;

  if (loggedInUser) {
    userUsername.textContent = loggedInUser.username;
    userUserEmail.textContent = loggedInUser.email;
    userPassword.textContent = loggedInUser.password;
    userBalance.textContent = loggedInUser.balance;

    if (loggedInUser.orders && loggedInUser.orders.length > 0) {
      loggedInUser.orders.forEach((order) => {
        tBody.innerHTML += `
            <tr>
              <td>${order.id}</td>
              <td>${order.total} AZN</td>
              <td>${order.orderDate}</td>
            </tr>
          `;
      });
    } else {
      console.log("Sipariş verileri bulunamadı.");
    }
  } else {
    console.log("Tapa bilmedi.");
  }

  //CHANGE PASSWORD
  let changePassword = document.getElementById("changePassword");
  changePassword.addEventListener("submit", async function (e) {
    e.preventDefault();

    let curretPasword = document.getElementById("curretPasword");
    let newPassword = document.getElementById("newPassword");
    let confirmPassword = document.getElementById("confirmPassword");

    let currentPasswordValue = curretPasword.value;
    let newPasswordValue = newPassword.value;
    let confirmNewPasswordValue = confirmPassword.value;

    let passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}[\]:;<>,.?~\\-]{8,}$/;

    if (currentPasswordValue !== loggedInUser.password) {
      alert("Hazirki Passwordun duz deyil");
      return;
    }

    if (!newPasswordValue.match(passwordRegex)) {
      alert(
        "It should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit."
      );
      return;
    }
    if (newPasswordValue !== confirmNewPasswordValue) {
      alert("Passwordlar eyni deyiller");
      return;
    }
    loggedInUser.password = newPasswordValue;

    if (userFromLocalStorage) {
      userFromLocalStorage.password = newPasswordValue;
      localStorage.setItem("users", JSON.stringify(userFromLocalStorage));
    } else if (userFromSessionStorage) {
      userFromSessionStorage.password = newPasswordValue;
      sessionStorage.setItem("users", JSON.stringify(userFromSessionStorage));
    }

    let usersLocalStorage = JSON.parse(localStorage.getItem("users"));
    let usersSessionStorage = JSON.parse(sessionStorage.getItem("users"));
    let users = usersSessionStorage || usersLocalStorage;
    axios.patch("http://localhost:3000/users/" + users.id, {
      password: newPasswordValue,
    });
  
    alert("Password deyisdi");
    window.location.reload();
  });

  //CHANGE NEW BALANCE
  let changeBalance = document.getElementById("changeBalance");
  changeBalance.addEventListener("submit", async function (e) {
    e.preventDefault();
    let userFromLocalStorage = JSON.parse(localStorage.getItem("users"));
    let userFromSessionStorage = JSON.parse(sessionStorage.getItem("users"));
    let loggedInUser = userFromSessionStorage || userFromLocalStorage;
    let newBalance = document.getElementById("newBalance");
    let numberRegex = /^\d*\.?\d+$/;
    let curretBalance = newBalance.value;

    if (!curretBalance.match(numberRegex)) {
      alert("Balance 0 dan boyuk olmalidir");
      return;
    }
    loggedInUser.balance = curretBalance;
    if (userFromLocalStorage) {
      userFromLocalStorage.balance = curretBalance;
      localStorage.setItem("users", JSON.stringify(userFromLocalStorage));
    } else if (userFromSessionStorage) {
      userFromSessionStorage.balance = curretBalance;
      sessionStorage.setItem("users", JSON.stringify(userFromSessionStorage));
    }

    let usersLocalStorage = JSON.parse(localStorage.getItem("users"));
    let usersSessionStorage = JSON.parse(sessionStorage.getItem("users"));
    let users = usersSessionStorage || usersLocalStorage;
    axios.patch("http://localhost:3000/users/" + users.id, {
     balance:curretBalance
    });

    alert("Balans deyisdi");
    window.location.reload();
  });

  


//CHANGE USERNAME
let changeUsername = document.getElementById('changeUsername')
changeUsername.addEventListener('submit',async function(e){
e.preventDefault()
let newUsername = document.getElementById('newUsername')
let newUsernamedHelp = document.getElementById('newUsernamedHelp')
let currentUsername = newUsername.value

let allUsers = await getAllUser();

  let foundUser = allUsers.find((user)=>user.username === currentUsername)

    let usersLocalStorage = JSON.parse(localStorage.getItem("users"));
  let usersSessionStorage = JSON.parse(sessionStorage.getItem("users"));
  let users = usersSessionStorage || usersLocalStorage;

  if(!foundUser){
   await axios.patch("http://localhost:3000/users/" + users.id, {
    username:currentUsername
   });

   users.username = currentUsername;
   if (usersLocalStorage) {
     localStorage.setItem("users", JSON.stringify(usersLocalStorage));
   }
   if (usersSessionStorage) {
     sessionStorage.setItem("users", JSON.stringify(usersSessionStorage));
   }
   alert("Username Deyisildi");
   window.location.reload();
  }else{
    alert("Bele user var")
  }
  
  
  
})


});
