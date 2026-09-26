import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

afterEach(() => {
  jest.restoreAllMocks();
  window.history.pushState({}, '', '/');
});

const fillForm = () => {
  fireEvent.change(screen.getByLabelText('Full name'), { target: { value: 'Ada Lovelace' } });
  fireEvent.change(screen.getByLabelText('Position'), { target: { value: 'Engineer' } });
  fireEvent.change(screen.getByLabelText('Company'), { target: { value: 'Acme' } });
  fireEvent.change(screen.getByLabelText('Your CV'), { target: { value: 'My CV' } });
  fireEvent.change(screen.getByLabelText('Job description'), { target: { value: 'The job' } });
};

test('renders the generator page', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: /cover letter generator/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /generate/i })).toBeInTheDocument();
  expect(screen.getByText(/frequently asked questions/i)).toBeInTheDocument();
});

test('asks for missing fields instead of calling the API', () => {
  global.fetch = jest.fn();
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /generate/i }));
  expect(screen.getByRole('alert')).toHaveTextContent(/please fill in/i);
  expect(screen.getByLabelText('Full name')).toHaveAttribute('aria-invalid', 'true');
  expect(global.fetch).not.toHaveBeenCalled();
});

test('shows the server error when generation fails', async () => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    json: () => Promise.resolve({ error: 'Server exploded' }),
  });
  render(<App />);
  fillForm();
  fireEvent.click(screen.getByRole('button', { name: /generate/i }));

  await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Server exploded'));
  const [url, options] = global.fetch.mock.calls[0];
  expect(url).toBe('/api/generate');
  expect(JSON.parse(options.body)).toMatchObject({ fullName: 'Ada Lovelace', language: 'english' });
});

test('shows the generated letter so it can be edited', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ coverLetter: 'Dear Acme team,' }),
  });
  render(<App />);
  fillForm();
  fireEvent.click(screen.getByRole('button', { name: /generate/i }));

  const letter = await screen.findByLabelText('Generated cover letter');
  expect(letter).toHaveValue('Dear Acme team,');
  fireEvent.change(letter, { target: { value: 'Dear Acme team, edited' } });
  expect(letter).toHaveValue('Dear Acme team, edited');
  expect(screen.getByRole('button', { name: 'Download' })).toBeInTheDocument();
});

test('sets a page title on the login page', () => {
  window.history.pushState({}, '', '/login');
  render(<App />);
  expect(document.title).toBe('Login · Cover Letter Generator');
  expect(screen.getByRole('heading', { name: /^login$/i })).toBeInTheDocument();
});
