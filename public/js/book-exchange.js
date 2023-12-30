 

        
    document.addEventListener('DOMContentLoaded', function () {
        // Get the button and pop-out section
        const button = document.querySelector('.book-exchange-button');
        const popOut = document.getElementsByClassName('book-exchange-pop-out')[0];

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
    
  