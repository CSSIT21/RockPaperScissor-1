import { IconButton, Paper, TextField } from '@mui/material'
import React from 'react'
import { FaChevronRight } from 'react-icons/all'

const NameField = () => {
	return (
		<Paper
			sx={{
				width: '368px',
				maxWidth: 'calc(100% - 54px - 48px)',
				height: '72px',
				borderRadius: '36px',
				padding: '0 18px 0 36px',
				display: 'flex',
				alignItems: 'center',
			}}
			elevation={3}
		>
			<TextField variant="standard" sx={{ flex: 1 }}></TextField>
			<IconButton>
				<FaChevronRight />
			</IconButton>
		</Paper>
	)
}

export default NameField
