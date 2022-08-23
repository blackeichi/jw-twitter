import React from "react";
import { useState } from "react";
import { authService } from "../fbase";
import AppRouter from "./Router";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [init, setInit] = useState(false);
  return <AppRouter isLoggedIn={isLoggedIn} />;
}

export default App;
