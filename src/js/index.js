import { checkAuthentication } from "./firebase";

// variables
const hamburger = document.getElementById("hamburger");

// function that toggles class open to menu and hamburger
const toggleMenu = e => {
  const menu = document.getElementById("menu");

  e.currentTarget.classList.toggle("open");
  menu.classList.toggle("open");
};

// function that calls initialized functions
const init = () => {
  checkAuthentication();
};


// event listeners
hamburger.addEventListener("click", toggleMenu);
document.addEventListener("DOMContentLoaded", init);