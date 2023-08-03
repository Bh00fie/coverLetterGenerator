import React from "react";
import UserInfo from './personalInfo';
import CV from './cvSection';
import JobDescription from './jobDescriptionSection';
import Submit from "./submitButton";


function UserInput() {
    return (
        <form>
            <UserInfo />
            <CV />
            <JobDescription />
            <Submit/>
        </form>
    );
}

export default UserInput;