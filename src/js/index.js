import { checkAuthentication, createUser } from "./firebase";

// global variables
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
const signUpForm = document.getElementById("signUpForm");
const loginForm = document.getElementById("loginForm");

// function that calls initialized functions
const init = () => {
  checkAuthentication();
};

// function that toggles class open to menu and hamburger
const toggleMenu = e => {
  e.currentTarget.classList.toggle("open");
  menu.classList.toggle("open");
};

// function that opens clicked menu item from menu
const handleMenuClick = e => {
  if (!e.target.tagName === "A") return; // check for link tag

  const signUpFormWrapper = document.querySelector(".sign-up-form-wrapper");
  const loginFormWrapper = document.querySelector(".login-form-wrapper");

  if (e.target.classList.contains("sign-up")) {
    signUpFormWrapper.classList.add("open");
  }
};

// function that submits sign up form
const submitSignUpForm = async e => {
  e.preventDefault();

  let username = e.currentTarget.username.value.trim();
  let email = e.currentTarget.email.value;
  let password = e.currentTarget.password.value;

  createUser(email, password)
    .then(() => {
      e.currentTarget.reset();
      e.currentTarget.parentElement.classList.remove("open");
    })
}

// event listeners
document.addEventListener("DOMContentLoaded", init);
hamburger.addEventListener("click", toggleMenu);
menu.addEventListener("click", handleMenuClick);
signUpForm.addEventListener("submit", submitSignUpForm);