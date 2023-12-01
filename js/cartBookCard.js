class cartBookCard extends HTMLElement {
    constructor() {
        super();
        this.myRoot = this.attachShadow({ mode: "open" });
        this.publisherName = this.getAttribute("publisherName") ?? "Unknown Publisher";
        this.bookImage = this.getAttribute("bookImage") ?? "default-book-image.jpg";
        this.bookName = this.getAttribute("bookName") ?? "Unknown Book";
        this.categories = this.getAttribute("categories")?.split(",") || [];
        this.sentDate = this.getAttribute("sDate") ?? "no info";
        this.leftTime = this.getAttribute("lTime") ?? "No information.";
        this.status=this.getAttribute("status") ?? " No Info ";

        this.#render();
    }

    connectedCallback() {
        // Add any event listeners or logic needed when the component is connected to the DOM
    }

    #render() {
        this.myRoot.innerHTML = `
        <link rel="stylesheet" href="css/cart.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
            
    <figure>
        <img class="nom" src="pictures/4bish4.jpg" alt="somebook name" width="140">
    </figure>
    <div class="nomnii-medeelel">
        <div class="tags">
            <div class="ehnii-tag">
                <p>Нийтэлсэн: ${this.publisherName}</p>
                <h4>Номын нэр: <span>${this.bookName}</span></h4>
                <p>Хүсэлт явуулсан: ${this.sentDate}</p>
                <p>Категори: <span>${this.categories}</span></p>
                <p>Үлдсэн хугацаа:${this.leftTime}</p>
                <h3><u>Төлөв:<span>${this.status}</span></u></h3>
            </div>
            
        </div>
    </div>

    <svg class="sav" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 512 512"><path fill="none" d="M296 64h-80a7.91 7.91 0 0 0-8 8v24h96V72a7.91 7.91 0 0 0-8-8Z"/><path fill="none" d="M292 64h-72a4 4 0 0 0-4 4v28h80V68a4 4 0 0 0-4-4Z"/><path fill="#CE5858" d="M447.55 96H336V48a16 16 0 0 0-16-16H192a16 16 0 0 0-16 16v48H64.45L64 136h33l20.09 314A32 32 0 0 0 149 480h214a32 32 0 0 0 31.93-29.95L415 136h33ZM176 416l-9-256h33l9 256Zm96 0h-32V160h32Zm24-320h-80V68a4 4 0 0 1 4-4h72a4 4 0 0 1 4 4Zm40 320h-33l9-256h33Z"/></svg>
        `;
    }

    static get observedAttributes() {
        return [
            
            "publisherName",
            "bookImage",
            "bookName",
            "categories",
            "lTime",
            "sDate",
            "status",
            
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

window.customElements.define("cart-book-card", cartBookCard);
