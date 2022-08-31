import React, { useEffect, useState } from "react";
import Tweet from "../components/Tweet";
import { dbService, storageService } from "../fbase";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { darkState } from "../atom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faUpload } from "@fortawesome/free-solid-svg-icons";

const HomeBox = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: ${(props) => (props.dark ? "black" : "white")};
`;
const Wrapper = styled.div`
  margin-top: 150px;
  width: 570px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HomeForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const HomeInputBox = styled.div`
  position: relative;
  width: 280px;
`;
const HomeTextInput = styled.input`
  width: 280px;
  height: 50px;
  outline: none;
  box-sizing: border-box;
  border: 1px solid #22b2da;
  padding: 10px 20px;
  padding-right: 60px;
  border-radius: 30px;
  color: ${(props) => (props.dark ? "white" : "black")};
  background-color: transparent;
`;
const HomeBtn = styled.input`
  position: absolute;
  height: 50px;
  width: 50px;
  font-size: 25px;
  border-radius: 50%;
  right: 0;
  background-color: #22b2da;
  color: white;
  border: none;
`;
const HomeFileInput = styled.input`
  display: none;
`;
const FileInputLabel = styled.label`
  color: #22b2da;
  font-size: 12px;
`;
const FileInputBox = styled.div`
  box-sizing: border-box;
  width: 280px;
  display: flex;
  justify-content: center;
  padding: 25px 0;
  gap: 10px;
`;

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [attachment, setAttachment] = useState("");
  const dark = useRecoilValue(darkState);
  const getTweets = async () => {
    await dbService.collection("tweets").onSnapshot((snapshot) => {
      const tweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArray);
    });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    await dbService.collection("tweets").add({
      tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    });
    setTweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  useEffect(() => {
    getTweets();
  }, [dark]);
  return (
    <HomeBox dark={dark}>
      <Wrapper>
        <HomeForm onSubmit={onSubmit}>
          <HomeInputBox>
            <HomeTextInput
              dark={dark}
              value={tweet}
              onChange={onChange}
              type="text"
              placeholder="Write...."
              maxLength={100}
            ></HomeTextInput>

            <HomeBtn type="submit" value="+"></HomeBtn>
          </HomeInputBox>
          <FileInputLabel dark={dark} for="inputImage">
            <FileInputBox>
              <h1>Add photos</h1>
              <FontAwesomeIcon icon={faUpload} />
            </FileInputBox>
          </FileInputLabel>
          <HomeFileInput
            id="inputImage"
            type="file"
            accept="image/*"
            onChange={onFileChange}
          ></HomeFileInput>
          {attachment && (
            <div>
              <img src={attachment} width="50px" height="50px" />
            </div>
          )}
        </HomeForm>
        <div>
          {tweets.map((tweet) => (
            <Tweet
              key={tweet.id}
              tweetObj={tweet}
              isOwner={tweet.creatorId === userObj.uid}
            />
          ))}
        </div>
      </Wrapper>
    </HomeBox>
  );
};
export default Home;
