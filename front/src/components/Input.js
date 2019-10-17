import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const fontSizeStyles = css`
  ${({ size }) =>
    css`
      font-size: ${fontSizes[size]};
    `}
`;

const fontSizes = {
  small: '0.8rem',
  medium: '1rem',
  big: '1.2rem'
};

const InputS = styled.input`
  width: 100%;
  min-height: 2rem;
  padding: 0.5rem;
  border-radius: 0.2rem;
  border: 1px solid rgba(0, 0, 0, 0.15);
  ${fontSizeStyles}
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

const Input = ({ placeholder, size, type, ...rest }) => {
  return <InputS placeholder={placeholder} size={size} type={type} {...rest} />;
};

Input.defaultProps = {
  size: 'medium',
  type: 'text'
};

Input.propTypes = {
  placeholder: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string
};

export default Input;
