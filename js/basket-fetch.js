document.addEventListener("DOMContentLoaded", ()=>getData());

const getData = function () {
  console.log("REFRESH BASKET");
  
  localStorage.setItem("GRENOM_BASKET_NEW_EXCHANGED_BOOKs", JSON.stringify(0));
  
  let books = localStorage.getItem("GRENOM_BASKET");
  books = books === null ? [] : JSON.parse(books);
  renderBooks(books);
}
function renderBooks(books) {
  const bookContainer = document.getElementById("book-exchange-container");
  bookContainer.innerHTML = "";

  if (books.length === 0) {
    bookContainer.innerHTML = "<h1>Илэрц олдсонгүй.<h1>";
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
window.refreshExchangeBasket = getData;
