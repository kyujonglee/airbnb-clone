import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from './Button';

const Container = styled.div`
  background-color: ${props => props.theme.bgColor};
  width: 20rem;
  border-radius: 5px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

const Row = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.span`
  color: ${props => props.theme.teal};
  font-size: 1.2rem;
  font-weight: 600;
  margin-top : 0.5rem;
  margin-bottom: 1.5rem;
`;

const Content = styled.span`
  color: ${props => props.theme.textColor};
  margin-bottom: 2rem;
  font-size: 0.9rem;
`;

const Confirm = ({ title, message, onConfirm, onDeny }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Content>{message}</Content>
      <Row>
        <Button text={'yes'} onClick={onConfirm} />
        <Button text={'no'} color={'airbnbGreen'} onClick={onDeny} />
      </Row>
    </Container>
  );
};

Confirm.defaultProps = {
  title: '',
  content: '',
  onConfirm: () => {},
  onDeny: () => {}
};

Confirm.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  onConfirm: PropTypes.func,
  onDeny: PropTypes.func
};

export default Confirm;
