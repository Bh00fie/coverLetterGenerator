import React, { useState } from "react";
import UserInfo from './personalInfo';
import CV from './cvSection';
import JobDescription from './jobDescriptionSection';
import Submit from "./submitButton";
import { OpenAIApi, Configuration } from "openai";


// Function to generate a cover letter using GPT-3
async function generateChatResponse(userRequest) {
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

        const userRequest = `My name is ${userInformation.fullName}, I am looking for job as ${userInformation.positionName} for ${userInformation.companyName}, and I would like you to help me write a cover letter that uses my past experiences and my technical skills in my CV and the job description of the position that I'm applying for to make a tailored cover letter (IT MUST NOT BE AN EMAIL). The cover letter must be less than one page so it must be maximum 250 to 350 words or 4-5 paragraphs. 
        My CV is: 
        ${CVInformation.CVValue}
        
        The job description is: 
        ${JDInformation.JDValue}`;


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


