import React from "react"
import "./generalStyling.css"
import icon from './images/icon.png'
import { SocialIcon } from 'react-social-icons/component'
import 'react-social-icons/github'
import 'react-social-icons/linkedin'

const iconStyle = { width: 36, height: 36 };

function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-inner">
                <div className="footer-author">
                    <img className="footer-avatar" src={icon} alt="" width="40" height="40" />
                    <p className="footer-name">Made by Abhinandan Thour</p>
                </div>
                <div className="footer-social">
                    <SocialIcon className="social-icon" url="https://github.com/Bh00fie" label="GitHub" bgColor="transparent" fgColor="currentColor" style={iconStyle} target="_blank" rel="noopener noreferrer" />
                    <SocialIcon className="social-icon" url="https://www.linkedin.com/in/abhinandanthour/" label="LinkedIn" bgColor="transparent" fgColor="currentColor" style={iconStyle} target="_blank" rel="noopener noreferrer" />
                </div>
            </div>
        </footer>
    );
}

export default Footer;
