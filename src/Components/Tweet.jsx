import React, { useState, useEffect, createContext, useContext } from "react";
import { TweetContext } from "../Context/TweetContext";
import { ProfileContext } from "../Context/ProfileContext";
import { collection, doc, getDoc, addDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../Components/FirebaseConfig";

const Tweet = ({ tweet }) => {
  const [userInfoOfSingleTweet, setUserInfoOfSingleTweet] = useState({});

  const getSingleUser = async () => {
    try {
      const docRef = doc(db, "users", tweet.userName);
      const docSnap = await getDoc(docRef);
      const userInfo = docSnap.data();
      console.log(docSnap);

      setUserInfoOfSingleTweet(userInfo);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <div className="tweetDiv">
      <div className="userNameAndDateDiv">
        <div className=" userNameDiv">
          <img src={userInfoOfSingleTweet.image} alt="imagef" />
          <div className=" userNameDiv">{userInfoOfSingleTweet.userName}</div>
        </div>
        <div className=" dateDiv"> {new Date(tweet.date).toLocaleString()}</div>
      </div>

      <div className="contentDiv">{tweet.content}</div>
    </div>
  );
};

export default Tweet;
