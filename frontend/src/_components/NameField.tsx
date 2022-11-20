import { IconButton, Paper, TextField } from '@mui/material';
import React from 'react';
import { FaChevronRight } from 'react-icons/all';

const NameField: React.FC<any> = ({ label, setValue }) => {
	return (
		<Paper
			sx={{
				height: '72px',
				borderRadius: '24px',
				padding: '0 20px 0 20px',
				display: 'flex',
				alignItems: 'center',
			}} elevation={3}
		>
			<TextField
				onChange={(e) => setValue(e.target.value)} label={label} variant="filled" InputProps={{
				disableUnderline: true,
				sx: {
					'&, &:hover, &:active, &.MuiFocused': {
						backgroundColor: 'white',
					},
				},
			}} sx={{ flex: 1 }}
			/>
		</Paper>
	);
};

export default NameField;
