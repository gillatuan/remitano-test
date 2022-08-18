import { Container, ListGroup } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <Container>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Link to="/">Public Page</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/protected">Protected Page</Link>
        </ListGroup.Item>
      </ListGroup>

      <Outlet />
    </Container>
  );
};
