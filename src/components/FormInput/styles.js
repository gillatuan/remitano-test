import styled from "styled-components"

export const Wrapper = styled.div`
  margin: 0;
  ${props => props.style}

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
    position: absolute;
    bottom: -60px;
  }

  .form-input {
    display: flex;
    flex-direction: column;
    max-width: 200px;
    position: relative;
  }
`
