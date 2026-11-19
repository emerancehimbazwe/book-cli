
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
## Usage

Start BookCLI using:

```bash
npm start
```

Once the application starts, the interactive command-line interface allows you to manage your book searches and personal reading list without restarting the program.

### Available Commands

| Command | Description |
|---|---|
| `search <book title>` | Search for books by title. |
| `save <book title>` | Search for a book and select a result to save. |
| `list` | Display all saved books. |
| `remove` | Remove a saved book from your reading list. |
| `help` | Display available commands and instructions. |
| `exit` | Exit the application. |

### Example Session

**1. Start the application**

```bash
npm start
```

**2. Search for books**

```text
BookCLI > search harry potter
```

Example search results:

| Number | Title | Author |
|---|---|---|
| 1 | Harry Potter and the Philosopher's Stone | J.K. Rowling |
| 2 | Harry Potter and the Chamber of Secrets | J.K. Rowling |

**3. Save a book**

```text
BookCLI > save harry potter
```

Select a book from the search results:

```text
Enter the number of the book to save: 1

Book saved successfully!
```

**4. View your reading list**

```text
BookCLI > list
```

**5. Remove a book**

```text
BookCLI > remove
```

Follow the application's instructions to select the book you want to remove.

**6. View available commands**

```text
BookCLI > help
```

**7. Exit the application**

```text
BookCLI > exit

Goodbye!
```

### Interactive Experience

BookCLI supports multiple commands within a single session. Users can search for books, save selected results, view their reading lists, remove saved books, and access help without restarting the application.
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
