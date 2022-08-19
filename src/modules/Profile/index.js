import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { useAuth } from "context/AuthContext"
import { Button, Form } from "react-bootstrap"
import { Wrapper } from "./styles"

export const ProfilePage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const auth = useAuth()
  const user = JSON.parse(auth.user)

  const from = location.state?.from?.pathname || "/"

  const shareMovie = () => {

  }

  const logOut = () => {
    auth.signout(() => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from, { replace: true })
    })
  }

  return (
    <Wrapper>
      <Form.Group className="d-flex align-items-center user-profile">
        <span>Welcome {user.username}</span>
        <Button type="button" variant="outline-primary" onClick={() => shareMovie()}>
          Share Movie
        </Button>
        <Button type="button" variant="outline-primary" onClick={() => logOut()}>
          Logout
        </Button>
      </Form.Group>
    </Wrapper>
  )
}
