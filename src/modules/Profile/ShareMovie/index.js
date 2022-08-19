import { Button, Form } from "react-bootstrap"
import axios from "axios"

import { useAuth } from "context/AuthContext"

import { FormInput } from "components/FormInput"

import { useFormControls } from "hooks/useFormControls"

import { VALIDATION_SHARE_MOVIE } from "constants/validation"
import { ShareMovieDef } from "constants/common"

import { Wrapper } from "./styles"

export const ShareMovie = (props) => {
  const { setShow } = props
  const auth = useAuth()

  const { errors, formIsValid, values, handleInputValue } = useFormControls(ShareMovieDef, VALIDATION_SHARE_MOVIE)

  const shareItem = async () => {
    if (!formIsValid()) {
      return
    }

    const requestUrl = `https://www.youtube.com/oembed?url=${values.movieUrl}&format=json`
    const result = await axios.get(requestUrl)

    const listMovie = (localStorage.getItem("sharedMovies") && JSON.parse(localStorage.getItem("sharedMovies"))) || []
    if (listMovie.length > 0) {
      const checkExistedItem = listMovie.find((item) => item.url === values.movieUrl)
      if (!checkExistedItem) {
        listMovie.push({
          username: auth.user.username,
          ...result.data
        })

        localStorage.setItem("sharedMovies", JSON.stringify(listMovie))
      }
    } else {
      listMovie.push({
        username: auth.user.username,
        ...result.data
      })

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
