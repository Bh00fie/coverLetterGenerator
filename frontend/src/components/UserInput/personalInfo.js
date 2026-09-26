import React from "react"
import "../generalStyling.css"

function UserInfo({ fullName, positionName, companyName, onNameChange, onPositionChange, onCompanyChange, showErrors }) {
    const invalid = (value) => (showErrors && !value.trim()) || undefined;

    return (
        <div id='personalInfoInput'>
            <input
                className='input'
                id='fullName'
                aria-label='Full name'
                placeholder='Full Name'
                type='text'
                name='user_name'
                autoComplete='name'
                maxLength={200}
                onChange={(e) => onNameChange(e.target.value)}
                value={fullName}
                aria-invalid={invalid(fullName)}
                required
            />
            <input
                className='input'
                id='position'
                aria-label='Position'
                placeholder='Position'
                type='text'
                name='user_position'
                autoComplete='organization-title'
                maxLength={200}
                onChange={(e) => onPositionChange(e.target.value)}
                value={positionName}
                aria-invalid={invalid(positionName)}
                required
            />
            <input
                className='input'
                id='company'
                aria-label='Company'
                placeholder='Company Name'
                type='text'
                name='user_company'
                autoComplete='off'
                maxLength={200}
                onChange={(e) => onCompanyChange(e.target.value)}
                value={companyName}
                aria-invalid={invalid(companyName)}
                required
            />
        </div>
    );
}

export default UserInfo;
