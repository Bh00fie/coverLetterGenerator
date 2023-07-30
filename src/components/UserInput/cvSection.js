import React, { useState } from "react";
import "./cvSection.css";

function CV() {
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
        <textarea className="CVSection" id="CVtext" name="CV" placeholder="CV" required />
        <div className="CVSection" id="CVAttach">
          <input
            type="file"
            name="CVfile"
            id="CVfile"
            className="inputfile"
            data-multiple-caption="{count} files selected"
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
