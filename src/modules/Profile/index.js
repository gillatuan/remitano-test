import { Link, useLocation, useNavigate } from "react-router-dom"

import { useAuth } from "context/AuthContext"
import { Button, Form } from "react-bootstrap"
import { Wrapper } from "./styles"

export const ProfilePage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const auth = useAuth()
  const user = auth.user

  const from = location.state?.from?.pathname || "/"

  const shareMovie = () => {}

  const logOut = () => {
    auth.signout(() => {
      navigate(from, { replace: true })
    })
  }

  return (
    <Wrapper>
      <Form.Group className="d-flex align-items-center user-profile">
        <span>
          Welcome {user.username}, Go to <Link to="/protected">Profile</Link>
        </span>
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
