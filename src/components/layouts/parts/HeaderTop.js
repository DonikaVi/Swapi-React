import React, { useEffect, useState } from "react";
import logo from "../../../styles/images/logo.svg";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

function HeaderTop({ changeMenu, menuOpen }) {
  const { width } = useWindowDimensions();
  const [showMenuDesk, setShowMenu] = useState(false);

  useEffect(() => {
    setShowMenu(width >= 1200);
  }, [width]);

  const Menu = () => {
    return (
      <div>
        <nav className={`header-menu ${menuOpen ? "header-menu-open" : ""}`}>
          <ul className="header-menu-list">
            <li className="header-menu-list-item">
              <a href="#">Hero</a>
            </li>
            <li className="header-menu-list-item">
              <a href="#">List</a>
            </li>
            <li className="header-menu-list-item">
              <a href="#">CTA Block</a>
            </li>
            <li className="header-menu-list-item">
              <a href="#">Footer</a>
            </li>
          </ul>
        </nav>
        {menuOpen && (
          <button className="header-signup mob" type="button">
            Fake Sign up
          </button>
        )}
      </div>
    );
  };
  return (
    <>
      <div className="header-top">
        <a className="logo-url" href="/">
          <img src={logo} alt="Home page" />
        </a>
        <div className="header-right">
          <div
            onClick={changeMenu}
            className={`burger ${menuOpen ? "burger-close" : ""}`}
          />
          {showMenuDesk ? <Menu /> : null}
        </div>
        {showMenuDesk ? (
          <button className="header-signup desk" type="button">
            Fake Sign up
          </button>
        ) : null}
      </div>
      {!showMenuDesk ? <Menu /> : null}
    </>
  );
}

export default HeaderTop;
