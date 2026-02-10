import { render, screen } from '@testing-library/react'
import { describe, expect } from 'vitest'
import Login from './Login'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

describe('Login Component', function () {
	it('renders all elements', function () {
		render(<Login />)
		expect(
			screen.getByRole('heading', { name: /welcome back/i }),
		).toBeInTheDocument()
		expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
		expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
		expect(
			screen.getByRole('checkbox', { name: /remember me/i }),
		).toBeInTheDocument()
		expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
	})

	it('submit button has correct Tailwind styling classes', () => {
		render(<Login />)
		const submitButton = screen.getByRole('button', { name: /sign in/i })

		// Verifying specific Tailwind utility classes
		expect(submitButton).toHaveClass('bg-indigo-600')
		expect(submitButton).toHaveClass('hover:bg-indigo-700')
		expect(submitButton).toHaveClass('rounded-md')
	})

	it('updates input fields and submits the form', async function () {
		const user = userEvent.setup()
		const consoleSpy = vi.spyOn(console, 'log')

		render(<Login />)

		const emailInput = screen.getByLabelText(/email address/i)
		const passwordInput = screen.getByLabelText(/password/i)
		const button = screen.getByRole('button', { name: /sign in/i })

		expect(emailInput).toBeInTheDocument()
		expect(passwordInput).toBeInTheDocument()
		expect(button).toBeInTheDocument()

		// simulate key inputs
		await user.type(emailInput, 'ashish@gmail.com')
		await user.type(passwordInput, 'password')

		expect(emailInput).toHaveValue('ashish@gmail.com')
		expect(passwordInput).toHaveValue('password')

		await user.click(button)

		expect(consoleSpy).toHaveBeenCalledWith('Logging in with:', {
			email: 'ashish@gmail.com',
			password: 'password',
		})

        consoleSpy.mockRestore()
	})
})
