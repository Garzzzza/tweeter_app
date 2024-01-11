import React, { useState, useEffect, createContext, useContext } from "react";
import { ProfileContext } from "../Context/ProfileContext";
import { db } from "../Components/FirebaseConfig"
import { collection, getDocs, addDoc, onSnapshot } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';


const TweetContext = createContext();

const TweetContextProvider = ({ children }) => {
    const [tweetText, setTweetText] = useState("");
    const [tweetButtonDisabled, setTweetButtonDisabled] = useState(true)
    const [tweetsArray, setTweetsArray] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")

    const { user, setUser, userNameInput, setUserNameInput, userId } = useContext(ProfileContext)

    const tweetsCollection = collection(db, 'tweets');


    const getAllTweetsWithSnapshot = () => {
        setLoading(true);
        const unsubscribe = onSnapshot(tweetsCollection, (querySnapshot) => {
            const newTweetsArray = [];
            querySnapshot.forEach((tweet) => {
                const tweetWithId = {
                    id: tweet.id,
                    ...tweet.data(),
                };
                newTweetsArray.push(tweetWithId);
            });
            setTweetsArray(newTweetsArray);
            setLoading(false);
        });
        return unsubscribe;
    };

    async function postTweet(tweet) {
        try {
            await addDoc(collection(db, "tweets"), tweet);
            setErrorMessage("");
        } catch (error) {
            console.error('Error posting tweet:', error);
            setErrorMessage(error.message)
        }
    }

    function handleTweetTextChange(event) {
        setTweetText(event.target.value)
        if (event.target.value.length > 140 || event.target.value.length < 1) {
            setTweetButtonDisabled(true)
        }
        else {
            setTweetButtonDisabled(false)
        }
    }

    function handleTweetButtonClick() {
        const submittedTweetObject = {
            content: tweetText,
            userName: userId,
            date: new Date().toISOString(),
        }
        postTweet(submittedTweetObject);
        getAllTweetsWithSnapshot();
        // const updatedTweetsArray = [...tweetsArray, submittedTweetObject];
        // // updatedTweetsArray.sort((a, b) => {
        // //     const dateA = new Date(a.date);
        // //     const dateB = new Date(b.date);

        // //     if (dateA < dateB) return 1;
        // //     if (dateA > dateB) return -1;
        // //     return 0;
        // // });

        // setTweetsArray(updatedTweetsArray);
        setTweetText("")
    }

    return (
        <TweetContext.Provider
            value={{
                getAllTweetsWithSnapshot,
                tweetText,
                handleTweetTextChange,
                tweetButtonDisabled,
                handleTweetButtonClick,
                tweetsArray,
                loading,
                errorMessage
            }}
        >
            {children}
        </TweetContext.Provider>
    )
}
export { TweetContext };
export default TweetContextProvider
