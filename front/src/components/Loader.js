import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaAirbnb } from 'react-icons/fa';

const Container = styled.div`
  width: 100%;
  min-height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const opacity = keyframes`
  0% {
      opacity: 0;
  }
  50% {
      opacity: 1;
  }
  100% {
      opacity: 0;
  }
`;

const AirbnbS = styled(FaAirbnb)`
  font-size: 5rem;
  font-weight: 600;
  color : ${props => props.theme.airbnbRed};
  animation: ${opacity} 0.3s linear infinite forwards;
`;

const Loader = () => {
  return (
    <Container>
      <AirbnbS />
    </Container>
  );
};

export default Loader;
