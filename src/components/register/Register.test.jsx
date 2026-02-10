import userEvent from "@testing-library/user-event";
import axios from "axios";
import { beforeEach, it, vi } from "vitest";
import Register from "./Register";
import { render, screen, waitFor } from "@testing-library/react";

vi.mock('axios')

describe('Register Component', () => { 

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('submits successfully when all fields are valid', async () => {
    const user = userEvent.setup();
    axios.post.mockResolvedValueOnce({ data: { message: 'Success' } });

    render(<Register />);

    // Fill out the form
    await user.type(screen.getByLabelText(/full name/i), 'Ashish');
    await user.type(screen.getByLabelText(/email/i), 'ashish@example.com');
    await user.type(screen.getByLabelText(/password/i), 'securePassword123');
    
    // Click radio button
    const businessRadio = screen.getByLabelText(/business/i);
    await user.click(businessRadio);
    
    const submitBtn = screen.getByRole('button', { name: /create account/i });
    expect(submitBtn).toBeDisabled();

    // Check Terms checkbox (Button is disabled until checked)
    const termsCheckbox = screen.getByLabelText(/i accept the terms and conditions/i);
    await user.click(termsCheckbox);

    expect(submitBtn).not.toBeDisabled();

    await user.click(submitBtn);

    // Verify Axios call
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/register', expect.objectContaining({
        fullName: 'Ashish',
        email: 'ashish@example.com',
        userType: 'business',
        agreedToTerms: true
      }));
    });

    // Check for success message
    expect(await screen.findByText(/registration successful/i)).toBeInTheDocument();
  });
 })