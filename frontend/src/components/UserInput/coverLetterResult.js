import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "../generalStyling.css";

// Turns "Acme Ltd" into a safe file name like "Cover Letter - Acme Ltd.txt"
function fileNameFor(companyName) {
    const safe = companyName.replace(/[\\/:*?"<>|]+/g, "").trim();
    return safe ? `Cover Letter - ${safe}.txt` : "Cover Letter.txt";
}

function CoverLetterResult({ initialText, positionName, companyName }) {
    const [text, setText] = useState(initialText);
    const [copied, setCopied] = useState(false);
    const textareaRef = useRef(null);

    // Grow the textarea with its content so the letter reads like a document, not a scroll box
    useLayoutEffect(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
    }, [text]);

    useEffect(() => {
        if (!copied) return undefined;
        const timer = setTimeout(() => setCopied(false), 2000);
        return () => clearTimeout(timer);
    }, [copied]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (e) {
            // Fallback for browsers without the async clipboard API
            textareaRef.current.select();
            document.execCommand("copy");
        }
        setCopied(true);
    };

    const handleDownload = () => {
        const blob = new Blob([text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileNameFor(companyName);
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <>
            <article className="result-card">
                <header className="result-header">
                    <div>
                        <h2>Your cover letter</h2>
                        <p>{positionName} · {companyName}</p>
                    </div>
                    <div className="result-actions">
                        <button type="button" className="button button-secondary" onClick={handleCopy}>
                            {copied ? "Copied" : "Copy"}
                        </button>
                        <button type="button" className="button button-primary" onClick={handleDownload}>
                            Download
                        </button>
                    </div>
                </header>
                <textarea
                    ref={textareaRef}
                    className="letter"
                    aria-label="Generated cover letter"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    spellCheck="true"
                />
            </article>
            <p className="result-hint">You can edit the letter above before copying or downloading it.</p>
        </>
    );
}

CoverLetterResult.Skeleton = function Skeleton() {
    return (
        <div className="result-card" aria-busy="true">
            <div className="skeleton">
                <p className="skeleton-status">
                    <span className="spinner" aria-hidden="true" />
                    Writing your cover letter…
                </p>
                <div className="skeleton-line short" />
                {Array.from({ length: 9 }, (_, i) => (
                    <div key={i} className="skeleton-line" />
                ))}
            </div>
        </div>
    );
};

export default CoverLetterResult;
