import React, { useContext } from "react";
import { ProfileContext } from "../Context/ProfileContext";
const SignIn = () => {
  const {
    signUp,
    signIn,
    signOut,
    signInWithPopup,
    signInEmail,
    setSignInEmail,
    signInPass,
    setSignInPass,
    signInWithGoogle,
  } = useContext(ProfileContext);

  return (
    <div className="profilePageDiv">
      <div className="formDiv">
        <div className="formInputTitle">Email</div>
        <input
          type="text"
          value={signInEmail}
          onChange={(e) => {
            setSignInEmail(e.target.value);
          }}
        ></input>
      </div>
      <div className="formDiv">
        <div className="formInputTitle">Password</div>
        <input
          type="password"
          value={signInPass}
          onChange={(e) => {
            setSignInPass(e.target.value);
          }}
        ></input>
      </div>
      <div>
        <div className="formDiv">
          <button
            className="formButton"
            onClick={(e) => {
              signIn(e, signInEmail, signInPass);
            }}
          >
            Sign In
          </button>
        </div>
        <div className="formDiv">
          <button className="formButton" onClick={signInWithGoogle}>
            Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
