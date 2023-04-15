const SAVED_EVENT = 'savedBook';
const STORAGE_KEY = 'BOOK_APPS';

function isStorageExist(){
    if (typeof (Storage) === undefined) {
        alert("Browser kamu tidak mendukung web storage");
        return false;
    }
    return true;
};

function saveData(){
    if (isStorageExist()) {
        const parsed = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
};

document.addEventListener(SAVED_EVENT, function(){
    console.log(localStorage.getItem(STORAGE_KEY));
});

function loadDataFromStorage(){
    const serializeData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializeData);

    if (data !== null) {
        for (const book of data) {
        books.push(book);
        }
    }
    document.dispatchEvent(new Event(RENDER_EVENT));
};