import { Container } from "react-bootstrap"
import { Outlet } from "react-router-dom"

import { Header } from "themes/Header"

export const Layout = () => {
  return (
    <Container>
      <Header />

      <Outlet />
    </Container>
  )
}
