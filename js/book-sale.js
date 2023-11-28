var header=document.getElementsByTagName("header")[0];
        var body=document.getElementsByTagName("main")[0];
        var searchBar=document.getElementById("searchbar");
        var searchPopOut = document.querySelector('.search-pop-out');
        searchPopOut.style.visibility="hidden";
        searchBar.addEventListener('click', function() {
        searchPopOut.style.visibility = 'visible';
        
       
        
    });       
    
    body.addEventListener('click', function() {
        searchPopOut.style.visibility="hidden";
        });   
        document.addEventListener('DOMContentLoaded', function () {
            // Get the button and pop-out section
            const button = document.querySelector('.book-sale-button');
            const popOut = document.getElementByClass('book-sale-pop-out');

            // Toggle the pop-out section
            function togglePopOut() {
                popOut.style.display = (popOut.style.display === 'none' || popOut.style.display === '') ? 'block' : 'none';
            }

            // Hide the pop-out when clicked outside
            document.addEventListener('click', function (event) {
                const isClickInsidePopOut = popOut.contains(event.target);
                const isClickInsideButton = button.contains(event.target);

                if (!isClickInsidePopOut && !isClickInsideButton) {
                    popOut.style.display = 'none';
                }
            });

            // Attach the toggle function to the button click
            button.addEventListener('click', togglePopOut);
        });
        
        $(':radio').change(function() {
  console.log('New star rating: ' + this.value);
});