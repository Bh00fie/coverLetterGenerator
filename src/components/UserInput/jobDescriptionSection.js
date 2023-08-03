import React, { useState } from "react";
import "./jobDescriptionSection.css"

function JobDescription({CVValue, onCVChange}) {

    const [JDfileName, setFileName] = useState("");

    const JDhandleFileChange = (e) => {
      const JDinput = e.target;
  
      let JDnewFileName = "";
      if (JDinput.files && JDinput.files.length > 0) {
        JDnewFileName = JDinput.files[0].name;
      }
  
      setFileName(JDnewFileName); // Set the state with the new file name
    };
    
    return (
        <div id="JDInput">
          <div id="JDInfoInput">
                <textarea 
                className="JDSection" 
                id="JDtext" 
                name="JD" 
                placeholder="Job Description"
                onChange={(e) => onCVChange(e.target.value)}
                value={CVValue} 
                required />
            <div className="JDSection" id="JDAttach">
              <input
                type="file"
                name="JDfile"
                id="JDfile"
                className="inputfile"
                accept=".pdf,.doc,.docx"
                multiple
                onChange={JDhandleFileChange}
                required
              />
              <label htmlFor="JDfile" id="JDfileUpload">
                {JDfileName ? (
                  <span>{JDfileName}</span>
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

export default JobDescription;