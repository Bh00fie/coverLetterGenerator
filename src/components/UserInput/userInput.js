import React, {useState} from "react";
import UserInfo from './personalInfo';
import CV from './cvSection';
import JobDescription from './jobDescriptionSection';
import Submit from "./submitButton";


function UserInput() {

    const [userInformation, setUserInformation] = useState({
        fullName: "",
        positionName: "",
        companyName: ""
    });

    const handleUserInfoChange = (fieldName, value) => {
        setUserInformation(prevInfo => ({
            ...prevInfo,
            [fieldName]: value
        }));
    };

    const handleGenerateClick = () => {
        console.log("User Information:", userInformation);
    };


    return (
        <form>
            <UserInfo 
            fullName={userInformation.fullName}
            positionName={userInformation.positionName}
            companyName={userInformation.companyName}
            onNameChange={(value) => handleUserInfoChange("fullName", value)}
            onPositionChange={(value) => handleUserInfoChange("positionName", value)}
            onCompanyChange={(value) => handleUserInfoChange("companyName", value)}/>
            <CV />
            <JobDescription />
            <Submit onSubmitClick={handleGenerateClick} />
        </form>
    );
}

export default UserInput;