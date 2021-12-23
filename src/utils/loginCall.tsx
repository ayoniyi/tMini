import axios from 'axios'

export const loginReq = async (userCredentials:any, dispatch:any) => {
  dispatch({ type: 'LOGIN_START' })
  const baseUrl = process.env.REACT_APP_BASEURL
  try {
    localStorage.removeItem("user")
    const res = await axios.post(`${baseUrl}auth/login`, userCredentials)
    dispatch({ type: 'LOGIN_SUCCESS', 
    payload: res.data 
  })
  } catch (err) {
    dispatch({ type: 'LOGIN_FAILURE', payload: err })
  }
}

// export const loginReqx = async (userCredentials:any, di ) => {
//   dispatch({ type: 'LOGIN_START' })
//   const baseUrl = process.env.REACT_APP_BASEURL
//   try {
//     localStorage.removeItem("user")
//     //const res = await axios.post(`${baseUrl}auth/login`, userCredentials)
//     dispatch({ type: 'LOGIN_SUCCESS', 
//     //payload: res.data 
//   })
//   } catch (err) {
//     dispatch({ type: 'LOGIN_FAILURE', payload: err })
//   }
// }
