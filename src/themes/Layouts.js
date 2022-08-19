import { Container } from "react-bootstrap"
import { Outlet } from "react-router-dom"

import { Header } from "themes/Header"
import { Wrapper } from "./styles"

export const Layout = () => {
  return (
    <Container>
      <Wrapper>
        <Header />

        <div className="content">
          <Outlet />
        </div>
      </Wrapper>
    </Container>
  )
}
