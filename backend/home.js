document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('jwtToken');
    if (token) {
        // Decode the token to get the email
        const payload = JSON.parse(atob(token.split('.')[1]));
        const email = payload.email;

        // Display the welcome message
        document.getElementById('welcomeMessage').textContent = `Welcome, ${email}!`;
    } else {
        // If no token is found, redirect to the login page
        window.location.href = 'login.html';
    }
});
