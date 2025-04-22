import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = () => {
  return (
    <NavbarContainer>
      <Logo to="/">ToTa Booking</Logo>
      <LoginButton to="/login">Login</LoginButton>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
  
  &:hover {
    color: #4CAF50;
  }
`;

const LoginButton = styled(Link)`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: transparent;
  color: #333;
  text-decoration: none;
  border: 1px solid #333;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #333;
    color: white;
  }
`;



export default Navbar; 