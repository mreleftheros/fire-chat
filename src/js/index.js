import { checkAuthentication, signUpUser, loginUser, logoutUser } from "./firebase";

// global variables
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
const signUpForm = document.getElementById("signUpForm");
const loginForm = document.getElementById("loginForm");
const signUpFormClose = document.getElementById("signUpFormClose");
const loginFormClose = document.getElementById("loginFormClose");

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

  if (e.target.classList.contains("login")) {
    loginFormWrapper.classList.add("open");
  }

  if (e.target.classList.contains("logout")) {
    logoutUser();
  }
};

// function that closes form wrapper
const closeForm = e => {
  e.currentTarget.parentElement.classList.remove("open");
};

// function that submits sign up form
const submitSignUpForm = async e => {
  e.preventDefault();

  let displayName = e.currentTarget.displayName.value.trim();
  let email = e.currentTarget.email.value;
  let password = e.currentTarget.password.value;

  if (!displayName || !email || !password) return;

  signUpUser(email, password, displayName)
    .then(() => {
      e.currentTarget.reset();
      closeForm(e);
    })
};

// function that submits login form
const submitLoginForm = e => {
  e.preventDefault();

  let email = e.currentTarget.email.value;
  let password = e.currentTarget.password.value;

  loginUser(email, password)
    .then(() => {
      e.currentTarget.reset();
      closeForm(e);
    })
};

// event listeners
document.addEventListener("DOMContentLoaded", init);
hamburger.addEventListener("click", toggleMenu);
menu.addEventListener("click", handleMenuClick);
signUpForm.addEventListener("submit", submitSignUpForm);
loginForm.addEventListener("submit", submitLoginForm);
signUpFormClose.addEventListener("click", closeForm);
loginFormClose.addEventListener("click", closeForm);