document.addEventListener("DOMContentLoaded", function () {
  let userButtons = document.getElementById("userButtons");
  let userInfo = document.getElementById("userInfo");
  let usernameDisplay = document.getElementById("usernameDisplay");
  let logoutButton = document.getElementById("logoutButton");

  let userFromLocalStorage = localStorage.getItem("users");
  let userFromSessionStorage = sessionStorage.getItem("users");

  if (userFromLocalStorage || userFromSessionStorage) {
    userButtons.classList.replace("d-flex", "d-none");
    userInfo.classList.replace("d-none", "d-flex");

    let loggedInUser = userFromSessionStorage || userFromLocalStorage;
    // console.log(JSON.parse(loggedInUser).username)
    usernameDisplay.textContent = JSON.parse(loggedInUser).username;

    logoutButton.addEventListener("click", function () {
      localStorage.removeItem("users");
      sessionStorage.removeItem("users");
      window.location.href = "index.html";
    });
  }
});
