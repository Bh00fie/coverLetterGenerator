import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./createAccount.css";
import { AUTH_API_URL } from "../../config";
import usePageTitle from "../../usePageTitle";

const logo = `${process.env.PUBLIC_URL}/logo.svg`;

function Login() {
    usePageTitle("Login");
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState({ type: '', message: '' });
    const [submitting, setSubmitting] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        setStatus({ type: '', message: '' });
        try {
            const response = await fetch(`${AUTH_API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const result = await response.json().catch(() => ({}));
            if (response.ok) {
                localStorage.setItem('jwtToken', result.token);
                navigate('/'); // Back to the generator
            } else {
                setStatus({ type: 'error', message: result.error || 'Login failed' });
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
            <div id="loginInput">
                <div id="loginForm">
                    <h1 id="fontLogin">Login</h1>
                    <form className="authFields" onSubmit={handleLogin}>
                        <input
                            className="input"
                            id="emailLogin"
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
                            id="passwordLogin"
                            aria-label="Password"
                            placeholder="Password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button id="LoginButton" className="generalButton" type="submit" disabled={submitting}>
                            {submitting ? 'Logging in…' : 'Login!'}
                        </button>
                    </form>
                    {status.message && (
                        <p className={`callout callout-${status.type}`} role="alert">{status.message}</p>
                    )}
                    <p id="orAccount">or</p>
                    <Link to="/registration" id="RegisterButtonChange" className="generalButton subtle">
                        Create an account!
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
