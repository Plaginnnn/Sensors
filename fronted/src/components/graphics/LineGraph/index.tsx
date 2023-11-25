import React, { useState, useEffect, useRef } from 'react'
import styles from './LineGraph.module.css'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend
)

const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top' as const,
		},
		title: {
			display: true,
			text: '',
		},
	},
	animation: {
		duration: 0, // Уменьшите длительность анимации
	},
}

const labels = ['10', '20', '30', '40', '50', '60', '70', '80']

const LineGraph = () => {
	const [myNumbers, setMyNumbers] = useState([
		200, 450, 600, 300, 800, 700, 900,
	])
	const prevNumbersRef = useRef(myNumbers)

	useEffect(() => {
		const intervalId = setInterval(() => {
			const randomNumber = Math.floor(Math.random() * 50)
			setMyNumbers(prevNumbers => {
				const newNumbers = [...prevNumbers.slice(1), randomNumber]
				prevNumbersRef.current = newNumbers
				return newNumbers
			})
		}, 1000)

		return () => clearInterval(intervalId)
	}, [])

	const data = {
		labels,
		datasets: [
			{
				fill: true,
				label: 'Temperature',
				data: prevNumbersRef.current, // Use the previous numbers
				borderColor: 'rgb(53, 162, 235)',
				backgroundColor: 'rgba(53, 162, 235, 0.1)',
			},
		],
	}

	return (
		<div className={styles.main}>
			<Line options={options} data={data} />
		</div>
	)
}

export default LineGraph
