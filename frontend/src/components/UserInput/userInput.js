import React, { useEffect, useRef, useState } from "react";
import UserInfo from './personalInfo';
import CV from './cvSection';
import JobDescription from './jobDescriptionSection';
import Submit from "./submitButton";
import CoverLetterResult from "./coverLetterResult";

const LANGUAGES = [
    ["english", "English"],
    ["french", "French"],
    ["italian", "Italian"],
    ["spanish", "Spanish"],
    ["portuguese", "Portuguese"],
    ["chinese", "Chinese"],
    ["japanese", "Japanese"],
    ["arabic", "Arabic"],
    ["filipino", "Filipino"],
];

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
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showErrors, setShowErrors] = useState(false);
    const [result, setResult] = useState(null); // { text, positionName, companyName }
    const resultRef = useRef(null);
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

    // Bring the loading skeleton / finished letter into view
    useEffect(() => {
        if ((loading || result) && resultRef.current && resultRef.current.scrollIntoView) {
            resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [loading, result]);

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (loading) return; // Already generating

        const payload = {
            fullName: userInformation.fullName.trim(),
            positionName: userInformation.positionName.trim(),
            companyName: userInformation.companyName.trim(),
            cv: CVInformation.CVValue.trim(),
            jobDescription: JDInformation.JDValue.trim(),
            language: selectedLanguage,
        };
        if (Object.values(payload).some((value) => !value)) {
            setShowErrors(true);
            setErrorMessage("Please fill in your name, position, company, CV and job description.");
            return;
        }

        setShowErrors(false);
        setErrorMessage("");
        setLoading(true);
        try {
            const coverLetter = await generateCoverLetter(payload);
            setResult({ text: coverLetter, positionName: payload.positionName, companyName: payload.companyName });
        } catch (error) {
            console.error('Error generating cover letter:', error.message);
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <form id="generatorForm" onSubmit={handleSubmit} noValidate>
                <UserInfo 
                fullName={userInformation.fullName}
                positionName={userInformation.positionName}
                companyName={userInformation.companyName}
                onNameChange={(value) => handleUserInfoChange("fullName", value)}
                onPositionChange={(value) => handleUserInfoChange("positionName", value)}
                onCompanyChange={(value) => handleUserInfoChange("companyName", value)}
                showErrors={showErrors}
                />
                <CV 
                CVValue={CVInformation.CVValue}
                onCVChange={handleCVChange}
                showErrors={showErrors} />
                <JobDescription
                JDValue={JDInformation.JDValue}
                onJDChange={handleJDChange}
                showErrors={showErrors} />

                {/* Language selection dropdown */}
                <div id="selectLanguage">
                    <select id="language" aria-label="Language" value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
                        {LANGUAGES.map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>
                </div>

                <Submit loading={loading} />

                {errorMessage && <p className="callout callout-error" role="alert">{errorMessage}</p>}
            </form>

            <div ref={resultRef} id="result" aria-live="polite">
                {loading ? (
                    <CoverLetterResult.Skeleton />
                ) : (
                    result && (
                        <CoverLetterResult
                            key={result.text}
                            initialText={result.text}
                            positionName={result.positionName}
                            companyName={result.companyName}
                        />
                    )
                )}
            </div>
        </>
    );
}

export default UserInput;
