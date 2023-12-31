import React from 'react';

// Building Functions
import InitialSection from './components/initialSection'
import UserInput from './components/UserInput/userInput';
import Footer from './components/footer'

// Importing General Styling
import './App.css';


function App() {
  return (
    <div>
       <InitialSection/>
       <UserInput/>
       <Footer/>
    </div>
  );
}

export default App;
