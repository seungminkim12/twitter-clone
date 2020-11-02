import Tweet from "components/Tweet";
import TweetFactory from "components/TweetFactory";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);

  /*const getTweets = async () => {
        const dbTweets = await dbService.collection("tweets").get();
        dbTweets.forEach((tweet) => {
            const tweetObject = {
                ...tweet.data(),
                id:tweet.id
            }
            setTweets(prev => [tweetObject, ...prev])
        })
    }*/

  useEffect(() => {
    dbService
      .collection("tweets")
      .orderBy("createAt", "desc")
      .onSnapshot((snapshot) => {
        const tweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTweets(tweetArray);
        console.log(tweets);
      });
  }, []);

  return (
    <div>
      <TweetFactory userObj={userObj} />
      <div>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
