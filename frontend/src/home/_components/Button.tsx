import * as React from 'react';
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';

const red = {
    500: '#BA494B',
    600: '#8F2123',
    700: '#BA494B',
};

const StartButton = styled(ButtonUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 40px;
  background-image: linear-gradient(90deg, rgba(27, 135, 243, 1) 0%, rgba(35, 2, 75, 1) 100%);
  padding: 30px 70px;
  border-radius: 15px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: 5px;
  width: 303px;
  height: 100px;
  

  &:hover {
    background-image: linear-gradient(90deg, rgba(27, 135, 243, 1) 0%, rgba(35, 2, 75, 1) 56%);
  }

  &.${buttonUnstyledClasses.active} {
    background-image: linear-gradient(90deg, rgba(27, 135, 243, 1) 0%, rgba(35, 2, 75, 1) 100%);
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

export default StartButton