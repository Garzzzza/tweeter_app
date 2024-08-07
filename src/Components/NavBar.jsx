import React, { useState, useEffect, createContext, useContext } from "react";
import { Link } from "react-router-dom";
import { ProfileContext } from "../Context/ProfileContext";

const NavBar = () => {
  const { userId, logOut, isGoogleSignIn } = useContext(ProfileContext);

  return (
    <div className="NavBar">
      {!userId && (
        <Link className="PageTab" to="/signup">
          Sign Up
        </Link>
      )}
      {!userId && (
        <Link className="PageTab" to="/">
          Sign In
        </Link>
      )}
      {userId && !isGoogleSignIn && (
        <Link className="PageTab" to="/home">
          Home
        </Link>
      )}
      {userId && !isGoogleSignIn && (
        <Link className="PageTab" to="/profile">
          Profile
        </Link>
      )}
      {userId && (
        <div className=" PageTab logoutButton" onClick={logOut}>
          Log Out
        </div>
      )}
    </div>
  );
};

export default NavBar;
