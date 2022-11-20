import { Box, Typography } from '@mui/material';
import React from 'react'
import NameField from './_components/NameField'
import LogoCard from './_components/LogoCard'
import StartButton from './_components/Button'
import styles from './Home.module.scss'
import Logo from '../_assets/artwork/logo.png'

const Home = () => {
	return (
		<div className={styles.home}>
			<div className={styles.colLeft}></div>
			<div className={styles.colRight}>
				<img src={Logo} width="250px" className={styles.image} />
				<Typography variant="h4" sx={{marginTop:4, marginBottom: 20, fontFamily: "Righteous"}}>RPS Online</Typography>
				<NameField />
				<StartButton>Start</StartButton>
			</div>
		</div>
	)
}

export default Home
