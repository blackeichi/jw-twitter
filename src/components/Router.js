import React from "react";
import { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Join from "../routes/Join";
import Profile from "../routes/Profile";
import Navigations from "./Navigations";

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      {isLoggedIn ? <Navigations userObj={userObj} /> : null}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact path="/" element={<Home userObj={userObj} />}></Route>
            <Route
              exact
              path="/Profile"
              element={<Profile userObj={userObj} refreshUser={refreshUser} />}
            ></Route>
          </>
        ) : (
          <>
            <Route exact path="/" element={<Auth />}></Route>
            <Route exact path="/join" element={<Join />}></Route>
          </>
        )}
      </Routes>
    </HashRouter>
  );
};
export default AppRouter;
