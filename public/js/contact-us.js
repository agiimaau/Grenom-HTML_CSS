function toggleContent(element) {
    var paragraph = element.nextElementSibling;
    element.classList.toggle('active');
    paragraph.classList.toggle('active');
}





const searchBar = document.getElementById('searchbar');
const searchPopOut = document.querySelector('.search-pop-out');

let shouldRemain = false;

// Hide the search pop-out initially
searchPopOut.style.display = 'none';

searchBar.addEventListener('click', function(event) {
    shouldRemain = true;
    searchPopOut.style.display = 'block';
    event.stopPropagation(); // prevent the click event from reaching the document click handler
});

searchPopOut.addEventListener('click', function(event) {
    shouldRemain = true;
    event.stopPropagation();
});

document.addEventListener('click', function(event) {
    if (!searchPopOut.contains(event.target) && !shouldRemain) {
        searchPopOut.style.display = 'none';
    }
    shouldRemain = false;
});
