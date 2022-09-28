import { Box } from '@mui/material'
import React from 'react'
import NameField from './_components/NameField'
import styles from './Home.module.scss'

const Home = () => {
	return (
		<div className={styles.home}>
			<div className={styles.getStarted}>
				<NameField />
			</div>
		</div>
	)
}

export default Home
