import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ABTestDashboard from '../ABTestDashboard';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ overall: [], trend: [] }),
  })
) as jest.Mock;

describe('ABTestDashboard', () => {
  it('renders without crashing', async () => {
    render(<ABTestDashboard />);
    await waitFor(() => {
      expect(screen.getByText('A/B Test Dashboard')).toBeInTheDocument();
    });
  });

  it('displays the date range picker', async () => {
    render(<ABTestDashboard />);
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Start Date')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('End Date')).toBeInTheDocument();
    });
  });

  it('displays the metric selector', async () => {
    render(<ABTestDashboard />);
    await waitFor(() => {
      expect(screen.getByText('Click-through Rate')).toBeInTheDocument();
    });
  });

  // Add more tests as needed
});

