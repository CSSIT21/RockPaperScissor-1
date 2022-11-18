import { style } from '@mui/system'
import styles from './Mode.module.scss'
import React from 'react'
import Button from './_components/Button'
import { Box, Card } from '@mui/material'
import LogoCard from './_components/LogoCard'
import { useNavigate } from 'react-router-dom'

const Mode = () => {
	const navigate = useNavigate();
	
		const navigateToCreate = () => {
			navigate('/create')
		};

		const navigateToJoin = () => {
			navigate('/Join')
		};
		
	return <div className={styles.home}>
		<LogoCard/>
		<Box textAlign='center' margin='5%'>
		<Button onClick={navigateToCreate}>Create Room</Button>
		</Box>
		<Box textAlign='center' margin='5%'>
		<Button onClick={navigateToJoin}>Join Room By Code</Button>
		</Box>
	</div>
}

export default Mode
