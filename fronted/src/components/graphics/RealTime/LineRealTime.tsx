import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const apiUrl = 'https://eggs.2d.su/random.php';

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
        setLabels((prevLabels) => [...prevLabels.slice(-49), data.time]);
        setTemperData((prevTemperData) => [...prevTemperData.slice(-49), Number(data.temp)]);
        setHumData((prevHumData) => [...prevHumData.slice(-49), Number(data.humidity)]);
        setAngleData((prevAngleData) => [...prevAngleData.slice(-49), Number(data.angle)]);
      })
      .catch((error) => console.error('Ошибка при выполнении fetch запроса:', error));
  };

  useEffect(() => {
    fetchData(); // Fetch data initially

    // Set up interval to fetch data every 10 seconds
    const intervalId = setInterval(fetchData, 1000);

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
