import React, { useState } from "react";
import UserInfo from './personalInfo';
import CV from './cvSection';
import JobDescription from './jobDescriptionSection';
import Submit from "./submitButton";

// Generates the cover letter via the serverless function so the OpenAI key stays server-side
async function generateCoverLetter(payload) {
    const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(result.error || "Failed to generate the cover letter. Please try again later.");
    }
    return result.coverLetter;
}


function UserInput() {
    
    // Defining variables
    const [showPopup, setShowPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [userInformation, setUserInformation] = useState({
        fullName: "",
        positionName: "",
        companyName: ""
    });
    const [JDInformation, setJDInformation] = useState({
        JDValue: ""
    });
    const [CVInformation, setCVInformation] = useState({
        CVValue: ""
    });

    const [selectedLanguage, setSelectedLanguage] = useState("english"); // Default language is English

    const handleLanguageChange = (e) => {
        setSelectedLanguage(e.target.value);
    };

    // Handle form changes 
    const handleUserInfoChange = (fieldName, value) => {
        setUserInformation(prevInfo => ({
            ...prevInfo,
            [fieldName]: value
        }));
    };
    const handleJDChange = (value) => {
        setJDInformation(prevInfo => ({
            ...prevInfo,
            JDValue: value
        }));
    }
    const handleCVChange = (value) => {
        setCVInformation(prevInfo => ({
            ...prevInfo,
            CVValue: value
        }));
    }

    const handleGenerateClick = async () => {
        if (showPopup) return; // Already generating

        const payload = {
            fullName: userInformation.fullName.trim(),
            positionName: userInformation.positionName.trim(),
            companyName: userInformation.companyName.trim(),
            cv: CVInformation.CVValue.trim(),
            jobDescription: JDInformation.JDValue.trim(),
            language: selectedLanguage,
        };
        if (Object.values(payload).some((value) => !value)) {
            setErrorMessage("Please fill in your name, position, company, CV and job description.");
            return;
        }

        setErrorMessage("");
        setShowPopup(true);
        try {
            const coverLetter = await generateCoverLetter(payload);

            const blob = new Blob([coverLetter], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'coverLetter.txt';
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error generating cover letter:', error.message);
            setErrorMessage(error.message);
        } finally {
            setShowPopup(false);
        }
    };


    return (
        <form>
            <UserInfo 
            fullName={userInformation.fullName}
            positionName={userInformation.positionName}
            companyName={userInformation.companyName}
            onNameChange={(value) => handleUserInfoChange("fullName", value)}
            onPositionChange={(value) => handleUserInfoChange("positionName", value)}
            onCompanyChange={(value) => handleUserInfoChange("companyName", value)}
            />
            <CV 
            CVValue={CVInformation.CVValue}
            onCVChange = {(value) => handleCVChange(value)} />
            <JobDescription
            JDValue={JDInformation.JDValue}
            onJDChange = {(value) => handleJDChange(value)} />

            {/* Language selection dropdown */}
            <div id="selectLanguage">
                <select id="language" value={selectedLanguage} onChange={handleLanguageChange}>
                    <option value="english">English</option>
                    <option value="french">French</option>
                    <option value="italian">Italian</option>
                    <option value="spanish">Spanish</option>
                    <option value="portuguese">Portuguese</option>
                    <option value="chinese">Chinese</option>
                    <option value="japanese">Japanese</option>
                    <option value="arabic">Arabic</option>
                    <option value="filipino">Filipino</option>
                </select>
            </div>

            {showPopup && (
                <div id="userWait">
                    <div className="popup">
                        <p>Generating cover letter...</p>
                    </div>
                </div>
            )}

            {errorMessage && <p id="generateError" role="alert">{errorMessage}</p>}

            <Submit onSubmitClick={handleGenerateClick} />
        </form>
    );
}

export default UserInput;


