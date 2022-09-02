import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { darkState } from "../atom";
import { authService, dbService } from "../fbase";
import { HomeBox, Wrapper } from "./Home";

const Username = styled.h1`
  width: 100%;
  font-size: 14px;
  background-color: white;
  display: flex;
  justify-content: center;
  border: 1px solid black;
  box-sizing: border-box;
  padding: 15px 0;
  border-radius: 20px;
  margin-bottom: 10px;
`;
const UpdateProfile = styled.div`
  width: 100%;
  font-size: 14px;
  background-color: #22b2da;
  color: white;
  cursor: pointer;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  padding: 15px 0;
  border-radius: 20px;
  margin-bottom: 10px;
`;
const UpdateForm = styled.form`
  width: 280px;
  position: relative;
  height: 44px;
  box-sizing: border-box;
  margin-bottom: 10px;
  display: flex;
`;
const UpdateInput = styled.input`
  width: 100%;
  font-size: 14px;
  background-color: #22b2da;
  color: white;
  padding: 15px 10px;
  border-radius: 20px;
  border: none;
  &:focus {
    outline: none;
  }
`;
const UpdateBtn = styled.button`
  position: absolute;
  right: 10px;
  cursor: pointer;
  top: 30%;
  font-size: 15px;
  color: white;
  background-color: transparent;
  border: none;
`;
const LogoutBtn = styled.button`
  margin-top: 30px;
  width: 280px;
  padding: 15px 0;
  box-sizing: border-box;
  border-radius: 20px;
  background-color: tomato;
  color: white;
  border: none;
  cursor: pointer;
`;

const Profile = ({ userObj, refreshUser }) => {
  const dark = useRecoilValue(darkState);
  const [update, setUpdate] = useState(false);
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
    setUpdate(false);
  };
  const getMyTweets = async () => {
    const tweets = await dbService
      .collection("tweets")
      .where("creatorId", "==", `${userObj.uid}`)
      .orderBy("createdAt")
      .get();
  };
  const onClickUpdate = () => {
    setUpdate(true);
  };
  useEffect(() => {
    getMyTweets();
  }, []);
  return (
    <HomeBox dark={dark}>
      <Wrapper border={true} dark={dark}>
        <Username>{newDisplayName}</Username>
        {update ? (
          <UpdateForm onSubmit={onSubmit}>
            <UpdateInput
              autoFocus={true}
              onChange={onChange}
              type="text"
              placeholder="Display name"
              value={newDisplayName}
            />
            <UpdateBtn>
              <FontAwesomeIcon icon={faPen} />
            </UpdateBtn>
          </UpdateForm>
        ) : (
          <UpdateProfile onClick={onClickUpdate}>Update Profile</UpdateProfile>
        )}
      </Wrapper>
      <LogoutBtn onClick={onLogOutClick}>Log Out</LogoutBtn>
    </HomeBox>
  );
};
export default Profile;
