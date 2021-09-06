import { auth, onAuthStateChanged, signUpUser, loginUser, logoutUser, addMessage, getMessages } from "./firebase";
import { updateMenuUI, updateDisplayNameUI, updateChatUI } from "./ui";

// global variables
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
const signUpForm = document.getElementById("signUpForm");
const loginForm = document.getElementById("loginForm");
const signUpFormClose = document.getElementById("signUpFormClose");
const loginFormClose = document.getElementById("loginFormClose");
const chatForm = document.getElementById("chatForm");
const chatrooms = document.getElementById("chatrooms");
let selectedChatroom = "general";


// function that sets a real time listener for auth state change
const checkAuthentication = () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      updateMenuUI("login");
      updateDisplayNameUI(user.displayName);
      updateChatUI("login");
      getMessages(selectedChatroom);
    } else {
      updateMenuUI("logout");
      updateChatUI("logout");
    }
  })
};

// function that calls initialized functions when dom is ready
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

// function that submits sign up form and creates new user with given credentials
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
    .catch(err => {
      console.log(err);
    })
};

// function that submits login form and logins user with given credentials
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

// function that submits the chat form and adds the message to the database
const submitChatForm = e => {
  e.preventDefault();

  let message = e.currentTarget.message.value.trim();

  if(message.length === 0) return; // check

  let chatroom = selectedChatroom;
  let name = auth.currentUser.displayName;

  addMessage(name, chatroom, message)
    .then(e.currentTarget.reset())
    .catch(err => console.log(err));
};

// function that adds select class to the selected chatroom and puts its text value in selectedChatroom variable  
const selectChatroom = e => {
  if (e.target.tagName !== "BUTTON" || e.target.classList.contains("select")) return; // check

  for (let child of chatrooms.children) {
    if (child.classList.contains("select")) {
      child.classList.remove("select");
    }
  }

  selectedChatroom = e.target.innerText.slice(1);
  e.target.classList.add("select");

  // re-render UI with new messages from new chatroom
  getMessages(selectedChatroom);
};

// event listeners
document.addEventListener("DOMContentLoaded", init);
hamburger.addEventListener("click", toggleMenu);
menu.addEventListener("click", handleMenuClick);
signUpForm.addEventListener("submit", submitSignUpForm);
loginForm.addEventListener("submit", submitLoginForm);
signUpFormClose.addEventListener("click", closeForm);
loginFormClose.addEventListener("click", closeForm);
chatForm.addEventListener("submit", submitChatForm);
chatrooms.addEventListener("click", selectChatroom);