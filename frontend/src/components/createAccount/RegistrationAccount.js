import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./createAccount.css";
import { AUTH_API_URL } from "../../config";
import usePageTitle from "../../usePageTitle";

const logo = `${process.env.PUBLIC_URL}/logo.svg`;

function Registration() {
    usePageTitle("Sign up");
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
        <div className="auth">
            <div className="auth-card">
                <img className="auth-logo" src={logo} alt="" width="64" height="64" />
                <h1 className="auth-title">Create your account</h1>
                <p className="auth-subtitle">It only takes a moment.</p>
                <form className="auth-form" onSubmit={handleRegister}>
                    <label className="field" htmlFor="email">
                        <span className="field-label">Email</span>
                        <input
                            className="input"
                            id="email"
                            placeholder="you@example.com"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label className="field" htmlFor="password">
                        <span className="field-label">Password</span>
                        <input
                            className="input"
                            id="password"
                            type="password"
                            autoComplete="new-password"
                            minLength={8}
                            aria-describedby="passwordHint"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span className="field-hint" id="passwordHint">At least 8 characters.</span>
                    </label>
                    <button className="button button-primary button-large button-block" type="submit" disabled={submitting}>
                        {submitting ? 'Creating account…' : 'Create account'}
                    </button>
                </form>
                {status.message && (
                    <p
                        className={`callout callout-${status.type} auth-message`}
                        role={status.type === 'error' ? 'alert' : 'status'}
                    >
                        {status.message}
                    </p>
                )}
                <p className="auth-switch">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </div>
        </div>
    );
}

export default Registration;
