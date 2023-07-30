import React from "react";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import UserInfo from './personalInfo';
import CV from './cvSection';
import JobDescription from './jobDescriptionSection';

function UserInput() {
    return (
        <Router>
            <UserInfo />
            <CV />
            <JobDescription />
        </Router>
    );
}

export default UserInput;