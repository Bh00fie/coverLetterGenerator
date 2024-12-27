# Cover Letter Generator

![Cover Letter Generator](https://github.com/Bh00fie/coverLetterGenerator/raw/main/assets/cover_letter_generator_banner.png)

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
- [Node.js](https://nodejs.org/) (v14+ recommended)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [OpenAI API Key](https://openai.com/api/)
- [Git](https://git-scm.com/)

### Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Bh00fie/coverLetterGenerator.git
   cd coverLetterGenerator
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     PORT=3000
     MONGODB_URI=your_mongodb_connection_string
     OPENAI_API_KEY=your_openai_api_key
     ```

4. **Start the Application:**
   ```bash
   npm start
   ```

5. **Access the Application:**
   Open your browser and navigate to `http://localhost:3000`.

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
