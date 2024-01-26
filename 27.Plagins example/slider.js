import {
  getAllData,
  editSlider,
  deleteSlider,
  getDataID,
  postSlider,
} from "./request.js";
let createCard = document.querySelector(".create-card");
let BTNID = 0;
let EditSingerName = document.getElementById("edit-singer-name");
let EditSingerImage = document.getElementById("edit-imageLink");
let addSlider = document.getElementById("formId");
let imageLink = document.getElementById("imageLink");
let sliderTitle = document.getElementById("tiltle");
const urlValidation = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
const titleValidation = /^[a-zA-Z\s\d.'-]{3,20}$/;

let sliderCard = async function (arr) {
  createCard.innerHTML = "";
  arr.forEach((item) => {
    createCard.innerHTML += `
      <div class="col-3 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12  mb-3">
      <div class="card">
        <div class="card-img">
          <img src="${item.imageURL}" class="card-img-top" alt="${item.title}">
        </div>
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <div class="col d-flex gap-1">
            <button id="${item.id}" class="btn btn-outline-danger delete"><i class="fa-solid fa-trash"></i></button>
            <button id="${item.id}"  class="btn btn-outline-success edit-btn" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-pen-to-square"></i></button>
          </div>
        </div>
      </div>
    </div>
      `;

    // DELETE
    let deleteButton = document.querySelectorAll(".delete");
    deleteButton.forEach((btn) => {
      btn.addEventListener("click", async function () {
        const confirmDelete = confirm("Are you sure delete?");
        if (confirmDelete) {
          const itemId = this.getAttribute("id");
          this.closest(".col-3").remove();
          deleteSlider(itemId);

          toastr.success("Slide delete success");
        }
      });
    });

    //EDIT
    let editButton = document.querySelectorAll(".edit-btn");
    editButton.forEach((btn) => {
      btn.addEventListener("click", function () {
        getDataID(this.getAttribute("id")).then((data) => {
          BTNID = this.getAttribute("id");
          EditSingerName.value = data.title;
          EditSingerImage.value = data.imageURL;
          const editModal = new bootstrap.Modal(
            document.getElementById("exampleModal")
          );
          editModal.show();
        });
      });
    });

    editFormId.addEventListener("submit", async function (e) {
      e.preventDefault();
      try {
        let id = BTNID;
        const editedTitle = EditSingerName.value;
        const editedURL = EditSingerImage.value;

        if (!titleValidation.test(editedTitle)) {
          toastr.error("Title should be 3-20 letters.");
          return;
        }

        if (!urlValidation.test(editedURL)) {
          toastr.error("Invalid URL format.");
          return;
        }

        await editSlider(id, {
          title: editedTitle,
          imageURL: editedURL,
        });

        toastr.success("Slide edit success");
        location.reload();
      } catch (error) {
        alert(error.message);
      }

      const editModal = new bootstrap.Modal(
        document.getElementById("exampleModal")
      );
      editModal.hide();
    });
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  let sliders = await getAllData();
  sliderCard(sliders);
});

addSlider.addEventListener("submit", async (e) => {
  e.preventDefault();
  let titleSlid = sliderTitle.value.trim();
  let imageURLSlid = imageLink.value.trim();

  if (!titleValidation.test(titleSlid)) {
    toastr.warning(
      "Title should be 3-20 characters and may include letters, digits, spaces, '.', and '-'"
    );
    return;
  }

  if (!urlValidation.test(imageURLSlid)) {
    toastr.warning("Invalid URL format.");
    return;
  }

  try {
    postSlider(titleSlid, imageURLSlid);
    toastr.success("Add new slider");
    addSlider.reset();
    setTimeout(()=>{
      window.location.reload()
    },400)
  } catch (error) {
    toastr.error(error);
  }
});
