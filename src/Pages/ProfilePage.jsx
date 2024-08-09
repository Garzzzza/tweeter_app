import React, { useState, useEffect, createContext, useContext } from "react";
import { TweetContext } from "../Context/TweetContext";
import { ProfileContext } from "../Context/ProfileContext";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const ProfilePage = () => {
  const {
    signUp,
    logIn,
    logOut,
    signInWithPopup,
    signUpEmail,
    setSignUpEmail,
    setSignUpPass,
    signUpPass,
    userInfoOfSingleTweet,
    setUserInfoOfSingleTweet,
    userImage,
    setUserImage,
    uploadFileAndHandleUserName,
    userNameText,
    setUserNameText,
  } = useContext(ProfileContext);

  return (
    <div className="profilePageDiv">
      <input
        type="text"
        placeholder="Enter your name"
        value={userNameText}
        onChange={(e) => setUserNameText(e.target.value)}
      />
      <input
        type="file"
        onChange={(event) => setUserImage(event.target.files[0])}
      />
      <button className="updateUserImage" onClick={uploadFileAndHandleUserName}>
        Update User{" "}
      </button>
    </div>
  );
};

export default ProfilePage;
