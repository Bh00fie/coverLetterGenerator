document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('registrationForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://127.0.0.1:3000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();
            if (response.ok) {
                document.getElementById('responseMessage').textContent = 'Registration successful!';
                document.getElementById('responseMessage').style.color = 'green';

            } else {
                document.getElementById('responseMessage').textContent = result.error || 'Registration failed';
                document.getElementById('responseMessage').style.color = 'red';
            }
        } catch (error) {
            document.getElementById('responseMessage').textContent = 'An error occurred. Please try again.';
            document.getElementById('responseMessage').style.color = 'red';
        }
    });

    document.getElementById('loginForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        const email = document.getElementById('emailLogin').value;
        const password = document.getElementById('passwordLogin').value;

        try {
            const response = await fetch('http://127.0.0.1:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();
            if (response.ok) {
                document.getElementById('responseMessageLogin').textContent = 'Login successful!';
                document.getElementById('responseMessageLogin').style.color = 'green';
                localStorage.setItem('jwtToken', result.token);
                window.location.href = 'home.html';
            } else {
                document.getElementById('responseMessageLogin').textContent = result.error || 'Login failed';
                document.getElementById('responseMessageLogin').style.color = 'red';
            }
        } catch (error) {
            document.getElementById('responseMessageLogin').textContent = 'An error occurred. Please try again.';
            document.getElementById('responseMessageLogin').style.color = 'red';
        }
    });
});
