import { Col, Row } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome } from "@fortawesome/free-solid-svg-icons"

import { useAuth } from "context/AuthContext"

import { LoginPage } from "modules/Login"
import { ProfilePage } from "modules/Profile"

import { Wrapper } from "themes/styles"

export const Header = () => {
  const auth = useAuth()

  return (
    <Wrapper>
      <Row>
        <Col className="d-flex align-items-center justify-content header-left" md={4}>
          <FontAwesomeIcon icon={faHome} />
          <p>Funny Movies</p>
        </Col>
        <Col className="d-flex justify-content-end" md={8}>
          {!auth.user && <LoginPage />}
          {auth.user && <ProfilePage />}
        </Col>
      </Row>
    </Wrapper>
  )
}
