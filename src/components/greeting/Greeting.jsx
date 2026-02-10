import { useState } from 'react'

export function Greeting({ name }) {
	const [isVisible, setIsVisible] = useState(false)

	return (
		<div className='flex min-h-screen min-w-screen items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8'>
			<div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-lg">
				<h1 aria-label='heading' className='text-2xl font-bold'>Hello, {name || 'Stranger'}!</h1>
				{isVisible && (
					<p data-testid='secret-message' className='text-[20px]'>React Testing is awesome!</p>
				)}
				<button onClick={() => setIsVisible(!isVisible)} 
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200">
					{isVisible ? 'Hide' : 'Show'} Message
				</button>
			</div>
		</div>
	)
}
