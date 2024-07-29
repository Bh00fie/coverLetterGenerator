import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./createAccount.css";
import logo from "../images/logo.png";

function Login() {
    return (
        <div>
            <Link to="/">
                <img id="logoCoverLetter" src={logo} alt="website icon" />
            </Link>
            <div id="loginInput">
                <div id="loginForm">
                    <p id="fontLogin">Login</p>
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
                    <button id='LoginButton' className="generalButton" type="button"> Login! </button>
                    <p id="orAccount">or</p>
                    <Link to="/registration">
                        <button id='RegisterButtonChange' className="generalButton" type="button"> Create an account! </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
