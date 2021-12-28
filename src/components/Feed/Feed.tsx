import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext.js'
import { get } from '../../utils/axiosLib'
import { logger } from '../../utils/logger'
import Tweet from '../Tweet/Tweet'

//import style from '/Feed.module.scss'

const Feed = () => {
  const [tweets, setTweets] = useState<any>([])
  const [authState] = useContext<any>(AuthContext)

  const token: string = authState.user.token
  const user: any = authState.user.user

  useEffect(() => {
    const getTweets = async () => {
      const endpoint = `${process.env.REACT_APP_BASE_URL}post/tm/${user._id}`
      const headers = {
        'auth-token': `${token}`,
        'Content-Type': 'application/json',
      }
      const tweetsReq = await get(endpoint, headers)
      setTweets(
        //<< quick sort algorithm
        tweetsReq.data.sort((p1: any, p2: any) => {
          return (
            new Date(p2.createdAt).valueOf() - new Date(p1.createdAt).valueOf()
          )
        }),
      )
    }
    getTweets()
    logger(authState.latestTweet)
    //localStorage.removeItem('user')
  }, [token, user._id, authState.latestTweet])

  return (
    <div>
      {tweets.map((tweet: any) => (
        <Tweet key={tweet._id} tweetFull={tweet} />
      ))}
    </div>
  )
}

export default Feed
