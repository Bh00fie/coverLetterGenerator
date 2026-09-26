import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ThemeToggle from './components/themeToggle';
import UserInput from './components/UserInput/userInput';
import Footer from './components/footer';
import InitialSection from './components/initialSection';
import Faq from './components/faq';
import Registration from './components/createAccount/RegistrationAccount';
import Login from './components/createAccount/LoginAccount';

// index.html sets data-theme before first paint (saved choice or system preference)
function getInitialTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

function App() {
    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        try {
            localStorage.setItem('theme', newTheme);
        } catch (e) {
            // Storage can be unavailable (e.g. private mode); the toggle still works for this visit
        }
    };

    return (
        <Router>
            {/* Theme Toggle Button */}
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <main>
                <Routes>
                    {/* Define routes for each page */}
                    <Route path="/" element={<><InitialSection /><UserInput /><hr className="sectionDivider" /><Faq /></>} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
