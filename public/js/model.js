class BookModel {
    constructor() {
        this.books = [];
    }

    async searchBooks(query) {
        const response = await fetch(`http://openlibrary.org/search.json?q=${query}`);
        const data = await response.json();
        this.books = data.docs || [];
    }

    getBookDescription(bookIndex) {
        if (this.books[bookIndex] && this.books[bookIndex].first_sentence) {
            return this.books[bookIndex].first_sentence.join(' ');
        } else {
            return 'Description not available';
        }
    }
}

const bookModel = new BookModel();