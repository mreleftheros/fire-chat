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

// function that takes the user displayName and outputs it in the DOM
const updateDisplayNameUI = name => {
  const displayName = document.getElementById("displayName");

  displayName.innerHTML = `Logged in as: <span class="header__nav__menu__item__link__name">${name}</span>`;
};

// function that shows the chat screen or a message depending on if the user is logged in or logged out
const updateChatUI = user => {
  if (user === "login") {
    main.classList.add("open");
  }
  else if (user === "logout") {
    main.classList.remove('open');
    main.innerHTML = `<span class="main__logout-message">You are currently logged out. Login to start chatting!</span>`;
  }
};

// function that takes all docs from database and outputs them in the DOM
const renderMessagesUI = docs => {
  const fragment = new DocumentFragment();

  docs.forEach(doc => {
    const liElement = document.createElement("LI");

    liElement.className = ""
  })
};

export { updateMenuUI, updateDisplayNameUI, updateChatUI, renderMessagesUI };