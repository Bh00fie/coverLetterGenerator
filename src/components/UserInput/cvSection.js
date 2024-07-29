import React, { useState } from "react";
import "../generalStyling.css";

function CV({CVValue, onCVChange}) {
  const [CVfileName, setFileName] = useState("");

  const CVhandleFileChange = (e) => {
    const CVinput = e.target;

    let CVnewFileName = "";
    if (CVinput.files && CVinput.files.length > 0) {
      CVnewFileName = CVinput.files[0].name;
    }

    setFileName(CVnewFileName); // Set the state with the new file name
  };

  return (
    <div id="CVInput">
      <div id="CVInfoInput">
            <textarea 
            className="CVSection" 
            id="CVtext" 
            name="CV" 
            placeholder="CV" 
            onChange={(e) => onCVChange(e.target.value)}
            value={CVValue}
            required />
        <div className="CVSection" id="CVAttach">
          <input
            type="file"
            name="CVfile"
            id="CVfile"
            className="inputfile"
            accept=".pdf,.doc,.docx"
            multiple
            onChange={CVhandleFileChange}
          />
          <label htmlFor="CVfile" id="CVfileUpload">
            {CVfileName ? (
              <span>{CVfileName}</span>
            ) : (
              <>
                Choose a file<span></span>
              </>
            )}
          </label>
        </div>
      </div>
    </div>
  );
}

export default CV;
