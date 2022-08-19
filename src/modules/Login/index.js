import { useLocation, useNavigate } from "react-router-dom"

import { FormInput } from "components/FormInput"
import { Login_Fields } from "constants/auth"
import { VALIDATION_LOGIN } from "constants/validation"
import { useAuth } from "context/AuthContext"
import { useFormControls } from "hooks/useFormControls"
import { Button, Form } from "react-bootstrap"
import { Wrapper } from "./styles"

export const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const auth = useAuth()

  const { errors, formIsValid, values, handleInputValue } = useFormControls(Login_Fields, VALIDATION_LOGIN)

  const from = location.state?.from?.pathname || "/"

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formIsValid()) {
      return
    }

    auth.signin({ username: values.username, password: values.password }, () => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from, { replace: true })
    })
  }

  const handleRegister = (e) => {
    e.preventDefault()

    if (!formIsValid()) {
      return
    }

    auth.register({ username: values.username, password: values.password }, () => {
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
      <Form className="d-flex form-login">
        <FormInput
          error={errors.username}
          name="username"
          placeholder="Username"
          value={values.username}
          onChange={handleInputValue}
        />
        <FormInput
          error={errors.password}
          name="password"
          placeholder="Password"
          subLabel="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          value={values.password}
          onChange={handleInputValue}
        />
        <Form.Group className="d-flex form-login-buttons">
          <Button type="submit" variant="outline-primary" onClick={(e) => handleSubmit(e)}>
            Login
          </Button>
          <Button type="button" variant="outline-primary" onClick={(e) => handleRegister(e)}>
            Register
          </Button>
        </Form.Group>
      </Form>
    </Wrapper>
  )
}
