import React from "react";
import "./generalStyling.css";

const QUESTIONS = [
    {
        question: "How does the AI cover letter generator work?",
        answer: "Enter your name, the position and the company, then paste your CV and the job description. The AI matches your experience and skills to the role and writes a tailored cover letter of about 250–350 words that you can edit, copy or download.",
    },
    {
        question: "Is it free?",
        answer: "Yes. You can generate cover letters without paying or creating an account.",
    },
    {
        question: "Which languages are supported?",
        answer: "English, French, Italian, Spanish, Portuguese, Chinese, Japanese, Arabic and Filipino.",
    },
    {
        question: "What happens to my CV?",
        answer: "Your CV and the job description are sent to OpenAI to write the letter. This site does not save them.",
    },
];

// Same Q&A as FAQPage structured data, so search engines can show it as rich results
const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: QUESTIONS.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
    })),
};

function Faq() {
    return (
        <section id="faq" aria-labelledby="faq-heading">
            <h2 id="faq-heading">Frequently asked questions</h2>
            {QUESTIONS.map(({ question, answer }) => (
                <details key={question} className="faqItem">
                    <summary>{question}</summary>
                    <p>{answer}</p>
                </details>
            ))}
            <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        </section>
    );
}

export default Faq;
