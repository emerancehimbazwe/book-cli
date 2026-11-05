
const { parseArgs } = require("node:util");
const chalk = require("chalk");

const { searchBooks, getBookById } = require("./api");
const { saveBook, getBooks, removeBook } = require("./storage");

function showHelp() {
    console.log(chalk.blue.bold("\nBookCLI - Book Finder and Reading List"));

    console.log("\nCommands:");
    console.log("  bookcli search <title>  Search for books");
    console.log("  bookcli save <id>       Save a book");
    console.log("  bookcli list            View saved books");
    console.log("  bookcli remove <id>     Remove a saved book");
    console.log("  bookcli help            Show help");

    console.log("\nOptions:");
    console.log("  --limit, -l <number>    Limit search results (1-20)");
    console.log("  --help                  Show this help menu");
}

async function runCommand() {
    const args = process.argv.slice(2);
    const command = args[0];

    if (!command || command === "help" || command === "--help") {
        showHelp();
        return;
    }

    try {
        if (command === "search") {
            const { values, positionals } = parseArgs({
                args: args.slice(1),
                options: {
                    limit: { type: "string", short: "l" }
                },
                allowPositionals: true,
                strict: true
            });

            const title = positionals.join(" ").trim();
            const limit = Number(values.limit || 5);

            if (!title) {
                throw new Error("Please provide a book title.");
            }

            if (!Number.isInteger(limit) || limit < 1 || limit > 20) {
                throw new Error("Limit must be a number between 1 and 20.");
            }

            console.log(chalk.blue(`\nSearching for: ${title}\n`));

            const books = await searchBooks(title, limit);

            if (!books || books.length === 0) {
                console.log(chalk.yellow("No books found."));
                return;
            }

            books.forEach((book, index) => {
                console.log(chalk.green(`${index + 1}. ${book.title}`));
                console.log(`   Author: ${book.author || "Unknown"}`);
                console.log(`   Year: ${book.year || "Unknown"}`);
                console.log(`   ID: ${book.id}\n`);
            });

            return;
        }

        if (command === "save") {
            const id = args[1];

            if (!id) {
                throw new Error("Please provide a book ID.");
            }

            const book = await getBookById(id);

            if (!book) {
                throw new Error("Book not found.");
            }

            await saveBook(book);
            console.log(chalk.green(`Book saved: ${book.title}`));
            return;
        }

        if (command === "list") {
            const books = await getBooks();

            if (!books || books.length === 0) {
                console.log(chalk.yellow("Your reading list is empty."));
                return;
            }

            console.log(chalk.blue.bold("\nYour Reading List\n"));

            books.forEach((book, index) => {
                console.log(chalk.green(`${index + 1}. ${book.title}`));
                console.log(`   Author: ${book.author || "Unknown"}`);
                console.log(`   ID: ${book.id}\n`);
            });

            return;
        }

        if (command === "remove") {
            const id = args[1];

            if (!id) {
                throw new Error("Please provide a book ID.");
            }

            const removed = await removeBook(id);

            if (!removed) {
                throw new Error("Book was not found in your reading list.");
            }

            console.log(chalk.green("Book removed successfully."));
            return;
        }

        throw new Error(`Unknown command: ${command}`);

    } catch (error) {
        console.log(chalk.red(`\nError: ${error.message}`));
        process.exitCode = 1;
    }
}

module.exports = { runCommand };
