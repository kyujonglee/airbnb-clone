import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: space-between;
  padding: 0.5rem 1.5rem;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 40%;
`;

const Text = styled.span`
  font-size: 1.1rem;
`;

const Button = styled.button`
  all: unset;
  width: 30px;
  height: 30px;
  border: 1.5px solid ${props => props.theme.airbnbGreen};
  color: ${props => props.theme.airbnbGreen};
  font-size: 1.2rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin: 0.5rem;
  cursor: pointer;
  ${props =>
    props.value === 0 &&
    css`
      opacity: 0.2;
    `}
`;

const TextBox = styled.div`
  color: ${props => props.theme.textColor};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  span + span {
    margin-top: 0.5rem;
  }
`;

const Age = styled.span`
  font-size: 0.8rem;
`;

const PersonnelRow = ({
  text,
  age,
  value,
  setValue,
  onDecrease,
  onIncrease,
  max
}) => {
  const decrease = () => {
    if (value > 0) setValue(value - 1);
  };
  const increase = () => {
    if(value >= max) return;
    setValue(value + 1);
  };
  return (
    <Container>
      <TextBox>
        <Text>{text}</Text>
        {age && <Age>{age}</Age>}
      </TextBox>
      <Buttons>
        <Button
          onClick={onDecrease || decrease}
          value={value}
          disabled={value === 0}>
          -
        </Button>
        <Text>{value || 0}+</Text>
        <Button onClick={onIncrease || increase}>+</Button>
      </Buttons>
    </Container>
  );
};

PersonnelRow.propTypes = {
  text: PropTypes.string.isRequired
};

export default PersonnelRow;
