import React, { useState, useEffect, createContext, useContext } from "react";
import {
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, fireBaseStorage } from "../Components/FirebaseConfig";
import {
  collection,
  doc,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ProfileContext = createContext();

const ProfileContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [userNameText, setUserNameText] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPass, setSignUpPass] = useState("");
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [signInEmail, setSignInEmail] = useState("");
  const [isGoogleSignIn, setIsGoogleSignIn] = useState(false);
  const [signInPass, setSignInPass] = useState("");
  const [userImage, setUserImage] = useState("");

  const signUp = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", result.user.uid), {
        email,
        password: result.user.reloadUserInfo.passwordHash,
      });
      navigate("/home");
    } catch (error) {
      console.error("Error signing up:", error);
      // You can set some state here to display the error to the user
    }
  };

  const signIn = async (e, email, password) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUserId(userCredential.user.uid);
      localStorage.setItem("userId", userCredential.user.uid);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const googleAuth = new GoogleAuthProvider();
  const signInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, googleAuth);
      console.log("result", result);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      await setDoc(doc(db, "users", result.user.uid), {
        email: result.user.email,
        image: result.user.photoURL,
        userName: result.user.displayName,
      });
      setUserId(result.user.uid);
      localStorage.setItem("userId", result.user.uid);
      setIsGoogleSignIn(true);
      navigate("/home");
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    }
  };

  const uploadFileAndHandleUserName = async (e) => {
    e.preventDefault();
    const storageRef = ref(fireBaseStorage, "images/" + userImage.name);
    await uploadBytes(storageRef, userImage);
    const imageUrl = await getDownloadURL(storageRef);
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      image: imageUrl,
      userName: userNameText,
    });
    navigate("/home");
  };

  const logOut = () => {
    localStorage.clear();
    setUserId(null);
    setIsGoogleSignIn(false);
    navigate("/");
  };

  return (
    <ProfileContext.Provider
      value={{
        userId,
        setUserId,
        isGoogleSignIn,
        setIsGoogleSignIn,
        signUp,
        signIn,
        signOut,
        signUpEmail,
        setSignUpEmail,
        signUpPass,
        setSignUpPass,
        signInEmail,
        setSignInEmail,
        signInPass,
        setSignInPass,
        userImage,
        setUserImage,
        uploadFileAndHandleUserName,
        userNameText,
        setUserNameText,
        signInWithGoogle,
        logOut,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContextProvider;
export { ProfileContext };
