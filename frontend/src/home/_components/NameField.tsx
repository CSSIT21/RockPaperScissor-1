import { IconButton, Paper, TextField } from '@mui/material';
import React from 'react';
import { FaChevronRight } from 'react-icons/all';

const NameField = () => {
	return (
		<Paper
			sx={{
				width: 'calc(100% - 128px)',
				height: '72px',
				borderRadius: '36px',
				padding: '0 20px 0 20px',
				display: 'flex',
				alignItems: 'center',
			}} elevation={3}
		>
			<TextField
				label="Enter your name" variant="filled" InputProps={{
				disableUnderline: true,
				sx: {
					'&, &:hover, &:active, &.MuiFocused': {
						backgroundColor: 'white',
					}
				},
			}} sx={{ flex: 1 }}
			/>
		</Paper>
	);
};

export default NameField;
