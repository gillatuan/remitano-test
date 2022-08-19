import styled from "styled-components"

export const Wrapper = styled.div`
  .form-login {
    > div + div {
      margin-left: 20px;
    }

    .form-login-buttons {
      button {
        height: 38px;

        + button {
          margin-left: 20px;
        }
      }
    }
  }
`
