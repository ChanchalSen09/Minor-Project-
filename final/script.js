const slider = document.querySelector("#slider");
const slides = document.querySelector("#slides");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentSlide = 0;

// Update the dots to reflect the current slide
function updateDots() {
  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  dots[currentSlide].classList.add("active");
}

// Show the next slide
function nextSlide() {
  currentSlide++;

  if (currentSlide >= slides.children.length) {
    currentSlide = 0;
  }

  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
  updateDots();
}

// Show the previous slide
function prevSlide() {
  currentSlide--;

  if (currentSlide < 0) {
    currentSlide = slides.children.length - 1;
  }

  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
  updateDots();
}

// Update the slider when a dot is clicked
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index;
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateDots();
  });
});

// Update the slider when the next or previous buttons are clicked
prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

// Start the slider at the first slide
updateDots();
