import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./createAccount.css";
import logo from "../images/logo.png";

function Registration() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:3000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const result = await response.json();
            if (response.ok) {
                setMessage('Registration successful!');
            } else {
                setMessage(result.error || 'Registration failed');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <a id="logoSection" href="/">
                <img id="logoCoverLetter" src={logo} alt="website icon" />
            </a>
            <div id="registrationInput">
                <div id="registrationForm">
                    <p id="fontRegistration">Register</p>
                    <form id="registrationForm" onSubmit={handleRegister}>
                        <input
                            className="input"
                            id="email"
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            className="input"
                            id="password"
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button id="RegistrationButton" className="generalButton" type="submit">
                            Create an account
                        </button>
                    </form>
                    <p id="orAccount">or</p>
                    <Link to="/login">
                        <button id="LoginButtonChange" className="generalButton" type="button">
                            Login!
                        </button>
                    </Link>
                    {message && <p id="responseMessage">{message}</p>}
                </div>
            </div>
        </div>
    );
}

export default Registration;
