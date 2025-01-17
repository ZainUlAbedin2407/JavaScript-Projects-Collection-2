const chMode = () => {
  mode.className === "fa-solid fa-sun"
    ? (mode.className = "fa-solid fa-moon")
    : (mode.className = "fa-solid fa-sun");

  let body = document.querySelector("body");

  mode.classList.contains("fa-sun")
    ? body.setAttribute("data-theme", "dark")
    : body.setAttribute("data-theme", "light");
};
const calc = () => {
    let replaced = res.value;
  
    // Special character replacements
    replaced = replaced.replaceAll("×", "*").replaceAll("÷", "/").replaceAll("%", "/100");
  
    try {
      res.value = eval(replaced);
    } catch (error) {
      res.value = "Error";
    }
  };
  