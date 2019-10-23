import React, { useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { darken } from 'polished';
import Modal from './Modal';
import Personnel from './Personnel';
import { usePersonnelState } from '../contexts/PersonnelContext';
import PriceBar from './PriceBar';
import { useRoomState } from '../contexts/RoomsContext';
import { parsePrice } from '../util';

const Tabs = styled.ul`
  position: fixed;
  top: 6vh;
  left: 0;
  width: 100%;
  display: flex;
  height: 5vh;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0.3rem;
  padding-left: 1.5rem;
  align-items: center;
  background-color: white;
`;

const Tab = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    border-color: white;
    background-color: #f2f2f2;
  }
  &:active {
    background-color: ${props => props.theme.airbnbGreen};
    color: white;
    border-color: white;
  }
  ${props =>
    props.active &&
    css`
      background-color: ${props.theme.airbnbGreen};
      color: white;
      border-color: white;
      &:hover {
        background-color: ${darken(0.1, props.theme.airbnbGreen)};
      }
    `}
`;

const TabBox = styled.li`
  & + & {
    margin-left: 1rem;
  }
`;

const Navbar = () => {
  const { adult, child, baby } = usePersonnelState();
  const isPersonnelSelected = () => !(adult === 0 && child === 0 && baby === 0);
  const initState = {
    date: false,
    personnel: false,
    price: false
  };
  const [click, setClick] = useState(initState);
  const nonClick = useCallback(() => setClick({ ...initState }), [initState]);
  const { priceStart, priceEnd } = useRoomState();
  const MIN_PRICE = 0;
  const MAX_PRICE = 1000000;
  return (
    <Tabs>
      <TabBox>
        <Tab
          active={click.date}
          onClick={() => setClick({ ...initState, date: true })}>
          날짜
        </Tab>
      </TabBox>
      <TabBox>
        <Tab
          active={click.personnel || isPersonnelSelected()}
          onClick={() => setClick({ ...initState, personnel: true })}>
          {adult === 0 && child === 0 && baby === 0 && '인원'}
          {(adult !== 0 || child !== 0) && `게스트 ${adult + child}명`}
          {baby !== 0 && ` 유아 ${baby}명`}
        </Tab>
        <Modal
          left={'103px'}
          top={'110px'}
          show={click.personnel}
          onClick={nonClick}>
          <Personnel click={click.personnel} close={nonClick} />
        </Modal>
      </TabBox>
      <TabBox>
        <Tab
          active={
            priceStart !== MIN_PRICE || priceEnd !== MAX_PRICE || click.price
          }
          onClick={() => setClick({ ...initState, price: true })}>
          {(MAX_PRICE !== priceEnd &&
            MIN_PRICE !== priceStart &&
            `₩${parsePrice(priceStart)} - ₩${parsePrice(priceEnd)}`) ||
            (MAX_PRICE !== priceEnd && `최대 ₩ ${parsePrice(priceEnd)}`) ||
            (MIN_PRICE !== priceStart && `₩ ${parsePrice(priceStart)}+`) ||
            '가격'}
        </Tab>
        <Modal
          show={click.price}
          onClick={nonClick}
          top={'110px'}
          left={'181px'}>
          <PriceBar
            openDate={() => setClick({ ...initState, date: true })}
            close={nonClick}
          />
        </Modal>
      </TabBox>
    </Tabs>
  );
};

export default Navbar;
