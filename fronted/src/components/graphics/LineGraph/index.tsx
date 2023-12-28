import jsonData from './data.json'
import { useRef } from 'react'
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
const labels = jsonData.map(item => item.server_time)

const temperData = jsonData.map(item => item.info[0].temper)
const humData = jsonData.map(item => item.info[0].hum)
const angleData = jsonData.map(item => item.info[0].angle)
// // const examplejson = [
// 	{
// 		"server_date": "2023-21-12",
// 		"server_time": "10:41:19",
// 		"info": [{
// 		  "temper": 19.913733,
// 		  "hum": 26.306671,
// 		  "angle": 0.512457
// 		}]
// 	  },
// 	  {
// 		"server_date": "2023-22-12",
// 		"server_time": "10:41:36",
// 		"info": [{
// 		  "temper": 20.123456,
// 		  "hum": 27.456789,
// 		  "angle": 1.567890
// 		}]
// 	  },
// 	  {
// 		"server_date": "2023-23-12",
// 		"server_time":"10:41:49",
// 		"info": [{
// 		  "temper": 20.333333,
// 		  "hum": 28.571428,
// 		  "angle": 2.623758
// 		}]
// 	  },
// 	  {
// 		  "server_date": "2023-21-12",
// 		  "server_time": "10:42:02",
// 		  "info": [{
// 			"temper": 19.913733,
// 			"hum": 26.306671,
// 			"angle": 0.512457
// 		  }]
// 		}
// 	]
	
  

const LineGraph = () => {

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
		<div className={styles.main} style={{maxHeight: '90vh'}}>
		
     
			<Line ref={canvasRef} options={options} data={data1} />
			<Line ref={canvasRef}  options={options} data={data2} />
			<Line ref={canvasRef} options={options} data={data3} />
		</div>
	)
}

export default LineGraph
