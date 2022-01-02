import { useState, useContext } from 'react'
import TextInput from '../TextInput/TextInput'
import TextArea from '../TextInput/TextArea'
import { AuthContext } from '../../context/AuthContext.js'
import { get, put } from '../../utils/axiosLib'
import { logger } from '../../utils/logger'
import { CircularProgress } from '@material-ui/core'

import style from './Update.module.scss'
import Close from '../../images/icons/close.svg'
import Cover from '../../images/others/cover.jpeg'
import avi from '../../images/others/avatar.jpeg'
import cam from '../../images/icons/camera.png'

interface Modal {
  modalStatus?: boolean
  modalState: boolean
  handleModal: any
  switchModal?: any
}
interface User {
  name: string
  bio: string
  location: string
}
interface Response {
  isLoading: boolean
  error: string
  success: string
}
const Update: React.FC<Modal> = (props) => {
  const [authState, setAuthState] = useContext<any>(AuthContext)
  const user: any = authState.user.user
  const [userInput, setUserInput] = useState<User>({
    name: user.name,
    bio: user.bio || '',
    location: user.location || '',
  })
  const [file, setFile] = useState<any>({
    fileMain: '',
    fileSrc: '',
  })
  const [response, setResponse] = useState<Response>({
    isLoading: false,
    error: '',
    success: '',
  })

  const handleFileChange = async (event: any) => {
    if (event.target.files[0]) {
      const srcMain = window.URL.createObjectURL(event.target.files[0])
      setFile({
        fileMain: srcMain,
        fileSrc: event.target.files[0],
      })
    }
  }
  const inputHandler = (event: any) => {
    setUserInput({
      ...userInput,
      [event.target.name]: event.target.value,
    })
    // logger(file.fileSrc)
    // logger(file.fileMain)
  }
  const handleSubmit = async (event: any) => {
    event.preventDefault()
    setResponse({
      ...response,
      isLoading: true,
    })
    //** s3 block
    let s3ImgUrl = ''
    if (file) {
      const s3endpoint = `${process.env.REACT_APP_BASE_URL}s3url`
      const reqConfig = {
        headers: { 'content-type': 'multipart/form-data' },
      }
      const s3UrlReq = await get(s3endpoint)
      let s3Url = s3UrlReq.data.gurl
      const s3Upload = await put(`${s3Url}`, file.fileSrc, reqConfig)
      logger('upload result>>>', s3Upload)
      s3ImgUrl = s3Url.split('?')[0]
      logger('im__' + s3ImgUrl)
    }
    //** s3 block

    const userObj = {
      name: userInput.name,
      bio: userInput.bio,
      location: userInput.location,
      profilePicture: s3ImgUrl || '',
      userId: user._id,
    }
    const endpoint = `${process.env.REACT_APP_BASE_URL}user/${user._id}`
    const updateReq = await put(endpoint, userObj)
    logger(updateReq)
    setAuthState({
      ...authState,
      user: {
        ...authState.user,
        user: {
          ...authState.user.user,
          name: userInput.name,
          bio: userInput.bio,
          location: userInput.location,
          profilePicture: s3ImgUrl || '',
        },
      },
      latestFollow: Math.random() * 10,
    })
    setResponse({
      ...response,
      isLoading: false,
    })
    props.handleModal()
  }

  return (
    <>
      {props.modalState && (
        <div
          className={`${style.modal} animate__animated animate__zoomIn "
          ${
            props.modalStatus === false
              ? 'animate__animated  animate__zoomOut'
              : ''
          }`}
        >
          <form className={style.modalContent} onSubmit={handleSubmit}>
            <div className={style.modalTop}>
              <div className={style.topLeft}>
                <div className={style.closeCircle}>
                  <img onClick={props.handleModal} src={Close} alt="close" />
                </div>
                <h2>Edit profile</h2>
              </div>
              <div className={style.topRight}>
                <button type="submit">
                  {response.isLoading ? (
                    <CircularProgress color="inherit" size="15px" />
                  ) : (
                    'Save'
                  )}
                </button>
              </div>
            </div>
            <div className={style.modalBody}>
              <div className={style.coverImgBox}>
                <img src={Cover} alt="cover" />
              </div>
              <div className={style.aviBox}>
                <img
                  className={style.avatar}
                  src={
                    file.fileMain !== ''
                      ? file.fileMain
                      : file.fileMain === '' && user.profilePicture !== ''
                      ? user.profilePicture
                      : avi
                  }
                  alt="avi"
                />
                {/* {(user.profilePicture === '' && file.fileMain === '') && (
                    <img src={avi} alt="avatar" />
                )}
                {user.profilePicture !== ''  && (
                    <img src={user.profilePicture} alt="avatar" />
                )}
                {(user.profilePicture === '' && file.fileMain !== '') && (
                    <img src={file.fileMain} alt="avatar" />
                )} */}
                <input
                  type="file"
                  name="fileUpload"
                  id="file"
                  onChange={handleFileChange}
                />
                <div className={style.aviOverlay}>
                  <div className={style.cam}>
                    <img src={cam} alt="upload" />
                  </div>
                </div>
              </div>
              <div className={style.modalForm}>
                <TextInput
                  labelName="Name"
                  inputName="name"
                  type="text"
                  value={userInput.name}
                  inputHandler={inputHandler}
                />
                <TextArea
                  labelName="Bio"
                  inputName="bio"
                  type="text"
                  value={userInput.bio}
                  inputHandler={inputHandler}
                />
                <TextArea
                  labelName="Location"
                  inputName="location"
                  type="text"
                  value={userInput.location}
                  inputHandler={inputHandler}
                />
              </div>
              {/* <div>
                <p className={style.errMsg}>{response.error}</p>
                <p className={style.successMsg}>{response.success}</p>
                </div> */}
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default Update
