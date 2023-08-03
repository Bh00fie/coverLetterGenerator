import React, {useState} from "react"
import "./personalInfo.css"

function UserInfo() {
    const [fullName, setFullName] = useState("");
    const [positionName, setPositionName] = useState("");
    const [companyName, setCompanyName] = useState("");

    function userName (event) {
        const nameInput = event.target.value;
        setFullName(nameInput);
        console.log(fullName);
    }
    function userPosition (event) {
        const positionInput = event.target.value;
        setPositionName(positionInput);
        console.log(positionName);
    }
    function userCompany (event) {
        const companyInput = event.target.value;
        setCompanyName(companyInput);
        console.log(companyName);
    }


    return (
        <div id="personalInput">
            <div id='personalInfoInput'>
                <input className='input' id='userName' placeholder='Full Name' type='text' name='user_name' onChange={userName} value={fullName} required/>
                <input className='input' id='userPosition' placeholder='Position' type='text' name='user_position' 
                onChange={userPosition} value={positionName} required/>
                <input className='input' id='userCompany' placeholder='Company Name' type='text' name='user_company' onChange={userCompany} value={companyName} required/>
            </div>
        </div>
    );
}

export default UserInfo;