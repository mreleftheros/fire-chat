const chatList = document.getElementById("chatList");
const main = document.getElementById("main");
const logoutMessage = document.getElementById("logoutMessage");

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
    logoutMessage.classList.remove("open");
    main.classList.add("open");
  }
  else if (user === "logout") {
    main.classList.remove('open');
    logoutMessage.classList.add("open");
  }
};

// function that takes all docs from database and outputs them in the DOM
const renderMessagesUI = docs => {
  chatList.innerHTML = "";
  const fragment = new DocumentFragment();

  docs.forEach(doc => {
    const liElement = document.createElement("LI");
    let date = doc.data().time.toDate();

    liElement.className = "main__chat__chat-screen__list__message";

    liElement.innerHTML= `
    <span class="main__chat__chat-screen__list__message__name">${doc.data().name}:</span>
    <span class="main__chat__chat-screen__list__message__message">${doc.data().message}</span>
    <span class="main__chat__chat-screen__list__message__time">${date.getHours()}:${date.getMinutes()}</span>
    `;

    fragment.appendChild(liElement);
  })

  chatList.appendChild(fragment);
};

export { updateMenuUI, updateDisplayNameUI, updateChatUI, renderMessagesUI };