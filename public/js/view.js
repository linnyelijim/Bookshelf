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

        const resultsContainer = document.getElementById('search-results');
        resultsContainer.innerHTML = '';

        books.forEach(book => {
            const card = this.createBookCard(book);
            resultsContainer.appendChild(card);
        });
    }

    createBookCard(book) {
        const rating = book.volumeInfo.averageRating == undefined ? "No Rating" : `${book.volumeInfo.averageRating}/10 Rating`;
        const card = document.createElement('div');
        card.classList.add('col-12', 'col-md-4', 'mb-4');
        card.innerHTML = `
            <div class="card">
                    <img src="${book.volumeInfo.imageLinks.thumbnail}" class="card-img-top" alt="Book Cover">
                    <div class="card-body">
                        <h4 class="card-title">${book.volumeInfo.title}</h4>
                        <h6 class="card-rating">${rating}</h6>
                        <p class="card-text">${book.volumeInfo.description.substring(0, 200)}... 
                            <span class="see-more" onclick="toggleDescription(this, ${JSON.stringify(book)})">See More</span>
                        </p>
                    </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Author: ${book.volumeInfo.authors.join(', ')}</li> 
                    <li class="list-group-item">Pages: ${book.volumeInfo.pageCount}</li>
                    <li class="list-group-item">Published: ${book.volumeInfo.publishedDate}</li>
                    <li class="list-group-item">ISBN Number: ${book.volumeInfo.industryIdentifiers.find(identifier => identifier.type === "ISBN_13").identifier}</li>
                </ul>
                <div class="card-body">
                    <a href="#" class="btn btn-primary">Add to Library</a>
                </div>
            </div>
        `;
        return card;
    }
}
function toggleDescription(button, book) {
    const card = button.closest('.card');
    const description = card.querySelector('.card-text');
    const seeMore = card.querySelector('.see-more');

    if (description.classList.contains('expanded')) {
        description.classList.remove('expanded');
        description.innerHTML = `${book.volumeInfo.description.substring(0, 200)}... <span class="see-more" onclick="toggleDescription(this, ${JSON.stringify(book)})">See More</span>`;
    } else {
        description.classList.add('expanded');
        description.innerHTML = `${book.volumeInfo.description} <span class="see-more" onclick="toggleDescription(this, ${JSON.stringify(book)})">See Less</span>`;
    }
}

const bookView = new BookView();