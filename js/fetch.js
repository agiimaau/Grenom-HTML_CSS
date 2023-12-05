var URLbookname;
var URLcategory;
var URLrating;

document.addEventListener("DOMContentLoaded", function () {
    var queryParams = new URLSearchParams(window.location.search);

    URLbookname = queryParams.get('bookname');
    URLcategory = queryParams.get('catergory-lists');
    URLrating = queryParams.get('rating');

    if (URLbookname === null && URLcategory === null && URLrating === null) {
        fetchAndRenderBooksALL();
    } else {
        fetchAndRenderBooks();
    }
});



function fetchAndRenderBooks() {
    fetch("https://api.jsonbin.io/v3/b/655ac70d54105e766fd2702c")
        .then(response => response.json())
        .then(data => {
            const filteredBooks = data.record.filter(book => {
                const bookNameMatch = !URLbookname || book["book-name"].toLowerCase().includes(URLbookname.toLowerCase());
                const categoryMatch = !URLcategory || (book.category.map(cat => cat.toLowerCase()).includes(URLcategory.toLowerCase()));
                const wearMatch = isNaN(URLrating) || book.wear === +URLrating;

                return bookNameMatch && categoryMatch && wearMatch;
            });

            renderBooks(filteredBooks);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function fetchAndRenderBooksALL() {
    fetch("https://api.jsonbin.io/v3/b/655ac70d54105e766fd2702c")
        .then(response => response.json())
        .then(data => {
            renderBooks(data.record);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function renderBooks(books) {
    const bookContainer = document.getElementById("bookContainer");
    bookContainer.innerHTML = "";

    if (books.length === 0) {
        
        bookContainer.innerHTML = "<h1>Илэрц олдсонгүй.<h1>";
    }

    books.forEach(book => {
        const article = document.createElement("article");
        article.className = "exchange-books";

        article.innerHTML = `
        
        
        <book-card
            publisherPicture="${book.publisherPicture}"
            publisherName="${book.publisherName}"
            starRate="${book["star-rate"] }"
            bookImage="${book.image}"
            bookName="${book["book-name"]}"
            publishedYear="${book.published}"
            categories="${book.category}"
            author="${book.author}"
            wear="${book.wear}"
            pages="${book.pages}"
            description="${book.description}"
        ></book-card>

        `;

        bookContainer.appendChild(article);
    });
    /*<figure class="undsen-medeelel">
            <img class="profile-pic" src="${book.publisherPicture}" alt="${book.publisherName}" width="50">
            <label>${book.publisherName}</label>
            <p class="stars">
                ${Array.from({ length: book["star-rate"] }, () => '<span class="fa fa-star"></span>').join('')}
            </p>
        </figure>
        <div class="book-info-main">
            <figure>
                <img class="nomnii-zurag" src="${book.image}" alt="${book["book-name"]}" width="100">
            </figure>
            <div class="nomnii-medeelel">
                <div class="tags">
                    <div class="ehnii-tag">
                        <h4>Номын нэр: <span>${book["book-name"]}</span></h4>
                        <p>Хэвлэгдсэн он: <time>${book.published}</time></p>
                        <p>Категори: <span>${book.category.join(', ')}</span></p>
                    </div>
                    <div class="hoyrdahi-tag">
                        <p>Зохиолч: <span>${book.author}</span></p>
                        <p>Эдэлгээ:<meter value="${book.wear}" min="0" max="10" class="styled-meter"></meter></p>
                        <p>Хуудасны тоо: <span>${book.pages}</span></p>
                    </div>
                </div>
                <p class="additional-info">Нэмэлт мэдээлэл: <span>${book.description}</span></p>
                <button class="book-exchange-request-button">Солилцох хүсэлт явуулах</button>
            </div>
        </div>*/
}