import {
  //useContext,
  useState,
  useEffect,
} from 'react'
import { useParams } from 'react-router'
//import { AuthContext } from '../../context/AuthContext'
import { CircularProgress } from '@material-ui/core'
import { get } from '../../utils/axiosLib'
import { logger } from '../../utils/logger'
import { useNavigate } from 'react-router-dom'
import AppContainer from '../../components/AppContainer/AppContainer'
import Nav from '../../components/Nav/Nav'
import RightBar from '../../components/RightBar/RightBar'
import PageContent from '../../components/PageContent/PageContent'
import Tweet from '../../components/Tweet/Tweet'
import ShareReply from '../../components/Share/ShareReply'
import Replies from '../../components/Feed/Replies'

import style from './SingleTweet.module.scss'
import style2 from '../../components/Feed/Feed.module.scss'
import arrow from '../../images/icons/arrow.svg'

const SingleTweet = () => {
  const currentPage: string = ''
  const tweetId = useParams().tweetId
  //const [authState] = useContext<any>(AuthContext)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tweet, setTweet] = useState<any>('')
  //const userObj: any = authState.user.user
  const navigate = useNavigate()

  useEffect(() => {
    const loadTweet = async () => {
      setIsLoading(true)
      try {
        const endpoint = `${process.env.REACT_APP_BASE_URL}post/${tweetId}`
        const tweetReq = await get(endpoint)
        setTweet(tweetReq.data)
        setIsLoading(false)
      } catch (err) {
        logger(err)
      }
    }
    loadTweet()
  }, [tweetId])

  //   useEffect(() => {
  //     const loadReplies = async () => {
  //       setIsLoading(false)
  //       try {
  //         const endpoint = `${process.env.REACT_APP_BASE_URL}post/replies/${userObj._id}?tweetId=${tweetId}`
  //         const replyReq = await get(endpoint)
  //         logger(replyReq)
  //         setIsLoading(true)
  //         setReplies(replyReq.data)
  //       } catch (err) {
  //         logger(err)
  //       }
  //     }
  //     loadReplies()
  //   }, [userObj._id, tweetId])

  return (
    <div>
      <AppContainer>
        <Nav currentPage={currentPage} />
        <PageContent>
          <div className={style.container}>
            <div className={style.top}>
              <div className={style.back} onClick={() => navigate(-1)}>
                <img src={arrow} alt="back" />
              </div>
              <p>Tweet</p>
            </div>
            <div className={style.tweetBox}>
              {isLoading ? (
                <div className={style2.loaderBox}>
                  <CircularProgress color="inherit" size="45px" />
                </div>
              ) : (
                <>
                  <Tweet tweetFull={tweet} />
                </>
              )}
            </div>
            <div className={style.replyBox}>
              <ShareReply tweetId={tweetId} />
              {/* <div className={style.reImg}>
                <img src={userObj.profilePicture || avi} alt="avi" />
              </div>
              <form className={style.replyForm} onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Tweet your reply"
                  onChange={handleChange}
                  value={reply}
                />
                <button
                  disabled={reply.length < 1 || authState.isFetching}
                  className={style.reBtn}
                >
                  {' '}
                  Reply{' '}
                </button>
              </form> */}
            </div>
            <Replies tweetId={tweetId} />
          </div>
        </PageContent>
        <RightBar />
      </AppContainer>
    </div>
  )
}

export default SingleTweet
