import React, { useState } from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import Button from './Button';
import { useRoomState, useRoomDispatch } from '../contexts/RoomsContext';

const Container = styled.div`
  min-width: 400px;
  background-color: white;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Text = styled.span`
  color: rgba(0, 0, 0, 0.6);
  font-size: 1.1rem;
  margin: 1rem 0rem;
`;

const InputRangeWrapper = styled.div`
  width: 90%;
  padding: 1rem;
  padding-top: 2rem;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1.5rem;
  font-weight: 600;
  font-size: 1.1rem;
  margin-top: 1rem;
`;

const ButtonS = styled.span`
  cursor: pointer;
  color: ${props => props.theme.airbnbGreen};
  &:hover {
    text-decoration: underline;
  }
`;

const PriceBar = ({ openDate, close }) => {
  const { priceStart, priceEnd, checkIn, checkOut } = useRoomState();
  const dispatch = useRoomDispatch();
  const MIN_PRICE = 0;
  const MAX_PRICE = 1000000;
  const initValue = {
    min: priceStart,
    max: priceEnd
  };
  const [value, setValue] = useState(initValue);

  const onChange = value => {
    setValue(value);
  };

  const reset = () => setValue({ min: MIN_PRICE, max: MAX_PRICE });
  const save = () => {
    dispatch({
      type: 'SET_PRICE',
      priceStart: value.min,
      priceEnd: value.max
    });
    close();
  };
  return (
    <Container>
      {checkIn && checkOut ? (
        <>
          <InputRangeWrapper>
            <InputRange
              draggableTrack
              maxValue={MAX_PRICE}
              minValue={MIN_PRICE}
              value={value}
              step={10}
              formatLabel={value => `${value}원`}
              onChange={onChange}
            />
          </InputRangeWrapper>
          <Row>
            <ButtonS onClick={reset}>
              {(value.min !== MIN_PRICE || value.max !== MAX_PRICE) && '삭제'}
            </ButtonS>
            <ButtonS onClick={save}>저장</ButtonS>
          </Row>
        </>
      ) : (
        <Wrapper>
          <Text>요금을 확인하려면 가격을 선택하세요</Text>
          <Button text={'날짜 입력'} color={'airbnbGreen'} onClick={openDate} />
        </Wrapper>
      )}
    </Container>
  );
};

PriceBar.propTypes = {
  openDate: propTypes.func.isRequired,
  close: propTypes.func.isRequired
};

export default PriceBar;
