import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { darken } from 'polished';
import Modal from './Modal';
import Personnel from './Personnel';

const Tabs = styled.ul`
  display: flex;
  height: 5vh;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0.3rem;
  padding-left: 1.5rem;
  align-items: center;
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
    props.click &&
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
  const [adult, setAdult] = useState(0);
  const [child, setChild] = useState(0);
  const [baby, setBaby] = useState(0);
  const initState = {
    date: false,
    personnel: false,
    price: false
  };
  const [click, setClick] = useState(initState);
  return (
    <Tabs>
      <TabBox>
        <Tab
          click={click.date}
          onClick={() => setClick({ ...initState, date: true })}>
          날짜
        </Tab>
      </TabBox>
      <TabBox>
        <Tab
          click={click.personnel}
          onClick={() => setClick({ ...initState, personnel: true })}>
          {adult === 0 && child === 0 && baby === 0 && '인원'}
          {(adult !== 0 || child !== 0) && `게스트 ${adult + child}명`}
          {baby !== 0 && ` 유아 ${baby}명`}
        </Tab>
        <Modal left={'103px'} top={'110px'} show={click.personnel} onClick={() => setClick(initState)}>
          <Personnel
            adult={adult}
            setAdult={setAdult}
            child={child}
            setChild={setChild}
            baby={baby}
            setBaby={setBaby}
            click={click.personnel}
          />
        </Modal>
      </TabBox>
      <TabBox>
        <Tab
          click={click.price}
          onClick={() => setClick({ ...initState, price: true })}>
          가격
        </Tab>
      </TabBox>
    </Tabs>
  );
};

export default Navbar;
