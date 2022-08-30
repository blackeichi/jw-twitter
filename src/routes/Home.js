import React, { useEffect, useState } from "react";
import Tweet from "../components/Tweet";
import { dbService, storageService } from "../fbase";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { darkState } from "../atom";

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
  position: relative;
`;

const HomeForm = styled.form``;
const HomeTextInput = styled.input``;
const HomeFileInput = styled.input``;
const HomeBtn = styled.input``;

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [attachment, setAttachment] = useState(null);
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
