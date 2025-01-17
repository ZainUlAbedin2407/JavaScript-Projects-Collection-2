const arrows = document.querySelectorAll(".fa-chevron-down");
const accordions = document.querySelectorAll(".content-container");

arrows.forEach((button, index) => {
  button.addEventListener("click", () => {
    accordions.forEach((accordion, idx) => {
      const panel = accordion.querySelector(".panel");
      const icon = accordion.querySelector("i");

      if (index === idx) {
        const isOpen = panel.style.display === "block";
        if (isOpen) {
          panel.style.display = "none";
          accordion.style.height = "50px";
          accordion.style.backgroundColor = "#324156";
          accordion.querySelector("p").style.color = "#8f9eb1";
          icon.classList.remove("fa-chevron-up");
          icon.classList.add("fa-chevron-down");
        } else {
          panel.style.display = "block";
          accordion.style.height = "auto";
          accordion.style.backgroundColor = "#159EE4";
          accordion.querySelector("p").style.color = "white";
          panel.querySelector('p').style.color = "white"         
          icon.style.color = "white"
          icon.classList.remove("fa-chevron-down");
          icon.classList.add("fa-chevron-up");
        }
      } else {
        panel.style.display = "none";
        accordion.style.height = "50px";
        accordion.style.backgroundColor = "#324156";
        accordion.querySelector("p").style.color = "#8f9eb1";
        icon.classList.remove("fa-chevron-up");
        icon.classList.add("fa-chevron-down");
      }
    });
  });
});
