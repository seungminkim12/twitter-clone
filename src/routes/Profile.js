import Tweet from "components/Tweet";
import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default ({ refreshUser, userObj }) => {
  const history = useHistory();
  const [myTweets, setMyTweets] = useState([]);
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const getMyTweets = async () => {
    const tweets = await dbService
      .collection("tweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createAt", "desc")
      .get();
    const myTweetsArray = tweets.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMyTweets(myTweetsArray);
    console.log(myTweetsArray);
    console.log(myTweets);
  };

  useEffect(() => {
    getMyTweets();
    console.log(userObj.uid);
  }, []);

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

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          placeholder="Display Name"
          value={newDisplayName}
          autoFocus
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{ marginTop: 10 }}
        />
      </form>
      <div>
        {myTweets.map((tweet) => (
          <Tweet key={tweet.id} tweetObj={tweet} isOwner={true} />
        ))}
      </div>
      <button onClick={onLogOutClick} className="formBtn cancelBtn logOut">
        Log out
      </button>
    </div>
  );
};
