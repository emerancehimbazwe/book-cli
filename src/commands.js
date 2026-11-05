const { parseArgs } = require("node:util");
const chalk = require("chalk");
const { searchBooks } = require("./api");
const {
    saveBook,
    getBooks,
    removeBook
} = require("./storage");

function showHelp() {
    console.log(chalk.blue.bold("\nBookCLI - Book Finder"));

    console.log("\nAvailable commands:");
    console.log("  bookcli search <title>  Search for books");
    console.log("  bookcli save <id>       Save a book");
    console.log("  bookcli list            View saved books");
    console.log("  bookcli remove <id>     Remove a saved book");
    console.log("  bookcli help            Show help");

    console.log("\nOptions:");
    console.log("  --limit, -l <number>    Limit search results");
    console.log("  --help                  Show help");
}

async function runCommand() {
    const args = process.argv.slice(2);
    const command = args[0];

    if (!command || command === "help" || command === "--help") {
        showHelp();
        return;
    }

    if (command === "search") {
        try {
            const { values, positionals } = parseArgs({
                args: args.slice(1),
                options: {
                    limit: { type: "string", short: "l" }
                },
                allowPositionals: true,
                strict: true
            });

            const title = positionals.join(" ");
            const limit = Number(values.limit || 5);

            if (!title) {
                console.log(chalk.red("Please provide a book title."));
                process.exitCode = 1;
                return;
            }

            if (!Number.isInteger(limit) || limit < 1 || limit > 20) {
                console.log(chalk.red("Limit must be a number between 1 and 20."));
                process.exitCode = 1;
                return;
            }

            console.log(chalk.blue(`Searching for: ${title}`));

            const books = await searchBooks(title, limit);

            if (!books.length) {
                console.log(chalk.yellow("No books found."));
                return;
            }

            books.forEach((book, index) => {
                console.log(chalk.green(`\n${index + 1}. ${book.title}`));
                console.log(`   Author: ${book.author || "Unknown"}`);
                console.log(`   Year: ${book.year || "Unknown"}`);
                console.log(`   ID: ${book.id}`);
            });

        } catch (error) {
            console.log(chalk.red(`Error: ${error.message}`));
            process.exitCode = 1;
        }

        return;
    }

    if (command === "list") {
        const books = getBooks();

        if (!books.length) {
            console.log(chalk.yellow("Your reading list is empty."));
            return;
        }

        books.forEach((book, index) => {
            console.log(`${index + 1}. ${book.title} - ${book.author || "Unknown"}`);
        });

        return;
    }

    if (command === "save") {
        const id = args[1];

        if (!id) {
            console.log(chalk.red("Please provide a book ID."));
            process.exitCode = 1;
            return;
        }

        console.log(chalk.yellow("Save command will be connected after API integration."));
        return;
    }

    if (command === "remove") {
        const id = args[1];

        if (!id) {
            console.log(chalk.red("Please provide a book ID."));
            process.exitCode = 1;
            return;
        }

        console.log(chalk.yellow("Remove command will be connected after storage integration."));
        return;
    }

    console.log(chalk.red(`Unknown command: ${command}`));
    showHelp();
    process.exitCode = 1;
}

module.exports = { runCommand };