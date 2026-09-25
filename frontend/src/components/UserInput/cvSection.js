import React from "react";
import "../generalStyling.css";

function CV({ CVValue, onCVChange, showErrors }) {
  return (
    <section className="form-section" aria-labelledby="cv-heading">
      <div className="section-heading">
        <span className="step" aria-hidden="true">2</span>
        <div>
          <h2 id="cv-heading">Your CV</h2>
          <p>Paste the text of your CV: experience, education and skills.</p>
        </div>
      </div>
      <textarea
        className="input textarea"
        id="CVtext"
        name="CV"
        aria-labelledby="cv-heading"
        placeholder="Paste your CV here…"
        rows={9}
        maxLength={20000}
        onChange={(e) => onCVChange(e.target.value)}
        value={CVValue}
        aria-invalid={(showErrors && !CVValue.trim()) || undefined}
        required
      />
    </section>
  );
}

export default CV;
