import React from "react"
import "./output.css"

function Output() {

    return (
        <div id="outputSection">
            <button id='downloadButton' type = "button" onclick = "downloadFile()"> Download Cover Letter</button>
        </div>
    );
}

export default Output;