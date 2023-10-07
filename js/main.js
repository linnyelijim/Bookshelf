document.addEventListener("DOMContentLoaded", function () {
    const bookModel = new BookModel();
    const bookView = new BookView();
    const bookController = new BookController(bookModel, bookView);

    bookView.bindSearchButton(bookController.handleSearch.bind(bookController));
});