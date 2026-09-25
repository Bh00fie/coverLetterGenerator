# Cover Letter Generator

![Cover Letter Generator](/frontend/src/components/images/screenshot.png)

A Full-Stack web application designed to generate personalized cover letters using the OpenAI API. This project streamlines the process of creating professional cover letters by leveraging AI to tailor content to specific job applications.

---

## Features

- **AI-Powered Generation:** Utilizes OpenAI API to create tailored cover letters.
- **User-Friendly Interface:** Clean and intuitive design for seamless navigation.
- **Dynamic Input Fields:** Supports user input for job details, skills, and preferences.
- **Real-Time Output:** Preview generated cover letters instantly.
- **Customizable Templates:** Modify generated letters to suit individual preferences.

---

## Technologies Used

### Frontend:
- **HTML5**
- **CSS3**
- **JavaScript**
- **ReactJS**

### Backend:
- **Node.js**
- **Express.js**

### Database:
- **MongoDB**

### APIs:
- **OpenAI API**

### Other Tools:
- **Git** for version control
- **Docker** for containerization (optional)
- **YAML** for configuration

---

## Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/try/download/community) (only for login/registration)
- [OpenAI API Key](https://openai.com/api/)
- [Netlify CLI](https://docs.netlify.com/cli/get-started/) (to run the generator function locally)

### Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Bh00fie/coverLetterGenerator.git
   cd coverLetterGenerator
   ```

2. **Frontend + cover letter generation** (React app and the `/api/generate` Netlify Function):
   ```bash
   cd frontend
   npm install
   OPENAI_API_KEY=your_openai_api_key netlify dev
   ```
   The OpenAI key is only used server-side by `frontend/netlify/functions/generate.mjs`; never put it in a `REACT_APP_*` variable.
   Optionally set `REACT_APP_AUTH_API_URL` to the backend URL (defaults to `http://localhost:3000`).

3. **Auth backend** (optional, Express + MongoDB): create `backend/.env` with
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=a_long_random_string
   CORS_ORIGIN=http://localhost:8888
   ```
   then run:
   ```bash
   cd backend
   npm install
   npm start
   ```

4. **Tests:** `npm test` in `frontend` and in `backend`.

### Deploying
- **Netlify:** set `OPENAI_API_KEY` (and `REACT_APP_AUTH_API_URL` if the backend is deployed) in the site's environment variables.
- **App Engine:** put secrets in `backend/env.yaml` (git-ignored, format documented in `app.yaml`).

---

## Usage

1. Enter your personal details, job role, and company name in the form.
2. Add specific skills or experiences you want highlighted.
3. Click "Generate Cover Letter" to receive a tailored letter.
4. Edit the output if needed and download or copy it for use.

---

## Screenshots

![Input Form](https://github.com/Bh00fie/coverLetterGenerator/raw/main/assets/screenshot_form.png)

![Generated Cover Letter](https://github.com/Bh00fie/coverLetterGenerator/raw/main/assets/screenshot_output.png)

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgements

- [OpenAI](https://openai.com/) for the API.
- [ReactJS](https://reactjs.org/) for the frontend framework.
- [Node.js](https://nodejs.org/) for server-side development.

---

## Contact

For inquiries or feedback, feel free to reach out to [Abhinandan Thour](mailto:thourabhinandan@gmail.com).
