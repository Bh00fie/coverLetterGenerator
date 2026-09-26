import React from "react"
import "./generalStyling.css"
import icon from './images/icon.png'
import { SocialIcon } from 'react-social-icons/component'
import 'react-social-icons/github'
import 'react-social-icons/linkedin'

const iconStyle = { width: 44, height: 44 };

function Footer() {
    return (
        <footer>
            <div id="footerAuthor">
                <img id="photoProfile" src={icon} alt="Profile avatar" width="96" height="96" />
            </div>
            <div id="userSocial">
                <h5>Contact me at:</h5>
                <div>
                    <SocialIcon className="socialIcons" url="https://github.com/Bh00fie" label="GitHub" style={iconStyle} target="_blank" rel="noopener noreferrer" />
                    <SocialIcon className="socialIcons" url="https://www.linkedin.com/in/abhinandanthour/" label="LinkedIn" style={iconStyle} target="_blank" rel="noopener noreferrer" />
                </div>
            </div>
        </footer>
    );
}

export default Footer;
