const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
let currentIndex = 0;

function goToSlide(index) {
  if (index < 0) {
    currentIndex = slides.length - 1;
  } else if (index >= slides.length) {
    currentIndex = 0;
  } else {
    currentIndex = index;
  }
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

prevButton.addEventListener("click", () => {
  goToSlide(currentIndex - 1);
});

nextButton.addEventListener("click", () => {
  goToSlide(currentIndex + 1);
});
