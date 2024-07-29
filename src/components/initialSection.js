// InitialSection.js
import React from 'react';
import { Link } from 'react-router-dom';
import './initialSection.css';

function InitialSection() {
    return (
        <div id="initialSection">
            <div id="userAccount">
                <Link to="/registration">
                    <button id='registrationButton' className="generalButton" type="button"> Register </button>
                </Link>
                <Link to="/login">
                    <button id='loginButton' className="generalButton" type="button"> Login </button>
                </Link>
            </div>
            <div id="webpageTitleSection">
                <h2> Cover Letter Generator using AI </h2>
                <h3> Create your next cover letter in two minutes!</h3>
            </div>
        </div>
    );
}

export default InitialSection;
