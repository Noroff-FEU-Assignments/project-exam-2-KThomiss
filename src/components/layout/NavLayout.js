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
import logo from "../../images/toad-logo.png";
import { ArrowRightOnRectangleIcon, Bars3Icon /* , XMarkIcon */ } from "@heroicons/react/20/solid";

export default function NavLayout() {
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
      <Nav className="desktop-nav d-none d-lg-flex nav-lg">
        <NavLink end to="/" className="logo-container">
          <img className="logo-img" src={logo} alt="toad" />
          Code ToAd
        </NavLink>
        {auth ? (
          <>
            <div className="admin-container">
              <NavLink to="/posts">Posts</NavLink>
              <NavLink to="/profiles">Profiles</NavLink>
              <NavLink to="/followers">Followers</NavLink>
            </div>
            <div className="user-container">
              <NavProfile />
              <button onClick={logout} className="logout-btn">
                <ArrowRightOnRectangleIcon className="icon" />
              </button>
            </div>
          </>
        ) : (
          <div className="visit-container">
            <Link onClick={() => setModalShowLog(true)}>Login</Link>
            <Link onClick={() => setModalShowReg(true)}>Register</Link>
            <ModalVertical show={modalShowLog} onHide={() => setModalShowLog(false)} heading="Login">
              <LoginForm />
              <p className="mb-0 mt-5">Don't have an account yet?</p>
              <Link onClick={() => setModalShowReg(true)} className="cta-secondary">
                Register
              </Link>
            </ModalVertical>
            <ModalVertical heading="Register" show={modalShowReg} onHide={() => setModalShowReg(false)}>
              <RegisterForm />
            </ModalVertical>
          </div>
        )}
      </Nav>
      <Nav className="d-block d-lg-none mobile-nav-wrapper">
        {[false].map((expand) => (
          <Navbar key={expand} expand={expand} className="mobile-nav p-0">
            <Container fluid>
              <Navbar.Brand className="d-flex flex-column">
                <NavLink end to="/" className="logo-container">
                  <img className="logo-img" src={logo} alt="toad" />
                </NavLink>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}>
                <Bars3Icon className="icon" />
              </Navbar.Toggle>
              <Navbar.Offcanvas id={`offcanvasNavbar-expand-${expand}`} aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`} placement="end">
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>Code ToAd</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <NavLink end to="/">
                      Home
                    </NavLink>
                    {auth ? (
                      <>
                        <div className="d-flex flex-column">
                          <NavLink to="/posts">Posts</NavLink>
                          <NavLink to="/profiles">Profiles</NavLink>
                          <NavLink to="/followers">Followers</NavLink>
                        </div>
                        <div className="offcanvas-container d-flex">
                          <NavProfile />
                          <button onClick={logout} className="logout-btn">
                            <ArrowRightOnRectangleIcon className="icon" />
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Link onClick={() => setModalShowLog(true)}>Login</Link>
                        <Link onClick={() => setModalShowReg(true)}>Register</Link>
                        <ModalVertical show={modalShowLog} onHide={() => setModalShowLog(false)} heading="Login">
                          <LoginForm />
                          <p className="mb-0 mt-5">Don't have an account yet?</p>
                          <Link onClick={() => setModalShowReg(true)} className="cta-secondary">
                            Register
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
