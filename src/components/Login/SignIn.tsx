import { useState, useContext } from 'react'
import style from './Signin.module.scss'
//import { TextField } from '@material-ui/core'
import TextInput from '../TextInput/TextInput'
import { AuthContext } from '../../context/AuthContext.js'
import { post } from '../../utils/axiosLib'
import { logger } from '../../utils/logger'
//import { useNavigate } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'

import Logo from '../../images/icons/logo.svg'
import Close from '../../images/icons/close.svg'

interface Modal {
  modalStatus?: boolean
  modalState: boolean
  handleModal: any
  switchModal: any
}
interface User {
  email: string
  password: string
}
interface Response {
  error: string
  success: string
}

const Login: React.FC<Modal> = (props) => {
  const [userInput, setUserInput] = useState<User>({
    email: '',
    password: '',
  })
  const [response, setResponse] = useState<Response>({
    error: '',
    success: '',
  })

  const [authState, setAuthState] = useContext<any>(AuthContext)
  //const navigate = useNavigate()

  const inputHandler = (event: any) => {
    setUserInput({
      ...userInput,
      [event.target.name]: event.target.value,
    })
  }

 

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    setAuthState({
      ...authState,
      isFetching: true,
    })
    setResponse({
      ...response,
      error: '',
    })
    if (navigator.onLine) {
      try {
        const newUser = {
          email: userInput.email,
          password: userInput.password,
        }
        const endpoint = `${process.env.REACT_APP_BASE_URL}auth/login`
        const logUserReq = await post(endpoint, newUser)
        setAuthState({
          ...authState,
          user: logUserReq.data,
          isFetching: false,
          error: false,
        })
        //navigate('/home')
        logger('REQ RESPONSE::: ', logUserReq)
      } catch (err:any) {
        setAuthState({
          ...authState,
          isFetching: false,
          error: true,
        })
        logger(' ERROR::: ', err)
        setResponse({
          error: err?.response.data,
          success: '',
        })
      }
    } else {
      setResponse({
        error: 'No internet connection',
        success: '',
      })
    }
  }

  return (
    <>
      {props.modalState && (
        <div
          //animate__animated  animate__zoomInUp
          className={`${style.modal} animate__animated animate__zoomInUp "
          ${
            props.modalStatus === false
              ? 'animate__animated  animate__zoomOut'
              : ''
          }`}
        >
          <div className={style.modalContent}>
            <div className={style.modalTop}>
              <div className={style.closeBox}>
                <div className={style.closeCircle}>
                  <img onClick={props.handleModal} src={Close} alt="close" />
                </div>
              </div>
              <div className={style.logoBox}>
                <img src={Logo} alt="logo" />
              </div>
            </div>
            <div className={style.modalBody}>
              <h2>Login to your account</h2>
              <form className={style.modalForm} onSubmit={handleSubmit}>
                <TextInput
                  labelName="Email"
                  inputName="email"
                  type="email"
                  value={userInput.email}
                  inputHandler={inputHandler}
                />
                <TextInput
                  labelName="Password"
                  inputName="password"
                  type="password"
                  value={userInput.password}
                  inputHandler={inputHandler}
                />
                <div className={style.formLinks}>
                  <p>Forgot password?</p>
                  <p onClick={props.switchModal}>Sign up to TwitterMini</p>
                </div>
                <button disabled={authState.isFetching}>
                  {authState.isFetching ? (
                    <CircularProgress color="inherit" size="25px" />
                  ) : (
                    'Next'
                  )}
                </button>
                <p className={style.errMsg}>{response.error}</p>
                <p className={style.successMsg}>{response.success}</p>
                {/* <p className={style.successMsg}>{authState.user?.username}</p> */}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Login
