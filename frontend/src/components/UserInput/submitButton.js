import React from "react"
import "../generalStyling.css"

function Submit({ loading }) {
    return (
        <button id="submitButton" className="button button-primary button-large" type="submit" disabled={loading}>
            {loading ? (
                <>
                    <span className="spinner" aria-hidden="true" />
                    Generating…
                </>
            ) : (
                "Generate cover letter"
            )}
        </button>
    );
}

export default Submit;
