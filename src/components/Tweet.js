import {
  faBan,
  faEdit,
  faPaintBrush,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { darkState } from "../atom";
import { dbService, storageService } from "../fbase";

const Wrapper = styled.div`
  width: 280px;
  height: 80px;
  border-radius: 15px;
  background-color: white;
  margin: 20px 0;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  border: ${(props) => (props.dark ? "1px solid black" : "1px solid #22b2da")};
`;
const IconTab = styled.div`
  display: flex;
  position: absolute;
  top: 5px;
  right: 10px;
  gap: 7px;
`;
const TweetImg = styled.img`
  position: absolute;
  width: 60px;
  height: 60px;
  bottom: -40%;
  right: -20px;
  border-radius: 50%;
  border: 2px solid white;
`;
const Editform = styled.form`
  display: flex;
  box-sizing: border-box;
  position: relative;
  width: 210px;
`;
const EditInput = styled.input`
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: none;
  background-color: #22b2da;
  color: white;
  border-radius: 10px;
  &:focus {
    outline: none;
  }
`;
const EditSubmit = styled.button`
  position: absolute;
  height: 100%;
  right: 0;
  border: none;
  cursor: pointer;
  background-color: transparent;
`;
const EditCancel = styled.div`
  cursor: pointer;
`;
const TweetText = styled.h4`
  font-size: 13px;
`;
const TweetEdit = styled.div`
  cursor: pointer;
`;
const TweetDel = styled.div`
  cursor: pointer;
`;

const Tweet = ({ tweetObj, isOwner }) => {
  const dark = useRecoilValue(darkState);
  const [edit, setEdit] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.tweet);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this tweet?");
    if (ok) {
      await dbService.doc(`tweets/${tweetObj.id}`).delete();
      await storageService.refFromURL(tweetObj.attachmentUrl).delete();
    }
  };
  const toggleEdit = () => setEdit((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`tweets/${tweetObj.id}`).update({
      tweet: newTweet,
    });
    setEdit(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  };
  return (
    <Wrapper dark={dark}>
      {tweetObj.attachmentUrl && (
        <TweetImg src={tweetObj.attachmentUrl} width="50px" height="50px" />
      )}
      {isOwner && (
        <IconTab>
          <TweetDel onClick={onDeleteClick}>
            <FontAwesomeIcon icon={faTrash} />
          </TweetDel>
          {edit ? (
            <EditCancel onClick={toggleEdit}>
              <FontAwesomeIcon icon={faBan} />
            </EditCancel>
          ) : (
            <TweetEdit onClick={toggleEdit}>
              <FontAwesomeIcon icon={faPen} />
            </TweetEdit>
          )}
        </IconTab>
      )}
      {edit ? (
        <>
          <Editform onSubmit={onSubmit}>
            {" "}
            <EditInput
              type="text"
              placeholder="Edit your nweet"
              value={newTweet}
              required
              onChange={onChange}
              autoFocus={true}
            ></EditInput>
            <EditSubmit>
              <FontAwesomeIcon style={{ color: "white" }} icon={faEdit} />
            </EditSubmit>
          </Editform>
        </>
      ) : (
        <>
          {" "}
          <TweetText>{tweetObj.tweet}</TweetText>
        </>
      )}
    </Wrapper>
  );
};
export default Tweet;
