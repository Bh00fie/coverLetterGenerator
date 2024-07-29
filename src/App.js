import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserInput from './components/UserInput/userInput';
import Footer from './components/footer';
import InitialSection from './components/initialSection';
import Registration from './components/UserInput/createAccount/RegistrationAccount';
import Login from './components/UserInput/createAccount/LoginAccount';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                {/* Define routes for each page */}
                <Route path="/" element={<><InitialSection /> <UserInput/> <Footer /></>} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
