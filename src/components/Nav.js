import React, { useState, useEffect, useRef } from "react";
import "./Nav.css";
import { IconContext } from "react-icons/lib";
import { FaBars, FaTimes } from "react-icons/fa";
import UseAuthListener from "./UseAuthListener";

function Nav({ showNav, setShowNav, HandleLogOut }) {
  const { user } = UseAuthListener();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 700) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", setShowNav(true));
    };
  }, []);

  const [click, setClick] = useState(false);
  const closeMobileMenu = () => setClick(false);

  let avatar = (
    <img className="nav-avatar" src={`./images/users/${user?.photoURL}.png`} alt="Netflix Avatar" />
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
        <p className="nav-link" onClick={() => setOpen(!open)}>
          {props.link}
        </p>
        {open && props.children}
      </li>
    );
  }

  function DropdownMenu() {
    const [activeMenu, setActiveMenu] = useState("main");
    const dropdownRef = useRef(null);

    function DropdownItem(props) {
      return (
        <a className="menu-item">
          <span className="icon-avatar">{props.leftIcon}</span>
          <p onClick={props.goToLink}>{props.children}</p>
        </a>
      );
    }

    return (
      <div className="dropdown" ref={dropdownRef}>
        <div className="menu">
          <DropdownItem leftIcon={avatar} goToMenu="profile">
            {user?.displayName}
          </DropdownItem>
          <DropdownItem goToMenu="help">Help Centre</DropdownItem>
          <DropdownItem goToLink={() => HandleLogOut()} goToMenu="signout">
            Sign out of Netflix
          </DropdownItem>
        </div>
      </div>
    );
  }

  return (
    <div className={`nav ${showNav ? "nav-black" : ""}`}>
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
