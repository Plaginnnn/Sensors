import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const apiUrl = 'https://eggs.2d.su/egg_last_info.php?egg_id=000D6F0004CD6CE0';

const getAspectRatio = () => {
	// Adjust the width breakpoint as needed
	const breakpoint = 620;
	const settings = {
		width: window.innerWidth < breakpoint ? 1 : 2,
		point :window.innerWidth < breakpoint ? 0 : 5,
		display:window.innerWidth < breakpoint ? false : true,
		
	}
	return settings
  };
// Настройки графика
const options = {
  responsive: true,
  
  pointRadius: getAspectRatio().point,
  aspectRatio: getAspectRatio().width,

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
			enabled: false,
			speed: 0.01,
			threshold: 10,
		}, mode: 'y',
      zoom: {
        wheel: {
          enabled: false,
          speed: 0.1,
          threshold: 5,
        },
       
      },
    },
  },
  
  animation: {
    duration: 1,
    enabled: false,
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
        display: getAspectRatio().display, 

        text: 'Значение',
		min: 0, // минимальное значение по оси Y
		max: 3, // максимальное значение по оси Y
		// остальные свойства
      },
    },
  },
};

const LineRealTime = () => {
  const [labels, setLabels] = useState<string[]>([]);
  const [temperData, setTemperData] = useState<number[]>([]);
  const [humData, setHumData] = useState<number[]>([]);
  const [angleData, setAngleData] = useState<number[]>([]);

  const fetchData = () => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Добавляем новые данные
        setLabels((prevLabels) => [...prevLabels.slice(-10), data.server_time]);
        setTemperData((prevTemperData) => [...prevTemperData.slice(-10), Number(data.temp)]);
        setHumData((prevHumData) => [...prevHumData.slice(-10), Number(data.humidity)]);
        setAngleData((prevAngleData) => [...prevAngleData.slice(-10), Number(data.angle)]);
      })
      .catch((error) => console.error('Ошибка при выполнении fetch запроса:', error));
  };

  useEffect(() => {
    fetchData(); 

    // Интервал фетч запроса
    const intervalId = setInterval(fetchData, 14000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
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
  };

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
  };

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
  };

  return (
    <div style={{ maxHeight: '100%' }}>
      <Line options={options} data={data1} />
      <Line options={options} data={data2} />
      <Line options={options} data={data3} />
    </div>
  );
};

export default LineRealTime;
