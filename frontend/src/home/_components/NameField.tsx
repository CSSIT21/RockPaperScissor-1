import { IconButton, Paper, TextField } from '@mui/material'
import React from 'react'
import { FaChevronRight } from 'react-icons/all'

const NameField = () => {
	return (
		<Paper
			sx={{
				width: '870px',
				maxWidth: 'calc(100% - 54px - 48px)',
				height: '100px',
				borderRadius: '36px',
				padding: '0 20px 0 20px',
				display: 'flex',
				alignItems: 'center',
				marginX: '100px',
				borderColor: '#000000',
                border: 'solid'
			}}
			elevation={3}
		>
			<TextField variant="standard" label="Enter your name" sx={{ flex: 1 }}></TextField>
		</Paper>
	)
}

export default NameField
