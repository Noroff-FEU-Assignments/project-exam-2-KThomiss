import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import NavProfile from "../dashboard/user/NavProfile";
import ModalVertical from "../common/ModalVertical";
import LoginForm from "../login/LoginForm";
import RegisterForm from "../login/RegisterForm";

function OffcanvasExample() {
  const [auth, setAuth] = useContext(AuthContext);
  const [modalShowLog, setModalShowLog] = useState(false);
  const [modalShowReg, setModalShowReg] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    setAuth(null);
    navigate("/");
  };
  return (
    <header>
      <div className="desktop-container d-none d-lg-flex nav-lg">
        <div className="logo-container">Logo</div>
        <Nav className="desktop-nav">
          <NavLink end to="/">
            Home
          </NavLink>
          {auth ? (
            <>
              <div className="admin-container">
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/profiles">Profiles</NavLink>
                <NavLink to="/new-post">New post</NavLink>
              </div>
              <div className="user-container">
                <NavProfile />
                <button onClick={logout}>Log out</button>
              </div>
            </>
          ) : (
            <>
              <Link variant="primary" onClick={() => setModalShowLog(true)}>
                Login
              </Link>
              <ModalVertical show={modalShowLog} onHide={() => setModalShowLog(false)} heading="Login">
                <LoginForm />
                <Link variant="primary" onClick={() => setModalShowReg(true)}>
                  Dont have an account?
                </Link>
              </ModalVertical>
              <ModalVertical heading="Register" show={modalShowReg} onHide={() => setModalShowReg(false)}>
                <RegisterForm />
              </ModalVertical>
            </>
          )}
        </Nav>
      </div>
      <Nav className="d-block d-lg-none">
        {[false].map((expand) => (
          <Navbar key={expand} bg="light" expand={expand} className="mb-3">
            <Container fluid>
              <Navbar.Brand href="#">Toad</Navbar.Brand>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
              <Navbar.Offcanvas id={`offcanvasNavbar-expand-${expand}`} aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`} placement="end">
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>Logo</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <NavLink end to="/">
                      Home
                    </NavLink>
                    {auth ? (
                      <>
                        <div className="d-flex flex-column">
                          <NavLink to="/dashboard">Dashboard</NavLink>
                          <NavLink to="/profiles">Profiles</NavLink>
                          <NavLink to="/new-post">New post</NavLink>
                        </div>
                        <div className="offcanvas-container">
                          <NavProfile />
                          <button onClick={logout}>Log out</button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Link variant="primary" onClick={() => setModalShowLog(true)}>
                          Login
                        </Link>
                        <ModalVertical show={modalShowLog} onHide={() => setModalShowLog(false)} heading="Login">
                          <LoginForm />
                          <Link variant="primary" onClick={() => setModalShowReg(true)}>
                            Dont have an account?
                          </Link>
                        </ModalVertical>
                        <ModalVertical heading="Register" show={modalShowReg} onHide={() => setModalShowReg(false)}>
                          <RegisterForm />
                        </ModalVertical>
                      </>
                    )}
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
      </Nav>
    </header>
  );
}

export default OffcanvasExample;

/* to="/register" */
