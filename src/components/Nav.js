import React, { useState, useEffect, useRef } from "react";
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
  const closeMobileMenu = () => setClick(false);

  let avatar = (
    <img
      className="nav-avatar"
      src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png"
      alt="Netflix Avatar"
    />
  );

  let logo = (
    <img
      className="nav-logo"
      src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
      alt="Netflix Logo"
    />
  );

  function NavItem(props) {
    const [open, setOpen] = useState(false);
    return (
      <li className="nav-item">
        <a href="#" className="nav-link" onClick={() => setOpen(!open)}>
          {props.link}
        </a>
        {open && props.children}
      </li>
    );
  }

  function DropdownMenu() {
    const [activeMenu, setActiveMenu] = useState("main");
    const dropdownRef = useRef(null);

    function DropdownItem(props) {
      return (
        <a
          href="#"
          className="menu-item"
          onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
        >
          <span className="icon-avatar">{props.leftIcon}</span>
          {props.children}
        </a>
      );
    }

    return (
      <div className="dropdown" ref={dropdownRef}>
        <div className="menu">
          <DropdownItem leftIcon={avatar} goToMenu="profile">
            John Brown
          </DropdownItem>
          <DropdownItem goToMenu="help">Help Centre</DropdownItem>
          <DropdownItem goToMenu="signout">Sign out of Netflix</DropdownItem>
        </div>
      </div>
    );
  }

  return (
    <div className={`nav ${handleShowNav ? "nav-black" : ""}`}>
      <div className="nav-container">
        <NavItem link={logo} />
        <div className="menu-icons" onClick={() => setClick(!click)}>
          {click ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <NavItem link="Home" />
          <NavItem link="Series" />
          <NavItem link="Films" />
          <NavItem link={avatar}>
            <DropdownMenu></DropdownMenu>
          </NavItem>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
