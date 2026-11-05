
const API_URL = "https://openlibrary.org/search.json";

/**
 * Search for books using the Open Library API.
 * @param {string} query - Book title or keyword.
 * @returns {Promise<Array>} Matching books.
 */
async function searchBooks(query) {
    if (!query || !query.trim()) {
        throw new Error("Please enter a book title or keyword.");
    }

    const params = new URLSearchParams({
        q: query.trim(),
        limit: "10"
    });

    const response = await fetch(`${API_URL}?${params}`);

    if (!response.ok) {
        throw new Error(`Open Library API error: ${response.status}`);
    }

    const data = await response.json();

    return data.docs.map(book => ({
        title: book.title || "Unknown title",
        author: book.author_name?.[0] || "Unknown author",
        year: book.first_publish_year || "Unknown year",
        isbn: book.isbn?.[0] || null,
        key: book.key
    }));
}

module.exports = { searchBooks };
