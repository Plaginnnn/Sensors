import './App.css'
import LineGraph from './components/graphics/LineGraph'
import LineRealTime from './components/graphics/RealTime/LineRealTime'
export const App = () => {
	return (
		<div className='wrapper'>
			<LineRealTime/>
			<LineGraph />
		</div>
	)
}
export default App
