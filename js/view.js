class BookView {
    constructor() {
        this.searchInput = document.getElementById('search-input');
        this.searchButton = document.getElementById('search-button');
        this.searchResults = document.getElementById('search-results');
    }

    bindSearchButton(handler) {
        this.searchButton.addEventListener('click', () => {
            const query = this.searchInput.value.trim();
            handler(query);
        });
    }

    renderSearchResults(books) {
        this.searchResults.innerHTML = '';

        if (!books || books.length === 0) {
            this.searchResults.textContent = 'No results found.';
            return;
        }

        const resultList = document.createElement('ul');

        books.forEach(book => {
            const bookItem = document.createElement('li');
            bookItem.textContent = book.volumeInfo.title;
            resultList.appendChild(bookItem);
        });

        this.searchResults.appendChild(resultList);
    }
}

const bookView = new BookView();