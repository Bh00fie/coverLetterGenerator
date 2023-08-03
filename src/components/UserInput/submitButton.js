import React from "react"
import "./submitButton.css"

function Submit({onSubmitClick}) {

    return (
        <div id="submitSection">
            <button id='submitButton' type = "button" onClick={onSubmitClick}> Generate </button>
        </div>
    );
}

export default Submit;