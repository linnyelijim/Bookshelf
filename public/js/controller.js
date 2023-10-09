class BookController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Bind event handlers
        this.view.bindSearchButton(this.handleSearch.bind(this));
    }

    async handleSearch(query) {
        await this.model.searchBooks(query);
        this.view.renderSearchResults(this.model.books);
    }
}

const bookController = new BookController(bookModel, bookView);