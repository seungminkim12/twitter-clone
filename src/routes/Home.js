import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react'

const Home = ({userObj}) => {
    const [tweet,setTweet] = useState("");
    const [tweets,setTweets] = useState([]);
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
        dbService.collection("tweets").onSnapshot(snapshot => {
            const tweetArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ... doc.data()
            }));
            setTweets(tweetArray);
        });
    },[])

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("tweets").add({
            text : tweet,
            createAt:Date.now(),
            creatorId:userObj.uid,
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
                {tweets.map((tweet) => <div key={tweet.id}><h3>{tweet.text}</h3></div>)}
            </div>
        </div>
    )
}

export default Home;