
const readline = require("readline/promises");
const { searchBooks } = require("./api");
const { saveBook, listBooks, removeBook } = require("./storage");

async function runCommand() {
    const args = process.argv.slice(2);
    const command = args[0];

    try {
        switch (command) {
            case "search": {
                const query = args.slice(1).join(" ");

                if (!query) {
                    console.log("Usage: npm start -- search <book title>");
                    return;
                }

                const books = await searchBooks(query);

                if (books.length === 0) {
                    console.log("No books found.");
                    return;
                }

                console.log("\nSearch results:\n");

                books.forEach((book, index) => {
                    console.log(`${index + 1}. ${book.title}`);
                    console.log(`   Author: ${book.author}`);
                    console.log(`   Year: ${book.year}\n`);
                });

                break;
            }

            case "save": {
                const query = args.slice(1).join(" ");

                if (!query) {
                    console.log("Usage: npm start -- save <book title>");
                    return;
                }

                const books = await searchBooks(query);

                if (books.length === 0) {
                    console.log("No books found.");
                    return;
                }

                books.forEach((book, index) => {
                    console.log(`${index + 1}. ${book.title} - ${book.author}`);
                });

                const rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout
                });

                try {
                    const answer = await rl.question(
                        "\nEnter the number of the book to save: "
                    );

                    const choice = Number(answer);

                    if (!Number.isInteger(choice) ||
                        choice < 1 || choice > books.length) {
                        console.log("Invalid selection.");
                        return;
                    }

                    saveBook(books[choice - 1]);
                    console.log("Book saved successfully!");
                } finally {
                    rl.close();
                }

                break;
            }

            case "list": {
                const books = listBooks();

                if (books.length === 0) {
                    console.log("Your reading list is empty.");
                    return;
                }

                console.log("\nYour reading list:\n");

                books.forEach((book, index) => {
                    console.log(`${index + 1}. ${book.title}`);
                    console.log(`   Author: ${book.author}`);
                    console.log(`   Year: ${book.year}`);
                    console.log(`   ISBN: ${book.isbn || "Unavailable"}\n`);
                });

                break;
            }

            case "remove": {
                const identifier = args.slice(1).join(" ");

                if (!identifier) {
                    console.log("Usage: npm start -- remove <ISBN or title>");
                    return;
                }

                const removed = removeBook(identifier);

                console.log(
                    removed
                        ? "Book removed successfully!"
                        : "Book not found in your reading list."
                );

                break;
            }

            default:
                console.log(`
BookCLI - Book Finder and Reading List Manager

Commands:
  npm start -- search <title>  Search for books
  npm start -- save <title>    Search and save a selected book
  npm start -- list            Display saved books
  npm start -- remove <ISBN>   Remove a saved book
                `);
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

module.exports = { runCommand };
