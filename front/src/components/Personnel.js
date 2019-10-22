import React from 'react';
import styled from 'styled-components';
import PersonnelRow from './PersonnelRow';

const Container = styled.div`
  width: 400px;
  height: 240px;
  background-color: white;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1.5rem;
  font-weight: 600;
  font-size: 1.1rem;
`;

const Text = styled.span`
  cursor: pointer;
  color: ${props => props.theme.airbnbGreen};
  &:hover {
    text-decoration: underline;
  }
`;

const Personnel = ({
  adult,
  setAdult,
  child,
  setChild,
  baby,
  setBaby
}) => {
  const isChildAndBaby = () => child !== 0 || baby !== 0;
  const onIncrease = setValue => {
    if (adult === 0) {
      setAdult(adult + 1);
    }
    setValue(props => (props >= 5 ? props : props + 1));
  };
  const onDecrease = () => {
    if (adult === 1 && isChildAndBaby()) return;
    setAdult(adult - 1);
  };
  return (
    <Container>
      <PersonnelRow
        text={'성인'}
        value={adult}
        setValue={setAdult}
        max={16}
        onDecrease={onDecrease}
      />
      <PersonnelRow
        text={'어린이'}
        age={'2~12세'}
        value={child}
        setValue={setChild}
        max={5}
        onIncrease={onIncrease.bind(null, setChild)}
      />
      <PersonnelRow
        text={'유아'}
        age={'2세 미만'}
        value={baby}
        setValue={setBaby}
        max={5}
        onIncrease={onIncrease.bind(null, setBaby)}
      />
      <Row>
        <Text>삭제</Text>
        <Text>저장</Text>
      </Row>
    </Container>
  );
};

export default Personnel;
