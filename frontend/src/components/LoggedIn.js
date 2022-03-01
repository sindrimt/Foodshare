import React from "react";
import styled from "styled-components";

export const LoggedIn = () => {
  return (
    <Parent>
      <LoginContainer>You Are Logged In!</LoginContainer>
    </Parent>
  );
};

const LoginContainer = styled.div`
  position: relative;
  font-size: 25px;
  top: 50%;
  left: 58%;
  transform: translate(-50%, -50%);
  width: 500px;
  padding: 3rem;
  color: green;
`;

const Parent = styled.div`
  width: 100vw;
  height: 80vh;
`;
