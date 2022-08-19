export const Login_Fields = {
  username: '',
  password: ''
}

/**
 * This represents some generic auth provider API, like Firebase.
 */
export const fakeAuthProvider = {
  isAuthenticated: false,
  signin(callback) {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100); // fake async
  },
  signout(callback) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};
