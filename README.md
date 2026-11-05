
# BookCLI

BookCLI is a Node.js command-line application for searching books using the Open Library API and managing a personal reading list.

## Features

- Search for books by title or keyword.
- Limit the number of displayed search results.
- View book titles, authors, and publication years.
- Save selected books to a personal reading list.
- View all saved books.
- Remove books using their ISBN, Open Library ID, or exact title.
- Store saved books locally in a JSON file.
- Display colored terminal messages and helpful error messages.
- Validate command-line arguments.

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

Link the CLI command globally:

```bash
npm link
```

On Windows PowerShell, use `bookcli.cmd` if the `bookcli` command is blocked by script execution policy.

## Usage

### Display help

```bash
bookcli help
```

### Search for books

```bash
bookcli search harry potter
```

### Limit search results

```bash
bookcli search --limit 5 harry potter
```

You can also use the short option:

```bash
bookcli search -l 5 harry potter
```

### Save a book

Search by title and select a book from the displayed results:

```bash
bookcli save harry potter
```

### View your reading list

```bash
bookcli list
```

### Remove a saved book

Use the book's ISBN, Open Library ID, or exact title:

```bash
bookcli remove "Harry Potter"
```

## Technologies

- Node.js
- JavaScript
- Open Library Search API
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
├── package-lock.json
├── README.md
└── .gitignore
```

## API

BookCLI retrieves book information using the Open Library Search API:

https://openlibrary.org/search.json

Open Library API documentation:

https://openlibrary.org/developers/api

## Data Storage

Saved books are stored locally in:

`data/books.json`

## Contributors

- Emerance Himbazwe
- Thressy Ange Isimbi Sebera

## License

MIT License
