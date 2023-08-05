function generateUserRequest(userInformation, CVInformation, JDInformation) {
    const userRequest = `Hi there, I am creating writing a cover letter could you help me with this? my name is ${userInformation.fullName},  I am applying for the position of a ${userInformation.positionName} at ${userInformation.companyName}, my CV is: 
    ${CVInformation.CVValue}
    
    The job description is: 
    ${JDInformation.JDValue}
    
    Could you write me a cover letter that integrate my information and the job the description to show why I want to work for the company and why I am a good fit?
    
    Make that 4-5 paragraphs long and max 350 words`;

    return userRequest;
}

export { generateUserRequest };
