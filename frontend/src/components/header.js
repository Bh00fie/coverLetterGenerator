import React from "react";
import { Link } from "react-router-dom";
import "./generalStyling.css";

const logo = `${process.env.PUBLIC_URL}/logo.svg`;

function SunIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
    );
}

function MoonIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    );
}

function Header({ theme, onToggleTheme }) {
    const isDark = theme === "dark";
    const toggleLabel = isDark ? "Switch to light mode" : "Switch to dark mode";

    return (
        <header className="topbar">
            <div className="topbar-inner">
                <Link to="/" className="brand" aria-label="Cover Letter Generator home">
                    <img className="brand-icon" src={logo} alt="" width="28" height="28" />
                    <span className="brand-name">Cover Letter Generator</span>
                </Link>
                <nav className="topbar-actions" aria-label="Account">
                    <button type="button" className="icon-button" onClick={onToggleTheme} aria-label={toggleLabel} title={toggleLabel}>
                        {isDark ? <SunIcon /> : <MoonIcon />}
                    </button>
                    <Link to="/login" className="button button-ghost">Log in</Link>
                    <Link to="/registration" className="button button-primary">Sign up</Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;
