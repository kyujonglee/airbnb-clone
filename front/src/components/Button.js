import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { darken } from 'polished';

const sizeStyles = css`
  ${({ size }) => css`
    height: ${sizes[size].height};
    font-size: ${sizes[size].fontSize};
  `}
`;

const sizes = {
  small: {
    height: '1.75rem',
    fontSize: '0.8rem'
  },
  medium: {
    height: '2rem',
    fontSize: '1rem'
  },
  big: {
    height: '2.25rem',
    fontSize: '1.25rem'
  }
};

const ButtonS = styled.button`
  all: unset;
  background-color: ${props => props.theme[props.color]};
  padding: 0.3rem 0.5rem;
  border-radius: 5px;
  color: white;
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: ${props => darken(0.1, props.theme[props.color])};
  }
  ${sizeStyles}
  ${props =>
    props.full &&
    css`
      width: 100%;
    `}
`;

const Button = ({ text, size, full, color, ...rest }) => {
  return (
    <ButtonS text={text} size={size} full={full} color={color} {...rest}>
      {text}
    </ButtonS>
  );
};

Button.defaultProps = {
  text: 'button',
  full: false,
  color: 'airbnbRed',
  size: 'medium'
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  full: PropTypes.bool
};
export default Button;
