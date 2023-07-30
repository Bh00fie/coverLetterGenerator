import React from 'react';
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';

// Building Functions
import InitialSection from './components/initialSection'
import UserInput from './components/UserInput/userInput';
import Output from './components/output';
import Footer from './components/footer'

// Importing General Styling
import './App.css';


function App() {
  return (
    <router>
       <InitialSection/>
       <UserInput/>
       <Output/>
       <Footer/>
    </router>
  );
}

export default App;
