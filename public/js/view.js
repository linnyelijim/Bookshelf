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
        this.searchInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                const query = this.searchInput.value.trim();
                handler(query);
            }
        });
    }
    description(book) {
        const description = bookModel.getBookDescription(book);
        return description;
    }
    createBookCard(book) {
        console.log('Book object:', book);
        const title = book.title || 'Title not available';
        const authors = book.author_name ? book.author_name.join(', ') : 'Author not available';
        const mediumCoverUrl = book.cover_i ? `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : `../css/images/placeholder.jpg`;
        const rating = book.ratings_average ? `${book.ratings_average.toFixed(1)}/5 Rating` : 'No Rating';
        const pageCount = book.number_of_pages_median || 'Page count not available';
        const publishedDate = book.first_publish_year || 'Publication year not available';
        const isbn = book.isbn ? book.isbn[0] : 'ISBN not available';
        console.log('description start');
        const description = this.description(book);
        console.log('description end');
        const card = document.createElement('div');
        card.classList.add('book-card', 'card');
        card.innerHTML = `
                    <div class="bookcover bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                        <img src="${mediumCoverUrl}" class="img-fluid" />
                    </div>
                    <div class="card-body text-center">
                        <h4 class="card-title">${title}</h4>
                        <h5 class="list-group-item">${authors}</h5>
                        <form action="list.html" method="post">
                            <input type="hidden" name="action" value="add-to-library">
                            <input type="hidden" name="isbn" value="${isbn}">
                            <button type="submit" class="btn btn-primary add-to-library" data-isbn="${isbn}">Add to Library</button>
                        </form>                    
                    </div>
                `;


        card.addEventListener('click', () => {
            const modal = document.getElementById('modal');
            const modalContent = document.querySelector('.modal-content');
            const largeCoverUrl = `http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` || '../css/images/placeholder.jpg';

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
                                <form action="list.html" method="post">
                                    <input type="hidden" name="action" value="add-to-library">
                                    <input type="hidden" name="isbn" value="ISBN_OF_THE_BOOK">
                                    <button type="submit" class="btn btn-primary add-to-library" data-isbn="${isbn}">Add to Library</button>
                                </form>
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
        let currentRow = document.createElement('div');
        currentRow.classList.add('row');
        console.log('currentRow:', currentRow);
        console.log('searchResults:', this.searchResults);

        books.forEach((book, index) => {
            if (index % 4 === 0 && index > 0) {
                this.searchResults.appendChild(currentRow);
                currentRow = document.createElement('div');
                currentRow.classList.add('row');
            }

            const card = this.createBookCard(book);
            const col = document.createElement('div');
            col.classList.add('col-lg-3', 'col-md-6', 'mb-4');
            col.appendChild(card);
            currentRow.appendChild(col);
        });

        this.searchResults.appendChild(currentRow);
    }

    renderListResults() {
        renderList("to-be-read-list", () => bookModel.getToBeRead());
        renderList("currently-reading-list", () => bookModel.getCurrentlyReading());
        renderList("already-read-list", () => bookModel.getReadBooks());

        function renderList(listId, listFunction) {
            const listContainer = document.getElementById(listId);
            listFunction()
                .then((books) => {
                    if (books.length === 0) {
                        listContainer.innerHTML = 'No books in this list.';
                        return;
                    }
                    listContainer.innerHTML = '';
                    books.forEach((book) => {
                        const card = this.createBookCard(book); // Use 'this' to access createBookCard
                        listContainer.appendChild(card);
                    });
                })
                .catch((error) => {
                    console.error('Error fetching list:', error);
                });
        }
    }
}
const bookView = new BookView();

document.addEventListener("DOMContentLoaded", function () {
    bookView.renderListResults();
});

