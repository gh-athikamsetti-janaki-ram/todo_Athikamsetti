import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Todo List heading', () => {
  render(<App />);
  const heading = screen.getByText(/todo list/i);
  expect(heading).toBeInTheDocument();
});
