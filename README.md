
# BookCLI

A command-line book finder and personal reading list manager built with Node.js and the Open Library API.

## Features

- Search for books using the Open Library API.
- View book titles, authors and publication years.
- Save books to a personal reading list.
- Display all saved books.
- Remove books from the reading list.
- Store saved books locally in JSON format.

## Technologies

- Node.js
- JavaScript
- Open Library API
- JSON file storage
- Chalk

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/emerancehimbazwe/book-cli.git
   ```

2. Enter the project folder:

   ```bash
   cd book-cli
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

Search for books:

```bash
npm start -- search "Harry Potter"
```

Search and save a book:

```bash
npm start -- save "Things Fall Apart"
```

View your reading list:

```bash
npm start -- list
```

Remove a book:

```bash
npm start -- remove "Things Fall Apart"
```

Display available commands:

```bash
npm start
```

## Data Storage

Saved books are stored locally in:

`data/books.json`

## API

Book information is retrieved from the Open Library Search API:

https://openlibrary.org/search.json

## Contributors

- Emerance Himbazwe
- Thressy Ange Isimbi Sebera

## License

MIT License
