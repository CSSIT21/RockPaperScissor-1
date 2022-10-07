import { Box, Card, Typography } from '@mui/material'
import React from 'react'
import styles from './Join.module.scss'
import CodeField from './_components/CodeField'
import JoinButton from './_components/Button'

const Join = () => {
	return (
		<div className={styles.home}>
			<Card sx={{
				width:'1050px',
				height:'200px',
				borderRadius: '36px',
				border: 'solid',
				borderColor: '#000000',
				bgcolor: '#B0B0B0',
				alignItems: 'center',
				marginY: '100px',
				marginX: '30px',
				padding: '0 18px 20px 100px',
			}}>
				<Typography sx={{
					textTransform: 'uppercase',
					fontWeight: 'bold',
					fontSize: '170px',
					align: 'center'
					
				}}>
					Thanasan
				</Typography>
			</Card>
			<CodeField />
			<Box textAlign='center' margin='5%'><JoinButton> Join room </JoinButton></Box>
		</div>
	)
}

export default Join
