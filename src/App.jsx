import { Greeting } from './components/greeting/Greeting'
import Login from './components/login/Login'
import Register from './components/register/Register'

function App() {
	return (
		<>
			<div className='min-h-screen min-w-screen flex justify-center items-center'>
				{/* <Greeting name={"Ashish"}/> */}
				{/* <Login /> */}
				<Register />
			</div>
		</>
	)
}

export default App
