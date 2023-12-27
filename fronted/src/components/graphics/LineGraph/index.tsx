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
	plugins: {
		legend: {
			position: 'top' as const,
		},
		title: {
			display: true,
			text: '',
		},
		zoom:{
			pan:{
				enabled: true // Добавьте enabled: true для панорамирования
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
        enabled: true // Включите прокрутку колесом мыши
      },
      mode: 'x' // Измените mode: 'y' на mode: 'x'
    }
  }
}

// Предположим, что вы получили JSON-данные из файла или API


// Извлеките метки из времени сервера
const labels = jsonData.map(item => item.server_time)

// Создайте массивы данных для каждого параметра
const temperData = jsonData.map(item => item.info[0].temper)
const humData = jsonData.map(item => item.info[0].hum)
const angleData = jsonData.map(item => item.info[0].angle)

const LineGraph = () => {

  // Создайте три объекта данных для каждого графика
	const data1 = {
		labels,
		datasets: [
			{
				fill: true,
				label: 'Temperature',
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
				label: 'Humidity',
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
				label: 'Angle',
				data: angleData,
				borderColor: 'rgb(75, 192, 192)',
				backgroundColor: 'rgba(75, 192, 192, 0.1)',
			},
		],
	}

  // Создайте ссылку на элемент canvas
  const canvasRef = useRef<Line>(null)

  // Добавьте обработчик события wheel, чтобы сбросить масштаб при нажатии Ctrl
  // Добавьте тип для параметра event
  const handleWheel = (event: React.WheelEvent<HTMLCanvasElement>) => {
    if (event.ctrlKey) {
      // Добавьте оператор ? после canvasRef.current
      const chart = canvasRef.current?.chartInstance
      // Проверьте, что chart не null или undefined, прежде чем вызывать resetZoom
      if (chart) {
        chart.resetZoom()
      }
    }
  }

	return (
		<div className={styles.main}>

			<Line ref={canvasRef} onWheel={handleWheel} options={options} data={data1} />
			<Line ref={canvasRef} onWheel={handleWheel} options={options} data={data2} />
			<Line ref={canvasRef} onWheel={handleWheel} options={options} data={data3} />
		</div>
	)
}

export default LineGraph
