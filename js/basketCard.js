class BasketCard extends HTMLElement {
  constructor() {
    super();
    this.myRoot = this.attachShadow({ mode: "open" });
    this.id = this.getAttribute("id") ??0;
    this.bookImage = this.getAttribute("bookImage") ?? "default-book-image.jpg";
    this.bookName = this.getAttribute("bookName") ?? "Unknown Book";
    this.categories = this.getAttribute("categories")?.split(",") || [];
    this.author = this.getAttribute("author") ?? "Unknown Author";
    this.requestedDate = this.getAttribute("requestedDate");
    this.count = this.getAttribute("count");
    
    this.addEventListener("click", this.removeBook.bind(this));

    this.#render();
  }
  

  removeBook = (e) => {
    let booksString = localStorage.getItem("GRENOM_BASKET");
    let books = booksString === null ? [] : JSON.parse(booksString);
    const index = books.findIndex(item=>item.bookName === this.bookName);
    if(index !== -1){
      books.splice(index, 1);
    }
    localStorage.setItem("GRENOM_BASKET", JSON.stringify(books));

    window.refreshExchangeBasket();
  };

  connectedCallback() {
    // Add any event listeners or logic needed when the component is connected to the DOM
    const el = document.getElementById(`remove${this.id}`);
    if(el){
      el.addEventListener("click", this.removeBook);
    }
  }

  #render() {
    this.myRoot.innerHTML = `
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="css/book-exchange.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <div class="switch-button">
            <svg  class="svg" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24"><g transform="rotate(-90 12 12)"><g fill="none" stroke="#4d724d" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="m15 13l-3-3l-3 3"/></g></g></svg>
            
                <div class="flex-item-left">
            <article class="box">
            <figure>
                <img class="nom" src="${this.bookImage}" alt="${this.bookName}" width="140">
            </figure>
            <div class="nomnii-medeelel">
                <div class="tags">
                    <div class="ehnii-tag">
                        <p>Нийтэлсэн: ${this.author}</p>
                        <h4>Номын нэр: <span>${this.bookName}</span></h4>
                        <p>Хүсэлт явуулсан: ${(new Date(this.requestedDate)).toISOString().substring(0,10)}</p>
                        <p>Категори: <span>${this.categories.join(",")}</span></p>
                        <p>Үлдсэн хугацаа:${this.name} цаг </p>
                        <h3><u>Төлөв:<span>${this.name}</span></u></h3>
                    </div>
                        
                    </div>
                </div>
            
                <svg class="sav" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 512 512"><path fill="none" d="M296 64h-80a7.91 7.91 0 0 0-8 8v24h96V72a7.91 7.91 0 0 0-8-8Z"/><path fill="none" d="M292 64h-72a4 4 0 0 0-4 4v28h80V68a4 4 0 0 0-4-4Z"/><path fill="#CE5858" d="M447.55 96H336V48a16 16 0 0 0-16-16H192a16 16 0 0 0-16 16v48H64.45L64 136h33l20.09 314A32 32 0 0 0 149 480h214a32 32 0 0 0 31.93-29.95L415 136h33ZM176 416l-9-256h33l9 256Zm96 0h-32V160h32Zm24-320h-80V68a4 4 0 0 1 4-4h72a4 4 0 0 1 4 4Zm40 320h-33l9-256h33Z"/></svg>
            </article>
            </div>
            </div>
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

window.customElements.define("basket-card", BasketCard);
