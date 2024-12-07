import { beforeEach } from 'vitest';
import Text from '../components/Text/Text';
import { render, screen } from '@testing-library/react';

describe('Text', () => {
  beforeEach(() => {
    render(<Text />);
  });
  it('should render correctly', () => {
    screen.debug();
    const header = screen.getByRole('heading', { name: /Get the finest/i });
    expect(header).toBeInTheDocument();
  });

  it('should contain an input with a placeholder', () => {
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();

    const placeholder = screen.getByPlaceholderText('name@email.com');
    expect(placeholder).toBeInTheDocument();
  });

  it('should contain a button', () => {
    const button = screen.getByRole('button', { name: /Subscribe/i });
    expect(button).toBeInTheDocument();
  });
});
