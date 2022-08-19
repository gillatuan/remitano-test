import { fakeAuthProvider } from 'constants/auth';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();
export const AuthProvider = (props) => {
  const { children } = props;

  const [user, setUser] = useState();

  useEffect(() => {
    if (localStorage.user) {
      // get user from localStorage
      setUser(localStorage.user)
    }
  }, [])

  const signin = (newUser, callback) => {
    return fakeAuthProvider.signin(() => {
      localStorage.setItem('user', newUser)

      setUser(newUser);
      callback();
    });
  };

  const signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      localStorage.removeItem("user")

      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  return useContext(AuthContext);
};
