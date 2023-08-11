import React from "react";
import "./Foot_Style.css";

const PageFoot=()=>{
    return(
        
            <footer className="foot">
                 <div className="footergroup">
                    <div className="alltext">
                        <div className="NITI-aayog">
                          NITI Aayog, Government of India, Sansad Marg, New Delhi-110001.
                          <br />
                          Site designed and developed by National Informatics Centre, NITI Aayog Unit
                        </div>
                        <div className="for-any-feedback">
                          For any Feedback/Queries, Contact below:
                          <br />
                          Admin-IBrecruitment-niti@gov.in
                        </div>
                        <div className="for-website-related">
                          For Website related Issues, Contact Below:
                          <br />
                          nic-niti@gov.in
                        </div>
                    </div>    
                 </div> 
            </footer>
    
    )

}
export default PageFoot;