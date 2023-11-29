class BookCard extends HTMLElement {
    constructor() {
        super();
        this.myRoot = this.attachShadow({ mode: "open" });
        this.publisherPicture = this.getAttribute("publisherPicture") ?? "default-publisher-picture.jpg";
        this.publisherName = this.getAttribute("publisherName") ?? "Unknown Publisher";
        this.starRate = this.getAttribute("starRate") ?? 0;
        this.bookImage = this.getAttribute("bookImage") ?? "default-book-image.jpg";
        this.bookName = this.getAttribute("bookName") ?? "Unknown Book";
        this.publishedYear = this.getAttribute("publishedYear") ?? "Unknown Year";
        this.categories = this.getAttribute("categories")?.split(",") || [];
        this.author = this.getAttribute("author") ?? "Unknown Author";
        this.wear = this.getAttribute("wear") ?? 0;
        this.pages = this.getAttribute("pages") ?? "Unknown Pages";
        this.description = this.getAttribute("description") ?? "No additional information.";

        this.#render();
    }

    connectedCallback() {
        // Add any event listeners or logic needed when the component is connected to the DOM
    }

    #render() {
        this.myRoot.innerHTML = `
            
            <article class="exchange-books">
                <figure class="undsen-medeelel">
                    <img class="profile-pic" src="${this.publisherPicture}" alt="${this.publisherName}" width="50">
                    <label>${this.publisherName}</label>
                    <p class="stars">
                        ${Array.from({ length: this.starRate }, () => '<span class="fa fa-star"></span>').join('')}
                    </p>
                </figure>
                <div class="book-info-main">
                    <figure>
                        <img class="nomnii-zurag" src="${this.bookImage}" alt="${this.bookName}" width="100">
                    </figure>
                    <div class="nomnii-medeelel">
                        <div class="tags">
                            <div class="ehnii-tag">
                                <h4>Номын нэр: <span>${this.bookName}</span></h4>
                                <p>Хэвлэгдсэн он: <time>${this.publishedYear}</time></p>
                                <p>Категори: <span>${this.categories.join(', ')}</span></p>
                            </div>
                            <div class="hoyrdahi-tag">
                                <p>Зохиолч: <span>${this.author}</span></p>
                                <p>Эдэлгээ:<meter value="${this.wear}" min="0" max="10" class="styled-meter"></meter></p>
                                <p>Хуудасны тоо: <span>${this.pages}</span></p>
                            </div>
                        </div>
                        <p class="additional-info">Нэмэлт мэдээлэл: <span>${this.description}</span></p>
                        <button class="book-exchange-request-button">Солилцох хүсэлт явуулах</button>
                    </div>
                </div>
            </article>
        `;
    }

    static get observedAttributes() {
        return [
            "publisherPicture",
            "publisherName",
            "starRate",
            "bookImage",
            "bookName",
            "publishedYear",
            "categories",
            "author",
            "wear",
            "pages",
            "description"
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

window.customElements.define("book-card", BookCard);
