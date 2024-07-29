import React from "react"
import "../generalStyling.css"

function Submit({onSubmitClick}) {

    return (
        <div id="submitSection">
            <button id='submitButton' className="generalButton" type = "button" onClick={onSubmitClick}> Generate </button>
        </div>
    );
}

export default Submit;