import { useState, useEffect, useContext } from 'react'
import { get, put } from '../../utils/axiosLib'
import axios from 'axios'
import { format } from 'timeago.js'
import { AuthContext } from '../../context/AuthContext.js'
import { motion } from 'framer-motion'
//import { Cancel } from '@material-ui/icons'

import style from './Tweet.module.scss'
import avi from '../../images/others/avatar.svg'
import more from '../../images/icons/more.svg'
import reply from '../../images/icons/reply.svg'
import retweet from '../../images/icons/retweet.svg'
import retweetFill from '../../images/icons/retweet-fill.svg'
import like from '../../images/icons/like.svg'
import likeFill from '../../images/icons/like-fill.svg'
import V from '../../images/icons/verified.svg'
import Del from '../../images/icons/bin.png'

interface LikeStat {
  like: number
  isLiked: boolean
}
interface RetweetStat {
  retweet: number
  isRetweeted: boolean
}

const Tweet = (props: any) => {
  const [user, setUser] = useState<any>({})
  const [modal, setModal] = useState<boolean>(false)
  // const time: any = format(props.tweetFull.createdAt)
  // const timeForm: any = time.charAt(0) + time.charAt(2)

  const tweet: any = props.tweetFull

  const [likeStat, setLikeStat] = useState<LikeStat>({
    like: tweet.likes.length,
    isLiked: false,
  })
  const [retweetStat, setRetweetStat] = useState<RetweetStat>({
    retweet: tweet.retweets.length,
    isRetweeted: false,
  })
  const [authState, setAuthState] = useContext<any>(AuthContext)
  const userObj: any = authState.user.user
  const token: string = authState.user.token

  useEffect(() => {
    setLikeStat({
      like: tweet.likes.length,
      isLiked: tweet.likes.includes(userObj._id),
    })
    setRetweetStat({
      retweet: tweet.retweets.length,
      isRetweeted: tweet.retweets.includes(userObj._id),
    })
  }, [tweet.likes, tweet.retweets, userObj._id])

  useEffect(() => {
    const getUser = async () => {
      const endpoint = `${process.env.REACT_APP_BASE_URL}user?userId=${tweet.userId}`
      const userReq = await get(endpoint)
      setUser(userReq.data)
    }
    getUser()
  }, [tweet.userId])

  const modalStateHandler = async () => {
    if (modal) {
      setModal(false)
    }
  }

  const handleDelete = async () => {
    const body = {
      headers: {
        'auth-token': `${token}`,
        'Content-Type': 'application/json',
      },
      userParams: {
        userId: userObj._id,
      },
    }
    const endpoint = `${process.env.REACT_APP_BASE_URL}post/${tweet._id}`
    try {
      const req = await axios.delete(endpoint, body)
      //return Promise.resolve({ status: req.status, data: req.data })
      //console.log('request payload  ', body)
      console.log(req)
      setAuthState({
        ...authState,
        latestTweet: '',
      })
    } catch (err) {
      console.log('request payload  ', body)
      console.log(' ERROR::', err)
      //return Promise.reject(err)
    }
    setModal(false)
  }

  const likeHandler = async () => {
    const userParams = {
      userId: userObj._id,
    }
    const endpoint = `${process.env.REACT_APP_BASE_URL}post/${tweet._id}/like`
    setLikeStat({
      ...likeStat,
      like: likeStat.isLiked ? likeStat.like - 1 : likeStat.like + 1,
      isLiked: !likeStat.isLiked,
    })
    const likeReq = await put(endpoint, userParams)
    console.log('REQ RESPONSE::: ', likeReq)
  }
  const retweetHandler = async () => {
    const userParams = {
      userId: userObj._id,
    }
    const endpoint = `${process.env.REACT_APP_BASE_URL}post/${tweet._id}/retweet`
    setRetweetStat({
      ...retweetStat,
      retweet: retweetStat.isRetweeted
        ? retweetStat.retweet - 1
        : retweetStat.retweet + 1,
      isRetweeted: !retweetStat.isRetweeted,
    })
    const retweetReq = await put(endpoint, userParams)
    console.log('REQ RESPONSE::: ', retweetReq)
  }

  return (
    <div className={style.container} onClick={modalStateHandler}>
      <div className={style.content}>
        <div className={style.left}>
          <img src={avi} alt="avatar" />
        </div>
        <div className={style.right}>
          <div className={style.rightTop}>
            <div className={style.rightTitles}>
              <p className={style.name}> {user.name || user.username}</p>
              <p className={style.handle}> {user.username}</p>
              {user.isAdmin && (
                <img className={style.right2} src={V} alt="verified" />
              )}
              {/* <p className={style.time}>10h</p> */}
              <p className={style.time}>{format(tweet.createdAt)}</p>
            </div>
            {userObj._id === tweet.userId && (
              <div className={style.more}>
                <img src={more} alt="more" onClick={() => setModal(true)} />
                {modal && (
                  <motion.div
                    className={style.moreBox}
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {
                        scale: 0.4,
                      },
                      visible: {
                        scale: 1,
                        transition: {
                          duration: 0.4,
                          type: 'spring',
                        },
                      },
                    }}
                  >
                    {/* <div className={style.moreTop}>
                    <Cancel
                      
                      className={style.cancel}
                      onClick={() => setModal(!modal)}
                    />
                  </div> */}

                    <div className={style.moreItem} onClick={handleDelete}>
                      <img src={Del} alt="delete" />
                      <p className={style.red}>Delete tweet</p>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
          <div className={style.rightDesc}>
            <p>{tweet?.desc}</p>
            {tweet.img && <img src={tweet?.img} alt="tweetimg" />}
          </div>
          <div className={style.rightBtm}>
            <div className={style.actions}>
              <img src={reply} alt="reply" />
              <p>0</p>
            </div>
            <div className={style.actions}>
              <img
                src={retweetStat.isRetweeted ? retweetFill : retweet}
                alt="retweet"
                onClick={retweetHandler}
              />
              <p className={retweetStat.isRetweeted ? style.green : ''}>
                {' '}
                {retweetStat.retweet}
              </p>
            </div>
            <div className={style.actions}>
              <img
                src={likeStat.isLiked ? likeFill : like}
                alt="like"
                onClick={likeHandler}
                //className="animate__animated animate__zoomInUp"
              />
              <p className={likeStat.isLiked ? style.red : ''}>
                {' '}
                {likeStat.like}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tweet
