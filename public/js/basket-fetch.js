//end basket datagaa herhen fetch hiij haruulj bgag haruulj bga.
document.addEventListener("DOMContentLoaded", () => {
  getData();
  
});

/*const getData = function () {
  console.log("REFRESH BASKET and got data");

  // Initialize or set the GRENOM_BASKET if not present
  if (!localStorage.getItem("GRENOM_BASKET")) {
    localStorage.setItem("GRENOM_BASKET", JSON.stringify([]));
  }
  if (!localStorage.getItem("GRENOM_BASKET_SALE")) {
    localStorage.setItem("GRENOM_BASKET_SALE", JSON.stringify([]));
  }

  let books = JSON.parse(localStorage.getItem("GRENOM_BASKET"));
  console.log(books);
  let ids=books.map(item=> item.product_id);
  let sale_books = JSON.parse(localStorage.getItem("GRENOM_BASKET_SALE"));
  console.log(sale_books);
  let sale_ids=sale_books.map(item=> item.product_id);

  

  // Fetch and render each book in the basket
  ids.forEach(bookId => {
    fetchAndRenderBooksById(bookId);
  });
 console.log("ene exid nuud shuu "+ids);

 sale_ids.forEach(bookId => {
  fetchAndRenderSaleBooksById(bookId);
});
console.log("ene saleid nuud shuu "+sale_ids);

}*/
const getData = function () {
  console.log("REFRESH BASKET and got data");

  fetch('/basket')
      .then(response => response.json())
      .then(data => {
          // Assuming data is an array of cart items
          data.forEach(item => {
              fetchAndRenderBooksById(item.bookid); 
          });
      })
      .catch(error => console.error('Error fetching cart data:', error));
      fetch('/basketSB')
      .then(response => response.json())
      .then(data => {
          // Assuming data is an array of cart items
          data.forEach(item => {
              
              fetchAndRenderSaleBooksById(item.bookid); 
          });
      })
      .catch(error => console.error('Error fetching cart data:', error));
}


function renderBooksfr_sale(book) {
  
  const bookContainer = document.getElementsByClassName("flex-container")[0];

  if (!book) {
    console.error("Book not found!");
    bookContainer.innerHTML=`<h1>not found</h1>`;
    return;
  }
  let formattedDate = '';
  if (book.reqdate) {
    const date = new Date(book.reqdate);
    formattedDate = date.toISOString().split('T')[0]; // splits at 'T' and takes the date part
  }
  
  const article = document.createElement("div");
  article.className = "books";

  article.innerHTML = `
    <basket-sale-card
        id="${book.bookid}"
        bookImage="${book.bookimage}"
        bookName="${book["bookname"]}"
        categories="${book.category}"
        author="${book.publisherfirstname} ${book.publisherlastname}"
        requestedDate="${formattedDate}"
        status=${book.status}
        count="${book.count}"
    ></basket-sale-card>
  `;

  bookContainer.appendChild(article);
}
function renderBooksfr(book) {
  
  const bookContainer = document.getElementsByClassName("flex-container")[1];

  if (!book) {
    console.error("Book not found!");
    bookContainer.innerHTML=`<h1>not found</h1>`;
    return;
  }
  let formattedDate = '';
  if (book.reqdate) {
    const date = new Date(book.reqdate);
    formattedDate = date.toISOString().split('T')[0]; // splits at 'T' and takes the date part
  }

  
  const article = document.createElement("div");
  article.className = "books";

  article.innerHTML = `
    <basket-card
        id="${book.bookid}"
        bookImage="${book.bookimage}"
        bookName="${book["bookname"]}"
        categories="${book.category}"
        author="${book.publisherfirstname} ${book.publisherlastname}"
        requestedDate="${formattedDate}"
        status="${book.status}"
        count="${book.count}"
    ></basket-card>
  `;

  bookContainer.appendChild(article);
}

window.refreshExchangeBasket = getData;

function fetchAndRenderBooksById(bookId) {
  fetch("/bookdata")
    .then(response => response.json())
    .then(data => {
      // Log the data to check what is received
      console.log(data);

      // Find the book based on the provided ID
      const book = data.find(book => book.bookid == bookId);

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
function fetchAndRenderSaleBooksById(bookId) {
  fetch("/bookdata-sale")
    .then(response => response.json())
    .then(data => {
      // Log the data to check what is received
      console.log(data);

      // Find the book based on the provided ID
      const book = data.find(book => book.bookid == bookId);

      if (book) {
        // If the book is found, render it
        renderBooksfr_sale(book);
      } else {
        // Log an error or handle the case where the book is not found
        console.error(`Book with id ${bookId} not found.`);
      }

      // Log the found book to check if it's found
      
    })
    .catch(error => console.error('Error fetching data:', error));
}



