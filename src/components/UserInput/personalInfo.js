import React from "react"
import "./personalInfo.css"

function UserInfo() {
    return (
        <div id="personalInput">
            <div id='personalInfoInput'>
                <input className='input' id='userName' placeholder='Full Name' type='text' name='user_name' required/>
                <input className='input' id='userPosition' placeholder='Position' type='text' name='user_position' required/>
                <input className='input' id='userCompany' placeholder='Company Name' type='text' name='user_company' required/>
            </div>
        </div>
    );
}

export default UserInfo;