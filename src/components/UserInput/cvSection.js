import React, { useState } from "react";
import "./cvSection.css";

function CV() {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const input = e.target;

    let newFileName = "";
    if (input.files && input.files.length > 0) {
      newFileName = input.files[0].name;
    }

    setFileName(newFileName); // Set the state with the new file name
  };

  return (
    <div id="CVInput">
      <div id="CVInfoInput">
        <textarea className="CVSection" id="CVtext" name="CV" placeholder="CV" required />
        <div className="CVSection" id="CVAttach">
          <input
            type="file"
            name="file"
            id="file"
            className="inputfile"
            data-multiple-caption="{count} files selected"
            multiple
            onChange={handleFileChange}
          />
          <label htmlFor="file" id="fileUpload">
            {fileName ? (
              <span>{fileName}</span>
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
