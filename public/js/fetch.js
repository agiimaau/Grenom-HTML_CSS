var URLbookname;
var URLcategory;
var URLrating;
let currentPage = 1;
const itemsPerPage = 8;
let allBooks = [];

document.addEventListener("DOMContentLoaded", function () {
    var queryParams = new URLSearchParams(window.location.search);

    URLbookname = queryParams.get('bookname');
    URLcategory = queryParams.get('catergory-lists');
    URLrating = queryParams.get('rating');

    if (URLbookname === null && URLcategory === null && URLrating === null) {
        fetchAndRenderBooksALL(1);
    } else {
        fetchAndRenderBooks(1);
        renderFilters();
    }
});



function fetchAndRenderBooks(page) {
    fetch("/bookdata")
        .then(response => response.json())
        .then(data => {
            const filteredBooks = data.filter(book => {
                const bookNameMatch = !URLbookname || book["bookname"].toLowerCase().includes(URLbookname.toLowerCase());
                const categoryMatch = !URLcategory || (book.category.map(cat => cat.toLowerCase()).includes(URLcategory.toLowerCase()));
                const wearMatch = isNaN(URLrating) || book.wear === +URLrating;
                
                return bookNameMatch && categoryMatch && wearMatch;
                
            });
            

            renderBooks(filteredBooks,page);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function fetchAndRenderBooksALL(page) {
    fetch("/bookdata")
        .then(response => response.json())
        .then(data => {
            renderBooks(data,page);
        })
        .catch(error => console.error('Error fetching data:', error));
}
function renderFilters(){
    const filter=document.getElementsByClassName("filter")[0];
    filter.innerHTML="";
    
    const article = document.createElement("div");
    article.className = "filter-names";
    article.innerHTML = `
    <h3>Категори:</h3>
                <button class="name-filter-btn" > <span>${URLbookname}</span>
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.0675 15.1832C16.1256 15.2412 16.1717 15.3102 16.2031 15.386C16.2345 15.4619 16.2507 15.5432 16.2507 15.6253C16.2507 15.7075 16.2345 15.7888 16.2031 15.8647C16.1717 15.9405 16.1256 16.0095 16.0675 16.0675C16.0095 16.1256 15.9405 16.1717 15.8647 16.2031C15.7888 16.2345 15.7075 16.2507 15.6253 16.2507C15.5432 16.2507 15.4619 16.2345 15.386 16.2031C15.3102 16.1717 15.2412 16.1256 15.1832 16.0675L10.0003 10.8839L4.81754 16.0675C4.70026 16.1848 4.5412 16.2507 4.37535 16.2507C4.2095 16.2507 4.05044 16.1848 3.93316 16.0675C3.81588 15.9503 3.75 15.7912 3.75 15.6253C3.75 15.4595 3.81588 15.3004 3.93316 15.1832L9.11675 10.0003L3.93316 4.81754C3.81588 4.70026 3.75 4.5412 3.75 4.37535C3.75 4.2095 3.81588 4.05044 3.93316 3.93316C4.05044 3.81588 4.2095 3.75 4.37535 3.75C4.5412 3.75 4.70026 3.81588 4.81754 3.93316L10.0003 9.11675L15.1832 3.93316C15.3004 3.81588 15.4595 3.75 15.6253 3.75C15.7912 3.75 15.9503 3.81588 16.0675 3.93316C16.1848 4.05044 16.2507 4.2095 16.2507 4.37535C16.2507 4.5412 16.1848 4.70026 16.0675 4.81754L10.8839 10.0003L16.0675 15.1832Z" fill="white"/>
                </svg>
                </button>
                <button class="category-filter-btn"> Категори: <span>${URLcategory}</span>
                    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.0675 15.1832C16.1256 15.2412 16.1717 15.3102 16.2031 15.386C16.2345 15.4619 16.2507 15.5432 16.2507 15.6253C16.2507 15.7075 16.2345 15.7888 16.2031 15.8647C16.1717 15.9405 16.1256 16.0095 16.0675 16.0675C16.0095 16.1256 15.9405 16.1717 15.8647 16.2031C15.7888 16.2345 15.7075 16.2507 15.6253 16.2507C15.5432 16.2507 15.4619 16.2345 15.386 16.2031C15.3102 16.1717 15.2412 16.1256 15.1832 16.0675L10.0003 10.8839L4.81754 16.0675C4.70026 16.1848 4.5412 16.2507 4.37535 16.2507C4.2095 16.2507 4.05044 16.1848 3.93316 16.0675C3.81588 15.9503 3.75 15.7912 3.75 15.6253C3.75 15.4595 3.81588 15.3004 3.93316 15.1832L9.11675 10.0003L3.93316 4.81754C3.81588 4.70026 3.75 4.5412 3.75 4.37535C3.75 4.2095 3.81588 4.05044 3.93316 3.93316C4.05044 3.81588 4.2095 3.75 4.37535 3.75C4.5412 3.75 4.70026 3.81588 4.81754 3.93316L10.0003 9.11675L15.1832 3.93316C15.3004 3.81588 15.4595 3.75 15.6253 3.75C15.7912 3.75 15.9503 3.81588 16.0675 3.93316C16.1848 4.05044 16.2507 4.2095 16.2507 4.37535C16.2507 4.5412 16.1848 4.70026 16.0675 4.81754L10.8839 10.0003L16.0675 15.1832Z" fill="white"/>
                    </svg>
                </button>
                <button class="condition-filter-btn" ">Эдэлгээ: <span>${URLrating}</span>
                    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.0675 15.1832C16.1256 15.2412 16.1717 15.3102 16.2031 15.386C16.2345 15.4619 16.2507 15.5432 16.2507 15.6253C16.2507 15.7075 16.2345 15.7888 16.2031 15.8647C16.1717 15.9405 16.1256 16.0095 16.0675 16.0675C16.0095 16.1256 15.9405 16.1717 15.8647 16.2031C15.7888 16.2345 15.7075 16.2507 15.6253 16.2507C15.5432 16.2507 15.4619 16.2345 15.386 16.2031C15.3102 16.1717 15.2412 16.1256 15.1832 16.0675L10.0003 10.8839L4.81754 16.0675C4.70026 16.1848 4.5412 16.2507 4.37535 16.2507C4.2095 16.2507 4.05044 16.1848 3.93316 16.0675C3.81588 15.9503 3.75 15.7912 3.75 15.6253C3.75 15.4595 3.81588 15.3004 3.93316 15.1832L9.11675 10.0003L3.93316 4.81754C3.81588 4.70026 3.75 4.5412 3.75 4.37535C3.75 4.2095 3.81588 4.05044 3.93316 3.93316C4.05044 3.81588 4.2095 3.75 4.37535 3.75C4.5412 3.75 4.70026 3.81588 4.81754 3.93316L10.0003 9.11675L15.1832 3.93316C15.3004 3.81588 15.4595 3.75 15.6253 3.75C15.7912 3.75 15.9503 3.81588 16.0675 3.93316C16.1848 4.05044 16.2507 4.2095 16.2507 4.37535C16.2507 4.5412 16.1848 4.70026 16.0675 4.81754L10.8839 10.0003L16.0675 15.1832Z" fill="white"/>
                    </svg>
                </button>
        `;
        filter.appendChild(article);
        const svgs = article.querySelectorAll('svg');
        svgs.forEach(svg => {
            svg.addEventListener('click', function(event) {
                let url = new URL(window.location);

                // Remove all filter-related query parameters
                url.searchParams.delete('bookname');
                url.searchParams.delete('catergory-lists');
                url.searchParams.delete('rating');
        
                // Update the browser's URL without reloading the page
                //window.history.pushState({}, '', url);
                //filter.innerHTML="";
                //fetchAndRenderBooksALL(1);
                window.location.href = url.href;
                
                
            });
        });
};
function filterSelection(page) {
    if (URLbookname === null && URLcategory === null && URLrating === null) {
        fetchAndRenderBooksALL(page);
    } else {
        fetchAndRenderBooks(page);
        renderFilters();
    }
    
  }


function renderBooks(books, page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, books.length);
    const booksToRender = books.slice(startIndex, endIndex);
    const bookContainer = document.getElementById("bookContainer");
    bookContainer.innerHTML = "";

    if (booksToRender.length === 0) {
        bookContainer.innerHTML = "<h1>Илэрц олдсонгүй.</h1>";
        return;
    }

    booksToRender.forEach(book => {
        const article = document.createElement("article");
        article.className = "exchange-books";

        article.innerHTML = `
        <book-card
        id="${book.bookid}"
        userId="${book.userid}"
        publisherPicture="${book.publisherpicture}"
        let publisherName = "${book.publisherfirstname} ${book.publisherlastname}";
        starRate="${book["starrate"] }"
        bookImage="${book.bookimage}"
        bookName="${book["bookname"]}"
        publishedYear="${book.publisheddate}"
        categories="${book.category}"
        author="${book.author}"
        wear="${book.wear}"
        pages="${book.pages}"
        description="${book.descrip}"
    ></book-card>

    `;


        bookContainer.appendChild(article);
    });
}


