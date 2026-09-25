// InitialSection.js
import React from 'react';
import './generalStyling.css';

const logo = `${process.env.PUBLIC_URL}/logo.svg`;

function InitialSection() {
    return (
        <section className="hero">
            <img className="page-icon" src={logo} alt="" width="72" height="72" />
            <h1 className="hero-title">AI Cover Letter Generator</h1>
            <p className="hero-subtitle">
                Paste your CV and the job description, and get a tailored cover letter in minutes. Free, in nine languages.
            </p>
        </section>
    );
}

export default InitialSection;
