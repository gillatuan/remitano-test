import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button, Form } from "react-bootstrap"

import { useAuth } from "context/AuthContext"

import { FormInput } from "components/FormInput"

import { useFormControls } from "hooks/useFormControls"

import { VALIDATION_SHARE_MOVIE } from "constants/validation"
import { ShareMovieDef } from "constants/common"

import { Wrapper } from "./styles"

export const ShareMovie = (props) => {
  const { setShow } = props
  const { errors, formIsValid, values, handleInputValue } = useFormControls(ShareMovieDef, VALIDATION_SHARE_MOVIE)

  const shareItem = () => {
    if (!formIsValid()) {
      return
    }

    const listMovie = (localStorage.getItem("sharedMovies") && JSON.parse(localStorage.getItem("sharedMovies"))) || []
    if (listMovie.length > 0) {
      const checkExistedItem = listMovie.find((item) => item === values.movieUrl)
      if (!checkExistedItem) {
        listMovie.push(values.movieUrl)

        localStorage.setItem("sharedMovies", JSON.stringify(listMovie))
      }
    } else {
      listMovie.push(values.movieUrl)

      localStorage.setItem("sharedMovies", JSON.stringify(listMovie))
    }

    setShow(false)
  }

  return (
    <Wrapper>
      <FormInput
        className="movie-input"
        error={errors.movieUrl}
        label="Youtube URL"
        name="movieUrl"
        placeholder="Youtube URL"
        style={{ alignItems: "center", display: "flex" }}
        value={values.movieUrl}
        onChange={handleInputValue}
      />
      <Form.Group className="d-flex align-items-center share-movie">
        <Button type="button" variant="outline-primary" onClick={() => shareItem()}>
          Share
        </Button>
      </Form.Group>
    </Wrapper>
  )
}
