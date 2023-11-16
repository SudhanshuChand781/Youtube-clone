// rfce - react functional component
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import React, { useState } from "react";
import ytLogo from "./images/utube.png";
import carry from "./images/carry.jpeg";
import Signin from "./Signin";

import { AiOutlineSearch } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import { BiSolidVideoPlus } from "react-icons/bi";
import { BsFillMicFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";

import { Link, useSearchParams } from "react-router-dom";

function Header() {
  const [isUserLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") != null
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    localStorage.removeItem("name ");

    setIsLoggedIn(false);
  };
  console.log("Is Logged In : ", isUserLoggedIn);

  return (
    <div class="header-container">
      <div class="header">
        <div class="header-items">
          <div class="one">
            <AiOutlineMenu class="tools" />
          </div>
          <div class="two">
            <Link to={"/"}>
              <img id="yt-logo" src={ytLogo}></img>
            </Link>
          </div>
        </div>

        <div class="header-items">
          <input placeholder="Search" class="header-search"></input>
          <button class="search-button">
            {" "}
            <AiOutlineSearch class="search-icon" />
          </button>
          <div class="header-mic">
            <BsFillMicFill class="search-icon" />
          </div>
        </div>

        {isUserLoggedIn ? (
          <div class="header-items header-profile">
            <Link to={"/upload"}>
              <IoMdNotificationsOutline className="tools-right" />
              <BiSolidVideoPlus className="tools-right" title="Upload video" />
              {/* <AiOutlineCloudUpload class="logout" title='Upload video'/> */}
            </Link>
            <img src={carry} class="user-logo white"></img>
            <p class="user-email margin-0">{localStorage.getItem("email")}</p>
            <BiLogOut
              class="tools-right"
              title="Logout"
              onClick={() => handleLogout()}
            />
          </div>
        ) : (
          <div class="header-items header-profile">
            <Link to={"/signin"}>
              <button type="button" class="signin-btn" data-toggle="modal" data-target="#exampleModal">Sign In</button>
            </Link>
          </div>
        )}
        <div
          class="modal fade white "
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog white border" role="document">
            <div class="modal-content white">
              <div class="modal-header white">
                <h5 class="modal-title white" id="exampleModalLabel">
                  Sign Up
                </h5>
                <button
                  type="button"
                  class="close white"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <Signin />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary white">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
