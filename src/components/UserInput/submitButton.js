import React from "react"
import "./submitButton.css"

function Submit() {

    return (
        <div id="submitSection">
            <button id='submitButton' type = "button" onclick = "downloadFile()"> Generate </button>
        </div>
    );
}

export default Submit;