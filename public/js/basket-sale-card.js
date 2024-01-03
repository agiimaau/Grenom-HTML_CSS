//ene bol basket dahi hudaldan awah nomnii card
class BasketSaleCard extends HTMLElement {
    constructor() {
      super();
      this.myRoot = this.attachShadow({ mode: "open" });
      this.id = this.getAttribute("id") ??0;
      this.bookImage = this.getAttribute("bookImage") ?? "default-book-image.jpg";
      this.bookName = this.getAttribute("bookName") ?? "Unknown Book";
      this.categories = this.getAttribute("categories")?.split(", ") || [];
      this.author = this.getAttribute("author") ?? "Unknown Author";
      this.requestedDate = this.getAttribute("requestedDate");
      this.status = this.getAttribute("status");
      this.count = this.getAttribute("count")?? "baidaggue";
   
    }
    
    removeFromGrenomBasket_Sale(product_id) {
      fetch('/removeFromCartSB', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ product_id }),
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(() => {
          // Remove the card element from the DOM
          this.removeCardElement();
      })
      .catch(error => console.error('Error:', error));
  }
  
  removeCardElement() {
      // Assuming 'this' refers to the basket card component
      if (this.parentNode) {
          this.parentNode.removeChild(this);
      }
  }
  findStatus() {
    // Ensure the status property is defined and is a string
    if (typeof this.status !== 'string') {
        return 'Status unknown';
    }
    console.log(this.status);
  
    switch (this.status.toLowerCase()) {
        case 'w':
            return 'Хүлээгдэж буй'; // Waiting
        case 'd':
            return 'Цуцлагдсан'; // Cancelled
        default:
            return 'Тодорхойгүй статус'; // Undefined status
    }
  }
  
  connectedCallback() {
          
    this.myRoot.addEventListener('click', (event) => {
        const clickedButton = event.target.closest('.box-sale .sav');
  
        if (clickedButton) {
          this.removeFromGrenomBasket_Sale(this.id);
        }
    });
    
  }
  
    #render() {
      this.myRoot.innerHTML = `
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
          <link rel="stylesheet" href="css/cart.css">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  
              <article class="box-sale">
              
                  <img class="nom" src="${this.bookImage}" alt="${this.bookName}" width="140" height="186">
              
              <div class="nomnii-medeelel">
                  <div class="tags">
                      <div class="ehnii-tag">
                          <p>Нийтэлсэн: ${this.author}</p>
                          <h4>Номын нэр: <span>${this.bookName}</span></h4>
                          <p>Хүсэлт явуулсан: ${this.requestedDate}</p>
                          <p>Категори: <span>${this.categories}</span></p>
                          <p>Үлдсэн хугацаа:${this.count} цаг </p>
                          <h3><u>Төлөв:<span>${this.findStatus()}</span></u></h3>
                      </div>
       
                      </div>
                  </div>
              
                  <svg class="sav" xmlns="http://www.w3.org/2000/svg"  width="50" height="50" viewBox="0 0 32 40" fill="none" x="0px" y="0px"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 12C9 11.4477 9.44772 11 10 11H18C18.5523 11 19 11.4477 19 12V16C19 16.5523 18.5523 17 18 17H10C9.44772 17 9 16.5523 9 16V12ZM11 13V15H17V13H11Z" fill="#d04545"/><path d="M21 22C20.4477 22 20 22.4477 20 23C20 23.5523 20.4477 24 21 24H25C25.5523 24 26 23.5523 26 23C26 22.4477 25.5523 22 25 22H21Z" fill="#d04545"/><path fill-rule="evenodd" clip-rule="evenodd" d="M2 6C2 3.79086 3.79086 2 6 2H18C19.6569 2 21 3.34315 21 5V8.76389C21.6137 9.31321 22 10.1115 22 11V16.0709C22.3266 16.0242 22.6605 16 23 16C26.866 16 30 19.134 30 23C30 26.866 26.866 30 23 30C20.2076 30 17.7971 28.3649 16.6736 26H5C3.34315 26 2 24.6569 2 23V6ZM20 11V16.6736C17.6351 17.7971 16 20.2076 16 23C16 23.3395 16.0242 23.6734 16.0709 24H8L8 10H19C19.5523 10 20 10.4477 20 11ZM6 10L6 24H5C4.44772 24 4 23.5523 4 23V9.46487C4.58835 9.80521 5.27143 10 6 10ZM4 6C4 4.89543 4.89543 4 6 4H18C18.5523 4 19 4.44772 19 5V8H6C4.89543 8 4 7.10457 4 6ZM23 18C20.2386 18 18 20.2386 18 23C18 25.7614 20.2386 28 23 28C25.7614 28 28 25.7614 28 23C28 20.2386 25.7614 18 23 18Z" fill="#d04545"/><text x="0" y="47" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">Created by HideMaru</text><text x="0" y="52" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">from the Noun Project</text></svg>
              </article>
              <style>
              :root{
                --color-background:red;
                --color-text:green;
              }
              @media (prefers-color-scheme: dark) {
                  .box-sale {
                    background-color: black;
                    color: white;
                  }
                }
              </style>
              
          `;
    }
  
    static get observedAttributes() {
      return [
        "id",
        "bookImage",
        "bookName",
        "categories",
        "author",
        "requestedDate",
        "status",
        "count",
      ];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      // Handle attribute changes if needed
      if (oldValue !== newValue) {
        this[name] = newValue;
        this.#render();
      }
    }
  }
  
  window.customElements.define("basket-sale-card", BasketSaleCard);
  