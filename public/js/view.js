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

    createBookCard(book) {
        const title = book.title || 'Title not available';
        const authors = book.author_name || ['Author not available'];
        const mediumCoverUrl = book.cover_i ? `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : `../css/images/placeholder.jpg`;

        const rating = book.ratings_average ? `${book.ratings_average.toFixed(1)}/5 Rating` : 'No Rating';
        const pageCount = book.number_of_pages_median || 'Page count not available';
        const publishedDate = book.first_publish_year || 'Publication year not available';
        const isbn = book.isbn ? book.isbn[0] : 'ISBN not available';
        const description = book.first_sentence ? book.first_sentence.join(' ') : 'Description not available';
        const card = document.createElement('div');
        card.classList.add('book-card', 'card');
        card.innerHTML = `
                    <div class="bookcover bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                        <img src="${mediumCoverUrl}" class="img-fluid" />
                    </div>
                    <div class="card-body text-center">
                        <h4 class="card-title">${title}</h4>
                        <h5 class="list-group-item">${authors.join(', ')}</h5>
                        <a href="#!" class="btn btn-primary add-to-library" data-isbn="${isbn}">Add to Library</a>
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
                                <h4 class="card-author text-center">${authors.join(', ')}</h4>
                                <hr>
                                <h5 class="card-rating">${rating}</h5>
                                <p class="card-text">${description}...</p>
                                <br><br>
                                <ul class="list-group list-group-flush text-center">
                                    <li class="list-group-item">Pages: ${pageCount}</li>
                                    <li class="list-group-item">Published: ${publishedDate}</li>
                                    <li class="list-group-item">ISBN Number: ${isbn}</li>
                                </ul>
                                <a href="#!" class="btn btn-primary add-to-library" data-isbn="${isbn}">Add to Library</a>
                            </div>
                        `;

            // Show the modal
            modal.style.display = 'flex';

            // Close the modal when the "x" button is clicked
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

        books.forEach((book, index) => {
            if (index % 4 === 0 && index > 0) {
                // Start a new row for every 4 cards
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

        // Append any remaining cards in the current row
        this.searchResults.appendChild(currentRow);
    }


    /* addToToBeReadList(isbn, title, rating, description, authors, pageCount, publishedDate, coverUrl) {
        const toBeReadList = document.querySelector('.to-be-read .author-list');
        const bookCard = document.createElement('div');
        bookCard.classList.add('col-12', 'col-md-4', 'mb-4');
        bookCard.innerHTML = `
        <div class="card">
        <img src="${coverUrl}" class="card-img-top" alt="Book Cover">
        <div class="card-body">
            <h4 class="card-title">${title}</h4>
            <h6 class="card-rating">${rating}</h6>
            <p class="card-text">${description.substring(0, 200)}... 
                <span class="see-more" onclick="toggleDescription(this, ${JSON.stringify(book)})">See More</span>
            </p>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Author: ${authors.join(', ')}</li> 
            <li class="list-group-item">Pages: ${pageCount}</li>
            <li class="list-group-item">Published: ${publishedDate}</li>
            <li class="list-group-item">ISBN Number: ${isbn}</li>
        </ul>
        <div>
        `;

        toBeReadList.appendChild(bookCard);
    }
}

function showNextPage() {
    let currentPage = 1; // Initialize the currentPage variable outside the function
    const resultsPerPage = 40;
    const cards = document.querySelectorAll('.card');

    document.getElementById('next-page-button').addEventListener('click', function () {
        for (let i = (currentPage * resultsPerPage); i < ((currentPage + 1) * resultsPerPage); i++) {
            if (cards[i]) {
                cards[i].style.display = 'block';
            }
        }
        currentPage++;
    });
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
document.getElementById('next-page-button').addEventListener('click', showNextPage); */
}
const bookView = new BookView();