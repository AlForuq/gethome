import React from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Wrapper,
  NavbarWrapper,
  Logo,
  NavbarBody,
  Container,
  activeStyle,
} from "./style";
import {Footer} from '../Footer/index'
import { navbar } from "../../utilis/navbar";
import { Button } from "../Generics";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const LogIn = () => {
    navigate("/signin");
  };

  const logOut = () => {
    localStorage.removeItem("token");
    if (location.pathname.includes("profile")) {
      navigate("/home");
    } else {
      navigate(location.pathname);
    }
  };

  return (
    <Wrapper>
      <Container>
        <NavbarWrapper>
          <Logo>
            <Logo.Icon />
            <Logo.Title>Housing</Logo.Title>
          </Logo>
          <NavbarBody>
            {navbar.map((value) => {
              return (
                !value.hidden && (
                  <NavLink key={value.id} to={value.path} style={activeStyle}>
                    {value.title}
                  </NavLink>
                )
              );
            })}
          </NavbarBody>
          <Logo>
            {localStorage.getItem("token") ? (
              <>
                <Button
                  mr={20}
                  width={"131px"}
                  onClick={() => navigate("/profile/properties")}
                >
                  Profile
                </Button>{" "}
                <Button width={"131px"} onClick={logOut}>
                  LogOut
                </Button>{" "}
              </>
            ) : (
              <Button width={"131px"} onClick={LogIn}>
                Login
              </Button>
            )}
          </Logo>
        </NavbarWrapper>
      </Container>
      <Outlet />
      <Footer/>
    </Wrapper>
  );
};
