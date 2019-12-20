import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";

import { Link } from "react-router-dom";

function TopNav() {
  return (
    <Navbar color="light" light>
      <NavbarBrand>Dad Jokes</NavbarBrand>
      <Nav className="mr-auto">
        <NavItem>
          <Link to="/">Jokes</Link>
        </NavItem>
        <NavItem>
          <Link to="/login">Login</Link>
        </NavItem>
      </Nav>
    </Navbar>
  );
}

export default TopNav;
