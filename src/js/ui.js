const updateMenuUI = login => {
  const menu = document.getElementById("menu");

  if (login) {
    for (let child of menu.children) {
      if (child.classList.contains("login")) {
        child.style.display = "flex";
      }
      else {
        child.style.display = "none";
      }
    }
  }
};

export { updateMenuUI };