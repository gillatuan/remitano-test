/* eslint-disable testing-library/prefer-screen-queries */
import { MyModal } from './index';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { testSnapshots } from 'test';
import { Modal } from 'react-bootstrap';

const makeSut = (props) => {
  const {
    children,
    dialogClassName = 'my-modal',
    name = 'my-modal',
    show = false,
    size = 'lg',
    title = 'My Modal',
    setShow,
  } = props;
  return render(
    <MyModal
      dialogClassName={dialogClassName}
      name={name}
      show={show}
      size={size}
      title={title}
      setShow={setShow}
    >
      {children}
    </MyModal>
  );
};

const initialConfig = {
  ariaLabel: 'aria-input-title',
  dialogClassName: 'my-modal',
  id: 'input-title',
  name: 'my-modal',
  title: 'My Modal'
};

describe('<MyModal /> props', () => {
  testSnapshots(Modal, [
    {
      props: initialConfig,
      description: 'renders Modal correctly',
    },
    {
      props: {
        ...initialConfig,
        title: 'My Modal'
      },
      description: 'renders Modal with My Modal in title',
    },
  ]);
});
