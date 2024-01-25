import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Импортируем BrowserRouter, Route и Switch
import './App.css';
import Header from './components/Header';
import LineGraph from './pages/LineGraph';
import LineRealTime from './pages/RealTime/LineRealTime';
// import Settings from './pages/Settings'

export const App = () => {
  return (
	<Router>
	<div>
		<Header />
		<div className='wrapper'>
		<Routes>
			<Route path="/" element ={<LineRealTime/>} />
			<Route path="/interval" element ={<LineGraph/>}/>
			<Route path="/settings" element ={<Settings/>}/>
		</Routes>
		</div>
	</div>
	</Router>
  );
};

export default App;
