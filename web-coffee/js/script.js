// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Get the booking form by ID
    const bookingForm = document.getElementById("bookingForm");
    
    // If the current page has a booking form (contact page)
    if (bookingForm) {
        bookingForm.addEventListener("submit", function(e) {
            // Prevent the default browser form submission behavior (page reload)
            e.preventDefault();

            // Get input values from the form
            const fullName = document.getElementById("fullName").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const guests = document.getElementById("guests").value;
            const date = document.getElementById("date").value;
            const time = document.getElementById("time").value;
            
            // Get the div element for alert messages
            const alertBox = document.getElementById("bookingAlert");
            
            // Utility function to show alert message
            const showAlert = (message, type) => {
                alertBox.innerHTML = message;
                alertBox.className = `alert alert-${type} mt-3`; // Change class based on error or success type
                alertBox.classList.remove("d-none"); // Remove d-none class to display
            };

            // Check 1: Full name cannot be empty and minimum length is 2 characters
            if (fullName.length < 2) {
                showAlert("Please enter a valid full name (minimum 2 characters).", "danger");
                return; // Stop execution if there is an error
            }

            // Check 2: Phone number must be in Vietnamese format (starts with 0, 10 digits)
            const phoneRegex = /^0\d{9}$/;
            if (!phoneRegex.test(phone)) {
                showAlert("Please enter a valid phone number (10 digits, starting with 0).", "danger");
                return;
            }

            // Check 3: Date is required
            if (!date) {
                showAlert("Please select a booking date.", "danger");
                return;
            }

            // Check 4: Time is required
            if (!time) {
                showAlert("Please select a booking time.", "danger");
                return;
            }

            // If all data is valid, show success message
            const successMessage = `
                <strong>Booking successful!</strong><br>
                Thank you, <strong>${fullName}</strong>.<br>
                You have booked a table for <strong>${guests} people</strong> at <strong>${time}</strong> on <strong>${date}</strong>.<br>
                We will contact you soon via phone number <strong>${phone}</strong> to confirm.
            `;
            showAlert(successMessage, "success");

            // Reset the form after successful booking
            bookingForm.reset();
        });
    }
});
