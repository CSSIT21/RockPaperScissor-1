import React, { useState } from 'react'
import { Box, Card, Typography } from '@mui/material'

import styles from './Create.module.scss'
import Button from './_components/Button'
import { useNavigate } from 'react-router-dom'

const Create = () => {
	const navigate = useNavigate();
	
		const navigateToGame = () => {
			navigate('/game')
		}

		const [buttonText1, setButtonText1] = useState('Ready');
		const [buttonText2, setButtonText2] = useState('Ready');

		function handleClickP1() {
			setButtonText1('Cancel');
		  }

		function handleClickP2() {
			setButtonText2('Cancel');
		  }

	return (
		<div className={styles.home}>
			<Card
				sx={{
					width: '100%',
					height: '10%',
					borderRadius: '36px',
					padding: '0 18px 0 36px',
					display: 'flex',
					alignItems: 'center',
					marginY: '20%',
					marginX: '0%',
					borderColor: '#000000',
					border: 'solid',
					textAlign: 'center',
				}}
			>
				<Typography
                        sx={{
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: '20px',
                            align: 'left'
                        }}>
                        Room code : 8X7DF
                    </Typography>
			</Card>
			<Box sx={{
					width: '300%',
					height: '200%',
					borderRadius: '36px',
					padding: '0 18px 0 36px',
					display: 'flex',
					marginTop: '-40%',
					marginX: '-100%',
					backgroundColor: 'white',
					borderColor: '#000000',
					border: 'solid',
				}}>
				<Card
					sx={{
						width: '350%',
						height: '70%',
						borderRadius: '36px',
						padding: '0 18px 0 36px',
						borderColor: '#000000',
						marginTop: '5%',
						marginRight: '10%',
						marginLeft: '1%',
						border: 'solid',
						textAlign: 'center',
					}}
				><Typography
				sx={{
					textTransform: 'uppercase',
					fontWeight: 'bold',
					fontSize: '20px',
					align: 'left'
				}}>
				Player1
			</Typography>
					
				</Card>
				<Box
        component="img"
        sx={{
			marginTop: '15%',
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
        alt="The house from the offer."
        src="../../src/_assets/artwork/vs.png"
      />
				
				<Card
					sx={{
						width: '350%',
						height: '70%',
						borderRadius: '36px',
						padding: '0 18px 0 36px',
						borderColor: '#000000',
						marginLeft: '10%',
						marginRight: '1%',
						marginTop: '5%',
						border: 'solid',
						textAlign: 'center',
					}}
				><Typography
				sx={{
					textTransform: 'uppercase',
					fontWeight: 'bold',
					fontSize: '20px',
					align: 'left'
				}}>
				Player2
			</Typography>
				</Card>
			</Box>
			<Box textAlign='center' display={'flex'}>
		<Button onClick={handleClickP1} sx={{
			marginTop: '20%',
			marginRight: '85%',
			marginLeft: '-60%',
			marginBottom: '-20%',
			height: '30%'
		}}>{buttonText1}</Button>
		<Button onClick={handleClickP2} sx={{
			marginTop: '20%',
			marginLeft: '70%',
			marginBottom: '-20%',
			height: '30%'
		}}>{buttonText2}</Button>
		</Box>
		</div>
	)
}

export default Create
