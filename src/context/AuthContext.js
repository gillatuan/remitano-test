import { fakeAuthProvider } from "constants/auth"
import { createContext, useCallback, useContext, useState } from "react"

const AuthContext = createContext()
export const AuthProvider = (props) => {
  const { children } = props

  let userInfo = null
  if (localStorage.user) {
    // get user from localStorage
    userInfo = JSON.parse(localStorage.user)
  }
  const [user, setUser] = useState(userInfo)

  const register = useCallback((newUser, callback) => {
    return fakeAuthProvider.register(newUser, (isAuthenticated, message) => {
      callback(isAuthenticated, message)
    })
  }, [])

  const signin = useCallback((newUser, callback) => {
    return fakeAuthProvider.signin(newUser, (isAuthenticated, message) => {
      if (isAuthenticated) {
        setUser(newUser)
      }

      callback(isAuthenticated, message)
    })
  }, [])

  const signout = useCallback((callback) => {
    return fakeAuthProvider.signout(() => {
      localStorage.removeItem("user")

      setUser(null)
      callback()
    })
  }, [])

  const value = { user, register, signin, signout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
