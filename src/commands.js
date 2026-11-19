
const readline = require("readline/promises");
const { searchBooks } = require("./api");
const { saveBook, listBooks, removeBook } = require("./storage");

function showHelp() {
    console.log(`
BookCLI - Book Finder and Reading List Manager

Commands:
  search <title>    Search for books
  save <title>      Search and save a selected book
  list              Display saved books
  remove <title>    Remove a saved book
  help              Display available commands
  exit              Close BookCLI
    `);
}

async function executeCommand(args, rl) {
    const command = args[0]?.toLowerCase();

    try {
        switch (command) {
            case "search": {
                const query = args.slice(1).join(" ");

                if (!query) {
                    console.log("Usage: search <book title>");
                    break;
                }

                const books = await searchBooks(query);

                if (books.length === 0) {
                    console.log("No books found.");
                    break;
                }

                console.log("\nSearch results:\n");

                console.table(books.map((book, index) => ({
                    Number: index + 1,
                    Title: book.title,
                    Author: book.author,
                    Year: book.year,
                    ISBN: book.isbn || "Unavailable"
                })));

                break;
            }

            case "save": {
                const query = args.slice(1).join(" ");

                if (!query) {
                    console.log("Usage: save <book title>");
                    break;
                }

                const books = await searchBooks(query);

                if (books.length === 0) {
                    console.log("No books found.");
                    break;
                }

                console.table(books.map((book, index) => ({
                    Number: index + 1,
                    Title: book.title,
                    Author: book.author,
                    Year: book.year
                })));

                const answer = await rl.question(
                    "Enter the number of the book to save: "
                );

                const choice = Number(answer);

                if (
                    !Number.isInteger(choice) ||
                    choice < 1 ||
                    choice > books.length
                ) {
                    console.log("Invalid selection.");
                    break;
                }

                saveBook(books[choice - 1]);
                console.log("Book saved successfully!");

                break;
            }

            case "list": {
                const books = listBooks();

                if (books.length === 0) {
                    console.log("Your reading list is empty.");
                    break;
                }

                console.log("\nYour reading list:\n");

                console.table(books.map((book, index) => ({
                    Number: index + 1,
                    Title: book.title,
                    Author: book.author,
                    Year: book.year,
                    ISBN: book.isbn || "Unavailable"
                })));

                break;
            }

            case "remove": {
                const identifier = args.slice(1).join(" ");

                if (!identifier) {
                    console.log("Usage: remove <ISBN or title>");
                    break;
                }

                const removed = removeBook(identifier);

                console.log(
                    removed
                        ? "Book removed successfully!"
                        : "Book not found in your reading list."
                );

                break;
            }

            case "help":
                showHelp();
                break;

            case "exit":
                return false;

            default:
                console.log("Unknown command. Type help to see available commands.");
        }
    } catch (error) {
        console.error("Error:", error.message);
    }

    return true;
}

async function runCommand() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    try {
        console.log("\nWelcome to BookCLI!");
        console.log("Type help to see commands or exit to close.\n");

        while (true) {
            const input = await rl.question("BookCLI > ");

            if (!input.trim()) {
                continue;
            }

            const args = input.trim().split(/\s+/);

            const shouldContinue = await executeCommand(args, rl);

            if (!shouldContinue) {
                console.log("Goodbye!");
                break;
            }

            console.log("");
        }
    } catch (error) {
        if (error.code !== "ERR_USE_AFTER_CLOSE") {
            console.error("Error:", error.message);
        }
    } finally {
        rl.close();
    }
}

module.exports = { runCommand };
