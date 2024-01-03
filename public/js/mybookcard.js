class MyBookCard extends HTMLElement {
    constructor() {
        super();
        this.myRoot = this.attachShadow({ mode: "open" });
        this.id=this.getAttribute("id")?? 0;
        this.userId=this.getAttribute("userId")?? 0;
        this.publisherPicture = this.getAttribute("publisherPicture") ?? "default-publisher-picture.jpg";
        this.publisherName = this.getAttribute("publisherName") ?? "Unknown Publisher";
        this.starRate = this.getAttribute("starRate") ?? 0;
        this.bookImage = this.getAttribute("bookImage") ?? "default-book-image.jpg";
        this.bookName = this.getAttribute("bookName") ?? "Unknown Book";
        this.publishedYear = this.getAttribute("publishedYear") ?? "Unknown Year";
        this.categories = this.getAttribute("categories")?.split(", ") || [];
        this.wear = this.getAttribute("wear") ?? 0;
        this.pages = this.getAttribute("pages") ?? "Unknown Pages";
        this.newprice = this.getAttribute("starRate") ?? 0;
        
        this.#render();
        
       
    } 
    removeFromMiniiBulan(product_id) {
        fetch('/removeFromMiniiBulan', {
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
            
            this.removeCardElement();
        })
        .catch(error => console.error('Error:', error));
    }
    
    removeCardElement() {
        
            // Navigate to the parent node's parent node
    let grandParentNode = this.parentNode && this.parentNode.parentNode;

    // Check if the grandparent node exists
    if (grandParentNode) {
        // Remove the parent node (which removes 'this' as well)
        grandParentNode.removeChild(this.parentNode);
    }
}
    
   
    
    
 
     
    connectedCallback() {
        this.myRoot.addEventListener('click', (event) => {
            const clickedButton = event.target.closest('.ustgah');
      
            if (clickedButton) {
               
              this.removeFromMiniiBulan(this.id);
            }
        });
       
    }

    #render() {
        
        this.myRoot.innerHTML = `
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="css/footer.css">
        <link rel="stylesheet" href="css/search-pop-up.css">
        <link rel="stylesheet" href="css/book-exchange.css">
        <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/root.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <figure class="undsen-medeelel">
        <img class="profile-pic" class="profile-pic" src=" ${this.publisherPicture}" alt="${this.publisherName}" width="50" height="50">
            <label>${this.publisherName}
            </label>

            <svg xmlns="http://www.w3.org/2000/svg" class="ustgah" onclick="ustgah('b11')" width="50" height="50" viewBox="0 0 32 40" fill="none" x="0px" y="0px"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 12C9 11.4477 9.44772 11 10 11H18C18.5523 11 19 11.4477 19 12V16C19 16.5523 18.5523 17 18 17H10C9.44772 17 9 16.5523 9 16V12ZM11 13V15H17V13H11Z" fill="#d04545"/><path d="M21 22C20.4477 22 20 22.4477 20 23C20 23.5523 20.4477 24 21 24H25C25.5523 24 26 23.5523 26 23C26 22.4477 25.5523 22 25 22H21Z" fill="#d04545"/><path fill-rule="evenodd" clip-rule="evenodd" d="M2 6C2 3.79086 3.79086 2 6 2H18C19.6569 2 21 3.34315 21 5V8.76389C21.6137 9.31321 22 10.1115 22 11V16.0709C22.3266 16.0242 22.6605 16 23 16C26.866 16 30 19.134 30 23C30 26.866 26.866 30 23 30C20.2076 30 17.7971 28.3649 16.6736 26H5C3.34315 26 2 24.6569 2 23V6ZM20 11V16.6736C17.6351 17.7971 16 20.2076 16 23C16 23.3395 16.0242 23.6734 16.0709 24H8L8 10H19C19.5523 10 20 10.4477 20 11ZM6 10L6 24H5C4.44772 24 4 23.5523 4 23V9.46487C4.58835 9.80521 5.27143 10 6 10ZM4 6C4 4.89543 4.89543 4 6 4H18C18.5523 4 19 4.44772 19 5V8H6C4.89543 8 4 7.10457 4 6ZM23 18C20.2386 18 18 20.2386 18 23C18 25.7614 20.2386 28 23 28C25.7614 28 28 25.7614 28 23C28 20.2386 25.7614 18 23 18Z" fill="#d04545"/><text x="0" y="47" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">Created by HideMaru</text><text x="0" y="52" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">from the Noun Project</text></svg>
    </figure>
    <div class="book_info_main">
        <figure>
            <img src="${this.bookImage}" alt="${this.bookName}" width="140">
        </figure>
        <div class="nomnii_medeelel">
            <h4><span>${this.bookName}</span></h4>
            <div class="tags">
                <div class="ehni-tag">
                    <p class="stars">
                    ${Array.from({ length: this.starRate }, () => '<span class="fa fa-star"></span>').join('')}
                    </p>
                    
                    <p>Хэвлэгдсэн он: <time>${this.publishedYear}</time></p>
                    <p>Категори: <span>${this.categories}</span></p>
                </div>

                <div class="hoyrdah-tag"><br><br>
                    <p>Эдэлгээ: <meter value="${this.wear}" min="0" max="10" class="styled-meter"></meter></p>
                    <p>Хуудас: <span>${this.pages}</span></p>
                    <p>Үнэ: <span>${this.newprice}</span></p>
                </div>
            </div>
        </div>
            
        `;
        
    }

    static get observedAttributes() {
        return [
            "id",
            "userId",
            "newprice",
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

window.customElements.define("my-book-card", MyBookCard);
