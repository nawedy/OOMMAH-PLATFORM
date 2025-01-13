import React from 'react';
import { render, screen } from '@testing-library/react';
import PostList from '../PostList';

const mockPosts = [
  { id: '1', title: 'Test Post 1', content: 'Content 1', author: { name: 'User 1' } },
  { id: '2', title: 'Test Post 2', content: 'Content 2', author: { name: 'User 2' } },
];

describe('PostList', () => {
  it('renders posts correctly', () => {
    render(<PostList posts={mockPosts} />);
    
    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('Test Post 2')).toBeInTheDocument();
    expect(screen.getByText('User 1')).toBeInTheDocument();
    expect(screen.getByText('User 2')).toBeInTheDocument();
  });

  it('displays a message when there are no posts', () => {
    render(<PostList posts={[]} />);
    
    expect(screen.getByText('No posts available')).toBeInTheDocument();
  });
});

