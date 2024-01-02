//search haa neg huudasnaas ajillah uyd ajillana daa


document.addEventListener("DOMContentLoaded", function () {
    
    var queryParams = new URLSearchParams(window.location.search);
    if (queryParams.toString()) {
        // Redirect to '/book-sale' with the existing query parameters
        window.location.href = '/book-sale?' + queryParams.toString();
    }
});



