import React from "react"
import "./initialSection.css"

function InitialSection() {
    return (
        <div id="initialSection">
            <div id="userAccount">
                <h3> Sign Up </h3>
                <h3> Login </h3>
            </div>
            <div id="webpageTitleSection">
                <h2 id="webpageTitle"> Cover Letter Generator using AI </h2>
                <h3 id="webpageDescription"> Create your next cover letter in two minutes!</h3>
            </div>
        </div>
    );
}

export default InitialSection;