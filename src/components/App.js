import React, { useEffect } from "react";
import { useState } from "react";
import { RecoilRoot } from "recoil";
import { authService } from "../fbase";
import AppRouter from "./Router";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    });
  });
  const refreshUser = () => {
    console.log("refresh");
    setInit(false);
    setInit(true);
  };
  return (
    <RecoilRoot>
      {init ? (
        <AppRouter
          isLoggedIn={isLoggedIn}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        "Initializing..."
      )}
    </RecoilRoot>
  );
}

export default App;
