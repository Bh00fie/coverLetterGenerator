import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./createAccount.css";
import { AUTH_API_URL } from "../../config";
import usePageTitle from "../../usePageTitle";

const logo = `${process.env.PUBLIC_URL}/logo.svg`;

function Login() {
    usePageTitle("Log in");
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
        <div className="auth">
            <div className="auth-card">
                <img className="auth-logo" src={logo} alt="" width="64" height="64" />
                <h1 className="auth-title">Welcome back</h1>
                <p className="auth-subtitle">Log in to your account.</p>
                <form className="auth-form" onSubmit={handleLogin}>
                    <label className="field" htmlFor="emailLogin">
                        <span className="field-label">Email</span>
                        <input
                            className="input"
                            id="emailLogin"
                            placeholder="you@example.com"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label className="field" htmlFor="passwordLogin">
                        <span className="field-label">Password</span>
                        <input
                            className="input"
                            id="passwordLogin"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <button className="button button-primary button-large button-block" type="submit" disabled={submitting}>
                        {submitting ? 'Logging in…' : 'Log in'}
                    </button>
                </form>
                {status.message && (
                    <p className={`callout callout-${status.type} auth-message`} role="alert">{status.message}</p>
                )}
                <p className="auth-switch">
                    New here? <Link to="/registration">Create an account</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
