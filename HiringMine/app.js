let menuIcon = document.querySelector(".menu-icon");
let closeIcon = document.querySelector(".close-icon");
let mobNavbar = document.querySelector(".mob");
let overlay = document.querySelector(".overlay");

if (menuIcon && closeIcon && mobNavbar && overlay) {
  menuIcon.addEventListener("click", () => {
    mobNavbar.classList.add("show");
    overlay.classList.add("active");

    menuIcon.style.display = "none";
    closeIcon.style.display = "block";
  });

  closeIcon.addEventListener("click", () => {
    mobNavbar.classList.remove("show");
    overlay.classList.remove("active");

    menuIcon.style.display = "block";
    closeIcon.style.display = "none";
  });
}

window.addEventListener("resize", function () {
  let heading = document.querySelector(".heading");
  if (window.innerWidth <= 616) {
    heading.innerHTML = "Dig. Apply Prepare Your Future"; // <br> remove
  } else {
    heading.innerHTML = "Dig. Apply <br/> Prepare Your Future"; // <br> wapas add
  }
});

window.dispatchEvent(new Event("resize"));

