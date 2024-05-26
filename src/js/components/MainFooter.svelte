&copy;<span id="year"></span> NOT a real business

<script>
document.addEventListener("DOMContentLoaded", function() {
    // Function to update year
    function updateYear(elementId) {
        // Create a new Date object
        const now = new Date();
        // Get the current year using the getFullYear() method
        const year = now.getFullYear();
        // Select the element using the provided element ID
        const element = document.getElementById(elementId);
        if (element) {
            // Update the content of the selected element with the current year
            element.textContent = year;
        } else {
            console.error("Element not found with ID:", elementId);
        }
    }

    // Call the updateYear function with the element ID "year"
    updateYear("year");
});
</script>
