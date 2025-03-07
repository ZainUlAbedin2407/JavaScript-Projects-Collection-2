import {
  db,
  collection,
  addDoc,
  auth,
  getDocs,
  query,
  where,
  signInWithEmailAndPassword,
} from "../firebase.js";

const eyeIcons = document.querySelectorAll(".eye-icon");
const passwordFields = document.querySelectorAll(".passwordField");

// Password Show/Hide Toggle
eyeIcons.forEach((icon, index) => {
  icon.addEventListener("click", () => {
    const passwordField = passwordFields[index];
    if (passwordField.type === "password") {
      passwordField.type = "text";
      icon.classList.add("fa-eye-slash");
      icon.classList.remove("fa-eye");
    } else {
      passwordField.type = "password";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  });
});

// Sign Up Function
const signIn = async () => {
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value;

  let isValid = true;

  let isEmail = document.querySelector("#isEmail");
  let passwordCheck = document.querySelector("#passwordCheck");

  // Clear Previous Error Messages
  isEmail.innerHTML = "";
  passwordCheck.innerHTML = "";

  // Validations
  if (email === "") {
    isEmail.innerHTML = "<p class='alertText'>Email is required</p>";
    isValid = false;
  }
  if (password.length < 8) {
    passwordCheck.innerHTML =
      "<p class='alertText'>Password must be at least 8 characters long</p>";
    isValid = false;
  }
  if (!isValid) return;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Signed in
    const user = userCredential.user;
    console.log(user);

    window.location.href = "../index.html";
  } catch (error) {
    console.log(error.code, error.message); // Debugging ke liye

    if (
      error.code === "auth/invalid-credential" ||
      error.code === "auth/wrong-password"
    ) {
      passwordCheck.innerHTML = "<p class='alertText'>Invalid Credentials</p>";
    } else {
      passwordCheck.innerHTML = `<p class='alertText'>${error.message}</p>`;
    }
  }
};

const signInBtn = document.getElementById("signInBtn");
signInBtn.addEventListener("click", signIn);






