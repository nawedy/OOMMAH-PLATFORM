import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import PersonalizedRecommendations from '../PersonalizedRecommendations';

const mockStore = configureStore([thunk]);

describe('PersonalizedRecommendations', () => {
  it('renders loading state', () => {
    const store = mockStore({
      recommendations: { items: [], loading: true, error: null },
    });

    render(
      <Provider store={store}>
        <PersonalizedRecommendations />
      </Provider>
    );

    expect(screen.getByText('Loading recommendations...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    const store = mockStore({
      recommendations: { items: [], loading: false, error: 'Failed to fetch recommendations' },
    });

    render(
      <Provider store={store}>
        <PersonalizedRecommendations />
      </Provider>
    );

    expect(screen.getByText('Error: Failed to fetch recommendations')).toBeInTheDocument();
    expect(screen.getByText('Retry')).toBeInTheDocument();
  });

  it('renders recommendations', () => {
    const store = mockStore({
      recommendations: {
        items: [
          { id: '1', title: 'Test Post 1', author: { name: 'John Doe' }, tags: [{ name: 'test' }] },
          { id: '2', title: 'Test Post 2', author: { name: 'Jane Doe' }, tags: [{ name: 'example' }] },
        ],
        loading: false,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <PersonalizedRecommendations />
      </Provider>
    );

    expect(screen.getByText('Recommended for You')).toBeInTheDocument();
    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('Test Post 2')).toBeInTheDocument();
  });
});

