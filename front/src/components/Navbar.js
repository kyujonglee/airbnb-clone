import React from 'react';
import styled from 'styled-components';

const Tabs = styled.ul`
  display: flex;
  height: 5vh;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0.3rem;
  padding-left: 0.5rem;
  align-items: center;
`;

const Tab = styled.li`
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.airbnbGreen};
    color: white;
    border-color: white;
  }
  & + & {
    margin-left: 1rem;
  }
`;

const Navbar = () => {
  return (
    <Tabs>
      <Tab> 날짜 </Tab>
      <Tab> 인원 </Tab>
      <Tab> 가격 </Tab>
    </Tabs>
  );
};

export default Navbar;
