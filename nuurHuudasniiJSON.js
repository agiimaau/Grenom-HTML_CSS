const books = [
    {
        id: 1,
        topic: "saving",
        image: "../Grenom-HTML_CSS/pictures/4bish4.jpg",
        name: "4 биш 4",
        price: 20000,
        salePrice: 5000,
        wear: 8,
        Date:"2022-10-01"
    },
    {
        id: 2,
        topic: "saving",
        image: "../Grenom-HTML_CSS/pictures/harizm.jpg",
        name: "Харизм",
        price: 20000,
        salePrice: 5000,
        wear: 8,
        Date:"2022-10-01"
    },
    {
        id: 3,
        topic: "saving",
        image: "../Grenom-HTML_CSS/pictures/tsagaan boroo.jpg",
        name: "Цагаан бороо",
        price: 20000,
        salePrice: 5000,
        wear: 8,
        Date:"2022-10-01"
    },
    {
        id: 4,
        topic: "saving",
        image: "../Grenom-HTML_CSS/pictures/ad uzegdeh zorig.jpg",
        name: "Ад үзэгдэх зориг",
        price: 20000,
        salePrice: 5000,
        wear: 8,
        Date:"2022-10-01"
    },
    {
        id: 5,
        topic: "high-rate",
        image: "../Grenom-HTML_CSS/pictures/4bish4.jpg",
        name: "4 биш 4",
        price: 20000,
        wear: 8,
        Date:"2022-10-01"
    },
    {
        id: 6,
        topic: "high-rate",
        image: "pictures/minii temtsel.jpg",
        name: "Харизм",
        price: 20000,
        wear: 8,
        Date:"2022-10-01"
    },
    {
        id: 7,
        topic: "high-rate",
        image: "pictures/tsagaan boroo.jpg",
        name: "Цагаан бороо",
        price: 20000,
        wear: 8,
        Date:"2022-10-01"
    },
    {
        id: 8,
        topic: "high-rate",
        image: "../Grenom-HTML_CSS/pictures/ad uzegdeh zorig.jpg",
        name: "Ад үзэгдэх зориг",
        price: 20000,
        wear: 8,
        Date:"2022-10-01"
    },
    {
        id: 9,
        topic: "new",
        image: "pictures/bodol biylelee oldog.jpg",
        name: "Ад үзэгдэх зориг",
        price: 20000,
        salePrice: 5000,
        wear: 8,
        Date:"2022-10-01"
    },
    {
        id: 10,
        topic: "new",
        image: "../Grenom-HTML_CSS/pictures/harizm.jpg",
        name: "4 биш 4",
        price: 20000,
        wear: 8,
        Date:"2022-10-01"
    },
    {
        id: 11,
        topic: "new",
        image: "pictures/ohidod uguh zuwlumj.jpg",
        name: "Харизм",
        price: 20000,
        wear: 8,
        Date:"2022-10-01"
    },
    {
        id: 12,
        topic: "new",
        image: "../Grenom-HTML_CSS/pictures/4bish4.jpg",
        name: "Цагаан бороо",
        price: 20000,
        wear: 8,
        Date:"2022-10-01"
    }

];

// Filter books with the topic "saving"
const savingBooks = books.filter(book => book.topic === "saving");

savingBooks.forEach(book => {
    // Calculate sale percentage
    const salePercent = ((book.price - book.salePrice) / book.price) * 100;

    // Create HTML elements for each book
    const bookElement = document.createElement("article");
    bookElement.classList.add("book-grid");
    bookElement.id = `book-${book.id}`;

    bookElement.innerHTML = `
        <div class="sale-indicator"><h2>${salePercent.toFixed(0)}%</h2></div>
        <figure id="book-figure">
            <img src="${book.image}" alt="${book.name}">
        </figure>
        <h3>${book.name}</h3>
        <div id="prices">
            <s style="display: inline;">${book.price}₮</s>
            <p style="display: inline;">${book.salePrice}₮</p>
        </div>
        <label for="usage-save-${book.id}">Эдэлгээ:</label>
        <meter id="usage-save-${book.id}" value="${book.wear}" min="0" max="10"></meter>
        <svg id="dots-3" xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 256 256">
            <g fill="#8db48e">
                <path d="M224 128a96 96 0 1 1-96-96a96 96 0 0 1 96 96Z" opacity=".2"/>
                <path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Zm56-88a12 12 0 1 1-12-12a12 12 0 0 1 12 12Zm-44 0a12 12 0 1 1-12-12a12 12 0 0 1 12 12Zm-44 0a12 12 0 1 1-12-12a12 12 0 0 1 12 12Z"/>
            </g>
        </svg>`;

    document.querySelector(".book-container-saving").appendChild(bookElement);
});



// Filter books with the topic "high-rate"
const highRateBooks = books.filter(book => book.topic === "high-rate");

highRateBooks.forEach(book => {
 

    // Create HTML elements for each book
    const bookElementHR = document.createElement("article");
    bookElementHR.classList.add("book-grid");
    bookElementHR.id = `book-${book.id}`;

    bookElementHR.innerHTML = `
  
        <figure id="book-figure">
            <img src="${book.image}" alt="${book.name}">
        </figure>
        <h3>${book.name}</h3>
        <div id="prices">
            <p style="display: inline;">${book.price}₮</p>
        </div>
        <label for="usage-save-${book.id}">Эдэлгээ:</label>
        <meter id="usage-save-${book.id}" value="${book.wear}" min="0" max="10"></meter>
        <svg id="dots-3" xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 256 256">
            <g fill="#8db48e">
                <path d="M224 128a96 96 0 1 1-96-96a96 96 0 0 1 96 96Z" opacity=".2"/>
                <path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Zm56-88a12 12 0 1 1-12-12a12 12 0 0 1 12 12Zm-44 0a12 12 0 1 1-12-12a12 12 0 0 1 12 12Zm-44 0a12 12 0 1 1-12-12a12 12 0 0 1 12 12Z"/>
            </g>
        </svg>`;

    document.querySelector(".book-container-high-rate").appendChild(bookElementHR);
});




// Filter books with the topic "new"
const newBooks = books.filter(book => book.topic === "new");

newBooks.forEach(book => {
 

    // Create HTML elements for each book
    const bookElementN = document.createElement("article");
    bookElementN.classList.add("book-grid");
    bookElementN.id = `book-${book.id}`;

    bookElementN.innerHTML = `
  
        <figure id="book-figure">
            <img src="${book.image}" alt="${book.name}">
        </figure>
        <h3>${book.name}</h3>
        <div id="prices">
            <p style="display: inline;">${book.price}₮</p>
        </div>
        <label for="usage-save-${book.id}">Эдэлгээ:</label>
        <meter id="usage-save-${book.id}" value="${book.wear}" min="0" max="10"></meter>
        <svg id="dots-3" xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 256 256">
            <g fill="#8db48e">
                <path d="M224 128a96 96 0 1 1-96-96a96 96 0 0 1 96 96Z" opacity=".2"/>
                <path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Zm56-88a12 12 0 1 1-12-12a12 12 0 0 1 12 12Zm-44 0a12 12 0 1 1-12-12a12 12 0 0 1 12 12Zm-44 0a12 12 0 1 1-12-12a12 12 0 0 1 12 12Z"/>
            </g>
        </svg>`;

    document.querySelector(".book-container-new").appendChild(bookElementN);
});

