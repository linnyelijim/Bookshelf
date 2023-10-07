class BookModel {
    constructor() {
        this.books = [];
    }

    async searchBooks(query) {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
        const data = await response.json();
        this.books = data.items || [];
    }
}

const bookModel = new BookModel();