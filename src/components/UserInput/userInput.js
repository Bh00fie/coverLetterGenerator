import React, { useState } from "react";
import UserInfo from './personalInfo';
import CV from './cvSection';
import JobDescription from './jobDescriptionSection';
import Submit from "./submitButton";
import { OpenAIApi, Configuration } from "openai";
import OPENAI_API_KEY from "./apiKey";


// Function to generate a cover letter using GPT-3
async function generateChatResponse(userRequest) {
    try {
        const configuration = new Configuration({
            apiKey: OPENAI_API_KEY,
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
            temperature: 1,
            max_tokens: 1000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error generating chat response:', error);
        return null;
    }
}


function UserInput() {

    // Defining variables
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
        console.log("User Information:", userInformation);  
        console.log("CV Information:", CVInformation);
        console.log("JD Information:", JDInformation);

        const userRequest = `Hi there, I am creating writing a cover letter could you help me with this? my name is ${userInformation.fullName},  I am applying for the position of a ${userInformation.positionName} at ${userInformation.companyName}, my CV is: 
        ${CVInformation.CVValue}
        
        The job description is: 
        ${JDInformation.JDValue}
        
        Could you write me a cover letter that integrate my information and the job the description to show why I want to work for the company and why I am a good fit?
        
        Make that 4-5 paragraphs long and max 350 words`;


        console.log(userRequest);

        
        try {
            const coverLetter = await generateChatResponse(userRequest); // Change this line
            if (coverLetter) {
                console.log('Generated Cover Letter:', coverLetter);

                // Instead of writing to a file, you can create a downloadable link for the user.
                const blob = new Blob([coverLetter], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'coverLetter.txt';
                a.click();
                URL.revokeObjectURL(url);
            }
        } catch (error) {
            console.error('Error generating or saving cover letter:', error);
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

            <Submit onSubmitClick={handleGenerateClick} />
        </form>
    );
}

export default UserInput;


