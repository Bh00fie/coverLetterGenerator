import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders the generator page', () => {
  render(<App />);
  expect(screen.getByText(/cover letter generator using ai/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /generate/i })).toBeInTheDocument();
});

test('asks for missing fields instead of calling the API', () => {
  global.fetch = jest.fn();
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /generate/i }));
  expect(screen.getByRole('alert')).toHaveTextContent(/please fill in/i);
  expect(global.fetch).not.toHaveBeenCalled();
});

test('shows the server error when generation fails', async () => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    json: () => Promise.resolve({ error: 'Server exploded' }),
  });
  render(<App />);
  fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'Ada Lovelace' } });
  fireEvent.change(screen.getByPlaceholderText('Position'), { target: { value: 'Engineer' } });
  fireEvent.change(screen.getByPlaceholderText('Company Name'), { target: { value: 'Acme' } });
  fireEvent.change(screen.getByPlaceholderText('CV'), { target: { value: 'My CV' } });
  fireEvent.change(screen.getByPlaceholderText('Job Description'), { target: { value: 'The job' } });
  fireEvent.click(screen.getByRole('button', { name: /generate/i }));

  await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Server exploded'));
  const [url, options] = global.fetch.mock.calls[0];
  expect(url).toBe('/api/generate');
  expect(JSON.parse(options.body)).toMatchObject({ fullName: 'Ada Lovelace', language: 'english' });
});
