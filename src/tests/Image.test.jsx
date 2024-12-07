import { render, screen } from '@testing-library/react';
import Image from '../components/Image/Image';

describe('Image', () => {
  it('should render correctly', () => {
    render(<Image />);
    screen.debug();
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();

    const alt = screen.getByAltText('Illustration');
    expect(alt).toBeInTheDocument();
  });
});
