import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react'

const Home = () => {
    const [tweet,setTweet] = useState("");
    const [tweets,setTweets] = useState([]);
    const getTweets = async () => {
        const dbTweets = await dbService.collection("tweets").get();
        dbTweets.forEach((tweet) => {
            const tweetObject = {
                ...tweet.data(),
                id:tweet.id
            }
            setTweets(prev => [tweetObject, ...prev])
        })
    }

    useEffect(() => {
        getTweets();
    },[])

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("tweets").add({
            tweet,
            createAt:Date.now(),
        });
        setTweet("");
    }

    const onChange = (event) => {
        const {target:{value}} = event;
        setTweet(value);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={tweet} onChange={onChange} type="text" placeholder="Whats up" maxLength={120}/>
                <input type="submit" value="Tweet"/>
            </form>
            <div>
                {tweets.map((tweet) => <div key={tweet.id}><h3>{tweet.tweet}</h3></div>)}
            </div>
        </div>
    )
}

export default Home;