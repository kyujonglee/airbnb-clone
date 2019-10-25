import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PersonnelRow from './PersonnelRow';
import {
  usePersonnelState,
  usePersonnelDispatch
} from '../contexts/PersonnelContext';

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

const Personnel = ({ close }) => {
  const { adult, child, baby } = usePersonnelState();
  const dispatch = usePersonnelDispatch();
  const increaseAdult = useCallback(() => {
    dispatch({
      type: 'INCREASE_ADULT'
    });
  }, [dispatch]);
  const decreaseAdult = useCallback(() => {
    dispatch({
      type: 'DECREASE_ADULT'
    });
  }, [dispatch]);

  const increaseLittle = useCallback(
    name => {
      dispatch({
        type: 'INCREASE_LITTLE',
        name
      });
    },
    [dispatch]
  );

  const decreaseLittle = useCallback(
    name => {
      dispatch({
        type: 'DECREASE_LITTLE',
        name
      });
    },
    [dispatch]
  );

  const reset = useCallback(() => {
    dispatch({
      type: 'RESET'
    });
  }, [dispatch]);

  const closeAndSave = () => {
    close();
  };

  return (
    <Container>
      <PersonnelRow
        text={'성인'}
        value={adult}
        name={'adult'}
        increase={increaseAdult}
        decrease={decreaseAdult}
      />
      <PersonnelRow
        text={'어린이'}
        age={'2~12세'}
        value={child}
        increase={useCallback(increaseLittle.bind(null, 'child'), [])}
        decrease={useCallback(decreaseLittle.bind(null, 'child'), [])}
      />
      <PersonnelRow
        text={'유아'}
        age={'2세 미만'}
        value={baby}
        increase={useCallback(increaseLittle.bind(null, 'baby'), [])}
        decrease={useCallback(decreaseLittle.bind(null, 'baby'), [])}
      />
      <Row>
        <Text onClick={reset}>{adult + child + baby === 0 || '삭제'}</Text>
        <Text onClick={closeAndSave}>저장</Text>
      </Row>
    </Container>
  );
};

Personnel.propTypes = {
  close: PropTypes.func.isRequired
};

export default React.memo(Personnel);
