import styled from 'styled-components'

export const Wrapper = styled.div`
  margin: 0;

  + div {
    margintop: 16;
  }

  ,
  input {
    bordercolor: red;
  }

  .label-container {
    white-space: nowrap;

    label + label.sub-label {
      font-weight: normal;
      font-size: 0.65rem;
    }
  }
`
