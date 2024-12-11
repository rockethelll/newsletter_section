import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import Form from '../components/Form/Form';
import App from '../App';

vi.mock('axios');

describe('Form', () => {
  beforeAll(() => {
    vi.restoreAllMocks();
  });

  it('should render correctly', () => {
    render(<Form />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /subscribe/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should display en error if input is empty', async () => {
    render(<Form />);
    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: /subscribe/i });

    await user.click(button);

    screen.debug();
    expect(await screen.findByText('Email address is required')).toBeInTheDocument();
  });

  it('should display en error if email is invalid', async () => {
    render(<Form />);
    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: /subscribe/i });
    const input = screen.getByRole('textbox');

    await user.type(input, 'mail@mail');
    await user.click(button);

    expect(await screen.findByText('Please enter a valid email address')).toBeInTheDocument();
  });

  it('should submit form successfully', async () => {
    render(<App />);

    const toasterContainer = document.createElement('div');
    toasterContainer.id = 'toast';
    document.body.appendChild(toasterContainer);

    expect(toasterContainer).toBeEmptyDOMElement();

    const user = userEvent.setup();

    const input = screen.getByPlaceholderText('name@email.com');
    const button = screen.getByRole('button', { name: /subscribe/i });

    await user.type(input, 'mail@mail.com');
    await user.click(button);

    expect(axios.post).toHaveBeenCalledWith(
      'https://www.greatfrontend.com/api/projects/challenges/newsletter',
      { email: 'mail@mail.com' },
    );

    await waitFor(() => expect(input).toBeEmptyDOMElement());
  });
});
