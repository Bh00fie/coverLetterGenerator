import React from "react"
import "../generalStyling.css"

function Submit({ loading }) {
    return (
        <div id="submitSection">
            <button id="submitButton" className="generalButton" type="submit" disabled={loading}>
                {loading ? (
                    <>
                        <span className="spinner" aria-hidden="true" />
                        Generating…
                    </>
                ) : (
                    "Generate"
                )}
            </button>
        </div>
    );
}

export default Submit;
