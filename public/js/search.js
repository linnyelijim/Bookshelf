document.getElementById('next-page-button').addEventListener('click', showNextPage);
let currentPage = 1;
const resultsPerPage = 40;

function showNextPage() {
    const cards = document.querySelectorAll('.card');

    for (let i = (currentPage * resultsPerPage); i < ((currentPage + 1) * resultsPerPage); i++) {
        if (cards[i]) {
            cards[i].style.display = 'block';
        }
    }
    currentPage++;
}
showNextPage();