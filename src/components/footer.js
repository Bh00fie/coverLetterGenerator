import React from "react"
import "./footer.css"
import icon from './images/icon.png'
import { SocialIcon } from 'react-social-icons/component'
import 'react-social-icons/github'
import 'react-social-icons/linkedin'

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
                <div>
                    <SocialIcon className="socialIcons" url="https://github.com/Bh00fie" />
                    <SocialIcon className="socialIcons" url="https://www.linkedin.com/in/abhinandanthour/"/>
                </div>
            </div>
        </footer>

    );
}

export default Footer;
