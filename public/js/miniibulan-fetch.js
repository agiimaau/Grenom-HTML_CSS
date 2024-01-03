//end basket datagaa herhen fetch hiij haruulj bgag haruulj bga.
document.addEventListener("DOMContentLoaded", () => {
  getData();
  
});

const getData = function () {
  console.log("got data");

  fetch('/miniiBulanFetch')
      .then(response => response.json())
      .then(data => {
          data.forEach(item => {
              renderBooksfr(item);
          });
      })
      .catch(error => console.error('Error fetching cart data:', error));
      
}



function renderBooksfr(book) {
  
  const bookContainer = document.getElementsByClassName("all-exchange-books")[4];

  if (!book) {
    console.error("Book not found!");
    bookContainer.innerHTML=`<h1>not found</h1>`;
    return;
  }
  
  
  
  const article = document.createElement("article");
  article.className = "articless";

  article.innerHTML = `
    <my-book-card
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
    newprice="${book.newprice}"
    ></my-book-card>
  `;

  bookContainer.appendChild(article);
}

window.refreshExchangeBasket = getData;



