import React from "react";
import "./NavStyle.css";

const PageNav = () => {
  return (
    <div className="container">
      <header className="header">
        <div className="line-1">
          <div className="navbar-right">
            <img
              className="indian-flag"
              alt="Indian flag"
              src="/images/indian-flag.png"
            />
            <p className="Mainlink>">
              <a
                className="NATIONAL-PORTAL-OF"
                href="https://www.india.gov.in/">
                {" "}
                NATIONAL PORTAL OF INDIA
              </a>
            </p>
            <div className="space_karo">
              <a href="https://twitter.com/NITIAayog">
                <img
                  className="aa twitter"
                  alt="Twitter"
                  src="/images/twitter.png"
                />
              </a>
              <a href="https://www.youtube.com/channel/UCdU0fFzTiX6Qr59Wr4uc4Lg">
                <img
                  className="aa youtube"
                  alt="Youtube"
                  src="/images/youtube.png"
                />
              </a>
              <a href="https://www.linkedin.com/company/nitiaayog/">
                <img
                  className="aa linkedin"
                  alt="Linkedin"
                  src="/images/linkedin.png"
                />
              </a>
              <a href="https://www.instagram.com/niti.aayog/">
                <img
                  className="aa instagram"
                  alt="Instagram"
                  src="/images/instagram.png"
                />
              </a>
              <a href="https://www.facebook.com/NITIAayog/">
                <img
                  className="aa facebook"
                  alt="Facebook"
                  src="/images/facebook.png"
                />
              </a>
            </div>
          </div>
          <div className="navbar-left"></div>
        </div>
        <div className="line-2">
          <div>
            <a href="https://www.india.gov.in/">
              <img className="img" alt=" " src="/images/image-5.png" />
            </a>
          </div>
          <h1 className="h-1">Internship Portal</h1>
          <div className="flex-left">
            <img className="image" alt=" " src="/images/image-6.png" />
          </div>
        </div>
      </header>
    </div>
  );
};
export default PageNav;
