// import { createContext, useEffect, useReducer } from 'react'
// import AuthReducer from './AuthReducer'

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

// export const AuthContextT = createContext(INITIAL_STATE)

// export const AuthContextProvider:any = ({ children }) => {
//   const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

//   useEffect(() => {
//     localStorage.setItem('user', JSON.stringify(state.user))
//   }, [state.user])

//   return (
//     <AuthContext.Provider
//       value={{
//         user: state.user,
//         isFetching: state.isFetching,
//         error: state.error,
//        dispatch
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   )
// }
