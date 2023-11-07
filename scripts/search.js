class SearchView {
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
        this.searchInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                const query = this.searchInput.value.trim();
                handler(query);
            }
        });
    }
    async description(book) {
        const description = await bookModel.getBookDescription(book);
        return description;
    }
    async createBookCard(book) {
        console.log('Book object:', book);
        const title = book.title || 'Title not available';
        const authors = book.author_name ? book.author_name.join(', ') : 'Author not available';
        const mediumCoverUrl = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : `../content/images/placeholder.jpg`;
        const rating = book.ratings_average ? `${book.ratings_average.toFixed(1)}/5 Rating` : 'No Rating';
        const pageCount = book.number_of_pages_median || 'Page count not available';
        const publishedDate = book.first_publish_year || 'Publication year not available';
        const isbn = book.isbn ? book.isbn[0] : 'ISBN not available';
        const description = await this.description(book);
        const card = document.createElement('div');
        card.classList.add('book-card', 'card');
        card.innerHTML = `
                    <div class="bookcover bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                        <img src="${mediumCoverUrl}" class="img-fluid" />
                    </div>
                    <div class="card-body text-center">
                        <h4 class="card-title">${title}</h4>
                        <h5 class="list-group-item">${authors}</h5>
                        <div class="modal-footer mt-4 justify-content-center">
                            <form action="list.html" method="post">
                                <input type="hidden" name="action" value="add-to-library">
                                <button type="submit" class="btn btn-primary add-to-library" data-isbn="${isbn}">Add to Library</button>
                            </form>   
                        </div>                 
                    </div>
                `;


        card.addEventListener('click', () => {
            const modal = document.getElementById('modal');
            const modalContent = document.querySelector('.modal-content');
            const largeCoverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` || '../content/images/placeholder.jpg';

            modalContent.innerHTML = `
                            <span class="close" id="closeModal">&times;</span>
                            <div class="modal-cover">
                                <img src="${largeCoverUrl}" class="img-fluid" />
                            </div>
                            <div class="modal-details">
                                <h2 class="card-title text-center">${title}</h2>
                                <h4 class="card-author text-center">${authors}</h4>
                                <hr>
                                <h5 class="card-rating">${rating}</h5>
                                <p class="card-text">${description}...</p>
                                <br><br>
                                <ul class="list-group list-group-flush text-center">
                                    <li class="list-group-item">Pages: ${pageCount}</li>
                                    <li class="list-group-item">Published: ${publishedDate}</li>
                                    <li class="list-group-item">ISBN Number: ${isbn}</li>
                                </ul>
                                <div class="modal-footer mt-4 justify-content-center">
                                    <form action="list.html" method="post">
                                        <input type="hidden" name="action" value="add-to-library">
                                        <input type="hidden" name="isbn" value="${isbn}">
                                        <button type="submit" class="btn btn-primary add-to-library" data-isbn="${isbn}">Add to Library</button>
                                    </form>   
                                </div>  
                            </div>
                        `;

            modal.style.display = 'flex';

            const closeModalButton = document.getElementById('closeModal');
            closeModalButton.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        });

        const addToLibraryButton = card.querySelector('.add-to-library');
        addToLibraryButton.addEventListener('click', () => {
            const selectedISBN = addToLibraryButton.getAttribute('data-isbn');
            this.addToToBeReadList(selectedISBN);
        });
        return card;
    }

    renderSearchResults(books) {
        this.searchResults.innerHTML = '';

        if (!books || books.length === 0) {
            this.searchResults.textContent = 'No results found.';
            return;
        }
        const currentRow = document.createElement('div');
        currentRow.classList.add('row');

        books.forEach(async (book, index) => {
            if (index % 4 === 0 && index > 0) {
                this.searchResults.appendChild(currentRow);
                currentRow.classList.add('row');
            }

            const card = await this.createBookCard(book);
            const col = document.createElement('div');
            col.classList.add('col-lg-3', 'col-md-6', 'mb-5');
            col.appendChild(card);
            currentRow.appendChild(col);
        });

        this.searchResults.appendChild(currentRow);
    }
}
const searchView = new SearchView();
