import { Link, useLocation, useNavigate } from "react-router-dom"

import { useAuth } from "context/AuthContext"
import { Button, Form } from "react-bootstrap"
import { Wrapper } from "./styles"
import { MyModal } from "components/MyModal"
import { useState } from "react"
import { ShareMovie } from "./ShareMovie"

export const ProfilePage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const auth = useAuth()
  const user = auth.user

  const from = location.state?.from?.pathname || "/"

  const [show, setShow] = useState(false)

  const shareItem = () => {
    setShow(true)
  }

  const logOut = () => {
    auth.signout(() => {
      navigate(from, { replace: true })
    })
  }

  return (
    <Wrapper>
      <Form.Group className="d-flex align-items-center user-profile">
        <p>
          Welcome {user.username}, Go to <Link to="/protected">Profile</Link>
        </p>
        <Button type="button" variant="outline-primary" onClick={() => shareItem()}>
          Share Movie
        </Button>
        <Button type="button" variant="outline-primary" onClick={() => logOut()}>
          Logout
        </Button>
      </Form.Group>
      <MyModal show={show} size='md' title="Share Movie" setShow={setShow}>
        <ShareMovie setShow={setShow} />
      </MyModal>
    </Wrapper>
  )
}
