import React, { useState } from "react";
import UserInfo from './personalInfo';
import CV from './cvSection';
import JobDescription from './jobDescriptionSection';
import Submit from "./submitButton";
import { OpenAIApi, Configuration } from "openai";

// Function to generate a cover letter using GPT-3
async function generateChatResponse(userRequest, language) {
    try {
        const configuration = new Configuration({
            apiKey: process.env.REACT_APP_API_KEY,
        });

        const openai = new OpenAIApi(configuration);

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: userRequest,
                },
            ],
            temperature: 0.8,
            max_tokens: 1000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            language: language
        });

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error generating chat response:', error.response ? error.response.data : error.message);
        throw new Error('Failed to generate chat response. Please try again later.');
    }
}


function UserInput() {
    
    // Defining variables
    const [showPopup, setShowPopup] = useState(false);
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

    // Show submitted info in the console
    const handleGenerateClick = async () => {
        setShowPopup(true);
        console.log("User Information:", userInformation);
        console.log("CV Information:", CVInformation);
        console.log("JD Information:", JDInformation);
    
        const userRequest = `My name is ${userInformation.fullName}, I am looking for job as ${userInformation.positionName} for ${userInformation.companyName}, and I would like you to help me write a cover letter that uses my past experiences and my technical skills in my CV and the job description of the position that I'm applying for to make a tailored cover letter (IT MUST NOT BE AN EMAIL). The cover letter must be less than one page so it must be maximum 250 to 350 words or 4-5 paragraphs. Make sure to also answer these questions: why are you interested in this job? How will it enhance your career? What about this company sets them apart? What have you specifically achieved that others haven't, and how will that serve you in this job?
        My CV is:
        ${CVInformation.CVValue}
    
        The job description is:
        ${JDInformation.JDValue}
        
        The cover letter must be written in ${selectedLanguage}.`;
    
        console.log(userRequest);
    
        try {
            const coverLetter = await generateChatResponse(userRequest);
            console.log('Generated Cover Letter:\n', coverLetter);
    
            const blob = new Blob([coverLetter], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'coverLetter.txt';
            a.click();
            URL.revokeObjectURL(url);
    
            setShowPopup(false);
        } catch (error) {
            console.error('Error generating or saving cover letter:', error.message);
            // Notify the user about the error
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
                    <option value="Arabic">Arabic</option>
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

            <Submit onSubmitClick={handleGenerateClick} />
        </form>
    );
}

export default UserInput;


