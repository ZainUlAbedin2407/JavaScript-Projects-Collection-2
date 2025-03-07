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

const scrollLeft = () => {
  document
    .querySelector(".scroll-container")
    .scrollBy({ left: -320, behavior: "smooth" });
};
const scrollRight = () => {
  document
    .querySelector(".scroll-container")
    .scrollBy({ left: 320, behavior: "smooth" });
};

document.querySelector("#scroll-right").addEventListener("click", scrollRight);
document.querySelector("#scroll-left").addEventListener("click", scrollLeft);

const fetchData = async () => {
  try {
    const jobData = await fetch(
      "https://hiringmine-railway-production.up.railway.app/api/jobAds/all?limit=10&pageNo=1&keyWord=&category=&isPending=false"
    );

    if (!jobData.ok) {
      throw new Error(`HTTP error! Status: ${jobData.status}`);
    }

    const jsonJobData = await jobData.json();
    console.log(jsonJobData);

    const jobList = jsonJobData.data || [];

    const scrollContainer = document.querySelector(".scroll-container");
    scrollContainer.innerHTML = "";

    jobList.forEach((job) => {
      const jobCard = document.createElement("div");
      jobCard.classList.add("card", "p-3");

      jobCard.innerHTML = `
        <div class="division1">
          <div class="company">
            <p class="companyName">${job.companyName || "N/A"}</p>
            <img width="42px" height="25px" src="Assets/download.png" alt="">
          </div>
          <p class="profession">${job.designation || "N/A"}</p>
          <p class="salary">Salary: 
           ${
             job.payRangeStart && job.payRangeEnd
               ? `Rs ${job.payRangeStart} - ${job.payRangeEnd}`
               : job.payRangeStart || job.payRangeEnd || "N/A"
           }</p>
        </div>
        <div class="division2">
          <p class="views">Views: ${job.views || "0"}</p>
          <p class="location">Location: ${
            job.city && job.country
              ? `${job.city}, ${job.country}`
              : job.city || job.country || "N/A"
          }</p>
          <div class="dateAndAuthor">
            <p class="date">Posted on: ${
              new Date(job.createdAt).toLocaleDateString("en-GB") || "N/A"
            }</p>
            <p class="author">posted by <span class="author-name">${
              job.user.firstName && job.user.lastName
                ? `${job.user.firstName} ${job.user.lastName}`
                : job.user.firstName || job.user.lastName || "N/A"
            }</span></p>
          </div>
        </div>
      `;

      scrollContainer.appendChild(jobCard);
    });
  } catch (error) {
    console.log("Error:", error);
  }
};

// **Run function automatically on page load**
window.onload = fetchData;
