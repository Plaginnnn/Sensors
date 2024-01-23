// Импорт необходимых библиотек и стилей
import { useEffect, useRef, useState } from 'react'
import mobileStyles from './LineGraphMobile.module.css';
import styles from './LineGraph.module.css';

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
import zoomPlugin from 'chartjs-plugin-zoom'

// Регистрация компонентов Chart.js и плагина зума
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
  zoomPlugin
)

// Настройки графика
const options = {
  responsive: true,
  pointRadius: 5,

  plugins: {
    legend: {
      position: 'top' as const,

    },
	
    title: {
      display: false,
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
          threshold: 10,
        },
       
      },
    },
  },
  animation: {
    duration: 0,
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
        display: true ,
        text: 'Показатели',
		min: 0, // минимальное значение по оси Y
		max: 30, // максимальное значение по оси Y
		// остальные свойства
      },
	
		
    },
  },
};

// Компонент LineGraph
export const LineGraph = () => {

  // URL для получения данных с сервера (в дальнейшем будем динамически менять используя option)
  const apiUrl = 'https://eggs.2d.su/view.php?egg_id=000D6F0004CD6CE0&start_date=2023-12-21&start_time=13:44:00&end_date=2023-12-21&end_time=22:45:00';

  // Состояния для хранения данных графика
  const [labels, setLabels] = useState([]);
  const [temperData, setTemperData] = useState([]);
  const [humData, setHumData] = useState([]);
  const [angleData, setAngleData] = useState([]);

  // Запрос данных с сервера при монтировании компонента
  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Обновление состояний данными с сервера
        setLabels(data.map((item: { server_time: string }) => item.server_time));
        setTemperData(data.map((item: { temp: string }) => Number(item.temp)));
        setHumData(data.map((item: { humidity: string }) => Number(item.humidity)));
        setAngleData(data.map((item: { angle: string }) => Number(item.angle)));
      })
      .catch(error => console.error('Ошибка при выполнении fetch запроса:', error));
  }, []);

  // Конфигурация данных для графика температуры
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
  
  // Конфигурация данных для графика влажности
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

  // Конфигурация данных для графика угла
  const data3 = {
		labels,
		datasets: [
			{
				fill: true ,
				label: 'Угол',
				data: angleData,
				borderColor: 'rgb(75, 192, 192)',
				backgroundColor: 'rgba(75, 192, 192, 0.1)',
			},
		],
	}
  
  // Ссылка на элемент canvas для графика
  const canvasRef1 = useRef(null);
  const canvasRef2 = useRef(null);
  const canvasRef3 = useRef(null);

  // Рендеринг компонента
	
			return (
				<div className={`${styles.main} ${mobileStyles.mobileMain}`} style={{ maxHeight: '100%' }}>
				
				<div className={mobileStyles.mobileChart}>
					<Line ref={canvasRef1} options={options} data={data1} />
				</div>
				<div className={mobileStyles.mobileChart}>
					<Line ref={canvasRef2} options={options} data={data2} />
				</div>
				<div className={mobileStyles.mobileChart}>
					<Line ref={canvasRef3} options={options} data={data3} />
				</div>
				</div>
			);
  
  
}

// Экспорт компонента
export default LineGraph
