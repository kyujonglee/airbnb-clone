import React from 'react';
import styled, { css } from 'styled-components';
import Input from '../components/Input';

const Wrapper = styled.div`
  width: 100%;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  width: 400px;
  height: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${props => props.theme.box};
  background-color: white;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
`;

const TitleContainer = styled.div`
  width: 100%;
  margin-top: 1rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const Title = styled.span`
  font-size: 1.25rem;
  text-transform: capitalize;
`;

const BoldTitle = styled(Title)`
  font-weight: 600;
`;

const Auth = () => (
  <Wrapper>
    <Box>
      <TitleContainer>
        <Title> log in to </Title>
        <BoldTitle>airbnb</BoldTitle>
      </TitleContainer>
      <Input placeholder={'email'} size={'small'} />
      <Input placeholder={'password'} type={'password'} size={'small'} />
    </Box>
  </Wrapper>
);

export default Auth;
