
/* ----------------------- testimonmonial slider---------------- */

(() =>{
	const sliderContainer = document.querySelector(".testimon-slider-container"),
	slides = sliderContainer.querySelectorAll(".testimon-item"),
	slideWidth = sliderContainer.offsetWidth,
	prevBtn = document.querySelector(".testimon-slider-nav .prev"),
	nextBtn = document.querySelector(".testimon-slider-nav .next");
	activeSlide = sliderContainer.querySelector(".testimon-item.active");
	let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);

	// set width of all slides
	slides.forEach((slide) => {
		slide.style.width = slideWidth + "px";
	})

	// set width of sliderContainer
	sliderContainer.style.width = slideWidth * slides.length + "px";

	nextBtn.addEventListener("click", () => {
		if (slideIndex === slides.length-1) {
			slideIndex = 0;
		} else {
			slideIndex++;
		}
		slider();
	})

	prevBtn.addEventListener("click", () => {
		if (slideIndex === 0) {
			slideIndex = slides.length - 1;
		} else {
			slideIndex--;
		}
		slider();
	})	

	function slider(){
		// deactivate existing active slides
		sliderContainer.querySelector(".testimon-item.active").classList.remove("active");
		// active new slide
		slides[slideIndex].classList.add("active");
		sliderContainer.style.marginLeft = - (slideWidth * slideIndex) + "px";
	}
	slider();

})();
