import React from "react"
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./createAccount.css"
import logo from "../images/logo.png"

function Registration(){
    return (
        <div>
            <a href="/">
                <img id="logoCoverLetter" src={logo} alt="website icon" />
            </a>
            <div id="registrationInput">
                <div id="registrationForm">
                <p id="fontRegistration">Register</p>
                    <input
                        className='input'
                        id='userName'
                        placeholder='Username'
                        type='text'
                        name='user_name'
                        required
                        />
                    <input
                        className='input'
                        id='email'
                        placeholder='Email'
                        type='text'
                        name='user_name'
                        required
                        />
                    <input
                        className='input'
                        id='password'
                        placeholder='Password'
                        type='text'
                        name='user_name'
                        required
                        />
                    <button id='RegistrationButton' className="generalButton" type = "button"> Create an account </button>
                    <p id="orAccount">or</p>
                    <Link to="/login">
                        <button id='LoginButtonChange' className="generalButton" type="button"> Login! </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Registration