import React from "react";
import UserInfo from './personalInfo';
import CV from './cvSection';
import JobDescription from './jobDescriptionSection';

function UserInput() {
    return (
        <div>
            <UserInfo />
            <CV />
            <JobDescription />
        </div>
    );
}

export default UserInput;