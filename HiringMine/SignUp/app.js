import {
  db,
  collection,
  addDoc,
  auth,
  createUserWithEmailAndPassword,
  getDocs,
  query,
  where,
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
const signUp = async () => {
  let userName = document.getElementById("username").value.trim();
  let firstName = document.getElementById("firstname").value.trim();
  let lastName = document.getElementById("lastname").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;

  let isValid = true;

  let isUser = document.querySelector("#isUser");
  let isFirstName = document.querySelector("#isFirstName");
  let isLastName = document.querySelector("#isLastName");
  let isEmail = document.querySelector("#isEmail");
  let passwordCheck = document.querySelector("#passwordCheck");
  let isPasswordMatch = document.querySelector("#isPasswordMatch");

  // Clear Previous Error Messages
  passwordCheck.innerHTML = "";
  isPasswordMatch.innerHTML = "";
  isUser.innerHTML = "";
  isFirstName.innerHTML = "";
  isLastName.innerHTML = "";
  isEmail.innerHTML = "";

  // Validations
  if (userName === "") {
    isUser.innerHTML = "<p class='alertText'>Username is required</p>";
    isValid = false;
  }
  if (firstName === "") {
    isFirstName.innerHTML = "<p class='alertText'>First Name is required</p>";
    isValid = false;
  }
  if (lastName === "") {
    isLastName.innerHTML = "<p class='alertText'>Last Name is required</p>";
    isValid = false;
  }
  if (email === "") {
    isEmail.innerHTML = "<p class='alertText'>Email is required</p>";
    isValid = false;
  }
  if (password.length < 8) {
    passwordCheck.innerHTML =
      "<p class='alertText'>Password must be at least 8 characters long</p>";
    isValid = false;
  }
  if (password !== confirmPassword) {
    isPasswordMatch.innerHTML = "<p class='alertText'>Passwords must match</p>";
    isValid = false;
  }
  if (!isValid) return;

  try {
    // Check if username already exists
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", userName));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      isUser.innerHTML = "<p class='alertText'>Username is already taken</p>";
      return;
    }

    // Firebase Authentication - User Sign Up
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Store user in Firestore
    await addDoc(collection(db, "users"), {
      username: userName,
      firstName: firstName,
      lastName: lastName,
      email: email,
      createdAt: new Date(),
    });

    window.location.href = "../index.html";
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      isEmail.innerHTML = "<p class='alertText'>Email not available</p>";
    } else {
      console.log(error.code, error.message);
    }
  }
};

const signUpBtn = document.getElementById("signUpBtn");
signUpBtn.addEventListener("click", signUp);
