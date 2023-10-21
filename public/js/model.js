class BookModel {
    constructor() {
        this.books = [];
    }

    async searchBooks(query) {
        const response = await fetch(`http://openlibrary.org/search.json?q=${query}`);
        const data = await response.json();
        this.books = data.docs || [];
    }
    async getBookDescription(book) {
        let description = 'Description not available';

        if (book.key) {
            const workId = book.key.replace('/works/', '');
            const descriptionUrl = `https://openlibrary.org/works/${workId}.json`;

            try {
                const response = await fetch(descriptionUrl);
                const data = await response.json();

                if (data.description) {
                    description = data.description.value || 'Description not available';
                }
            } catch (error) {
                console.error('Error fetching description:', error);
            }
        }
        return description;
    }
    async getBookByISBN(isbn) {
        const book = this.books.find(book => book.isbn && book.isbn.includes(isbn));

        if (book) {
            const title = book.title || 'Title not available';
            const authors = book.author_name ? book.author_name.join(', ') : 'Author not available';
            const smallCoverUrl = book.cover_i ? `http://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg` : `../css/images/placeholder.jpg`;
            const rating = book.ratings_average ? `${book.ratings_average.toFixed(1)}/5 Rating` : 'No Rating';
            const description = await this.getBookDescription(book);
            const pageCount = book.number_of_pages_median || 'Page count not available';
            const publishedDate = book.first_publish_year || 'Publication year not available';
            const isbn10 = isbn || 'ISBN not available';

            return {
                title,
                authors,
                smallCoverUrl,
                rating,
                description,
                pageCount,
                publishedDate,
                isbn10
            };
        } else {
            return {
                title: 'Title not available',
            };
        }
    }
    async getCurrentlyReading() {
        try {
            const response = await fetch('http://openlibrary.org/people/lindsey_jimenez/books/currently-reading.json');
            const data = await response.json();
            return data.entries || [];
        } catch (error) {
            console.error('Error fetching "To Be Read" list:', error);
            return [];
        }
    }

    async getToBeRead() {
        try {
            const response = await fetch('http://openlibrary.org/people/lindsey_jimenez/books/want-to-read.json');
            const data = await response.json();
            return data.entries || [];
        } catch (error) {
            console.error('Error fetching "To Be Read" list:', error);
            return [];
        }
    }
    async getReadBooks() {
        try {
            const response = await fetch('http://openlibrary.org/people/lindsey_jimenez/books/already-read.json');
            const data = await response.json();
            return data.entries || [];
        } catch (error) {
            console.error('Error fetching "To Be Read" list:', error);
            return [];
        }
    }
}

const bookModel = new BookModel();
