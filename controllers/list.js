class ListController {
    constructor(model, list) {
        this.model = model;
        this.list = list;
        this.list.bindSearchButton(this.handleSearch.bind(this));
    }

    async handleSearch(query) {
        await this.model.searchBooks(query);
        this.list.renderSearchResults(this.model.books);
    }
}

const listController = new ListController(bookModel, listView);