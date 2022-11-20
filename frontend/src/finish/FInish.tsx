import React from 'react'
import { Box, Card, CardContent, Stack, Typography } from '@mui/material'

import styles from './Finish.module.scss'
import Button from './_components/Button'
import { padding } from '@mui/system'

const Finish = () => {
	return (
	<div className={styles.home}>
		<Card
				sx={{
					width: '40%',
					height: '20%',
					borderRadius: '36px',
					padding: '0 18px 0 36px',
					display: 'flex',
					alignItems: 'center',
					marginY: '20%',
					marginX: '20%',
					borderColor: '#000000',
					border: 'solid',
					textAlign: 'center',
					fontSize: '64px',
					fontWeight: 'bold'
				}}
			>
				Jack win!
			</Card>
			<Box sx={{
					width: '250%',
					height: '100%',
					borderRadius: '36px',
					padding: '0 18px 0 36px',
					display: 'flex',
					marginTop: '-30%',
					marginX: '-80%',
					backgroundColor: 'white',
					borderColor: '#000000',
					border: 'solid',
				}}>
				<Card
					sx={{
						width: '35%',
						height: '90%',
						borderRadius: '36px',
						padding: '0 18px 0 36px',
						borderColor: '#000000',
						marginTop: '2%',
						marginRight: '10%',
						marginLeft: '1%',
						border: 'solid',
						textAlign: 'center',
						fontSize: '48px',
					}}
				>
					Player1
				</Card>
				<CardContent
					sx={{
						width: '20%',
						height: '55%',
						marginY: '7%',
					}}
				>
				<Stack spacing={3}>
                    <Typography
                        sx={{
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: '40px',
                            align: 'left',
							padding: '45px 0 45px 0'
                        }}>
                        Round1
                    </Typography>					
                    <Typography
                        sx={{
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: '40px',
                            align: 'left',
							padding: '45px 0 45px 0'
                        }}>
                        Round2
                    </Typography>
                    <Typography
                        sx={{
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: '40px',
                            align: 'left',
							padding: '45px 0 45px 0'
                        }}>
                        Round3
                    </Typography>
                </Stack>
				</CardContent>
				
				<Card
					sx={{
						width: '35%',
						height: '90%',
						borderRadius: '36px',
						padding: '0 18px 0 36px',
						borderColor: '#000000',
						marginLeft: '10%',
						marginRight: '1%',
						marginTop: '2%',
						border: 'solid',
						textAlign: 'center',
						fontSize: '48px',
					}}
				>
					Player2
				</Card>
			</Box>
	</div>
	)
}

export default Finish
