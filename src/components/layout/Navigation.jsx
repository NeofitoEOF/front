import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';

  class Navigation extends Component {
    render(){
      return (
      <>
        <Navbar bg="dark" expand="lg">
          <Navbar.toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-bar">
          <Nav>
          <NavLink className="d-inline p-2 bg-dark text-white" to="/">Dashboard</NavLink>
          <NavLink className="d-inline p-2 bg-dark text-white" to="/Patrimonio">Patrimonio</NavLink>
          <NavLink className="d-inline p-2 bg-dark text-white" to="/Rentabilidade">Rentabilidade</NavLink>
          <NavLink className="d-inline p-2 bg-dark text-white" to="/Risk">Risco</NavLink>
          </Nav>
          </Navbar.Collapse>
        </Navbar> 
      </>
      );
    };
};

export default Navigation;