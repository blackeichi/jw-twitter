import React from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../fbase";

const Profile = () => {
  const history = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    history("/");
  };
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
export default Profile;
