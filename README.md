# BookCLI

BookCLI is a Node.js command-line application for searching books using the Open Library API and managing a personal reading list.

## Features

- Search for books by title.
- Limit the number of search results.
- Save books to a reading list.
- View saved books.
- Remove books from the reading list.
- Store saved books locally in a JSON file.
- Display colored messages and helpful error messages.

## Requirements

- Node.js
- npm

## Installation

Clone the repository:

```bash
git clone https://github.com/emerancehimbazwe/book-cli.git
cd book-cli
```

Install dependencies:

```bash
npm install
```

Link the CLI command:

```bash
npm link
```

## Usage

Display help:

```bash
bookcli help
```

Search for books:

```bash
bookcli search harry potter
```

Limit search results:

```bash
bookcli search --limit 5 harry potter
```

Save a book using its ID:

```bash
bookcli save BOOK_ID
```

View your reading list:

```bash
bookcli list
```

Remove a saved book:

```bash
bookcli remove BOOK_ID
```

On Windows PowerShell, use `bookcli.cmd` if the `bookcli` command is blocked by script execution policy.

## Technologies

- Node.js
- JavaScript
- Open Library API
- JSON file storage
- Chalk for colored terminal output
- Node.js `util.parseArgs` for command-line argument parsing

## Project Structure

```text
book-cli/
├── bin/
│   └── bookcli.js
├── src/
│   ├── api.js
│   ├── commands.js
│   └── storage.js
├── data/
│   └── books.json
├── package.json
├── README.md
└── .gitignore
```

## API

BookCLI uses the Open Library API to retrieve book information.

https://openlibrary.org/developers/api

## Team

BookCLI is a collaborative Node.js CLI project.