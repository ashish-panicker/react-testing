import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Greeting } from './Greeting'

describe('Greeting Component', function () {

    
    it('Check if the component renders properly', function() {
        render(<Greeting />)
        expect(screen.getByText(/hello, stranger!/i)).toBeInTheDocument()
        // expect(screen.getByTestId('secret-message')).not.toBeInTheDocument()
        const button = screen.getByRole('button', {name: /show message/i})
        expect(button).toBeInTheDocument()
        screen.logTestingPlaygroundURL()
    })
    
    it("Check if name property is displayer", function() {
        render(<Greeting name={"Ashish"}/>)
        expect(screen.getByText(/hello, ashish!/i)).toBeInTheDocument()
    })

    it("Check if the button click event shows the secret message", function() {

        render(<Greeting name={"Ashish"}/>)
        const button = screen.getByRole('button', {name: /show message/i})
        fireEvent.click(button)
        expect(screen.getByTestId('secret-message')).toBeInTheDocument()
        expect(screen.getByRole('button', {name: /hide message/i})).toBeInTheDocument()
    })
})
