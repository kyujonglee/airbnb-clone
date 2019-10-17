import React from 'react';
import styled from 'styled-components';
import Input from '../../components/Input';
import Button from '../../components/Button';
import NaverButton from '../../components/NaverButton';

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

const ButtonS = styled(Button)`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const SignContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  color: ${props => props.theme.textColor};
  text-transform: capitalize;
  margin-top: 1rem;
  height: 1.5rem;
`;

const SubText = styled.span`
  font-size: 1rem;
  font-weight: 500;
`;

const Text = styled.a`
  cursor: pointer;
  font-size: 1.15rem;
  margin-left: 0.5rem;
  font-weight: 600;
  text-decoration: underline;
  color: ${props => props.theme.indigo};
`;

const AuthPresenter = () => (
  <Wrapper>
    <Box>
      <TitleContainer>
        <Title> log in to </Title>
        <BoldTitle>airbnb</BoldTitle>
      </TitleContainer>
      <Input placeholder={'email'} size={'small'} />
      <Input placeholder={'password'} type={'password'} size={'small'} />
      <ButtonS text={'로그인'} full={true} />
      <NaverButton text={'네이버 아이디로 로그인'} />
      <SignContainer>
        <SubText>don't have an account?</SubText>
        <Text>sign in</Text>
      </SignContainer>
    </Box>
  </Wrapper>
);

export default AuthPresenter;
