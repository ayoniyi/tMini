import { useState, useContext } from 'react'
import style from './Share.module.scss'
import { Cancel } from '@material-ui/icons'
import { post, get, put } from '../../utils/axiosLib'
import { logger } from '../../utils/logger'
import { AuthContext } from '../../context/AuthContext'
import { CircularProgress } from '@material-ui/core'

import avi from '../../images/others/avatar.svg'
import pic from '../../images/icons/image.svg'

const Share = () => {
  const [tweet, setTweet] = useState<string>('')
  const [file, setFile] = useState<any>('')
  const [authState, setAuthState] = useContext<any>(AuthContext)
  const token: string = authState.user.token
  const user: any = authState.user.user

  const handleChange = (event: any) => {
    setTweet(event.target.value)
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    setAuthState({
      ...authState,
      isFetching: true,
    })
    // ** s3 block
    let s3ImgUrl = ''
    if (file) {
      const s3endpoint = `${process.env.REACT_APP_BASE_URL}s3url`
      const reqConfig = {
        headers: { 'content-type': 'multipart/form-data' },
      }
      const s3UrlReq = await get(s3endpoint)
      let s3Url = s3UrlReq.data.gurl
      const s3Upload = await put(`${s3Url}`, file, reqConfig)
      logger(s3Upload)
      s3ImgUrl = s3Url.split('?')[0]
      logger('im__' + s3ImgUrl)
    }
    // ** s3 block

    let newTweet = {
      userId: user._id,
      desc: tweet,
      img: s3ImgUrl,
    }
    const endpoint = `${process.env.REACT_APP_BASE_URL}post`
    const headers = {
      'auth-token': `${token}`,
      'Content-Type': 'application/json',
    }
    const newPostReq = await post(endpoint, newTweet, headers)
    setAuthState({
      ...authState,
      isFetching: false,
      latestTweet: tweet,
    })
    logger(newPostReq)
    setTweet('')
    setFile(null)
  }

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit}>
        <div className={style.top}>
          <img src={avi} alt="avi" />
          <input
            type="text"
            placeholder="What's happening?"
            value={tweet}
            onChange={handleChange}
          />
        </div>
        {file && (
          <div className={style.fileContainer}>
            <img src={URL.createObjectURL(file)} alt="post media" />
            <Cancel className={style.cancel} onClick={() => setFile(null)} />
          </div>
        )}
        <div className={style.bottom}>
          <div className={style.icons}>
            <label htmlFor="file">
              <img src={pic} alt="file" />
              <input
                style={{ display: 'none' }}
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg"
                onChange={(e: any) => setFile(e.target.files[0])}
              />
            </label>
          </div>
          <button disabled={tweet.length < 1 || authState.isFetching}>
            {authState.isFetching ? (
              <CircularProgress color="inherit" size="25px" />
            ) : (
              'Tweet'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Share
