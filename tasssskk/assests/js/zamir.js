import { getAllData } from './request.js';

document.addEventListener('DOMContentLoaded', async () => {
    let rightSide = document.querySelector('.shop-right');
    let result = await getAllData();
  
    function renderItems(items) {
      rightSide.innerHTML = '';
  
      items.forEach((item, index) => {
        let isNewButton = item.isNew
          ? '<div class="btn btn-success new my-3">New</div>'
          : `<div class="btn ${item.isDiscounted ? 'btn-danger' : 'btn-success'} new my-3">${item.discountedPercent}%</div>`;
  
        let priceHtml = '';
  
        if (item.discountedPercent > 0) {
          const discountedPrice = item.price - (item.price * item.discountedPercent / 100);
          priceHtml = `<p class="mx-5">$${discountedPrice.toFixed(2)}</p>`;
        } else {
          priceHtml = `<p class="mx-5">$${item.price.toFixed(2)}</p>`;
        }
  
        let newItem = document.createElement('div');
        newItem.className = 'shop-right-item rounded mx-4 col-md-6 col-lg-4';
        newItem.innerHTML = `
          <div style="width: 100%;" class="col-12">
            <div class="new-heart d-flex align-items-center justify-content-between mx-4 mt-3">
              ${isNewButton}
              <i id="heart_${index}_${item.id}" class="fa-regular fa-heart favorite-icon" style="color: #ff0000;font-size:25px;"></i>
            </div>
            <img width="60%" style="margin-left: 25%;" src="./assests/photo/Pasted Graphic 5.png" alt="">
            <img width="35%" class="mx-5" src="./assests/photo/Pasted Graphic 15.png" alt="">
            <h3 class="mx-5">${item.name}</h3>
            <p class="mx-5">Shoulder Bag Leather Bag Leather undertakes laborious physical physical </p>
            ${priceHtml}
            <div class="d-flex my-3 gap-3 mx-3">
              <button id="${item.id}" class="btn w-50 border rounded add">Add to card</button>
              <a href="detail.html?id=${item.id}" id="${item.id}" class="btn btn-primary text-light w-25">Detail</a>
            </div>
          </div>
        `;
  
        rightSide.appendChild(newItem);
      });
    }
  
    renderItems(result);
  
    const categoryList = document.querySelectorAll('.category');
    categoryList.forEach((category) => {
      category.addEventListener('click', () => {
        const categoryName = category.textContent.trim().toLowerCase();
        const filteredItems = result.filter((item) => item.category.toLowerCase() === categoryName);
        renderItems(filteredItems);
      });
    });
  
    const sizeButtons = document.querySelectorAll('.size-btn');
    sizeButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const size = button.textContent.trim().toLowerCase();
        const filteredItems = result.filter((item) => item.size.toLowerCase() === size);
        renderItems(filteredItems);
      });
    });
  });
  