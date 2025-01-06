import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./createAccount.css";
import logo from "../images/logo.png";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const result = await response.json();
            if (response.ok) {
                setMessage('Login successful!');
                localStorage.setItem('jwtToken', result.token);
                window.location.href = '/home'; // Redirect to home page
            } else {
                setMessage(result.error || 'Login failed');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <Link id="logoSection" to="/">
                <img id="logoCoverLetter" src={logo} alt="website icon" />
            </Link>
            <div id="loginInput">
                <div id="loginForm">
                    <p id="fontLogin">Login</p>
                    <form id="loginForm" onSubmit={handleLogin}>
                        <input
                            className="input"
                            id="emailLogin"
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            className="input"
                            id="passwordLogin"
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button id="LoginButton" className="generalButton" type="submit">
                            Login!
                        </button>
                    </form>
                    <p id="orAccount">or</p>
                    <Link to="/registration">
                        <button id="RegisterButtonChange" className="generalButton" type="button">
                            Create an account!
                        </button>
                    </Link>
                    {message && <p id="responseMessageLogin">{message}</p>}
                </div>
            </div>
        </div>
    );
}

export default Login;
