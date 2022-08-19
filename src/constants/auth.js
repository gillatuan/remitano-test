export const Login_Fields = {
  username: "",
  password: "",
}

/**
 * This represents some generic auth provider API, like Firebase.
 */
export const fakeAuthProvider = {
  isAuthenticated: false,
  register(user, callback) {
    // eslint-disable-next-line no-mixed-operators
    const users = (localStorage.getItem("users") && JSON.parse(localStorage.getItem("users"))) || []
    users.push(user)
    localStorage.setItem('users', JSON.stringify(users))

    setTimeout(callback(true), 100) // fake async
  },
  signin(user, callback) {
    // eslint-disable-next-line no-mixed-operators
    const users = (localStorage.getItem("users") && JSON.parse(localStorage.getItem("users"))) || []
    if (users.length > 0) {
      const checkExistUser = users.find((item) => item.username === user.username && item.password === user.password)
      if (checkExistUser) {
        fakeAuthProvider.isAuthenticated = true
      }
    }

    setTimeout(callback(fakeAuthProvider.isAuthenticated), 100) // fake async
  },
  signout(callback) {
    fakeAuthProvider.isAuthenticated = false
    setTimeout(callback, 100)
  },
}
