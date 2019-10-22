import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  display: ${props => (props.show ? 'block' : 'none')};
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  ${props =>
    props.left === 0 &&
    props.top === 0 &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `}
`;

const Overlay = styled.div`
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  opacity: 0.3;
`;

const Child = styled.div`
  z-index: 15;
  ${props =>
    (props.left === 0 && props.top === 0) ||
    css`
      position: absolute;
      top: ${props.top};
      left: ${props.left};
    `}
`;

const Modal = ({ children, left, top, show, onClick }) => {
  const [showM, setShowM] = useState(false);
  useEffect(() => {
    setShowM(show);
  }, [show]);
  return (
    <Wrapper left={left} top={top} show={showM}>
      <Overlay
        onClick={() => {
          onClick();
          setShowM(false);
        }}
      />
      <Child left={left} top={top}>
        {children}
      </Child>
    </Wrapper>
  );
};

Modal.defaultProps = {
  left: 0,
  top: 0,
  show: false
};

export default Modal;
