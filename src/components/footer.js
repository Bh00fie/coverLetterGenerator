import React from "react"
import "./footer.css"
import icon from './images/icon.png'

function Footer() {
    return (
        <footer>
            <div id="userName">
                <img className="profileCard" id='photoProfile' src={icon} alt='photoProfile'/>
                <h5>Abhinandan Thour</h5>
                <p>abhinandanthour2001@gmail.com</p>  
            </div>
            <div id="userSocial">
                <h5>Contact me at:</h5>
                <div className="social" id="gitHub">
                    <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo"/>
                    <a href="https://github.com/Bh00fie">GitHub</a>
                </div>
                <div className="social" id="LinkedIn">
                    <img src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg" alt="LinkedIn Logo"/>
                    <a href="https://www.linkedin.com/in/abhinandan-thour-42359b193/">LinkedIn</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
