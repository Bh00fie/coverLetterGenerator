import React from "react"
import "./submitButton.css"

function Submit({onSubmitClick}) {

    return (
        <div id="submitSection">
            <button id='submitButton' className="generalButton" type = "button" onClick={onSubmitClick}> Generate </button>
        </div>
    );
}

export default Submit;