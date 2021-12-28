import { useState } from 'react'
//import ReactDOM from 'react-dom'
import style from './Auth.module.scss'
import LImg from '../../images/utils/land2.png'
import Logo from '../../images/icons/logo.svg'
//import { AnimatePresence } from 'framer-motion'

import SignIn from '../../components/Login/SignIn'
import SignUp from '../../components/SignUp/SignUp'

//const portalElement: any = document.getElementById('modalOverlay')

interface Modal {
  modal?: string
  modalStatus?: boolean
  modalState?: boolean
}

const Auth = () => {
  // const [modal, setModal] = useState<string>('None')

  const [modalValues, setModalValues] = useState<Modal>({
    modal: 'None',
    modalStatus: false,
    modalState: false,
  })

  const handleModal = () => {
    setTimeout(() => {
      setModalValues({
        ...modalValues,
        modal: 'None',
        modalState: false,
      })
    }, 300)
    setModalValues({
      ...modalValues,
      modalStatus: false,
    })
  }
  const handleSignIn = () => {
    setModalValues({
      ...modalValues,
      modal: 'SignIn',
      modalState: true,
      modalStatus: true,
    })
  }

  const handleSignUp = () => {
    setModalValues({
      ...modalValues,
      modal: 'SignUp',
      modalState: true,
      modalStatus: true,
    })
  }

  const switchModal = () => {
    if (modalValues.modal === 'SignUp') {
      setModalValues({
        ...modalValues,
        modal: 'SignIn',
      })
    }
    if (modalValues.modal === 'SignIn') {
      setModalValues({
        ...modalValues,
        modal: 'SignUp',
      })
    }
  }

  localStorage.removeItem('user')

  return (
    <div className={style.container}>
      {modalValues.modalState && (
        <>
          <div
            className={style.overlay + ' animate__animated animate__fadeIn'}
            onClick={handleModal}
          ></div>
          {modalValues.modal === 'SignIn' && (
            <SignIn
              handleModal={handleModal}
              switchModal={switchModal}
              modalState={modalValues.modalState}
              modalStatus={modalValues.modalStatus}
            />
          )}
          {modalValues.modal === 'SignUp' && (
            <SignUp
              handleModal={handleModal}
              switchModal={switchModal}
              modalState={modalValues.modalState}
              modalStatus={modalValues.modalStatus}
            />
          )}
        </>
      )}
      <div className={style.containerContent}>
        <div className={style.left}>
          <img className={style.landImg} src={LImg} alt="welcome" />
        </div>
        <div className={style.right}>
          <div className={style.rightContent}>
            <div className={style.logoBox}>
              <img src={Logo} alt="logo" />
            </div>
            <div className={style.rightBody}>
              <h1>Happening now..</h1>
              <h2>Join TwitterMini today</h2>
              <button onClick={handleSignUp}>Sign up</button>
            </div>
            <div className={style.rightBottom}>
              <p className={style.termsBtm}>
                By signing up you agree to the <span>Terms of Service</span> and{' '}
                <span>Privacy Policy</span>, including <span>Cookie Use</span>.
              </p>
              <p className={style.loginBtm}>
                Already have an account?
                {/* <span>Log in</span> */}
              </p>
              <button onClick={handleSignIn}>Sign in</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
