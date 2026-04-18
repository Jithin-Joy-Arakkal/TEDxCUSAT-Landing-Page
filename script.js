let slides = document.querySelectorAll(".slide");
let index = 0;

setInterval(() => {
  slides[index].classList.remove("active");
  index = (index + 1) % slides.length;
  slides[index].classList.add("active");
}, 3000);

const speakerGrid = document.querySelector(".speaker-grid");
let isDragging = false;
let startX = 0;
let scrollStart = 0;
let autoScrollInterval;

if (speakerGrid) {
  speakerGrid.addEventListener("mousedown", (event) => {
    isDragging = true;
    speakerGrid.classList.add("active-drag");
    startX = event.pageX - speakerGrid.offsetLeft;
    scrollStart = speakerGrid.scrollLeft;
    stopAutoScroll();
  });

  speakerGrid.addEventListener("mouseleave", () => {
    isDragging = false;
    speakerGrid.classList.remove("active-drag");
    startAutoScroll();
  });

  speakerGrid.addEventListener("mouseup", () => {
    isDragging = false;
    speakerGrid.classList.remove("active-drag");
    startAutoScroll();
  });

  speakerGrid.addEventListener("mousemove", (event) => {
    if (!isDragging) return;
    event.preventDefault();
    const x = event.pageX - speakerGrid.offsetLeft;
    const walk = (x - startX) * 2;
    speakerGrid.scrollLeft = scrollStart - walk;
  });

  speakerGrid.addEventListener("touchstart", (event) => {
    isDragging = true;
    startX = event.touches[0].pageX - speakerGrid.offsetLeft;
    scrollStart = speakerGrid.scrollLeft;
    stopAutoScroll();
  });

  speakerGrid.addEventListener("touchend", () => {
    isDragging = false;
    speakerGrid.classList.remove("active-drag");
    startAutoScroll();
  });

  speakerGrid.addEventListener("touchmove", (event) => {
    if (!isDragging) return;
    const x = event.touches[0].pageX - speakerGrid.offsetLeft;
    const walk = (x - startX) * 2;
    speakerGrid.scrollLeft = scrollStart - walk;
  });

  function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
      speakerGrid.scrollLeft += 1; // slow scroll speed
      if (speakerGrid.scrollLeft >= speakerGrid.scrollWidth / 2) {
        speakerGrid.scrollLeft = 0; // seamless loop
      }
    }, 50); // adjust speed here
  }

  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }

  // Start auto-scroll on load
  startAutoScroll();
}
