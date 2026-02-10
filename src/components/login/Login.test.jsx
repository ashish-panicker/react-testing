import { render, screen } from '@testing-library/react'
import { describe } from 'vitest'
import Login from './Login'

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
})
