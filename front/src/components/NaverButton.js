import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { darken } from 'polished';

const Container = styled.div`
  background-color: #03c73c;
  border-radius: 5px;
  color: white;
  width: 100%;
  height: 2rem;
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.15);
  &:hover {
    background-color: ${darken(0.05, '#03c73c')};
  }
  cursor: pointer;
`;

const Column = styled.div`
  &:first-child {
    width: 20%;
    border-right: 1px solid rgba(0, 0, 0, 0.15);
  }
  &:last-child {
    width: 80%;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Logo = styled.span`
  font-weight: 900;
  font-size: 1.5rem;
`;

const Text = styled.span`
  font-size: 1rem;
  font-weight: 500;
`;

const NaverButton = ({ text, onClick }) => {
  return (
    <Container onClick={onClick}>
      <Column>
        <Logo>N</Logo>
      </Column>
      <Column>
        <Text>{text}</Text>
      </Column>
    </Container>
  );
};

NaverButton.propTypes = {
  text: PropTypes.string.isRequired
};

export default NaverButton;
