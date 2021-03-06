import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { FaAirbnb } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0%;
  z-index: 1000;
  width: 100%;
  height: 6vh;
  color: rgba(0, 0, 0, 0.7);
  background-color: #f7f7f7;
`;

const Container = styled.div`
  width: 80%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 0rem;
`;

const LoadContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Column = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  &:first-child {
    font-weight: 600;
    font-size: 3rem;
    color: ${props => props.theme.airbnbRed};
  }
  &:last-child {
    font-size: 1.3rem;
  }
`;

const LoggedText = styled.span`
  display: block;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: translateY(-3px);
  }
  & + & {
    margin-left: 0.5rem;
  }
`;

const LOGOUT_QUERY = gql`
  mutation logOut {
    logOut @client
  }
`;

const ME_QUERY = gql`
  {
    me {
      id
      name
    }
  }
`;

const Header = ({ isLoggedIn }) => {
  const [logoutMuatation] = useMutation(LOGOUT_QUERY);
  const { data, loading, error } = useQuery(ME_QUERY);
  const logout = async () => {
    await logoutMuatation();
  };
  if (error) return 'error';
  if (loading)
    return (
      <Wrapper>
        <LoadContainer>
          <Loader />
        </LoadContainer>
      </Wrapper>
    );
  if (data)
    return (
      <Wrapper>
        <Container>
          <Column>
            <FaAirbnb />
          </Column>
          <Column>
            {isLoggedIn ? (
              <>
                <LoggedText>{data.me.name} </LoggedText>
                <LoggedText onClick={logout}>로그아웃</LoggedText>
              </>
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
