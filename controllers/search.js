
class SearchController {
    constructor(model, search) {
        this.model = model;
        this.search = search;
        this.search.bindSearchButton(this.handleSearch.bind(this));
    }

    async handleSearch(query) {
        await this.model.searchBooks(query);
        this.search.renderSearchResults(this.model.books);
    }
}

const searchController = new SearchController(bookModel, searchView);

document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-input').value.trim();
    searchController.handleSearch(query);
});
