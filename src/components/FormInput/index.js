import { Form } from "react-bootstrap"

import { Wrapper } from "./styles"

export const FormInput = (props) => {
  const {
    ariaLabel = "",
    disabled,
    error,
    id = "",
    isDisplayErrorMessage = true,
    isView = false,
    label,
    name,
    placeholder,
    required,
    subLabel,
    value,
    type = "text",
    onChange,
  } = props

  let styleError = ""
  if (error) {
    styleError = "style-error"
  }

  return (
    <Wrapper className={styleError} key={name}>
      <div className="label-container">
        {label && (
          <Form.Label>
            {label}: {required && <span className="required">*</span>}
          </Form.Label>
        )}
        {subLabel && <Form.Label className="sub-label">{subLabel}</Form.Label>}
      </div>

      {isView && <p>{value}</p>}

      {!isView && (
        <>
          <Form.Control
            aria-label={ariaLabel}
            data-testid={id}
            disabled={disabled}
            name={name}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={(e) => onChange(name, e.currentTarget.value)}
          />

          {isDisplayErrorMessage && error && (
            <Form.Label className="required" key={`danger-${name}`}>
              {error}
            </Form.Label>
          )}
        </>
      )}
    </Wrapper>
  )
}
