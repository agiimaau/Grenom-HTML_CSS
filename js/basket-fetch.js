document.addEventListener("DOMContentLoaded", () => {
  getData();
  setupEventListeners();
});

const getData = function () {
  console.log("REFRESH BASKET and got data");

  // Initialize or set the GRENOM_BASKET if not present
  if (!localStorage.getItem("GRENOM_BASKET")) {
    localStorage.setItem("GRENOM_BASKET", JSON.stringify([]));
  }

  let books = JSON.parse(localStorage.getItem("GRENOM_BASKET"));
  console.log(books);
  let ids=books.map(item=> item.product_id);

  // Fetch and render each book in the basket
  ids.forEach(bookId => {
    fetchAndRenderBooksById(bookId);
  });
 console.log(ids);

}


function renderBooksfr(book) {
  const bookContainer = document.getElementsByClassName("flex-container")[1];

  if (!book) {
    console.error("Book not found!");
    bookContainer.innerHTML=`<h1>not found</h1>`;
    return;
  }
  
  const article = document.createElement("div");
  article.className = "books";

  article.innerHTML = `
    <basket-card
        id="${book.id}"
        bookImage="${book.image}"
        bookName="${book["book-name"]}"
        categories="${book.category}"
        author="${book.author}"
        requestedDate="${book.requestedDate}"
        count="${book.count}"
    ></basket-card>
  `;

  bookContainer.appendChild(article);
}

window.refreshExchangeBasket = getData;

function fetchAndRenderBooksById(bookId) {
  fetch("https://api.jsonbin.io/v3/b/655ac70d54105e766fd2702c")
    .then(response => response.json())
    .then(data => {
      // Log the data to check what is received
      console.log(data.record);

      // Find the book based on the provided ID
      const book = data.record.find(book => book.id == bookId);

      if (book) {
        // If the book is found, render it
        renderBooksfr(book);
      } else {
        // Log an error or handle the case where the book is not found
        console.error(`Book with id ${bookId} not found.`);
      }

      // Log the found book to check if it's found
      
    })
    .catch(error => console.error('Error fetching data:', error));
}


function setupEventListeners() {
  // Add event listeners for cart-related actions, if needed
  // Example: document.addEventListener("addToCart", (event) => {});
  // You can trigger the "addToCart" event when adding items to the cart
}
