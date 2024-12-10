import Footer from '../components/Footer/Footer';
import { render, screen } from '@testing-library/react';

describe('Footer', () => {
  it('should render the footer', () => {
    render(<Footer />);

    const footer = screen.getByText(/A challenge by/i);

    expect(footer).toBeInTheDocument();
  });
});

