import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import NavProfile from "./NavProfile";
import ModalVertical from "../common/ModalVertical";
import LoginForm from "../login/LoginForm";
import RegisterForm from "../login/RegisterForm";
import logoLight from "../../images/logo/toad-logo-light.png";
import logoDark from "../../images/logo/toad-logo-dark.png";
import { ArrowRightOnRectangleIcon, Bars3Icon } from "@heroicons/react/20/solid";
import ThemeToggler from "./ThemeToggler";
import NavOffcanvas from "./Offcanvas";

export default function NavLayout() {
  const [auth, setAuth] = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [modalShowLog, setModalShowLog] = useState(false);
  const [modalShowReg, setModalShowReg] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    setAuth(null);
    navigate("/");
  };
  return (
    <header id="top">
      <Nav className="desktop-nav d-none d-md-flex nav-lg">
        <NavLink end to="/" className="logo-container">
          <img className="logo-img" src={theme === "dark" ? logoDark : logoLight} alt="toad" />
          Code ToAd
        </NavLink>
        {auth ? (
          <>
            <div className="admin-container">
              <NavLink to="/posts">Posts</NavLink>
              <NavLink to="/profiles">Profiles</NavLink>
              <NavLink to="/following">Following</NavLink>
            </div>
            <div className="user-container">
              <NavProfile />
              <button onClick={logout} className="logout-btn" aria-label="logout button">
                <ArrowRightOnRectangleIcon className="icon" />
              </button>
              <ThemeToggler />
            </div>
          </>
        ) : (
          <div className="visit-container">
            <Link onClick={() => setModalShowLog(true)}>Login</Link>
            <Link onClick={() => setModalShowReg(true)}>Register</Link>
            <ModalVertical show={modalShowLog} onHide={() => setModalShowLog(false)} heading="Login">
              <LoginForm />
              <p className="mb-0 mt-5">Don't have an account yet?</p>
              <Link
                onClick={() => {
                  setModalShowReg(true);
                  setModalShowLog(false);
                }}
                className="cta-secondary"
              >
                Register
              </Link>
            </ModalVertical>
            <ModalVertical heading="Register" show={modalShowReg} onHide={() => setModalShowReg(false)}>
              <RegisterForm setRegShow={setModalShowReg} setLogShow={setModalShowLog} />
            </ModalVertical>
            <ThemeToggler />
          </div>
        )}
      </Nav>
      <Nav className="d-block d-md-none mobile-nav-wrapper">
        <Navbar className="mobile-nav p-0">
          <Container fluid>
            <Navbar.Brand className="d-flex flex-column logo-container">
              <NavLink end to="/" className="link-logo">
                <img className="logo-img" src={theme === "dark" ? logoDark : logoLight} alt="toad" />
              </NavLink>
            </Navbar.Brand>
            <Navbar.Toggle>
              <Bars3Icon className="icon" aria-label="display side menu" />
            </Navbar.Toggle>
            <NavOffcanvas title="ToAd">
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavLink end to="/">
                  Home
                </NavLink>
                {auth ? (
                  <>
                    <div className="admin-container d-flex flex-column">
                      <NavLink to="/posts">Posts</NavLink>
                      <NavLink to="/profiles">Profiles</NavLink>
                      <NavLink to="/following">Following</NavLink>
                    </div>
                    <div className="user-container offcanvas-container d-flex">
                      <NavProfile />
                      <button onClick={logout} className="logout-btn" aria-label="logout button">
                        <ArrowRightOnRectangleIcon className="icon" />
                      </button>
                      <ThemeToggler />
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
                      <RegisterForm setRegShow={setModalShowReg} setLogShow={setModalShowLog} />
                    </ModalVertical>
                    <ThemeToggler />
                  </>
                )}
              </Nav>
            </NavOffcanvas>
          </Container>
        </Navbar>
      </Nav>
    </header>
  );
}
