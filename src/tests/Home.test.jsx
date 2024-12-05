import { render, screen } from '@testing-library/react';
import Home from '../App';

describe('Home', () => {
  it('should render', () => {
    render(<Home />);
screen.debug();
    const header = screen.getByRole('heading', { name: 'Vite'});
    expect(header).toBeInTheDocument();
  });
});