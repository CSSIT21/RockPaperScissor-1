import * as React from 'react';
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';

import styles from './Button.module.scss';

const StartButton: React.FC<any> = ({ children }) => {
	return <button className={styles.button}>{children}</button>;
};

export default StartButton;