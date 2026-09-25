import React from "react";
import "../generalStyling.css"

function JobDescription({ JDValue, onJDChange, showErrors }) {
    return (
        <section className="form-section" aria-labelledby="jd-heading">
            <div className="section-heading">
                <span className="step" aria-hidden="true">3</span>
                <div>
                    <h2 id="jd-heading">Job description</h2>
                    <p>Paste the job advert you're applying for.</p>
                </div>
            </div>
            <textarea
                className="input textarea"
                id="JDtext"
                name="JD"
                aria-labelledby="jd-heading"
                placeholder="Paste the job description here…"
                rows={9}
                maxLength={20000}
                onChange={(e) => onJDChange(e.target.value)}
                value={JDValue}
                aria-invalid={(showErrors && !JDValue.trim()) || undefined}
                required
            />
        </section>
    );
}

export default JobDescription;
