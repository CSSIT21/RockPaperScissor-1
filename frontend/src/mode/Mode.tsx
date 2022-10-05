import { style } from '@mui/system'
import styles from './Mode.module.scss'
import React from 'react'
import Button from './_components/Button'
import { Box, Card } from '@mui/material'
import LogoCard from './_components/LogoCard'

const Mode = () => {
	return <div className={styles.home}>
		<LogoCard/>
		<Box textAlign='center' margin='5%'>
		<Button>Create Room</Button>
		</Box>
		<Box textAlign='center' margin='5%'>
		<Button>Join Room By Code</Button>
		</Box>
	</div>
}

export default Mode
