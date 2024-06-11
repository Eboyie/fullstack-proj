import { useContext, useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Button,
  Container,
  ListGroup,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap';

import { Store } from './Store';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import { ApiError } from './types/ApiError';
import { getError } from './utils';

import { useGetCategoriesQuery } from './hooks/productHooks';

function App() {
  const {
    state: { mode, cart, userInfo },
    dispatch,
  } = useContext(Store);

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', mode);
  }, [mode]);

  const switchModeHandler = () => {
    dispatch({ type: 'SWITCH_MODE' });
  };

  const signoutHandler = () => {
    dispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const { data: categories, isPending, error } = useGetCategoriesQuery();

  return (
    <div className="d-flex flex-column vh-100">
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Navbar
          className="d-flex flex-column align-items-stretch p-2 pb-0 mb-3"
          bg="dark"
          variant="dark"
          expand="lg"
        >
          <div className="d-flex justify-content-between align-items-center">
            <LinkContainer to="/" className="header-link">
              <Navbar.Brand>4All</Navbar.Brand>
            </LinkContainer>

            <Navbar.Collapse>
              <Nav className="w-100 justify-content-end">
                <Link
                  to="#"
                  className="nav-link header-link"
                  onClick={switchModeHandler}
                >
                  <i
                    className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}
                  ></i>{' '}
                  {mode === 'light' ? 'Light' : 'Dark'}
                </Link>
                {userInfo ? (
                  <NavDropdown
                    className="header-link"
                    title={`Hello, ${userInfo.name}`}
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      {' '}
                      Sign Out{' '}
                    </Link>
                  </NavDropdown>
                ) : (
                  <NavDropdown className="header-link" title={`Hello, sign in`}>
                    <LinkContainer to="/signin">
                      <NavDropdown.Item>Sign In</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
                <Link to="/orderhistory" className="nav-link header-link">
                  Orders
                </Link>
                <Link to="/cart" className="nav-link header-link p-0"></Link>
                <Link to="/cart" className="nav-link header-link p-0">
                  {
                    <span className="cart-badge">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </span>
                  }
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="40"
                    fill="currentColor"
                    className="bi bi-cart4"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                  </svg>
                </Link>
              </Nav>
            </Navbar.Collapse>
          </div>
          <div className="sub-header">
            <div className="d-flex">
              <Link
                to="#"
                className="nav-link header-link p-1"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i> All
              </Link>
              {['Todays Sales', 'GiftsCard', 'Offers'].map((x) => (
                <Link
                  key={x}
                  className="nav-link header-link p-1 px-3"
                  to={`/search?tag=${x}`}
                >
                  {x}
                </Link>
              ))}
            </div>
          </div>
        </Navbar>
      </header>

      {sidebarIsOpen && (
        <div
          onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
          className="side-navbar-backdrop"
        ></div>
      )}

      <div
        className={
          sidebarIsOpen
            ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
            : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
        }
      >
        <ListGroup variant="flush">
          <ListGroup.Item action className="side-navbar-user">
            <LinkContainer
              to={userInfo ? `/profile` : `/signin`}
              onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
            >
              <span>
                {userInfo ? `Hello, ${userInfo.name}` : `Hello, sign in`}
              </span>
            </LinkContainer>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className="d-flex justify-content-between align-items-center">
              <strong>Categories</strong>
              <Button
                variant={mode}
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fa fa-times" />
              </Button>
            </div>
          </ListGroup.Item>
          {isPending ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">
              {getError(error as unknown as ApiError)}
            </MessageBox>
          ) : (
            categories!.map((category) => (
              <ListGroup.Item action key={category}>
                <LinkContainer
                  to={{
                    pathname: '/search',
                    search: `category=${category}`,
                  }}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </div>
      <main>
        <Container className="mt-3">
          <Outlet />
        </Container>
      </main>
      <footer>
        <div className="text-center">@2024 all rights reserved</div>
      </footer>
    </div>
  );
}

export default App;
