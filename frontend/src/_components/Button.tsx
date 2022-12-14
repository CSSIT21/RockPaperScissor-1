import * as React from 'react';
import { styled } from '@mui/system';

import styles from './Button.module.scss';

const StartButton: React.FC<any> = ({ onClick, children }) => {
	return <button className={styles.button} onClick={onClick}>{children}</button>;
};

export default StartButton;