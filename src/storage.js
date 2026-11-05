
const fs = require("fs");
const path = require("path");

// Location of our JSON database
const DATA_FILE = path.join(__dirname, "..", "data", "books.json");

// Read all saved books
function listBooks() {
    if (!fs.existsSync(DATA_FILE)) {
        return [];
    }

    const fileContent = fs.readFileSync(DATA_FILE, "utf8");

    try {
        return JSON.parse(fileContent);
    } catch (error) {
        throw new Error("Could not read books database. The JSON file may be invalid.");
    }
}

// Save a new book
function saveBook(book) {
    if (!book || !book.title) {
        throw new Error("A valid book with a title is required.");
    }

    const books = listBooks();

    // Prevent saving the same book twice
    const alreadySaved = books.some(savedBook =>
        (book.key && savedBook.key === book.key) ||
        (book.isbn && savedBook.isbn === book.isbn)
    );

    if (alreadySaved) {
        throw new Error("This book is already in your reading list.");
    }

    books.push(book);

    fs.writeFileSync(DATA_FILE, JSON.stringify(books, null, 2), "utf8");

    return book;
}

// Remove a book using its ISBN, Open Library key or title
function removeBook(identifier) {
    if (!identifier) {
        throw new Error("Please provide a book identifier.");
    }

    const books = listBooks();

    const searchValue = String(identifier).trim().toLowerCase();

    const updatedBooks = books.filter(book =>
        String(book.key || "").toLowerCase() !== searchValue &&
        String(book.isbn || "").toLowerCase() !== searchValue &&
        String(book.title || "").toLowerCase() !== searchValue
    );

    if (updatedBooks.length === books.length) {
        return false;
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(updatedBooks, null, 2), "utf8");

    return true;
}

module.exports = {
    saveBook,
    listBooks,
    removeBook
};
