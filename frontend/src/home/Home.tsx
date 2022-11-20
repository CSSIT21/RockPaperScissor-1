import { Box } from '@mui/material'
import React from 'react'
import NameField from './_components/NameField'
import LogoCard from './_components/LogoCard'
import StartButton from './_components/Button'
import styles from './Home.module.scss'
import { useNavigate } from 'react-router-dom'


const Home = () => {
		const navigate = useNavigate();
	
		const navigateToMode = () => {
			navigate('/mode')
		}

	return (
		<div className={styles.home}>
			<LogoCard />
			<NameField />
			<Box textAlign='center' margin='5%'><StartButton onClick={navigateToMode}> Start </StartButton></Box>
		</div>
	)
}

export default Home
