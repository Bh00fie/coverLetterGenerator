import React from "react";
import "../generalStyling.css"

function JobDescription({ JDValue, onJDChange, showErrors }) {
    return (
        <textarea
            className="input"
            id="JDtext"
            name="JD"
            aria-label="Job description"
            placeholder="Job Description"
            maxLength={20000}
            onChange={(e) => onJDChange(e.target.value)}
            value={JDValue}
            aria-invalid={(showErrors && !JDValue.trim()) || undefined}
            required
        />
    );
}

export default JobDescription;
