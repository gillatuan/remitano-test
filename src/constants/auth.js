export const LoginFields = {
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
    let message = ''
    if (users.length > 0) {
      message = 'User is existed'
      // not allow existed user
      const checkExistedItem = users.find((item) => item.username === user.username)
      if (!checkExistedItem) {
        message = 'Register user successfully'
        fakeAuthProvider.isAuthenticated = true
        users.push(user)
        localStorage.setItem('users', JSON.stringify(users))
      }
    } else {
      message = 'Register user successfully'
      users.push(user)
      localStorage.setItem('users', JSON.stringify(users))
    }

    setTimeout(callback(fakeAuthProvider.isAuthenticated, message), 100) // fake async
  },
  signin(user, callback) {
    // eslint-disable-next-line no-mixed-operators
    const users = (localStorage.getItem("users") && JSON.parse(localStorage.getItem("users"))) || []
    let message = ''
    if (users.length > 0) {
      message = 'User not found'
      const checkExistedItem = users.find((item) => item.username === user.username && item.password === user.password)
      if (checkExistedItem) {
        message = 'Login Successfully'
        fakeAuthProvider.isAuthenticated = true
        localStorage.setItem("user", JSON.stringify(checkExistedItem))
      }
    }

    setTimeout(callback(fakeAuthProvider.isAuthenticated, message), 100) // fake async
  },
  signout(callback) {
    fakeAuthProvider.isAuthenticated = false
    setTimeout(callback, 100)
  },
}
