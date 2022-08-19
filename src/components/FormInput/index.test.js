/* eslint-disable testing-library/prefer-screen-queries */
import { FormInput } from "./index"
import { render, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { testSnapshots } from 'test'
import { Form } from 'react-bootstrap'

const makeSut = (props) => {
  const { ariaLabel, error, id, isView, label, name, placeholder, value } = props
  return render(
    <FormInput
      ariaLabel={ariaLabel}
      error={error}
      id={id}
      isView={isView}
      label={label}
      name={name}
      placeholder={placeholder}
      required={true}
      value={value}
      onChange={jest.fn()}
    />
  )
}

const initialConfig = {
  ariaLabel: "aria-input-title",
  label: "Form Title",
  id: "input-title",
  name: "title",
}

describe('<InputField />', () => {
  testSnapshots(Form.Control, [
    {
      props: initialConfig,
      description: 'renders input correctly'
    },
    {
      props: {
        ...initialConfig,
        disabled: true,
      },
      description: 'renders disable input correctly'
    },
    {
      props: {
        ...initialConfig,
        readOnly: true,
      },
      description: 'renders readonly input'
    },
    {
      props: {
        ...initialConfig,
        type: 'email'
      },
      description: 'renders input is email'
    },
    {
      props: {
        ...initialConfig,
        type: 'select'
      },
      description: 'renders input is select'
    },
    {
      props: {
        ...initialConfig,
        multiple: true,
        type: 'select'
      },
      description: 'renders input is select multi'
    },
    {
      props: {
        ...initialConfig,
        type: 'file'
      },
      description: 'renders input is file'
    },
    {
      props: {
        ...initialConfig,
        type: 'textarea'
      },
      description: 'renders input is textarea'
    },
    {
      props: {
        ...initialConfig,
        type: 'search'
      },
      description: 'renders input is search'
    },
    {
      props: {
        ...initialConfig,
        type: 'image'
      },
      description: 'renders input is image'
    },
    {
      props: {
        ...initialConfig,
        type: 'number'
      },
      description: 'renders input is number'
    },
    {
      props: {
        ...initialConfig,
        type: 'date'
      },
      description: 'renders input is date'
    },
    {
      props: {
        ...initialConfig,
        type: 'checkbox'
      },
      description: 'renders input is checkbox'
    },
    {
      props: {
        ...initialConfig,
        disabled: true,
        type: 'checkbox'
      },
      description: 'renders input is disabled checkbox'
    },
    {
      props: {
        ...initialConfig,
        type: 'radio'
      },
      description: 'renders input is radio'
    },
    {
      props: {
        ...initialConfig,
        disabled: true,
        type: 'radio'
      },
      description: 'renders input is disabled radio'
    },
  ])
})

describe("<FormInput />", () => {
  test("Should render label correctly", () => {
    const { getByText } = makeSut(initialConfig)

    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByText(/Form Title/)).toBeInTheDocument()
  })

  test("Should call onChange value successfully", async () => {
    const { getByTestId } = makeSut(initialConfig)
    userEvent.type(getByTestId("input-title"), "abc")
    await waitFor(() => expect(getByTestId("input-title")).toHaveDisplayValue("abc"))
  })
})
