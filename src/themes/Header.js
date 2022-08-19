import { Col, Row } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome } from "@fortawesome/free-solid-svg-icons"

import { useAuth } from "context/AuthContext"

import { LoginPage } from "modules/Login"
import { ProfilePage } from "modules/Profile"

import { Link } from "react-router-dom"

export const Header = () => {
  const auth = useAuth()

  return (
    <div className="header-left">
      <Row>
        <Col className="d-flex align-items-center justify-content" md={4}>
          <Link to="/">
            <FontAwesomeIcon icon={faHome} />
            <p>Funny Movies</p>
          </Link>
        </Col>
        <Col className="d-flex justify-content-end" md={8}>
          {!auth.user && <LoginPage />}
          {auth.user && <ProfilePage />}
        </Col>
      </Row>
    </div>
  )
}
