import React from "react";
import "../generalStyling.css";

function CV({ CVValue, onCVChange, showErrors }) {
  return (
    <textarea
      className="input"
      id="CVtext"
      name="CV"
      aria-label="Your CV"
      placeholder="CV"
      maxLength={20000}
      onChange={(e) => onCVChange(e.target.value)}
      value={CVValue}
      aria-invalid={(showErrors && !CVValue.trim()) || undefined}
      required
    />
  );
}

export default CV;
