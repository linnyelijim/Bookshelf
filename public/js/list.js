class ListView {
    constructor() {
        this.searchInput = document.getElementById('search-input');
        this.searchButton = document.getElementById('search-button');
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
    async createBookCard(entry) {
        const workId = entry.key.replace('/works/', '');
        const book = `https://openlibrary.org/works/${workId}.json`;

        console.log('Book object:', book);
        const title = book.title || 'Title not available';
        const authors = book.author_name ? book.author_name.join(', ') : 'Author not available';
        const smallCoverUrl = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg` : `../css/images/placeholder.jpg`;
        const rating = book.ratings_average ? `${book.ratings_average.toFixed(1)}/5 Rating` : 'No Rating';
        const pageCount = book.number_of_pages_median || 'Page count not available';
        const publishedDate = book.first_publish_year || 'Publication year not available';
        const isbn = book.isbn ? book.isbn[0] : 'ISBN not available';
        const description = await bookModel.getBookDescription(book);
        const card = document.createElement('div');
        card.classList.add('book-list-card');
        const front = document.createElement('div');
        front.classList.add('front-card', 'front');
        front.innerHTML = `
                    <div class="frontcover bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                        <img src="${smallCoverUrl}" class="img-fluid" />
                    </div>
                    <div class="front-body text-center">
                        <h5 class="card-title">${title}</h5>
                        <h6 class="author">${authors}</h6>
                    </div>
                `;


        const back = document.createElement('div');
        back.classList.add('back-card', 'back');
        back.innerHTML = `
                <div class="back-details">
                    <div class="row">
                        <h5 class="card-rating col-md-6">${rating}</h5>
                        <h5 class="page-count col-md-6">Pages: ${pageCount}</h5>
                    </div>
                    <br>
                    <p class="description">${description}</p>
                    <br>
                    <div class="row">                                    
                        <a class="published-date col-md-6">Published: ${publishedDate}</a>
                        <a class="isbn col-md-6">ISBN Number: ${isbn}</a>
                    </div>
                </div>
            `;

        front.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });

        back.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });

        card.appendChild(back);

        return card;
    }
    renderList(listId, listFunction) {
        const listContainer = document.getElementById(listId);
        listFunction()
            .then((books) => {
                if (books.length === 0) {
                    listContainer.innerHTML = 'No books in this list.';
                    return;
                }
                listContainer.innerHTML = '';
                books.forEach(async (book) => {
                    const card = await this.createBookCard(book);
                    listContainer.appendChild(card);
                });
            })
            .catch((error) => {
                console.error('Error fetching list:', error);
            });
    }

    renderListResults() {
        this.renderList("to-be-read-list", () => bookModel.getToBeRead());
        this.renderList("currently-reading-list", () => bookModel.getCurrentlyReading());
        this.renderList("already-read-list", () => bookModel.getReadBooks());
    }
}
const listView = new ListView();

document.addEventListener("DOMContentLoaded", function () {
    listView.renderListResults();
});