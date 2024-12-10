import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import Form from '../components/Form/Form';
import { http } from 'msw';
import { setupServer } from 'msw/node';
import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
// import server from '../mocks/node';

vi.mock('axios');

describe('Form', () => {
  beforeEach(() => {
    render(<Form />);
    vi.resetAllMocks();
  });

  beforeAll(() => {
    vi.restoreAllMocks();
  });

  it('should render correctly', () => {
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /subscribe/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should display en error if input is empty', async () => {
    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: /subscribe/i });

    await user.click(button);

    screen.debug();
    expect(await screen.findByText('Email address is required')).toBeInTheDocument();
  });

  it('should display en error if email is invalid', async () => {
    const user = userEvent.setup();
    const button = screen.getByRole('button', { name: /subscribe/i });
    const input = screen.getByRole('textbox');

    await user.type(input, 'mail@mail');
    await user.click(button);

    expect(await screen.findByText('Please enter a valid email address')).toBeInTheDocument();
  });

  it.skip('should submit form successfully', async () => {
    const user = userEvent.setup();

    // axios.post.mockResolvedValueOnce({ data: successResponse });
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /subscribe/i });

    await user.type(input, 'mail@mail.com');
    await user.click(button);

    expect(axios.post).toHaveBeenCalledWith(
      'https://www.greatfrontend.com/api/projects/challenges/newsletter',
      { email: 'mail@mail.com' },
    );

    screen.debug();
    const successResponse = await screen.findByText(
      'Subscription successful! Please check your email to confirm.',
    );

    // await waitFor(() => expect(screen.findByText(successResponse.message)).toBeInTheDocument());
    // expect(successResponse).toBeInTheDocument();
  });

  it.skip('should submit form and return an error', async () => {
    const server = setupServer();
    const user = userEvent.setup();
    const errorResponse = {
      error: 'Email format is invalid.',
    };

    server.use(
      http.post(
        'https://www.greatfrontend.com/api/projects/challenges/newsletter',
        (req, res, ctx) => {
          return new Response(ctx.json(errorResponse));
        },
      ),
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /subscribe/i });

    await user.type(input, 'mail');
    await user.click(button);

    // Vérifiez que l'API est appelée avec les bonnes données
    expect(axios.post).toHaveBeenCalledWith(
      'https://www.greatfrontend.com/api/projects/challenges/newsletter',
      { email: 'mail' },
    );

    await waitFor(() => expect(screen.findByText(errorResponse.message)).toBeInTheDocument());
  });
});
