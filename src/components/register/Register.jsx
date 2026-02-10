import axios from 'axios'
import React, { useState } from 'react'

const Register = () => {
	const [formData, setFormData] = useState({
		fullName: '',
		email: '',
		password: '',
		userType: 'individual', // Radio button default
		agreedToTerms: false, // Checkbox default
		newsletter: true, // Checkbox default
	})

	const [isLoading, setIsLoading] = useState(false) // New: Track API status
	const [apiMessage, setApiMessage] = useState({ type: '', text: '' }) // New: Success/Global Error
	const [errors, setErrors] = useState({})

	const validate = () => {
		let newErrors = {}
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

		if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'

		if (!formData.email) {
			newErrors.email = 'Email is required'
		} else if (!emailRegex.test(formData.email)) {
			newErrors.email = 'Invalid email format'
		}

		if (!formData.password) {
			newErrors.password = 'Password is required'
		} else if (formData.password.length < 8) {
			newErrors.password = 'Password must be at least 8 characters'
		}

		if (!formData.userType) newErrors.userType = 'Please select an account type'

		if (!formData.agreedToTerms)
			newErrors.agreedToTerms = 'You must accept the terms'

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}))
		// Clear error for the specific field when user interacts
		if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setApiMessage({ type: '', text: '' })
		if (!validate()) return

		setIsLoading(true)
		try {
			const response = await axios.post('/api/register', formData)

			setApiMessage({
				type: 'success',
				text: 'Registration successful! Please check your email.',
			})
			// Optional: Clear form or redirect user
		} catch (error) {
			setApiMessage({
				type: 'error',
				text:
					error.response?.data?.message ||
					'Server error. Please try again later.',
			})
		} finally {
			setIsLoading(false)
		}
	}

	const getInputClass = (fieldName) => `
    mt-1 block w-full rounded-lg border px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2
    ${
			errors[fieldName] ?
				'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200'
			:	'border-gray-300 bg-gray-50 focus:border-blue-500 focus:ring-blue-100'
		}
  `

	return (
		<div className='flex min-h-screen min-w-screen items-center justify-center bg-slate-50 px-4 py-12'>
			<div className='w-full max-w-lg space-y-8 rounded-2xl bg-white p-8 shadow-xl border border-gray-100'>
				<div className='text-center'>
					<h2 className='text-3xl font-bold tracking-tight text-gray-900'>
						Create an Account
					</h2>
					<p className='mt-2 text-sm text-gray-500'>Join our platform today</p>
				</div>

				{/* Global Feedback Message */}
				{apiMessage.text && (
					<div
						className={`p-3 rounded-lg text-sm font-medium ${
							apiMessage.type === 'success' ?
								'bg-green-100 text-green-700'
							:	'bg-red-100 text-red-700'
						}`}>
						{apiMessage.text}
					</div>
				)}

				<form className='mt-8 space-y-5' onSubmit={handleSubmit} noValidate>
					{/* Text Inputs */}
					<div className='grid grid-cols-1 gap-5'>
						<div>
							<label
								className='text-sm font-semibold text-gray-700'
								htmlFor='fullname'>
								Full Name
							</label>
							<input
								id='fullname'
								type='text'
								name='fullName'
								required
								className={getInputClass('fullName')}
								placeholder='John Doe'
								onChange={handleChange}
							/>
							{errors.fullName && (
								<p className='mt-1 text-xs text-red-500'>{errors.fullName}</p>
							)}
						</div>
						<div>
							<label
								className='text-sm font-semibold text-gray-700'
								htmlFor='email'>
								Email Address
							</label>
							<input
								id='email'
								type='email'
								name='email'
								required
								className={getInputClass('email')}
								placeholder='name@company.com'
								onChange={handleChange}
							/>
							{errors.email && (
								<p className='mt-1 text-xs text-red-500'>{errors.email}</p>
							)}
						</div>
					</div>

					{/* Password */}
					<div>
						<label
							className='text-sm font-semibold text-gray-700'
							htmlFor='password'>
							Password
						</label>
						<input
							id='password'
							type='password'
							name='password'
							className={getInputClass('password')}
							placeholder='••••••••'
							onChange={handleChange}
						/>
						{errors.password && (
							<p className='mt-1 text-xs text-red-500'>{errors.password}</p>
						)}
					</div>

					{/* Radio Buttons: Account Type */}
					<fieldset>
						<legend className='text-sm font-semibold text-gray-700'>
							Account Type
						</legend>
						<div className='mt-3 flex items-center space-x-6'>
							<div className='flex items-center'>
								<input
									id='individual'
									name='userType'
									type='radio'
									value='individual'
									checked={formData.userType === 'individual'}
									onChange={handleChange}
									className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500'
								/>
								<label
									htmlFor='individual'
									className='ml-3 block text-sm font-medium text-gray-700'>
									Individual
								</label>
							</div>
							<div className='flex items-center'>
								<input
									id='business'
									name='userType'
									type='radio'
									value='business'
									checked={formData.userType === 'business'}
									onChange={handleChange}
									className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500'
								/>
								<label
									htmlFor='business'
									className='ml-3 block text-sm font-medium text-gray-700'>
									Business
								</label>
							</div>
						</div>
					</fieldset>

					{/* Checkboxes */}
					<div className='space-y-3 pt-2'>
						<div className='flex items-start'>
							<div className='flex h-5 items-center'>
								<input
									id='agreedToTerms'
									name='agreedToTerms'
									type='checkbox'
									required
									className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
									onChange={handleChange}
								/>
							</div>
							<div className='ml-3 text-sm'>
								<label
									htmlFor='agreedToTerms'
									className='font-medium text-gray-700'>
									I accept the{' '}
									<a href='#' className='text-blue-600 hover:underline'>
										Terms and Conditions
									</a>
								</label>
							</div>
						</div>

						<div className='flex items-start'>
							<div className='flex h-5 items-center'>
								<input
									id='newsletter'
									name='newsletter'
									type='checkbox'
									checked={formData.newsletter}
									className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
									onChange={handleChange}
								/>
							</div>
							<div className='ml-3 text-sm'>
								<label htmlFor='newsletter' className='text-gray-500'>
									Sign up for our monthly newsletter
								</label>
							</div>
						</div>
					</div>

					<button
						disabled={!formData.agreedToTerms}
						type='submit'
						className='w-full rounded-lg bg-blue-600 px-5 py-3 text-center text-sm font-bold text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all shadow-md disabled:bg-gray-400 disabled:text-black'>
						Create Account
					</button>
				</form>

				<p className='text-center text-sm text-gray-600'>
					Already have an account?{' '}
					<a
						href='#'
						className='font-semibold text-blue-600 hover:text-blue-500 underline-offset-4 hover:underline'>
						Sign in
					</a>
				</p>
			</div>
		</div>
	)
}

export default Register
