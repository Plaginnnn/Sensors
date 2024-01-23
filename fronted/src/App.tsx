import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Импортируем BrowserRouter, Route и Switch
import './App.css';
import Header from './components/Header';
import LineGraph from './components/graphics/LineGraph';
import LineRealTime from './components/graphics/RealTime/LineRealTime';

export const App = () => {
  return (
	<Router>
	<div>
		<Header />
		<div className='wrapper'>
		<Routes>
			<Route path="/" element ={<LineRealTime/>} />
			<Route path="/interval" element ={<LineGraph/>}/>
		</Routes>
		</div>
	</div>
	</Router>
  );
};

export default App;
