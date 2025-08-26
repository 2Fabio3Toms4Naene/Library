const buttonNewBook = document.querySelector("#button-new-book");
const containerForm = document.querySelector(".container-form");
const buttonCancelForm = document.querySelector("#button-cancel-form");
const containerDispalyBooks = document.querySelector(".container-dispaly-books");
const buttonTheme = document.querySelector("#button-theme");

buttonTheme.addEventListener("click", () => {
    if(buttonTheme.textContent === "dark mode") {
        document.body.style.backgroundColor = "#000";
        document.body.style.color = "#fff";
        buttonTheme.textContent = "light mode";
    }
    else if(buttonTheme.textContent === "light mode") {
        document.body.style.backgroundColor = "#fff";
        document.body.style.color = "#000";
        buttonTheme.textContent = "dark mode";
    };
});

buttonNewBook.addEventListener("click", () => {
    containerForm.style.display = "block";
})
buttonCancelForm.addEventListener("click", () => {
    containerForm.style.display = "none";

    bookTitle.value = "";
    bookAuthor.value = "";
    bookPages.value = "";
});

const form = document.querySelector("form");
const booksLength = document.querySelector(".books-length");
const buttonSendBookInfos = document.querySelector("#button-send-book-infos");
const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const bookPages = document.querySelector("#pages");

const bookLibrary = [];

function Book(title, author, pages, readStatus, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.id = id;
};

function isLibraryEmpty() {
    if(bookLibrary.length > 0) {
        booksLength.textContent = `You have ${bookLibrary.length} Book/s in the Library`;
    }
    else{
        booksLength.textContent = `You have no Book in the Library`;
    }
};

form.addEventListener("click", (event) => {
    event.preventDefault();
});

buttonSendBookInfos.addEventListener("click", () => {
    if(bookTitle.value.length > 2 && bookAuthor.value.length > 2 && Number(bookPages.value) > 0) {
        let readStatus = false;
        let bookId = crypto.randomUUID();

        const newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, readStatus, bookId);

        bookTitle.value = "";
        bookAuthor.value = "";
        bookPages.value = "";

        bookLibrary.push(newBook);

        containerForm.style.display = "none";

        createCardToDisplayBook(newBook.title, newBook.author, newBook.pages, bookId, newBook, readStatus);

        isLibraryEmpty();

        console.log(bookLibrary);
    }
    else{
        alert("Please, fill out all fields correctily");
    };
});

function createCardToDisplayBook(title, author, pages, id, newBook, readStatus) {
    const bookId = document.createElement("p");
    bookId.id = id;
    const paragraphoTitle = document.createElement("p");
    paragraphoTitle.textContent = title;
    const paragraphoAuthor = document.createElement("p");
    paragraphoAuthor.textContent = author;
    const paragraphoPages = document.createElement("p");
    paragraphoPages.textContent = pages;


    const div = document.createElement("div");
    div.classList = "card-book";
    const containerBookId = document.createElement("span");
    const containerTitle = document.createElement("span");
    containerTitle.textContent = "Title:"
    const constainerAuthor = document.createElement("span");
    constainerAuthor.textContent = "Author:";
    const constianerPages = document.createElement("span");
    constianerPages.textContent = "Pages:";

    const buttonReadStatus = document.createElement("button");
    buttonReadStatus.id = "button-read-status";
    buttonReadStatus.textContent = "unread";
    buttonReadStatus.addEventListener("click", () => {
        if(buttonReadStatus.textContent === "unread") {
            buttonReadStatus.textContent = "read";
            newBook.readStatus = true;
            console.log(bookLibrary);
        }
        else if(buttonReadStatus.textContent === "read") {
            buttonReadStatus.textContent = "unread";
            newBook.readStatus = false;
            console.log(bookLibrary);
        };
    });

    const buttonDelete = document.createElement("button");
    buttonDelete.id = "button-delete-book";
    buttonDelete.textContent = "delete this book";
    buttonDelete.addEventListener("click", () => {
        containerDispalyBooks.removeChild(div);
        bookLibrary.splice(bookLibrary.indexOf(newBook), 1);
        isLibraryEmpty();
        console.log(bookLibrary);
    });

    containerTitle.appendChild(paragraphoTitle);
    constainerAuthor.appendChild(paragraphoAuthor);
    constianerPages.appendChild(paragraphoPages);
    
    div.appendChild(bookId);
    div.appendChild(containerTitle);
    div.appendChild(constainerAuthor);
    div.appendChild(constianerPages);
    div.appendChild(buttonReadStatus);
    div.appendChild(buttonDelete);

    return containerDispalyBooks.appendChild(div);
};