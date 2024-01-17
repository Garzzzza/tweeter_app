import React, { useState, useEffect, createContext, useContext } from "react";
import { TweetContext } from "../Context/TweetContext";
import { ProfileContext } from "../Context/ProfileContext";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const SignUp = () => {
  const {
    handleUserNameUpdateClick,
    signUp,
    logIn,
    logOut,
    signInWithPopup,
    signUpEmail,
    setSignUpEmail,
    setSignUpPass,
    signUpPass,
    signInWithGoogle,
  } = useContext(ProfileContext);

  return (
    <div>
      <div className="formDiv">
        <div className="formInputTitle">Email</div>
        <input
          type="text"
          value={signUpEmail}
          onChange={(e) => {
            setSignUpEmail(e.target.value);
          }}
        ></input>
      </div>
      <div className="formDiv">
        <div className="formInputTitle">Password</div>
        <input
          type="password"
          value={signUpPass}
          onChange={(e) => {
            setSignUpPass(e.target.value);
          }}
        ></input>
      </div>
      <div>
        <button
          className="formButton"
          onClick={() => {
            signUp(signUpEmail, signUpPass);
          }}
        >
          Create User
        </button>
        <div>
          <button className="formButton" onClick={signInWithGoogle}>
            Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
