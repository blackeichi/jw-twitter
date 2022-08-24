import React from "react";
import { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Join from "../routes/Join";
import Profile from "../routes/Profile";
import Navigations from "./Navigations";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <HashRouter>
      {isLoggedIn ? <Navigations /> : null}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/Profile" element={<Profile />}></Route>
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
