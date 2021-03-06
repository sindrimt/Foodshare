import React, { useState, useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  IoMdPerson,
  IoIosArrowUp,
  IoIosBuild,
  IoIosHome,
  IoMdBook,
  IoMdMegaphone,
} from "react-icons/io";
import axios from "axios";

import { Link } from "react-router-dom";
import foodshare from "../../static/images/foodshare.png";
import { UserContext } from "../context/UserContext";
import DarkModeButton from "./DarkModeButton";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { loggedIn, setLoggedIn } = useContext(UserContext);

  const iconColor = "#bff8ff";

  const logOut = () => {
    console.log("logged out");
    const url = "/api/accounts/logout/";

    axios
      .post(url, {
        revoke_token: false,
      })
      .then(
        (response) => {
          console.log(response);
          setLoggedIn(false);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <Link to="/">
          <img src={foodshare} alt="Logo" />
        </Link>
        {/* <h4>Logo</h4> */}
      </div>
      <ul className="app__navbar-links">
        <li>
          <Link to="/browse">Browse</Link>
        </li>
        <li>
          <Link to="/followed">Followed</Link>
        </li>
        <li>
          <Link to="recipe">New</Link>
        </li>
        <li>
          <Link to="shopping-list">Shopping List</Link>
        </li>
        {/* <li>
          <Link to="/">Contact</Link>
        </li> */}
      </ul>
      <DarkModeButton />
      <div className="app__navbar-login ">
        {loggedIn ? (
          <Link to="/" onClick={() => logOut()}>
            Sign Out
          </Link>
        ) : (
          <Link to="/login">Log In / Register</Link>
        )}
        <div />

        <a>
          {loggedIn ? (
            <Link to="/me">
              <IoMdPerson size={25} />
            </Link>
          ) : (
            ""
          )}
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
                <Link to="/" onClick={() => setToggleMenu(false)}>
                  <IoMdBook color={iconColor} />
                  <span className="icon-text"> Browse Recipes</span>
                </Link>
              </li>
              <li>
                <Link to="recipe" onClick={() => setToggleMenu(false)}>
                  <IoIosBuild color={iconColor} />
                  <span className="icon-text"> Create Recipe</span>
                </Link>
              </li>
              <li>
                <Link to="/me" onClick={() => setToggleMenu(false)}>
                  <IoMdMegaphone color={iconColor} />
                  <span className="icon-text"> Profile</span>
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
