// import { createContext, useState, useEffect} from 'react'

// interface User {
//   user: any
//   isFetching: boolean
//   error: boolean
// }
// // const userObj : User = {
// //   user: "",
// //   isFetching: false,
// //   error: false
// // };
// const userdata = JSON.stringify(localStorage.getItem('user'));
// var userObj2: User = JSON.parse(userdata);

// const INITIAL_STATE:any =  {
//   user: userObj2 || null,
//   isFetching: false,
//   error: false,
// }

// export const AuthContext = createContext(INITIAL_STATE)

// export const AuthProvider = (props:any) => {
//   const [authState, setAuthState] = useState(INITIAL_STATE)

//   useEffect(() => {
//     localStorage.setItem('user', JSON.stringify(authState.user))
//   }, [authState.user])

// //   const contextValues = {
// //       user: authState.user,
// //       isFetching: authState.isFetching,
// //       error: authState.error
// //   }
//   return (
//     <AuthContext.Provider value={[authState, setAuthState]}>
//     {props.children}
//     </AuthContext.Provider>
//   )
// }
