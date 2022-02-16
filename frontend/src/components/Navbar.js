import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  IoMdPerson,
  IoIosArrowUp,
  IoIosBuild,
  IoIosHome,
  IoMdBook,
  IoMdMegaphone,
} from "react-icons/io";

import { Link } from "react-router-dom";
import foodshare from "../../static/images/foodshare.png";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const iconColor = "#bff8ff";

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <img src={foodshare} alt="Logo" />
        {/* <h4>Logo</h4> */}
      </div>
      <ul className="app__navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/">About</Link>
        </li>
        <li>
          <Link to="recipe">Create Recipe</Link>
        </li>
        <li>
          <Link to="/">Contact</Link>
        </li>
      </ul>
      <div className="app__navbar-login ">
        <Link to="/">Log In / Register</Link>
        <div />
        <a>
          {/* <CgProfile size={25} /> */}
          <Link to="/">
            <IoMdPerson size={25} />
          </Link>
        </a>
      </div>
      <div className="app__navbar-smallscreen">
        <GiHamburgerMenu size={25} onClick={() => setToggleMenu(true)} />
        {toggleMenu && (
          <div className="app__navbar-smallscreen_overlay flex__center ">
            <IoIosArrowUp
              size={30}
              className="overlay__close"
              onClick={() => setToggleMenu(false)}
            />
            <ul className="app__navbar-smallscreen-links">
              <li>
                {" "}
                {/* //each li? */}
                <Link to="/" onClick={() => setToggleMenu(false)}>
                  <IoIosHome color={iconColor} />
                  <span className="icon-text"> Home</span>
                </Link>
              </li>
              <li>
                <Link to="/" onClick={() => setToggleMenu(false)}>
                  <IoMdBook color={iconColor} />
                  <span className="icon-text"> About</span>
                </Link>
              </li>
              <li>
                <Link to="recipe" onClick={() => setToggleMenu(false)}>
                  <IoIosBuild color={iconColor} />
                  <span className="icon-text"> Create Recipe</span>
                </Link>
              </li>
              <li>
                <Link to="/" onClick={() => setToggleMenu(false)}>
                  <IoMdMegaphone color={iconColor} />
                  <span className="icon-text"> Contact</span>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
