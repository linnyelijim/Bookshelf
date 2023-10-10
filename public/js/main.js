/* document.addEventListener("DOMContentLoaded", function () {
    const bookModel = new BookModel();
    const bookView = new BookView();
    const bookController = new BookController(bookModel, bookView);

    // Bind search button click event
    bookView.bindSearchButton(bookController.handleSearch.bind(bookController));

    // Handle navigation links (Search and List)
    const searchLink = document.getElementById('search-link');
    const listLink = document.getElementById('list-link');

    searchLink.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        loadView('templates/search.html');
    });

    listLink.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        loadView('templates/list.html');
    });

    function loadView(viewPath) {
        fetch(viewPath)
            .then(response => response.text())
            .then(data => {
                bookView.clear(); // Clear any existing content
                bookView.render(data); // Render the new view
            })
            .catch(error => {
                console.error('Error loading view:', error);
            });
    }

    function performSearch(query) {
        // Clear any existing search results
        bookView.clearSearchResults();

        // Fetch search results from the Google Books API
        bookModel.searchBooks(query)
            .then(results => {
                // Render each book as a card
                results.forEach(book => {
                    const cardHtml = createBookCard(book);
                    bookView.renderSearchResult(cardHtml);
                });
            })
            .catch(error => {
                console.error('Error fetching search results:', error);
            });
    }

    // Create a book card HTML structure
    function createBookCard(book) {
        return `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${book.image}" class="card-img-top" alt="Book Cover">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">Author: ${book.author}</p>
                        <p class="card-text">Published Date: ${book.publishedDate}</p>
                        <p class="card-text">Description: ${book.description}</p>
                        <p class="card-text">Volume Number: ${book.volumeNumber}</p>
                        <button class="btn btn-primary" id="add-to-library">Add to Library</button>
                    </div>
                </div>
            </div>
        `;
    }

    // Handle search button click event
    function handleSearchButtonClick() {
        const searchInput = document.getElementById('search-input');
        const query = searchInput.value.trim();

        if (query !== '') {
            performSearch(query);
        }
    }

    // Bind the search button click event
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', handleSearchButtonClick);
});
 */