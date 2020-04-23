import React from 'react';
import { render } from '@testing-library/react';
import MusicPlayer from './MusicPlayer';

test('renders learn react link', () => {
  const { getByText } = render(<MusicPlayer />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
