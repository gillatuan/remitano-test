import { Modal } from "react-bootstrap"

import { Wrapper } from "./styles"

export const MyModal = (props) => {
  const { children, dialogClassName = "my-modal", name = "my-modal", show = false, title = "My Modal", setShow } = props

  const handleShowConfirm = (status) => {
    setShow(status)
  }

  return (
    <Wrapper>
      <Modal
        aria-labelledby={name}
        dialogClassName={dialogClassName}
        show={show}
        size="lg"
        onHide={() => handleShowConfirm(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id={name}>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </Wrapper>
  )
}
