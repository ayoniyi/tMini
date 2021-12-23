import { createContext, useEffect, useState } from 'react'

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isFetching: false,
  error: false,
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({ children }) => {
const [authState, setAuthState] = useState(INITIAL_STATE)


  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(authState.user))
  }, [authState.user])

  return (
    <AuthContext.Provider
      value={[authState, setAuthState]}
    >
      {children}
    </AuthContext.Provider>
  )
}
