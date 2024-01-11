
import { useEffect, useRef, useState } from 'react'
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
import zoomPlugin from 'chartjs-plugin-zoom' // Импортируйте плагин

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
  zoomPlugin // Зарегистрируйте плагин
)


const options = {
  responsive: true,
  pointRadius: 8,

  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Графики температуры, влажности и угла',
    },
    zoom: {
		pan: {
			enabled: true,
			speed: 0.01,
			threshold: 10,
		}, mode: 'y',
      zoom: {
        wheel: {
          enabled: true,
          speed: 0.1,
          threshold: 5,
        },
       
      },
    },
  },
  animation: {
    duration: 0.5,
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Серверное время',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Значение',
		min: 0, // минимальное значение по оси Y
		max: 30, // максимальное значение по оси Y
		// остальные свойства
      },
    },
  },
};
// const labels = jsonData.map(item => item.server_time)

// const temperData = jsonData.map(item => item.info[0].temper)
// const humData = jsonData.map(item => item.info[0].hum)
// const angleData = jsonData.map(item => item.info[0].angle)


export const LineGraph = () => {


const apiUrl = 'https://eggs.2d.su/view.php?egg_id=000D6F0004CD6CE0&start_date=2023-12-21&start_time=13:44:00&end_date=2023-12-21&end_time=15:45:00';

const [labels, setLabels] = useState([]);
const [temperData, setTemperData] = useState([]);
const [humData, setHumData] = useState([]);
const [angleData, setAngleData] = useState([]);


// Обновляем состояния после получения данных с сервера
useEffect(() => {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
	

		setLabels(data.map((item: { server_time: string }) => item.server_time));
		setTemperData(data.map((item: { temp: string }) => Number(item.temp)));
		setHumData(data.map((item: { humidity: string }) => Number(item.humidity)));
		setAngleData(data.map((item: { angle: string }) => Number(item.angle)));

    })
    .catch(error => console.error('Ошибка при выполнении fetch запроса:', error));
}, []);


	const data1 = {
		labels,
		datasets: [
			{
				fill: true,
				label: 'Температура',
				data: temperData,
				borderColor: 'rgb(53, 162, 235)',
				backgroundColor: 'rgba(53, 162, 235, 0.1)',
			},
		],
	}
  const data2 = {
		labels,
		datasets: [
			{
				fill: true,
				label: 'Влажность',
				data: humData,
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.1)',
			},
		],
	}

  const data3 = {
		labels,
		datasets: [
			{
				fill: true,
				label: 'Угол',
				data: angleData,
				borderColor: 'rgb(75, 192, 192)',
				backgroundColor: 'rgba(75, 192, 192, 0.1)',
			},
		],
	}
  const canvasRef = useRef(null)

	return (
		<div className={styles.main} style={{maxHeight: '100%'}}>
		
		
			<Line ref={canvasRef} options={options} data={data1} />
			<Line ref={canvasRef}  options={options} data={data2} />
			<Line ref={canvasRef} options={options} data={data3} />
		</div>
	)
}

export default LineGraph
