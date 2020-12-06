import React, { useState, useEffect } from "react";
import "./Nav.css";
import { IconContext } from "react-icons/lib";
import { FaBars, FaTimes } from "react-icons/fa";

function Nav({ handleShowNav, setHandleShowNav, HandleLogOut }) {
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 700) {
        setHandleShowNav(true);
      } else {
        setHandleShowNav(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", setHandleShowNav(true));
    };
  }, []);

  const [click, setClick] = useState(false);

  const changeClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <IconContext.Provider value={{ color: "#ffffff" }}>
      <div className={`nav ${handleShowNav ? "nav-black" : ""}`}>
        <div className="nav-container container">
          <img
            className="nav-logo"
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix Logo"
          />
          <div className="menu-icons" onClick={changeClick}>
            {click ? <FaTimes /> : <FaBars />}
          </div>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-items">
              <p className="nav-links" onClick={HandleLogOut}>
                Log Out
              </p>
            </li>
            <li className="nav-items">
              <p className="nav-links">Home</p>
            </li>
            <li className="nav-items">
              <p className="nav-links">Series</p>
            </li>
            <img
              className="nav-avatar"
              src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png"
              alt="Netflix Avatar"
            />
          </ul>
        </div>
      </div>
    </IconContext.Provider>
  );
}

export default Nav;
