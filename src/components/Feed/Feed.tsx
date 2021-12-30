import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext.js'
import { get } from '../../utils/axiosLib'
import { logger } from '../../utils/logger'
import { CircularProgress } from '@material-ui/core'
import Tweet from '../Tweet/Tweet'

import style from './Feed.module.scss'

const Feed = () => {
  const [tweets, setTweets] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errMsg, setErrMsg] = useState<string>('')
  const [authState] = useContext<any>(AuthContext)

  const token: string = authState.user.token
  const user: any = authState.user.user

  useEffect(() => {
    
    const getTweets = async () => {
      setIsLoading(true)
      try{
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
      }catch(err: any | undefined | {}){
        logger(err)
        setErrMsg("Tweets aren't loading right now...")
      }
      setIsLoading(false)
    }
    getTweets()
    logger(authState.latestTweet)
  }, [token, user._id, authState.latestTweet])

  return (
    <div>
      {isLoading ? (
        <div className={style.loaderBox}>
          <CircularProgress color="inherit" size="45px" />
        </div>
      ) : (
        <>
        {tweets.map((tweet: any) => <Tweet key={tweet._id} tweetFull={tweet} />)}
        <div className={style.loaderBox}>
         <p style={{color: '#fff'}}>{errMsg}</p>
        </div>
        </>
      )}
    </div>
  )
}

export default Feed
