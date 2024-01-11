import React, { useState, useEffect, createContext, useContext } from "react";
import Tweet from "./Tweet";
import Spinner from 'react-bootstrap/Spinner';
import { TweetContext } from "../Context/TweetContext";
import { ProfileContext } from "../Context/ProfileContext";
import { collection, doc, getDoc, addDoc, setDoc } from 'firebase/firestore';
import { auth, db } from "../Components/FirebaseConfig"
import { v4 as uuidv4 } from 'uuid';

const TweetList = ({ tweet }) => {

    const { tweetsArray, loading, userInfoOfSingleTweet, setUserInfoOfSingleTweet } = useContext(TweetContext)




    if (loading) {
        return (
            <Spinner animation="grow" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    }
    else {
        return (
            <div className="tweetsContainer">
                {

                    tweetsArray.sort((a, b) => new Date(b.date) - new Date(a.date))
                        .map((tweet) => {
                            return (
                                <Tweet
                                    tweet={tweet}
                                    key={uuidv4()}
                                />
                            )
                        })
                }
            </div>
        )
    }
}

export { TweetList };
