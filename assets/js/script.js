// // VARIABLES

// let cards = document.querySelector(".card");
// let slider = document.querySelector(".inner-slider");
// // buttons
// let btnPrev = document.getElementById("btn-prev");
// let btnNext = document.getElementById("btn-next");

// btnPrev.addEventListener("click", function () {
//   slider.scrollLeft -= 350;
//   console.log("prev clicked");
// });

// btnNext.addEventListener("click", function () {
//   slider.scrollLeft += 350;
//   console.log("next clicked");
// });

const slides = Array.from(document.querySelectorAll(".card"));
const slider = document.querySelectorAll(".inner-slider");
const buttons = document.querySelectorAll(".navigation");

let timeoutId;

function getNextPrev() {
  const activeSlide = document.querySelector(".card.active");
  const activeIndex = slides.indexOf(activeSlide);
  let next, prev;
  if (activeIndex === slides.length - 1) {
    next = slides[0];
  } else {
    next = slides[activeIndex + 1];
  }
  if (activeIndex === 0) {
    prev = slides[slides.length - 1];
  } else {
    prev = slides[activeIndex - 1];
  }
  return [next, prev];
}
function getPosition() {
  const activeSlide = document.querySelector(".card.active");
  const activeIndex = slides.indexOf(activeSlide);
  const [next, prev] = getNextPrev();
  slides.forEach((slide, index) => {
    if (index === activeIndex) {
      slide.style.transform = "translateX(0)";
    } else if (slide === prev) {
      slide.style.transform = "translateX(-100%)";
    } else if (slide === next) {
      slide.style.transform = "translateX(100%)";
    } else {
      slide.style.transform = "translateX(100%)";
    }
    slide.addEventListener("transitionend", () => {
      slide.classList.remove("top");
    });
  });
}
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("next")) getNextSlide();
    else if (button.classList.contains("prev")) getPrevSlide();
  });
});
function getNextSlide() {
  clearInterval(timeoutId);
  const current = document.querySelector(".card.active");
  const [next, prev] = getNextPrev();
  if (current.classList.contains("top")) {
    return;
  }
  current.classList.add("top");
  next.classList.add("top");
  current.style.transform = "translate(-100%)";
  current.classList.remove("active");
  next.style.transform = "translateX(0)";
  next.classList.add("active");
  getPosition();

  autoLoop();
}
function getPrevSlide() {
  clearInterval(timeoutId);
  const current = document.querySelector(".active");
  const [next, prev] = getNextPrev();
  current.classList.add("top");
  prev.classList.add("top");
  current.style.transform = "translate(100%)";
  current.classList.remove("active");
  prev.style.transform = "translateX(0)";
  prev.classList.add("active");
  getPosition();
  autoLoop();
}
getPosition();

function autoLoop() {
  timeoutId = setTimeout(() => {
    getNextSlide();
  }, 5000);
}

autoLoop();
