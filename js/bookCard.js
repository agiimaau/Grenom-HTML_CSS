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
        this.myRoot.addEventListener('click', (event) => {
            console.log('Clicked on:', event.target);
        
            const clickedButton = event.target.closest('.book-info-main .nomnii-medeelel .book-exchange-request-button');
            
            if (clickedButton) {
                console.log('Button clicked!');
                window.alert(this.bookName);
                
            }
        });
       
    }

    connectedCallback() {
        // Add any event listeners or logic needed when the component is connected to the DOM
    }

    #render() {
        
        this.myRoot.innerHTML = `
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="css/book-exchange.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
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
                                <p>Категори: <span>${this.categories}</span></p>
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
