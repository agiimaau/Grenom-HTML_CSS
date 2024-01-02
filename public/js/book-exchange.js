 

        
    document.addEventListener('DOMContentLoaded', function () {
        // Get the button and pop-out section
        const button = document.querySelector('.book-exchange-button');
        const popOut = document.getElementsByClassName('book-exchange-pop-out')[0];
        var cancelButton = document.querySelector('.book-pop-out-button-cancel');

        
    
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



        var pop = document.getElementById('book-ex-pop');
                if (pop) {
                    pop.addEventListener('submit', function(e) {
                        e.preventDefault();

                        var formData = new FormData(this);
                        fetch('/addExchangeBook', {
                        method: 'POST',
                        body: formData
                        })
                        .then(response => response.json())
                        .then(data => {
                        if (data.success) {
                            
                            document.getElementById('message').textContent = 'Ном амжилттай бүртгэгдлээ. ';
                            setTimeout(function() {
                            window.location.href = '/book-exchange'; // Redirect to log-in after 3 seconds
                             }, 2000); // 3000 milliseconds = 3 seconds
                                       
                        } else if (data.errors) {
                            // Handle errors
                            document.getElementById('message').textContent = data.errors.map(e => e.message).join(', ');
                        } else {
                            // Handle other cases
                            document.getElementById('message').textContent = 'Алдаа гарлаа.';
                        }
                        })
                        .catch(error => {
                        console.error('Error:', error);
                        document.getElementById('message').textContent = 'Алдаа гарлаа.';
                        });
                    });
                } else {
                    console.error(' form олдсонгүй.');
                }
    });
   
            
          
    
  