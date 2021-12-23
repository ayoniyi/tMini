import { useState, useRef } from 'react'
//import { useNavigate } from 'react-router-dom'
import { post } from '../../utils/axiosLib'
import style from '../Login/Signin.module.scss'
import TextInput from '../TextInput/TextInput'
import Logo from '../../images/icons/logo.svg'
import Close from '../../images/icons/close.svg'
import { logger } from '../../utils/logger'
import { CircularProgress } from '@material-ui/core'

interface Modal {
  modalStatus?: boolean
  modalState: boolean
  handleModal: any
  switchModal: any
}

interface User {
  name: string
  email: string
  password: string
  confirmPassword: string
}

interface Response {
  error: string
  success: string
}

const SignUp = (props: Modal) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userInput, setUserInput] = useState<User>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [response, setResponse] = useState<Response>({
    error: '',
    success: '',
  })

  const passwordConfirm: any = useRef()

  const inputHandler = (event: any) => {
    setUserInput({
      ...userInput,
      [event.target.name]: event.target.value,
    })
    //console.log('are the fields empty? ' + isEmpty)
  }

  //const isEmpty = Object.values(userInput).every((x) => x === null || x === '')

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    setIsLoading(true)
    if (userInput.confirmPassword !== userInput.password) {
      //passwordConfirm.current.setCustomValidity("Passwords don't match!")
      await setResponse({
        error: "Passwords don't match!",
        success: ''
      })
      console.log(passwordConfirm.current.value)
      setIsLoading(false)
    } else {
      await setResponse({
        ...response,
        error: '',
      })
      //passwordConfirm.current.setCustomValidity('')
      try {
        const newUser = {
          username: userInput.name,
          email: userInput.email,
          password: userInput.password,
        }

        const endpoint = `${process.env.REACT_APP_BASE_URL}auth/signup`
        const newUserReq = await post(endpoint, newUser)
        logger('REQ RESPONSE::: ', newUserReq)
        setIsLoading(false)
        await setResponse({
          error: '',
          success: 'Account created successfully',
        })
        setTimeout(() => {
          props.switchModal()
        }, 1500)
      } catch (err:any) {
        setIsLoading(false)
        logger(' ERROR::: ', err)
        setResponse({
          error: err?.response.data,
          success: '',
        })
      }
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
              <h2>Create your account</h2>
              <form className={style.modalForm} onSubmit={handleSubmit}>
                <TextInput
                  labelName="Name"
                  inputName="name"
                  type="text"
                  value={userInput.name}
                  inputHandler={inputHandler}
                  //errMsg={errorMsg}
                />
                <TextInput
                  labelName="Email"
                  inputName="email"
                  type="email"
                  value={userInput.email}
                  inputHandler={inputHandler}
                  //errMsg={errorMsg}
                />
                <div className={style.doubleInputs}>
                  <div className={style.diOne}>
                    <TextInput
                      labelName="Password"
                      inputName="password"
                      type="password"
                      value={userInput.password}
                      inputHandler={inputHandler}
                      //errMsg={errorMsg}
                    />
                  </div>
                  <div className={style.diOne}>
                    <TextInput
                      labelName="Confirm Password"
                      inputName="confirmPassword"
                      type="password"
                      value={userInput.confirmPassword}
                      passwordConfirmref={passwordConfirm}
                      inputHandler={inputHandler}
                      //fieldClasses={fieldClasses}
                      //errMsg={errorMsg}
                    />
                  </div>
                </div>

                <div className={style.formLinks}>
                  {/* <p>Forgot password?</p> */}
                  <p onClick={props.switchModal}>Login to TwitterMini</p>
                </div>

                <button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <CircularProgress color="inherit" size="25px" />
                  ) : (
                    'Next'
                  )}
                </button>
                <p className={style.errMsg}>{response.error}</p>
                <p className={style.successMsg}>{response.success}</p>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SignUp
