//document.addEventListener("DOMContentLoaded", ()=>getData());
document.addEventListener("DOMContentLoaded", () => {
  getData();
  setupEventListeners();
});
const getData = function () {
  console.log("REFRESH BASKET");
  
  localStorage.setItem("GRENOM_BASKET_NEW_EXCHANGED_BOOKs", JSON.stringify(0));
  
  let books = localStorage.getItem("GRENOM_BASKET");
  books = books === null ? [] : JSON.parse(books);
  renderBooks(books);
}
function renderBooks(books) {
  const bookContainer = document.getElementsByClassName("flex-container")[1];
  bookContainer.innerHTML = "";

  if (books.length === 0) {
    bookContainer.innerHTML = "<h1>Та одоогоор хүсэлт явуулаагүй байна.<h1>";
  }

  books.forEach((book) => {
    const article = document.createElement("article");
    article.className = "exchange-books";

    article.innerHTML = `
        <basket-card
            bookImage="${book.bookImage}"
            bookName="${book.bookName}"
            categories="${book.categories}"
            author="${book.author}"
            requestedDate="${book.requestedDate}"
            count="${book.count}"
        ></basket-card>

        `;

    bookContainer.appendChild(article);
  });
}

function addToCart(bookDetails) {
  console.log("ajiljin");
  let booksString = localStorage.getItem("GRENOM_BASKET");
  let books = booksString === null ? [] : JSON.parse(booksString);

  const existingBook = books.find((item) => item.id === bookDetails.id);

  if (existingBook) {
      // Increment the count if the book is already in the basket
      existingBook.count += 1;
      console.log("it worked");
  } else {
      // Add the book to the basket with count 1
      books.push({ ...bookDetails, count: 1 });
      console.log("it worked p");
  }

  localStorage.setItem("GRENOM_BASKET", JSON.stringify(books));
  window.refreshExchangeBasket();
}
function setupEventListeners() {
  document.addEventListener("addToCart", (event) => {
      const bookDetails = event.detail;
      addToCart(bookDetails);
  });
}

window.refreshExchangeBasket = getData;
