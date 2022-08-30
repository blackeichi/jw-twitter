import React, { useEffect, useState } from "react";
import Tweet from "../components/Tweet";
import { dbService, storageService } from "../fbase";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import { darkState } from "../atom";

const HomeBox = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: ${(props) => console.log(props.dark)};
`;
const Wrapper = styled.div`
  width: 570px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
const ToggleThemeBtn = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 20px;
  color: white;
  background-color: #22b2da;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const HomeForm = styled.form``;
const HomeTextInput = styled.input``;
const HomeFileInput = styled.input``;
const HomeBtn = styled.input``;

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [attachment, setAttachment] = useState(null);
  const [dark, setDark] = useRecoilState(darkState);

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
  const onClick = () => {
    setDark((prev) => !prev);
  };
  console.log(dark);
  useEffect(() => {
    getTweets();
  }, [dark]);
  return (
    <HomeBox>
      <Wrapper>
        <ToggleThemeBtn onClick={onClick}>
          {!dark ? (
            <FontAwesomeIcon icon={faMoon} />
          ) : (
            <FontAwesomeIcon icon={faSun} />
          )}
        </ToggleThemeBtn>
        <HomeForm dark={dark} onSubmit={onSubmit}>
          <HomeTextInput
            value={tweet}
            onChange={onChange}
            type="text"
            placeholder="Write...."
            maxLength={100}
          ></HomeTextInput>
          <HomeFileInput
            type="file"
            accept="image/*"
            onChange={onFileChange}
          ></HomeFileInput>
          <HomeBtn type="submit" value="Tweet"></HomeBtn>
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
