import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService, dbService } from "../fbase";

const Profile = ({ userObj, refreshUser }) => {
  const history = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(
    userObj.displayName === null ? "Anonymous" : userObj.displayName
  );
  const onLogOutClick = () => {
    authService.signOut();
    history("/");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  const getMyTweets = async () => {
    const tweets = await dbService
      .collection("tweets")
      .where("creatorId", "==", `${userObj.uid}`)
      .orderBy("createdAt")
      .get();
  };
  useEffect(() => {
    getMyTweets();
  }, []);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
export default Profile;
