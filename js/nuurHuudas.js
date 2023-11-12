// Хэмнэлт өндөртэй номнууд
const leftArrow = document.getElementById('saving-book-arrow-left');
const rightArrow = document.getElementById('saving-book-arrow-right');
const bookContainers = document.querySelectorAll('.book-container-saving');
let currentPosition = 0;
const totalContainers = bookContainers.length;





function showDivs() {
    bookContainers.forEach((container, index) => {
        if (index !== currentPosition) {
            container.style.display = 'none';             
        } else {
            container.style.display = 'flex';
            
        }
    });
}



showDivs(); 
 

leftArrow.addEventListener('click', () => {
    navigateBookContainers(-1);
});

rightArrow.addEventListener('click', () => {
    navigateBookContainers(1);
});



function navigateBookContainers(direction) {
bookContainers[currentPosition].style.opacity = 0;
setTimeout(() => {bookContainers[currentPosition].style.display = 'none';
currentPosition = (currentPosition + direction + totalContainers) % totalContainers;

bookContainers[currentPosition].style.display = 'flex'; // Show next container
bookContainers[currentPosition].style.opacity = 0; // Set opacity to 0 for fade-in
setTimeout(() => {bookContainers[currentPosition].style.opacity = 1;}, 50);}, 250);
}

// Өндөр үнэлгээтэй номнууд
const leftArrowHR = document.getElementById('high-rate-books-arrow-left');
const rightArrowHR = document.getElementById('high-rate-books-arrow-right');
const bookContainersHR = document.querySelectorAll('.book-container-high-rate');
let currentPositionHR = 0;
const totalContainersHR = bookContainersHR.length;

function showDivsHR() {
bookContainersHR.forEach((container, index) => {
    if (index !== currentPositionHR) {
        container.style.display = 'none';             
    } else {
        container.style.display = 'flex';
        
    }
});
}

showDivsHR();

leftArrowHR.addEventListener('click', () => {
navigateBookContainersHR(-1);
});

rightArrowHR.addEventListener('click', () => {
navigateBookContainersHR(1);
});

function navigateBookContainersHR(directionHR) {
bookContainersHR[currentPositionHR].style.opacity = 0;
setTimeout(() => {bookContainersHR[currentPositionHR].style.display = 'none';
currentPositionHR = (currentPositionHR + directionHR + totalContainersHR) % totalContainersHR;

bookContainersHR[currentPositionHR].style.display = 'flex'; // Show next container
bookContainersHR[currentPositionHR].style.opacity = 0; // Set opacity to 0 for fade-in
setTimeout(() => {bookContainersHR[currentPositionHR].style.opacity = 1;}, 50);}, 250);
}




const leftArrowNew = document.getElementById('new-books-arrow-left');
const rightArrowNew = document.getElementById('new-books-arrow-right');
const bookContainersNew = document.querySelectorAll('.book-container-new');
let currentPositionNew = 0;
const totalContainersNew = bookContainersNew.length;

function showDivsNew() {
bookContainersNew.forEach((container, index) => {
    if (index !== currentPositionNew) {
        container.style.display = 'none';             
    } else {
        container.style.display = 'flex';
        
    }
});
}

showDivsNew();

leftArrowNew.addEventListener('click', () => {
navigateBookContainersNew(-1);
});

rightArrowNew.addEventListener('click', () => {
navigateBookContainersNew(1);
});

function navigateBookContainersNew(directionNew) {
bookContainersNew[currentPositionNew].style.opacity = 0;
setTimeout(() => {bookContainersNew[currentPositionNew].style.display = 'none';
currentPositionNew = (currentPositionNew + directionNew + totalContainersNew) % totalContainersNew;

bookContainersNew[currentPositionNew].style.display = 'flex'; // Show next container
bookContainersNew[currentPositionNew].style.opacity = 0; // Set opacity to 0 for fade-in
setTimeout(() => {bookContainersNew[currentPositionNew].style.opacity = 1;}, 50);}, 250);
}

const searchBar = document.getElementById('searchbar');
const searchPopOut = document.querySelector('.search-pop-out');

let shouldRemain = false;

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