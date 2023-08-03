import React from "react"
import "./personalInfo.css"

function UserInfo({ fullName, positionName, companyName, onNameChange, onPositionChange, onCompanyChange }) {

    return (
        <div id="personalInput">
            <div id='personalInfoInput'>
                <input
                    className='input'
                    id='userName'
                    placeholder='Full Name'
                    type='text'
                    name='user_name'
                    onChange={(e) => onNameChange(e.target.value)}
                    value={fullName}
                    required
                />
                <input
                    className='input'
                    id='userPosition'
                    placeholder='Position'
                    type='text'
                    name='user_position'
                    onChange={(e) => onPositionChange(e.target.value)}
                    value={positionName}
                    required
                />
                <input
                    className='input'
                    id='userCompany'
                    placeholder='Company Name'
                    type='text'
                    name='user_company'
                    onChange={(e) => onCompanyChange(e.target.value)}
                    value={companyName}
                    required
                />
            </div>
        </div>
    );
}

export default UserInfo;