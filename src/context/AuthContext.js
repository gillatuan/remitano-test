import { fakeAuthProvider } from 'constants/auth';
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
export const AuthProvider = (props) => {
  const { children } = props;

  const [user, setUser] = useState();

  const signin = (newUser, callback) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  const signout = (callback) => {
    return fakeAuthProvider.signout(() => {
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
