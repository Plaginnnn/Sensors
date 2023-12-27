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
	pointRadius:3,
	
	plugins: {
		legend: {
			position: 'top' as const,
		},
		title: {
			display: true,
			text: 'Графики температуры, влажности и угла',
		},
		zoom:{
			pan:{
				
				
				enabled: true, // Добавьте enabled: true для панорамирования
        speed: 0.01, // Добавьте скорость для панорамирования
        threshold: 10 // Добавьте порог для панорамирования
			}
		}
	},
	animation: {
		duration: 0.5, // Уменьшите длительность анимации
	},
  // Добавьте опцию zoom, чтобы включить прокрутку по оси x
  zoom: {
    zoom: {
      wheel: {
        enabled: true, // Включите прокрутку колесом мыши
        speed: 0.1, // Добавьте скорость для прокрутки
        threshold: 5 // Добавьте порог для прокрутки
      },
      mode: 'xy' // Измените mode: 'y' на mode: 'x'
    }
  },
  // Добавьте опцию scales, чтобы настроить оси x и y
  scales: {
    x: {
      // Добавьте метку для оси x
      title: {
        display: true,
        text: 'Серверное время'
      }
    },
    y: {
      // Добавьте метку для оси y
      title: {
        display: true,
        text: 'Значение'
      }
    }
  }
}
const labels = jsonData.map(item => item.server_time)

const temperData = jsonData.map(item => item.info[0].temper)
const humData = jsonData.map(item => item.info[0].hum)
const angleData = jsonData.map(item => item.info[0].angle)
// const examplejson = [
// 	{
// 	  "server_date": "2023-21-12",
// 	  "server_time": "10:41:19",
// 	  "info": [{
// 		"temper": 19.913733,
// 		"hum": 26.306671,
// 		"angle": 0.512457
// 	  }]
// 	},
// 	{
// 	  "server_date": "2023-22-12",
// 	  "server_time": "10:43:19",
// 	  "info": [{
// 		"temper": 20.123456,
// 		"hum": 27.456789,
// 		"angle": 1.567890
// 	  }]
// 	},
// 	{
// 	  "server_date": "2023-23-12",
// 	  "server_time": "10:45:19",
// 	  "info": [{
// 		"temper": 20.333333,
// 		"hum": 28.571428,
// 		"angle": 2.623758
// 	  }]
// 	}
//   ]
  

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
		<div className={styles.main} style={{height: '90vh'}}>
      // Отрисуйте три компонента Line с разными данными и добавьте ссылку и обработчик события на каждый
			<Line ref={canvasRef} options={options} data={data1} />
			<Line ref={canvasRef}  options={options} data={data2} />
			<Line ref={canvasRef} options={options} data={data3} />
		</div>
	)
}

export default LineGraph
