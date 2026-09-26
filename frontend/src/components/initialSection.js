// InitialSection.js
import React from 'react';
import { Link } from 'react-router-dom';
import './generalStyling.css';

const logo = `${process.env.PUBLIC_URL}/logo.svg`;

function InitialSection() {
    return (
        <div id="initialSection">
            <div id="userAccount">
                <Link to="/registration" id="registrationButton" className="generalButton">Register</Link>
                <Link to="/login" id="loginButton" className="generalButton">Login</Link>
            </div>
            <div id="webpageTitleSection">
                <img id="pageIcon" src={logo} alt="" width="64" height="64" />
                <h1>Cover Letter Generator using AI</h1>
                <p>Create your next cover letter in two minutes!</p>
            </div>
        </div>
    );
}

export default InitialSection;
