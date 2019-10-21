import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { FaAirbnb } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100%;
  height: 8vh;
  color: white;
`;

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0rem;
`;

const Column = styled.div`
  &:first-child {
    font-weight: 600;
    font-size: 3rem;
  }
  &:last-child {
    font-size: 1.5rem;
  }
`;

const LoggedText = styled.span`
  cursor: pointer;
  &:hover {
    transform: translateY(-3px);
  }
  transition: transform 0.3s ease-in-out;
`;

const LOGOUT_QUERY = gql`
  mutation logOut {
    logOut @client
  }
`;

const Header = ({ isLoggedIn }) => {
  const [logoutMuatation] = useMutation(LOGOUT_QUERY);

  const logout = async () => {
    await logoutMuatation();
  };
  return (
    <Wrapper>
      <Container>
        <Column>
          <FaAirbnb />
        </Column>
        <Column>
          {isLoggedIn ? (
            <LoggedText onClick={logout}>로그아웃</LoggedText>
          ) : (
            <Link to={'/'}>
              <LoggedText>로그인</LoggedText>
            </Link>
          )}
        </Column>
      </Container>
    </Wrapper>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default Header;
