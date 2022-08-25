import React, { useState } from "react";
import { dbService, storageService } from "../fbase";

const Tweet = ({ tweetObj, isOwner }) => {
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
    <div>
      {tweetObj.attachmentUrl && (
        <img src={tweetObj.attachmentUrl} width="50px" height="50px"></img>
      )}
      {edit ? (
        <>
          <form onSubmit={onSubmit}>
            {" "}
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newTweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEdit}>Cancel</button>
        </>
      ) : (
        <>
          {" "}
          <h4>{tweetObj.tweet}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEdit}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};
export default Tweet;
