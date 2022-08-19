import { fakeAuthProvider } from 'constants/auth';
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
export const AuthProvider = (props) => {
  const { children } = props;

  let userInfo = null
  if (localStorage.user) {
    // get user from localStorage
    userInfo = JSON.parse(localStorage.user)
  }
  const [user, setUser] = useState(userInfo);

  const register = (newUser, callback) => {
    return fakeAuthProvider.register(newUser, (isRegisterred) => {
      if (!isRegisterred) {
        alert('There is existed user')

        return
      }
      
      alert('Register successfully')
      callback();
    });
  };

  const signin = (newUser, callback) => {
    return fakeAuthProvider.signin(newUser, (isAuthenticated) => {
      if (!isAuthenticated) {
        alert('User not found')

        return
      }

      localStorage.setItem('user', JSON.stringify(newUser))

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

  const value = { user, register, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  return useContext(AuthContext);
};
