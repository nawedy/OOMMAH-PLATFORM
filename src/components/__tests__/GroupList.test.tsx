import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GroupList } from '../GroupList';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      { id: '1', name: 'Group 1', description: 'Description 1' },
      { id: '2', name: 'Group 2', description: 'Description 2' },
    ]),
  })
) as jest.Mock;

describe('GroupList', () => {
  it('renders groups correctly', async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <GroupList />
      </QueryClientProvider>
    );

    // Wait for the groups to be loaded
    await screen.findByText('Group 1');

    expect(screen.getByText('Group 1')).toBeInTheDocument();
    expect(screen.getByText('Group 2')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
  });

  it('displays loading state', () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <GroupList />
      </QueryClientProvider>
    );

    expect(screen.getByText('Loading groups...')).toBeInTheDocument();
  });

  it('handles error state', async () => {
    global.fetch = jest.fn(() => Promise.reject('API error')) as jest.Mock;

    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <GroupList />
      </QueryClientProvider>
    );

    await screen.findByText('Error loading groups: API error');

    expect(screen.getByText('Error loading groups: API error')).toBeInTheDocument();
  });
});

