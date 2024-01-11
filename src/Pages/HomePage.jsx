import React, { useState, useEffect, createContext, useContext } from "react";
import TweetForm from "../Components/TweetForm";
import { TweetList } from "../Components/TweetList";
import { TweetContext } from "../Context/TweetContext";
import { ProfileContext } from "../Context/ProfileContext";

const HomePage = () => {

    const {
        tweetText, handleTweetTextChange, tweetButtonDisabled, handleTweetButtonClick, getAllTweetsWithSnapshot, errorMessage, tweetsArray, loading
    } = useContext(TweetContext)

    useEffect(() => {
        getAllTweetsWithSnapshot();
    }, []);

    return (
        <div className="tweetFormAndTweetListParent">
            <div className="errorMessage">
                {errorMessage && errorMessage}
            </div >
            <TweetForm
                tweetText={tweetText}
                handleTweetTextChange={handleTweetTextChange}
                tweetButtonDisabled={tweetButtonDisabled}
                handleTweetButtonClick={handleTweetButtonClick}
            />
            <TweetList

            />
        </div>
    )
}

export default HomePage
