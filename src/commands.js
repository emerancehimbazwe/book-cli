
const { parseArgs } = require("node:util");
const readline = require("readline/promises");
const chalk = require("chalk");

const { searchBooks } = require("./api");
const { saveBook, listBooks, removeBook } = require("./storage");

function showHelp() {
    console.log(chalk.blue.bold("\nBookCLI - Book Finder and Reading List"));

    console.log("\nCommands:");
    console.log("  bookcli search <title>  Search for books");
    console.log("  bookcli save <title>    Search and save a book");
    console.log("  bookcli list            View saved books");
    console.log("  bookcli remove <id>     Remove a saved book");
    console.log("  bookcli help            Show help");

    console.log("\nOptions:");
    console.log("  --limit, -l <number>    Limit displayed search results (1-20)");
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
        switch (command) {
            case "search": {
                const parsed = parseArgs({
                    args: args.slice(1),
                    options: {
                        limit: {
                            type: "string",
                            short: "l"
                        },
                        help: {
                            type: "boolean"
                        }
                    },
                    allowPositionals: true,
                    strict: true
                });

                if (parsed.values.help) {
                    showHelp();
                    return;
                }

                const title = parsed.positionals.join(" ").trim();
                const limit = Number(parsed.values.limit || 10);

                if (!title) {
                    throw new Error("Please provide a book title to search.");
                }

                if (!Number.isInteger(limit) || limit < 1 || limit > 20) {
                    throw new Error("Limit must be a number between 1 and 20.");
                }

                console.log(chalk.blue(`\nSearching for "${title}"...\n`));

                const books = await searchBooks(title);
                const results = books.slice(0, limit);

                if (results.length === 0) {
                    console.log(chalk.yellow("No books found."));
                    return;
                }

                console.log(chalk.green.bold("Search Results:\n"));

                results.forEach((book, index) => {
                    console.log(chalk.green(`${index + 1}. ${book.title}`));
                    console.log(`   Author: ${book.author}`);
                    console.log(`   Year: ${book.year}`);
                    console.log(`   ID: ${book.key}\n`);
                });

                break;
            }

            case "save": {
                const query = args.slice(1).join(" ").trim();

                if (!query) {
                    throw new Error("Please provide a book title to search.");
                }

                console.log(chalk.blue(`\nSearching for "${query}"...\n`));

                const books = await searchBooks(query);

                if (books.length === 0) {
                    console.log(chalk.yellow("No books found."));
                    return;
                }

                console.log(chalk.green.bold("Choose a book to save:\n"));

                books.forEach((book, index) => {
                    console.log(`${index + 1}. ${book.title}`);
                    console.log(`   Author: ${book.author}`);
                    console.log(`   Year: ${book.year}\n`);
                });

                const rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout
                });

                try {
                    const answer = await rl.question(
                        "Enter the number of the book to save: "
                    );

                    const choice = Number(answer);

                    if (
                        !Number.isInteger(choice) ||
                        choice < 1 ||
                        choice > books.length
                    ) {
                        throw new Error("Invalid book selection.");
                    }

                    const savedBook = saveBook(books[choice - 1]);

                    console.log(
                        chalk.green(`\n"${savedBook.title}" saved successfully!`)
                    );
                } finally {
                    rl.close();
                }

                break;
            }

            case "list": {
                const books = listBooks();

                if (books.length === 0) {
                    console.log(chalk.yellow("\nYour reading list is empty."));
                    return;
                }

                console.log(chalk.blue.bold("\nYour Reading List:\n"));

                books.forEach((book, index) => {
                    console.log(chalk.green(`${index + 1}. ${book.title}`));
                    console.log(`   Author: ${book.author}`);
                    console.log(`   Year: ${book.year}`);
                    console.log(`   ISBN: ${book.isbn || "Unavailable"}`);
                    console.log(`   ID: ${book.key || "Unavailable"}\n`);
                });

                break;
            }

            case "remove": {
                const identifier = args.slice(1).join(" ").trim();

                if (!identifier) {
                    throw new Error(
                        "Please provide the book's ISBN, ID, or exact title."
                    );
                }

                const removed = removeBook(identifier);

                if (removed) {
                    console.log(chalk.green("\nBook removed successfully!"));
                } else {
                    console.log(chalk.yellow("\nBook not found in your reading list."));
                }

                break;
            }

            default:
                throw new Error(
                    `Unknown command: ${command}. Run "bookcli help" to see available commands.`
                );
        }
    } catch (error) {
        console.error(chalk.red(`\nError: ${error.message}`));
        process.exitCode = 1;
    }
}

module.exports = { runCommand };
