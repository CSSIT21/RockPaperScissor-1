import * as React from 'react';
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';

const red = {
    500: '#BA494B',
    600: '#8F2123',
    700: '#BA494B',
};

const JoinButton = styled(ButtonUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 1.5rem;
  background-color: ${red[500]};
  padding: 30px 70px;
  border-radius: 15px;
  color: black;
  transition: all 150ms ease;
  cursor: pointer;
  border: 5px;
  width: 303px;
  height: 100px;
  

  &:hover {
    background-color: ${red[600]};
  }

  &.${buttonUnstyledClasses.active} {
    background-color: ${red[700]};
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }`
    ;

export default JoinButton