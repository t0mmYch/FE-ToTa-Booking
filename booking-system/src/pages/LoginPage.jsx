import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import PageTransition from "../components/PageTransition";

const LoginPage = () => {
  console.log("LoginPage rendering...");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    navigate("/login-user-booking", {
      state: {
        username: email.split("@")[0], //Use the part before @ as username
        email: email,
      },
    });
  };

  const slideUp = keyframes`
  0% {
    transform: translateY(20px);
    opacity: 0;
    
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

  const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #1a1a1a;
    padding: 2rem;
  `;

  const LoginContainer = styled.div`
    background: white;
    padding: 2.5rem;
    border-radius: 12px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    animation: ${slideUp} 0.6s ease-out forwards;
  `;

  const Header = styled.div`
    text-align: center;
    margin-bottom: 2rem;
  `;

  const Logo = styled.h1`
    font-size: 2rem;
    color: #333;
    margin: 0;
    margin-bottom: 0.5rem;
  `;

  const Subtitle = styled.p`
    color: #666;
    font-size: 1rem;
    margin: 0;
  `;

  const InputContainer = styled.div`
    margin-bottom: 1.5rem;
    opacity: 0;
    animation: ${slideUp} 0.6s ease-out forwards;
    animation-delay: ${(props) => props.delay};
  `;

  const Label = styled.label`
    display: block;
    margin-bottom: 0.5rem;
    color: #333;
    font-size: 0.9rem;
    font-weight: 500;
  `;

  const Input = styled.input`
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e1e1e1;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.2s ease;

    &:focus {
      outline: none;
      border-color: #4caf50;
    }
  `;

  const LoginButton = styled.button`
    width: 100%;
    padding: 1rem;
    background: #4caf50;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;
    opacity: 0;
    animation: ${slideUp} 0.6s ease-out forwards;
    animation-delay: 0.4s;

    &:hover {
      background: #45a049;
    }

    &:active {
      transform: scale(0.98);
    }
  `;

  return (
    <PageTransition>
      <PageContainer>
        <LoginContainer>
          <Header>
            <Logo>ToTa Booking</Logo>
            <Subtitle>Login to continue booking</Subtitle>
          </Header>
          <form onSubmit={handleLogin}>
            <InputContainer delay="0.2s">
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </InputContainer>
            <InputContainer delay="0.3s">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </InputContainer>
            <LoginButton type="submit">Login to Book</LoginButton>
          </form>
        </LoginContainer>
      </PageContainer>
    </PageTransition>
  );
};

export default LoginPage;
