import React, {useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserInput from './components/UserInput/userInput';
import Footer from './components/footer';
import InitialSection from './components/initialSection';
import Registration from './components/createAccount/RegistrationAccount';
import Login from './components/createAccount/LoginAccount';
import '@fortawesome/fontawesome-free/css/all.css';


import './App.css';

function App() {
    const [theme, setTheme] = useState('light'); // Default theme

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.body.setAttribute('data-theme', savedTheme); // Set body attribute
      }, []);
    
      const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.body.setAttribute('data-theme', newTheme);
      };

    return (
        <Router>
            {/* Theme Toggle Button */}
            <div className="theme-toggle">
                <button className="theme-toggle" onClick={toggleTheme}>
                    <i className={theme === 'light' ? 'fas fa-sun' : 'fas fa-moon'}></i>
                </button>
            </div>
            <Routes>
                {/* Define routes for each page */}
                <Route path="/" element={<><InitialSection /> <UserInput/></>} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/login" element={<Login />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
