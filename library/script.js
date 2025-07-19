/* The prototype for Book and its related functions */
const myLibrary = [];

function Book(title, author, pagesCount, readStatus) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pagesCount = pagesCount;
  this.readStatus = readStatus;
}

Book.prototype.toggleReadStatus = function () {
  this.readStatus = !this.readStatus;
};

function addBookToLibrary(title, author, pagesCount, readStatus) {
  const newBook = new Book(title, author, pagesCount, readStatus);
  myLibrary.push(newBook);
}

/* Creating book cards and pushing them to the DOM */
booksShowcaseContainer = document.getElementById("books-showcase-container");

function displayLibrary() {
  booksShowcaseContainer.innerHTML = "";
  for (const book of myLibrary) {
    // Book container
    const bookContainer = document.createElement("div");
    bookContainer.dataset.id = book.id;
    bookContainer.classList.add("book-container");

    // Book title container
    const bookHeadingContainer = document.createElement("div");
    bookHeadingContainer.classList.add("book-heading-container");

    // Title
    const heading = document.createElement("h2");
    heading.textContent = book.title;
    bookHeadingContainer.appendChild(heading);

    // Author
    const author = document.createElement("p");
    author.textContent = `By ${book.author}`;
    bookHeadingContainer.appendChild(author);

    // Number of pages
    const pagesCount = document.createElement("p");
    pagesCount.textContent = `${book.pagesCount} pages`;
    bookHeadingContainer.appendChild(pagesCount);

    bookContainer.appendChild(bookHeadingContainer);

    // Other book info container
    const bookOtherInfoCont = document.createElement("div");
    bookOtherInfoCont.classList.add("book-other-info-container");

    // Read button
    const readBtn = document.createElement("button");
    readBtn.classList.add(
      "not-read-state",
      "book-control-buttons",
      "button",
      "read-button"
    );
    readBtn.classList.toggle("read-state", book.readStatus);
    readBtn.textContent = `${
      book.readStatus ? "\u{2714} Read" : "\u{2716} Not Read"
    }`;
    bookOtherInfoCont.appendChild(readBtn);

    // Remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add(
      "book-control-buttons",
      "remove-button",
      "button",
      "secondary-btn"
    );
    bookOtherInfoCont.appendChild(removeBtn);

    bookContainer.appendChild(bookOtherInfoCont);

    booksShowcaseContainer.appendChild(bookContainer);
  }
}

/* Book card actions */
booksShowcaseContainer.addEventListener("click", (e) => {
  /* If clicked outside any book card but within the booksShowcaseContainer */
  if (e.target === e.currentTarget) return;
  const bookContainer = e
    .composedPath()
    .find((element) => element.classList.contains("book-container"));
  /* If clicked on read button */
  if (e.target.classList.contains("read-button")) {
    const book = myLibrary.find((book) => book.id === bookContainer.dataset.id);
    book.toggleReadStatus();
    e.target.classList.toggle("read-state");
    e.target.textContent = `${
      book.readStatus ? "\u{2714} Read" : "\u{2716} Not Read"
    }`;
  } else if (e.target.classList.contains("remove-button")) {
    /* If clicked on remove button */
    myLibrary.splice(
      myLibrary.findIndex((book) => book.id === bookContainer.dataset.id),
      1
    );
    bookContainer.remove();
  }
});

// Using the modal, which hosts the book form
const modal = document.getElementById("add-book-modal");
const openModalButton = document.getElementById("add-book-btn");
const closeModalButton = document.getElementById("close-modal-btn");

openModalButton.addEventListener("click", () => {
  modal.showModal();
});

closeModalButton.addEventListener("click", () => {
  modal.close();
});

modal.addEventListener("click", (e) => {
  const dialogDimensions = modal.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    modal.close();
  }
});

// Form for creating a new book

// Form input fields
const form = document.getElementById("add-book-form");
const title = document.getElementById("title");
const author = document.getElementById("author");
const numPages = document.getElementById("num-pages");
const readStatus = document.getElementById("read-status");
// Warning outputs
const titleInputError = document.getElementById("title-input-error");
const authorInputError = document.getElementById("author-input-error");
const numPagesInputError = document.getElementById("num-pages-input-error");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let errorsExist = false;

  if (title.value === "" || title.value === null) {
    titleInputError.innerText = "Title is required";
    errorsExist = true;
  }

  if (author.value === "" || author.value === null) {
    authorInputError.innerText = "Author's name is required";
    errorsExist = true;
  } else if (!isNaN(author.value)) {
    authorInputError.innerText = "Author's name cannot have a number";
    errorsExist = true;
  }

  if (numPages.value === "" || numPages.value === null) {
    numPagesInputError.innerText = "Number of pages is required";
    errorsExist = true;
  } else if (numPages.value < 0) {
    numPagesInputError.innerText = "Number of pages cannot be negative";
    errorsExist = true;
  }

  if (!errorsExist) {
    addBookToLibrary(
      title.value,
      author.value,
      numPages.value,
      readStatus.checked
    );

    form.reset();

    titleInputError.innerText = "";
    authorInputError.innerText = "";
    numPagesInputError.innerText = "";

    modal.close();
    displayLibrary();
  }
});

displayLibrary();

// Toggling dark mode / light mode
let darkMode = localStorage.getItem("darkMode");
const darkModeToggle = document.getElementById("dark-mode-toggle");
const lightModeIcon = document.getElementById("light-mode-icon");
const darkModeIcon = document.getElementById("dark-mode-icon");

const enableDarkMode = () => {
  document.body.classList.add("dark-mode");
  darkModeIcon.classList.add("show-display");
  lightModeIcon.classList.remove("show-display");
  localStorage.setItem("darkMode", "enabled");
};

const disableDarkMode = () => {
  document.body.classList.remove("dark-mode");
  darkModeIcon.classList.remove("show-display");
  lightModeIcon.classList.add("show-display");
  localStorage.setItem("darkMode", null);
};

if (darkMode === "enabled") {
  enableDarkMode();
} else {
  lightModeIcon.classList.add("show-display");
}

darkModeToggle.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkMode");
  if (darkMode !== "enabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});
