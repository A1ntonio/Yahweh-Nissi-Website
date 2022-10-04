
function bodyScrollingToggle(){
	document.body.classList.toggle("hidden-scrolling");
}


(() =>{
	const projectsItemsContainer = document.querySelector(".projects-items"),
	projectsItems = document.querySelectorAll(".projects-item"),
	popup = document.querySelector(".projects-popup"),
	prevBtn = popup.querySelector(".pp-prev"),
	nextBtn = popup.querySelector(".pp-next"),
	closeBtn = popup.querySelector(".pp-close"),
	projectsDetailsContainer = popup.querySelector(".pp-details"),
	projectsDetailsBtn = popup.querySelector(".pp-projects-details-btn");
	let itemIndex, slideIndex, screenShots;

	projectsItemsContainer.addEventListener("click", () =>{
		if (event.target.closest(".projects-item-inner")) {
			const projectsItem = event.target.closest(".projects-item-inner").
			parentElement;
			// get the projectsItem index
			itemIndex = Array.from(projectsItem.parentElement.children).indexOf(projectsItem);
			
			screenShots = projectsItems[itemIndex].querySelector(".projects-item-img img").getAttribute("data-screenshots");
			// convert screenshots into array
			screenShots = screenShots.split(",");
			if (screenShots.length === 1) {
				prevBtn.style.display="none";
				nextBtn.style.display="none";
			} else {
				prevBtn.style.display="block";
				nextBtn.style.display="block";
			}
			slideIndex = 0;
			popupToggle();
			popupSlideshow();
			popupDetails();
		}
	})

	closeBtn.addEventListener("click", () =>{
		popupToggle();
		if (projectsDetailsContainer.classList.contains("active")) {
			popupDetailsToggle();
		}
	})

	function popupToggle(){
		popup.classList.toggle("open");
		bodyScrollingToggle();
	}

	function popupSlideshow(){
		const imgSrc = screenShots[slideIndex];
		const popupImg = popup.querySelector(".pp-img");
		/*activate loader until the popupImg loaded */
		popup.querySelector(".pp-loader").classList.add("active");
		popupImg.src = imgSrc;
		popupImg.onload = () =>{
			// deactivate loader after the popupImg loader
			popup.querySelector(".pp-loader").classList.remove("active");
		}
		popup.querySelector(".pp-counter ").innerHTML = (slideIndex+1) + " of " + screenShots.length;
	}

	// next slide
	nextBtn.addEventListener("click", () =>{
		if (slideIndex === screenShots.length-1) {
			slideIndex = 0;
		}
		else{
			slideIndex++;
		}
		popupSlideshow();
	})

	// prev slide
	prevBtn.addEventListener("click", () =>{
		if (slideIndex === 0) {
			slideIndex = screenShots.length - 1;
		} else {
			slideIndex--;
		}
		popupSlideshow();
	})

	function popupDetails(){
		// if projects item details not exists
		if (!projectsItems[itemIndex].querySelector(".projects-item-details")) {
			projectsDetailsBtn.style.display = "none";
			return; /*end function execution*/
		}
		projectsDetailsBtn.style.display = "block";
		// get the projects details
		const details = projectsItems[itemIndex].querySelector(".projects-item-details").innerHTML;
		// set the projects category
		popup.querySelector(".pp-projects-details").innerHTML = details;
		const title = projectsItems[itemIndex].querySelector(".projects-item-title").innerHTML;
		popup.querySelector(".pp-title h2").innerHTML = title;
		const category = projectsItems[itemIndex].getAttribute("data-category");
		popup.querySelector(".pp-projects-category").innerHTML = category.split("-").join(" ");
	}

	projectsDetailsBtn.addEventListener("click", () =>{
		popupDetailsToggle();
	})

	function popupDetailsToggle(){
		if (projectsDetailsContainer.classList.contains("active")) {
			projectsDetailsBtn.querySelector("i").classList.remove("fa-minus");
			projectsDetailsBtn.querySelector("i").classList.add("fa-plus");
			projectsDetailsContainer.classList.remove("active");
			projectsDetailsContainer.style.maxHeight = 0 + "px";
		} else {
			projectsDetailsBtn.querySelector("i").classList.remove("fa-plus");
			projectsDetailsBtn.querySelector("i").classList.add("fa-minus");
			projectsDetailsContainer.classList.add("active");
			projectsDetailsContainer.style.maxHeight = projectsDetailsContainer.scrollHeight + "px";
			popup.scrollTo(0, projectsDetailsContainer.offsetTop);
		}
	}

})();