import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./createAccount.css";
import { AUTH_API_URL } from "../../config";
import usePageTitle from "../../usePageTitle";

const logo = `${process.env.PUBLIC_URL}/logo.svg`;

function Registration() {
    usePageTitle("Register");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState({ type: '', message: '' });
    const [submitting, setSubmitting] = useState(false);

    const handleRegister = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        setStatus({ type: '', message: '' });
        try {
            const response = await fetch(`${AUTH_API_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const result = await response.json().catch(() => ({}));
            if (response.ok) {
                setStatus({ type: 'success', message: 'Account created. You can now log in.' });
                setPassword('');
            } else {
                setStatus({ type: 'error', message: result.error || 'Registration failed' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Could not reach the server. Please try again.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <Link id="logoSection" to="/" aria-label="Back to the generator">
                <img id="logoCoverLetter" src={logo} alt="" width="72" height="72" />
            </Link>
            <div id="registrationInput">
                <div id="registrationForm">
                    <h1 id="fontRegistration">Register</h1>
                    <form className="authFields" onSubmit={handleRegister}>
                        <input
                            className="input"
                            id="email"
                            aria-label="Email"
                            placeholder="Email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            className="input"
                            id="password"
                            aria-label="Password"
                            placeholder="Password"
                            type="password"
                            autoComplete="new-password"
                            minLength={8}
                            aria-describedby="passwordHint"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <p className="passwordHint" id="passwordHint">At least 8 characters</p>
                        <button id="RegistrationButton" className="generalButton" type="submit" disabled={submitting}>
                            {submitting ? 'Creating account…' : 'Create an account'}
                        </button>
                    </form>
                    {status.message && (
                        <p
                            className={`callout callout-${status.type}`}
                            role={status.type === 'error' ? 'alert' : 'status'}
                        >
                            {status.message}
                        </p>
                    )}
                    <p id="orAccount">or</p>
                    <Link to="/login" id="LoginButtonChange" className="generalButton subtle">
                        Login!
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Registration;
