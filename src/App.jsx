import React, { useState, useEffect, createContext, useContext } from "react";
import './App.css';
import Tweet from "./Components/Tweet";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from "./Pages/HomePage";
import NavBar from "./Components/NavBar";
import ProfilePage from "./Pages/ProfilePage"
import TweetContextProvider from "./Context/TweetContext"
import ProfileContextProvider from "./Context/ProfileContext";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";

function App() {


  return (
    <ProfileContextProvider>

      <TweetContextProvider>

        <div className="App">
          <NavBar />

          <Routes>
            <Route
              path="/signup" element={<SignUp />}
            />
            <Route
              path="/" element={<SignIn />}
            />
            <Route
              path="/home" element={<HomePage />}
            />

            <Route
              path="/profile" element={<ProfilePage />}
            />

          </Routes>
        </div>

      </TweetContextProvider>
    </ProfileContextProvider>

  )
}

export default App;
