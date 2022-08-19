import styled from "styled-components"

export const Wrapper = styled.div`
  margin: 0;

  input {
    max-height: 38px;
  }

  &.style-error input {
    border-color: red;
  }
  label.required {
    display: none;
  }

  label.sub-label {
    font-weight: normal;
    font-size: 0.65rem;
  }

  .form-input {
    display: flex;
    flex-direction: column;
    max-width: 200px;
  }
`
