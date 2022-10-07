import { Box } from '@mui/material'
import React from 'react'
import NameField from './_components/NameField'
import LogoCard from './_components/LogoCard'
import StartButton from './_components/Button'
import styles from './Home.module.scss'

const Home = () => {
	return (
		<div className={styles.home}>
			<LogoCard />
			<NameField />
			<Box textAlign='center' margin='5%'><StartButton> Start </StartButton></Box>
		</div>
	)
}

export default Home
