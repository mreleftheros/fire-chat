// function that updates the menu items displayed depending on if the user is logged in or logged out
const updateMenuUI = loginState => {
  const menu = document.getElementById("menu");
  let children = menu.children;

  if (loginState === "login") {
    for (let child of children) {
      if (child.classList.contains("login")) {
        child.style.display = "flex";
      }
      else {
        child.style.display = "none";
      }
    }
  }
  else if (loginState === "logout") {
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

const updateDisplayName = name => {
  const displayName = document.getElementById("displayName");

  displayName.textContent = `Logged in as: ${name}`;
};

export { updateMenuUI, updateDisplayName };