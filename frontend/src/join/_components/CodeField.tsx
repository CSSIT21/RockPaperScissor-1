import { IconButton, Paper, TextField } from '@mui/material'
import React from 'react'
import { FaChevronRight } from 'react-icons/all'

const CodeField = () => {
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
				marginX: '155px',
				marginY: '50px',
				borderColor: '#000000',
                border: 'solid'
			}}
			elevation={3}
		>
			<TextField variant="standard" label="Code room" sx={{ flex: 1 }}></TextField>
		</Paper>
	)
}

export default CodeField
