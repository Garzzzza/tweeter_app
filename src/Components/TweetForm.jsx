import React, { useState, useEffect, createContext, useContext } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import TweetButton from "./TweetButton";
import { TweetContext } from "../Context/TweetContext";
import { ProfileContext } from "../Context/ProfileContext";

const TweetForm = () => {

    const { tweetText, handleTweetTextChange, tweetButtonDisabled, handleTweetButtonClick } = useContext(TweetContext);

    return (
        <div className="tweetBox">
            <div className="textAreaDiv">

                <TextareaAutosize
                    className="textArea"
                    value={tweetText}
                    onChange={handleTweetTextChange}
                />
            </div>
            <div className="tweetButtonDiv">

                <TweetButton
                    tweetButtonDisabled={tweetButtonDisabled}
                    handleTweetButtonClick={handleTweetButtonClick}
                />
            </div>
        </div >

    )
}

export default TweetForm
