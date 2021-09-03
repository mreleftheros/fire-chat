// function that updates the menu items displayed depending on if the user is logged in or logged out
const updateMenuUI = login => {
  const menu = document.getElementById("menu");
  let children = menu.children;

  if (login) {
    for (let child of children) {
      if (child.classList.contains("login")) {
        child.style.display = "flex";
      }
      else {
        child.style.display = "none";
      }
    }
  }
  else {
    for (let child of children) {
      if (child.classList.contains("logout")) {
        child.style.display = "flex";
      }
      else {
        child.style.display = "none";
      }
    }
  }
};

export { updateMenuUI };