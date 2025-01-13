import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import LoginPage from '../pages/login';

// Mock the signIn function from next-auth
jest.mock('next-auth/react', () => ({
  ...jest.requireActual('next-auth/react'),
  signIn: jest.fn(),
}));

describe('Login Integration Test', () => {
  it('submits the login form correctly', async () => {
    const mockSignIn = require('next-auth/react').signIn;
    mockSignIn.mockResolvedValueOnce({ ok: true, error: null });

    render(
      <SessionProvider session={null}>
        <LoginPage />
      </SessionProvider>
    );

    // Fill in the login form
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    // Wait for the signIn function to be called
    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('credentials', {
        email: 'test@example.com',
        password: 'password123',
        callbackUrl: '/',
      });
    });

    // Check for success message
    expect(await screen.findByText('Login successful!')).toBeInTheDocument();
  });

  it('displays an error message on login failure', async () => {
    const mockSignIn = require('next-auth/react').signIn;
    mockSignIn.mockResolvedValueOnce({ ok: false, error: 'Invalid credentials' });

    render(
      <SessionProvider session={null}>
        <LoginPage />
      </SessionProvider>
    );

    // Fill in the login form
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'wrongpassword' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    // Wait for the error message
    expect(await screen.findByText('Invalid credentials')).toBeInTheDocument();
  });
});

