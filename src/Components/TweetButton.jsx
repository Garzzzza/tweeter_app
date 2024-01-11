import React, { useState, useEffect, createContext, useContext } from "react";
import { TweetContext } from "../Context/TweetContext";
import { ProfileContext } from "../Context/ProfileContext";

const TweetButton = () => {

    const { tweetButtonDisabled, handleTweetButtonClick } = useContext(TweetContext)

    return (
        <button className="tweetButton" disabled={tweetButtonDisabled} onClick={handleTweetButtonClick}>
            Tweet
        </button>)
}

export default TweetButton
