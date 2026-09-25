import React from "react"
import "../generalStyling.css"

function UserInfo({ fullName, positionName, companyName, onNameChange, onPositionChange, onCompanyChange, showErrors }) {
    const invalid = (value) => (showErrors && !value.trim()) || undefined;

    return (
        <section className="form-section" aria-labelledby="details-heading">
            <div className="section-heading">
                <span className="step" aria-hidden="true">1</span>
                <div>
                    <h2 id="details-heading">About the role</h2>
                    <p>Who you are and where you're applying.</p>
                </div>
            </div>
            <div className="field-grid">
                <label className="field" htmlFor="fullName">
                    <span className="field-label">Full name</span>
                    <input
                        className="input"
                        id="fullName"
                        placeholder="Jane Doe"
                        type="text"
                        name="user_name"
                        autoComplete="name"
                        maxLength={200}
                        onChange={(e) => onNameChange(e.target.value)}
                        value={fullName}
                        aria-invalid={invalid(fullName)}
                        required
                    />
                </label>
                <label className="field" htmlFor="position">
                    <span className="field-label">Position</span>
                    <input
                        className="input"
                        id="position"
                        placeholder="Software Engineer"
                        type="text"
                        name="user_position"
                        autoComplete="organization-title"
                        maxLength={200}
                        onChange={(e) => onPositionChange(e.target.value)}
                        value={positionName}
                        aria-invalid={invalid(positionName)}
                        required
                    />
                </label>
                <label className="field" htmlFor="company">
                    <span className="field-label">Company</span>
                    <input
                        className="input"
                        id="company"
                        placeholder="Acme Ltd"
                        type="text"
                        name="user_company"
                        autoComplete="off"
                        maxLength={200}
                        onChange={(e) => onCompanyChange(e.target.value)}
                        value={companyName}
                        aria-invalid={invalid(companyName)}
                        required
                    />
                </label>
            </div>
        </section>
    );
}

export default UserInfo;
