import React from 'react';
import styled, { css } from 'styled-components';
import { darken } from 'polished';
import Calendar from '../Calendar';
import Modal from '../Modal';
import Personnel from '../Personnel';
import PriceBar from '../PriceBar';

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

const NavbarPresenter = ({
  date,
  setDate,
  printDate,
  pricePersonnel,
  printPrice,
  click,
  nonClick,
  clickDate,
  clickPersonnel,
  clickPrice,
  activeDate,
  activePersonnel,
  activePrice
}) => {
  const HEIGHT = '110px';
  const DATE_LEFT = '25px';
  const PERSONNEL_LEFT = '103px';
  const PRICE_LEFT = '181px';
  return (
    <Tabs>
      <TabBox>
        <Tab active={activeDate} onClick={clickDate}>
          {printDate()}
        </Tab>
        <Modal
          show={click.date}
          onClick={nonClick}
          top={HEIGHT}
          left={DATE_LEFT}>
          <Calendar close={nonClick} date={date} setDate={setDate} />
        </Modal>
      </TabBox>
      <TabBox>
        <Tab active={activePersonnel} onClick={clickPersonnel}>
          {pricePersonnel()}
        </Tab>
        <Modal
          left={PERSONNEL_LEFT}
          top={HEIGHT}
          show={click.personnel}
          onClick={nonClick}>
          <Personnel click={click.personnel} close={nonClick} />
        </Modal>
      </TabBox>
      <TabBox>
        <Tab active={activePrice} onClick={clickPrice}>
          {printPrice()}
        </Tab>
        <Modal
          show={click.price}
          onClick={nonClick}
          top={HEIGHT}
          left={PRICE_LEFT}>
          <PriceBar openDate={clickDate} close={nonClick} />
        </Modal>
      </TabBox>
    </Tabs>
  );
};

export default NavbarPresenter;
