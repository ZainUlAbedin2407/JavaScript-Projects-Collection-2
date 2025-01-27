let input = document.querySelector("input");
let search = document.querySelector(".fa-search");
let flag = document.querySelector(".output img");
let nameElem = document.querySelector(".name span");
let capitalElem = document.querySelector(".capital span");
let populationElem = document.querySelector(".population span");
let bordersElem = document.querySelector(".borders span");
let languagesElem = document.querySelector(".languages span");
let result = document.querySelector(".output");

const fetchCountryData = () => {
  let countryName = input.value.trim();
  if (countryName === "") return result.style.display = "none";;

  fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then((response) => {
      if (!response.ok) {
      result.style.display = "flex";
        throw new Error("Country Not Found!");
      }

      return response.json();
    })
    .then((data) => {
      result.style.display = "flex";
      let country = data[0];

      if (!country.flags) {
        flag.src = "./notFoundImg.jpg";
        flag.style.mixBlendMode = "multiply ";
      } else {
        flag.src = country.flags.svg;
        flag.style.mixBlendMode = "normal";
      }

      nameElem.textContent = country.name.common || "Not Found";
      capitalElem.textContent = country.capital ? country.capital : "Not Found";
      populationElem.textContent =
        country.population.toLocaleString() || "Not Found";
      bordersElem.textContent = country.borders
        ? country.borders.join(", ")
        : "Not Found";
      languagesElem.textContent = country.languages
        ? Object.values(country.languages).join(", ")
        : "Not Found";
    })
    .catch(() => {
      flag.src = "./notFoundImg.jpg";
      flag.style.mixBlendMode = "multiply";
      nameElem.textContent = "Not Found";
      capitalElem.textContent = "Not Found";
      populationElem.textContent = "Not Found";
      bordersElem.textContent = "Not Found";
      languagesElem.textContent = "Not Found";
    });
};

search.addEventListener("click", fetchCountryData);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    fetchCountryData();
  }
});
