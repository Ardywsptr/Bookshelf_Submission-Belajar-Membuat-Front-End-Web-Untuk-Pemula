const books = [];
const RENDER_EVENT = 'renderEvent';

function addBook(){
    const titleBook = document.getElementById("titleBook").value;
    const authorBook = document.getElementById("authorBook").value;
    const yearsBook = document.getElementById("yearsBook").value;
    const isCompleted = document.getElementById("isCompleted");

    let status;
    if (isCompleted.checked) {
        status = true;
    } else {
        status = false;
    }

    books.push({id: +new Date(), title: titleBook, author: authorBook, year: Number(yearsBook), isCompleted: status,});

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
};

document.addEventListener(RENDER_EVENT, function(){
    console.log(books);
    const unCompleted = document.getElementById("unComplete");
    unCompleted.innerHTML = "";

    const isCompleted = document.getElementById("isComplete");
    isCompleted.innerHTML = "";

    for(const bookItem of books){
        const bookElement = makeBook(bookItem);
        if(!bookItem.isCompleted){
        unCompleted.append(bookElement);
        }else{
        isCompleted.append(bookElement);
        }
    }
});

function makeBook (objectBook){
    const textTitle = document.createElement("p");
    textTitle.classList.add("itemTitle");
    textTitle.innerHTML = `${objectBook.title} - ${objectBook.year}`;

    const textAuthor = document.createElement("p");
    textAuthor.classList.add("itemAuthor");
    textAuthor.innerText = objectBook.author;

    const textContainer = document.createElement("div");
    textContainer.classList.add("itemText");
    textContainer.append(textTitle, textAuthor);

    const actionContainer = document.createElement("div");
    actionContainer.classList.add("itemAction");

    const container = document.createElement("div");
    container.classList.add("item");
    container.append(textContainer);
    container.setAttribute("id", `book-${objectBook.id}`);

    if(objectBook.isCompleted){
        const undoButton = document.createElement("button");
        undoButton.classList.add("undoButton");
        undoButton.innerHTML = `<i class='bx bx-undo'></i>`;

        undoButton.addEventListener("click", function(){
        undoBookFromCompleted(objectBook.id);
        });

        const trashButton = document.createElement("button");
        trashButton.classList.add("trashButton");
        trashButton.innerHTML = `<i class='bx bx-trash'></i>`;

        trashButton.addEventListener("click", function (){
        removeBookFromCompleted(objectBook.id);
        });

        actionContainer.append(undoButton, trashButton);
        container.append(actionContainer);
    }else{ 
        const checkButton = document.createElement("button");
        checkButton.classList.add("checkButton");
        checkButton.innerHTML = `<i class='bx bx-check'></i>`;

        checkButton.addEventListener("click", function(){
        addBookToCompleted(objectBook.id);
        });

        const trashButton = document.createElement("button");
        trashButton.classList.add("trashButton");
        trashButton.innerHTML = `<i class='bx bx-trash'></i>`;

        trashButton.addEventListener("click", function(){
        removeBookFromCompleted(objectBook.id);
        });

        actionContainer.append(checkButton, trashButton);
        container.append(actionContainer);
    };
    return container;
};

function addBookToCompleted(bookId){
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
};

function findBook(bookId){
    for (const bookItem of books) {
        if (bookItem.id === bookId) {
        return bookItem;
        }
    }

    return null;
};

function removeBookFromCompleted(bookId){
    const bookTarget = findBookIndex(bookId);

    if(bookTarget === -1) return;
    
    books.splice(bookTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
};

function undoBookFromCompleted(bookId){
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
};

function findBookIndex(bookId){
    for(const index in books){
        if(books[index].id === bookId){
        return index;
        }
    }
    return -1;
}

document.addEventListener("DOMContentLoaded", function(){
    
    const saveForm = document.getElementById("formBuku");
    saveForm.addEventListener("submit", function(event) {
        event.preventDefault();
        addBook();
    });

    const searchForm = document.getElementById("formSearch");
    searchForm.addEventListener("submit", function(event) {
        event.preventDefault();
        searchBook();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

function searchBook() {
    const searchInput = document.getElementById("pencarian").value;
    const moveBook = document.querySelectorAll(".itemTitle");

    for(const move of moveBook){
        if(searchInput !== move.innerText){
            console.log(move.innerText)
            move.parentElement.remove();
        }
    }
};